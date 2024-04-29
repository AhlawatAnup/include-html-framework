const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { entries, output } = require("../hpack.config");

class HTMLBundler {
  constructor() {}

  // HTML WATCHER
  html_watcher(entry, entry_value) {
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

      //SELECTING THE ALL ELEMENTS WITH INCLUDE TAG
      const $ = cheerio.load(html);
      $("include").each((index, element) => {
        //   console.log($(element).attr("src"));
        const src = $(element).attr("src");
        if (src) {
          // READING COMPONENTS
          const content = fs.readFileSync(
            path.join(
              path.dirname(path.join(process.cwd(), reference_file)),
              src
            ),
            "utf8"
          );
          $(element).after(content);
          $(element).remove();
        }
      });

      fs.writeFile(output_file, $.html(), (err) => {
        console.log(output_file);
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("HTML Bundled Successful");
      });
    });
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
