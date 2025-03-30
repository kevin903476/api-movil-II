const CatalogModel = require('../models/catalogosModel');

class CatalogService {
    async universityCatalog() {
        return await CatalogModel.catalogUniversity();
    }
    async courseCatalog() {
        return await CatalogModel.catalogCourse();
    }
    async careerCatalog() {
        return await CatalogModel.catalogCareer();
    }
    async headquartersCatalog() {
        return await CatalogModel.catalogHeadquarters();
    }
    async rolesCatalog() {
        return await CatalogModel.catalogRoles();
    }
}
module.exports = new CatalogService();