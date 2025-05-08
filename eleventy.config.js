module.exports = (eleventyConfig) => {
    // Add a filter to get company by ID
    eleventyConfig.addFilter("getCompanyById", (companies, companyId) =>
        companies.find((company) => company.id === companyId),
    )

    // Pass through static assets
    eleventyConfig.addPassthroughCopy("assets")
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("js")


    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site",
        },
    }
}
