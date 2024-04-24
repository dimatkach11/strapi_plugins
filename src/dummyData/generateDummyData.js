const carDummyData = require("./car");

module.exports = async () => {
  const { brands, models, versions } = carDummyData;

  const dbBrands = await strapi.entityService.count("api::brand.brand");
  const dbModels = await strapi.entityService.count("api::model.model");
  const dbVersions = await strapi.entityService.count("api::version.version");

  if (!dbBrands && !dbModels && !dbVersions) {
    strapi.log.info("start Generating Dummy Data");

    // brands creation
    const brandsPromises = brands.map((brand) =>
      strapi.entityService.create("api::brand.brand", { data: brand })
    );

    await Promise.all(brandsPromises);
    strapi.log.info("Brands created");

    // models creation
    const modelsPromises = models.map((model) =>
      strapi.entityService.create("api::model.model", { data: model })
    );

    await Promise.all(modelsPromises);
    strapi.log.info("Models created");

    // versions creation
    const versionsPromises = versions.map((version) =>
      strapi.entityService.create("api::version.version", { data: version })
    );

    await Promise.all(versionsPromises);
    strapi.log.info("Versions created");

    strapi.log.info("end Generating Dummy Data");
  }
};
