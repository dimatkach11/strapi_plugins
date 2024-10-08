const carDummyData = require("./car");
const coursesDummyData = require("./courses");
const toursDummyData = require("./tour");
const statesDummyData = require("./states");

module.exports = async () => {
  // generate car data
  const { brands, models, versions } = carDummyData;

  const dbBrands = await strapi.entityService.count("api::brand.brand");
  const dbModels = await strapi.entityService.count("api::model.model");
  const dbVersions = await strapi.entityService.count("api::version.version");

  if (!dbBrands || !dbModels || !dbVersions) {
    strapi.log.info("start Generating Dummy car Data");

    if (!dbBrands) {
      // brands creation
      strapi.log.info("start Brands creation");
      const brandsPromises = brands.map((brand) =>
        strapi.entityService.create("api::brand.brand", { data: brand })
      );

      await Promise.all(brandsPromises);
      strapi.log.info("Brands created");
    }

    if (!dbModels) {
      strapi.log.info("start Models creation");
      // models creation
      const modelsPromises = models.map((model) =>
        strapi.entityService.create("api::model.model", { data: model })
      );

      await Promise.all(modelsPromises);
      strapi.log.info("Models created");
    }

    if (!dbVersions) {
      strapi.log.info("start Versions creation");
      // versions creation
      const versionsPromises = versions.map((version) =>
        strapi.entityService.create("api::version.version", { data: version })
      );

      await Promise.all(versionsPromises);
      strapi.log.info("Versions created");
    }

    if (!dbBrands && !dbModels && !dbVersions) {
      strapi.log.info("end Generating Dummy car Data");
    } else {
      strapi.log.info("end Updating car Data");
    }
  }

  // generate courses data
  const { authors, courses, languages } = coursesDummyData;

  const dbAuthors = await strapi.entityService.count("api::author.author");
  const dbCourses = await strapi.entityService.count("api::course.course");
  const dbLanguages = await strapi.entityService.count(
    "api::language.language"
  );

  if (!dbAuthors && !dbCourses && !dbLanguages) {
    strapi.log.info("start Generating Dummy courses Data");
    // authors creation
    const authorsPromises = authors.map((author) =>
      strapi.entityService.create("api::author.author", { data: author })
    );

    await Promise.all(authorsPromises);
    strapi.log.info("Authors created");

    // courses creation
    const coursesPromises = courses.map((course) =>
      strapi.entityService.create("api::course.course", { data: course })
    );

    await Promise.all(coursesPromises);
    strapi.log.info("Courses created");

    // languages creation
    const languagesPromises = languages.map((language) =>
      strapi.entityService.create("api::language.language", { data: language })
    );

    await Promise.all(languagesPromises);
    strapi.log.info("Languages created");

    strapi.log.info("end Generating Dummy courses Data");
  }

  // generate course options
  const dbCourseOptions = await strapi.entityService.count(
    "api::course-option.course-option"
  );

  if (!dbCourseOptions) {
    strapi.log.info("start Generating Dummy course options Data");

    const dbCourses = await strapi.entityService.findMany("api::course.course");

    const randomIntFromInterval = (min = 4, max = 9) => {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    dbCourses.forEach(async (course, idx) => {
      const courseOptionPromises = [];

      for (let index = 0; index < randomIntFromInterval(); index++) {
        // generate course option data to associate with the course
        const data = {
          name: "Opt - " + (index + 1) + " " + course.name,
          description: course.name,
          course: course.id,
        };

        // create course option promise
        courseOptionPromises.push(
          strapi.entityService.create("api::course-option.course-option", {
            data,
          })
        );
      }

      await Promise.all(courseOptionPromises);

      strapi.log.info(
        `Course Options are created for the course ${course.name}`
      );

      if (idx === dbCourses.length - 1) {
        strapi.log.info("end Generating Dummy course options Data");
      }
    });
  }

  // generate tours data
  const { places } = toursDummyData;
  const { nations, cities } = statesDummyData;
  const dbNations = await strapi.entityService.count("api::nation.nation");
  const dbPlaces = await strapi.entityService.count("api::place.place");
  const dbCities = await strapi.entityService.count("api::city.city");

  if (!dbNations || !dbPlaces || !dbCities) {
    strapi.log.info("start Generating Dummy tours Data");

    if (!dbNations) {
      strapi.log.info("start Nations creation");
      // nations creation
      const nationsPromises = nations.map((nation) =>
        strapi.entityService.create("api::nation.nation", { data: nation })
      );

      await Promise.all(nationsPromises);
      strapi.log.info("Nations created");
    }

    if (!dbPlaces) {
      strapi.log.info("start Places creation");
      // places creation
      const placesPromises = places.map((place) =>
        strapi.entityService.create("api::place.place", { data: place })
      );

      await Promise.all(placesPromises);
      strapi.log.info("Places created");
    }

    if (!dbCities) {
      strapi.log.info("start Cities creation");
      // cities creation
      const citiesPromises = cities.map((city) =>
        strapi.entityService.create("api::city.city", { data: city })
      );

      await Promise.all(citiesPromises);
      strapi.log.info("Cities created");
    }

    strapi.log.info("end Generating Dummy tours Data");
  }
};
