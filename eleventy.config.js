// // eleventy.config.js
// const { DateTime } = require("luxon");

// module.exports = function (eleventyConfig) {
//     // Tell Eleventy to copy the 'assets' folder and its contents to the output folder
//     eleventyConfig.addPassthroughCopy("assets");
//     // Tell Eleventy to copy the 'css' folder to the output folder
//     eleventyConfig.addPassthroughCopy("css");
//     // Tell Eleventy to copy the 'js' folder to the output folder
//     eleventyConfig.addPassthroughCopy("js");

//     // This is a common way to add a custom filter for finding items by ID
//     // You might need to install a library like lodash or write a simple helper
//     eleventyConfig.addFilter("findById", function (array, id, key = "id") {
//         return array.find(item => item[key] === id);
//     });

//     // Add a date filter using Luxon
//     eleventyConfig.addFilter("date", (dateObj, format) => {
//         // Assuming dateObj is a string like "YYYY-MM-DD"
//         return DateTime.fromISO(dateObj).toFormat(format);
//     });

//     return {
//         // Define which files Eleventy should process as templates
//         // (Nunjucks, Liquid, Markdown, etc.)
//         templateFormats: ["njk", "md", "html"],

//         // Define the directory for Nunjucks/HTML/Markdown files
//         // (default is root: '.')
//         dir: {
//             input: ".", // Your source files (templates, data)
//             includes: "_includes", // For reusable template parts
//             data: "_data", // For global data files
//             output: "_site" // Where the generated site will go
//         }
//     };
// };


module.exports = (eleventyConfig) => {
    // Pass through static assets
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("js")
    eleventyConfig.addPassthroughCopy("assets")

    // Add date filter
    eleventyConfig.addFilter("date", (date, format) => {
        if (format === "YYYY") {
            return new Date().getFullYear()
        }
        return date
    })

    // Add data
    eleventyConfig.addGlobalData("siteData", () => require("./_data/siteData.json"))

    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            data: "_data",
        },
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    }
}
