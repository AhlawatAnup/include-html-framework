const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { entries, output } = require("./hpack.config");

var dirname = __dirname;
// console.log(dirname);

// HTML BUNDLER
const html_bundler = (reference_file, output_file) => {
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
          path.join(path.dirname(path.join(__dirname, reference_file)), src),
          "utf8"
        );
        $(element).after(content);
        $(element).remove();
      }
    });

    fs.writeFile(output_file, $.html(), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("HTML Bundled Successful");
    });
  });
};

const start_watching_file = () => {
  for (var entry in entries) {
    console.log("Tracking Files !!");
    fs.watch(entries[entry], (eventType, filename) => {
      console.log(`File ${filename} has been ${eventType}`);
      if (eventType === "change") {
        // CALLING HTML BUNDLER EVERY TIME THE FILES SAVE
        html_bundler(
          entries[entry],
          path.join(output.path, path.basename(entries[entry]))
        );
      }
    });
  }
};

// START WATCHING FILE
start_watching_file();

module.export = { html_bundler };
