//@ts-check
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
    async catalogEnclosure(sede_id = null) {
        return await CatalogModel.catalogEnclosure(sede_id);
    }
    async couponCatalog() {
        return await CatalogModel.catalogCoupons();
    }
    async getUniversitiesWithAllInfo() {
        return await CatalogModel.universitiesWithAllInformation();
    }
}
module.exports = new CatalogService();