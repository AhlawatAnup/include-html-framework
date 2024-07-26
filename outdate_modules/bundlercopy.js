const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const public_path_name = "./public_src/html/index.html";

fs.watchFile(public_path_name, (eventType, filename) => {

    // Read the HTML file
    try {
        const data = fs.readFileSync(public_path_name, "utf8");

        // Load the HTML into Cheerio
        const $ = cheerio.load(data);
        let newcontent;

        // FINDING INCLUDE COMPONENT
        $("include").each((index, element) => {
            const src = $(element).attr("src");
            // console.log(path.join(__dirname, path.dirname(public_path_name), src))          
            const component_path = path.join(
                __dirname,
                path.dirname(public_path_name),
                src
            );

            //READING COMPONENT FILE
            const content = fs.readFileSync(component_path, "utf8");

            //LOADING THE INDEX FILE TO CHEERIO
            const comp_content = cheerio.load(content);
            comp_content("include").each((index, element) => {
                console.log(index);
                const newsrc = comp_content(element).attr("src");
                const component_type = path.join(
                    __dirname,
                    path.dirname(public_path_name),
                    path.dirname(src),
                    newsrc
                );
                newcontent = fs.readFileSync(component_type, "utf8");
                comp_content(element).after(newcontent);
                comp_content(element).remove();
            });

            $(element).after(comp_content.root().html());
            $(element).remove();
        });
        
        trigger_save_file($.html());
    }

    catch (err) {
        console.error("Error reading file:", err);
    }

});

const trigger_save_file = (modifiedHtml) => {
    fs.writeFile("./public/index.html", modifiedHtml, "utf8", (err) => {
        if (err) {
            console.error("Error writing the new HTML file:", err);
            return;
        }
        console.log("Modified HTML file has been saved.");
    });

};
