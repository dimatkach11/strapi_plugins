module.exports = {
  brands: [
    {
      name: "Audi",
      code: "AUD",
    },
    {
      name: "BMW",
      code: "BMW",
    },
  ],
  models: [
    // Audi models
    {
      name: "A1",
      brand_code: "AUD",
      model_code: "AUD_A1",
    },
    {
      name: "A3",
      brand_code: "AUD",
      model_code: "AUD_A3",
    },
    // BMW models
    {
      name: "X5",
      brand_code: "BMW",
      model_code: "BMW_X5",
    },
    {
      name: "X6",
      brand_code: "BMW",
      model_code: "BMW_X6",
    },
  ],
  versions: [
    // Audi versions
    // Audi versions - model AUD_A1
    {
      name: "Sport line edition",
      version_code: "AUD_A1",
      segment: "sport",
    },
    {
      name: "Business edition",
      version_code: "AUD_A1",
      segment: "city",
    },
    // Audi versions - model AUD_A3
    {
      name: "S line",
      version_code: "AUD_A3",
      segment: "sport",
    },
    // BMW versions
    // BMW versions - model BMW_X5
    {
      name: "xDrive sport",
      version_code: "BMW_X5",
      segment: "sport",
    },
    {
      name: "xDrive city",
      version_code: "BMW_X5",
      segment: "city",
    },
    // BMW versions - model BMW_X6
    {
      name: "xDrive competition",
      version_code: "BMW_X6",
      segment: "sport",
    },
    {
      name: "xDrive sport",
      version_code: "BMW_X6",
      segment: "sport"
    },
    {
      name: "xDrive 4X4",
      version_code: "BMW_X6",
      segment: "suv"
    },
  ],
};
