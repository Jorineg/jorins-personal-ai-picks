module.exports = function (eleventyConfig) {
    // Pass through copy for assets
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("assets");

    // Add filter to get company by ID
    eleventyConfig.addFilter("getCompanyById", function (companies, companyId) {
        return companies.find(company => company.id === companyId);
    });

    // Add a shortcode for formatting dates
    eleventyConfig.addShortcode("formatDate", (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    })

    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes"
        }
    };
};