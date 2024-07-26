const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { entries, output } = require("./hpack.config");

class HTMLBundler {
  constructor() {
    // TRACKING WATCH FILES
    this.watchedFiles = new Set();
  }

  // HTML WATCHER
  html_watcher(entry, entry_value) {
    // RUNNING FIRST TIME
    this.html_bundler(
      entry_value,
      path.join(output.path, entry + ".pack", path.basename(entry_value))
    );

    // WATCHING THE FILE
    fs.watch(entry_value, (eventType, filename) => {
      console.log(`File ${filename} has been ${eventType}`);
      if (eventType === "change") {
        // CALLING HTML BUNDLER EVERY TIME THE FILES SAVE

        const directoryPath = path.join(output.path, entry + ".pack");
        // If not, create it recursively
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
          console.log(`Directory created at ${directoryPath}`);
        }

        this.html_bundler(
          entry_value,
          path.join(output.path, entry + ".pack", path.basename(entry_value))
        );
      }
    });

    // Adding watchComponentFiles functionality
    this.watchComponentFiles(entry, entry_value);
  }

  // HTML BUNDLER
  html_bundler(reference_file, output_file) {
    // READ THE FILE
    fs.readFile(reference_file, "utf8", (err, html) => {
      console.log("Focusing on File !");
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      // SELECTING ALL THE ELEMENTS WITH INCLUDE TAG
      const $ = cheerio.load(html);
      this.processIncludeTags($, reference_file);

      fs.writeFile(output_file, $.html(), (err) => {
        console.log(output_file);
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("HTML Bundled Successfully");
      });
    });
  }

  processIncludeTags($, reference_file) {
    $("include").each((index, element) => {
      const src = $(element).attr("src");
      if (src) {
        const component_path = path.join(path.dirname(reference_file), src);

        const content = fs.readFileSync(component_path, "utf8");
        const comp_content = cheerio.load(content);
        this.processIncludeTags(comp_content, component_path); // Process nested include tags

        $(element).after(comp_content.html());
        $(element).remove();
      }
    });
  }

  watchComponentFiles(entry, public_path_name) {
    const data = fs.readFileSync(public_path_name, "utf8");
    const $ = cheerio.load(data);

    $("include").each((index, element) => {
      const src = $(element).attr("src");
      const component_path = path.join(path.dirname(public_path_name), src);

      if (!this.watchedFiles.has(component_path)) {
        fs.watchFile(component_path, (curr, prev) => {
          if (curr.mtime !== prev.mtime) {
            this.processAndSaveHtml(entry, public_path_name);
          }
        });
        this.watchedFiles.add(component_path);
      }

      const content = fs.readFileSync(component_path, "utf8");
      const comp_content = cheerio.load(content);

      comp_content("include").each((index, element) => {
        const newsrc = comp_content(element).attr("src");
        const component_type = path.join(path.dirname(component_path), newsrc);

        if (!this.watchedFiles.has(component_type)) {
          fs.watchFile(component_type, (curr, prev) => {
            if (curr.mtime !== prev.mtime) {
              this.processAndSaveHtml(entry, public_path_name);
            }
          });
          this.watchedFiles.add(component_type);
        }
      });
    });
  }

  processAndSaveHtml(entry, public_path_name) {
    try {
      const data = fs.readFileSync(public_path_name, "utf8");
      const $ = cheerio.load(data);
      this.processIncludeTags($, public_path_name);
      const output_file = path.join(
        output.path,
        entry + ".pack",
        path.basename(public_path_name)
      );

      fs.writeFile(output_file, $.html(), "utf8", (err) => {
        if (err) {
          console.error("Error writing the new HTML file:", err);
          return;
        }
        console.log("Modified HTML file has been saved.");
      });
    } catch (err) {
      console.error("Error reading file:", err);
    }
  }
}

const start_watching_file = () => {
  for (var entry in entries) {
    console.log("Tracking Files : ", entry);
    const watcher = new HTMLBundler();
    watcher.html_watcher(entry, entries[entry]);
    // WATCH HTML FILE FOR CHANGE
  }
};

// START WATCHING FILE
start_watching_file();
