module.exports = {
    getCompanyById: (companies, id) => companies.find((company) => company.id === id),
  }
  