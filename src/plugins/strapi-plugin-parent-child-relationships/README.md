# Strapi Plugin Parent-Child Relationships

## 📝 Description

The **Parent-Child Relationships** plugin for Strapi allows you to create and manage hierarchical relationships between content types using custom fields. Enhance your content organization and establish clear hierarchical connections within your Strapi application.

### Default Strapi Relationships Behavior

In Strapi by default, relationships between content types are managed using standard relation fields.
These allow you to link different content types but lack advanced features for managing hierarchical relationships such as parent-child structures

<br>

<img style="width: 100%; height: auto;" src="./static/default-relationships.gif" alt="default-strapi-relationships" /> <br/>

<br/>

### Parent-Child Relationships Behavior

The **Parent-Child Relationships** plugin extends the default relationship capabilities in Strapi by providing a way to establish and manage hierarchical relationships between content types.

For instance, in this example, when a brand is selected, only the models associated with that brand are displayed. Furthermore, once a model is chosen, only the versions related to that specific model can be selected, ensuring a clear and logical hierarchy throughout the content management process.

<br>

<img style="width: 100%; height: auto;" src="./static/parent-child-relationships.gif" alt="parent-child-relationships" /> <br/>

<br/>

## ⏳ Installation

To install the plugin, run the following command in your Strapi project directory:

With `npm`:

```bash
npm install strapi-plugin-parent-child-relationships
```

With `yarn`:

```bash
yarn add strapi-plugin-parent-child-relationships
```

## 🖐 Usage

After installation you will find two custom fields at the custom fields section of the content-type builder with the following names:

- **Parent-Child Relation**
- **Dynamic Relation Root**

<br>

<img src="./static/content-type-builder-custom-fields.png" alt="content-type-builder-custom-fields" /> <br/>

<br/>

## 🔧 Configuration - Setting Up a Parent-Child Relationship in Strapi

To configure a parent-child relationship using the **Parent-Child Relationships** plugin, let's walk through an example where we create a `Car` collection type with the following relational fields:

- **brand** (Relationship with the `Brand` collection) - e.g., Audi, BMW
- **model** (Relationship with the `Model` collection) - e.g., A1, A3, X5, X6

### Scenario Overview

When a specific brand is selected—let's say Audi—our objective is to dynamically filter and display only the associated models for that brand (e.g., A1, A3) while excluding unrelated models. This setup ensures a highly contextualized and organized relationship between content types in Strapi, improving content management efficiency.

### Achieving Contextual Filtering Using the Parent-Child Schema

To accomplish this, we need to establish a parent-child hierarchy where selecting a brand will automatically filter the available model options. This requires a setup where the model results are dynamically filtered based on the parent brand's unique identifier. For our example, we utilize the `code` field in the `Brand` collection and `brand_code` in the `Model` collection to create the relationship.

### Collections Schema

#### Brands

| name | code |
| ---- | ---- |
| Audi | AUD  |
| BMW  | BMW  |

#### Models

| name | brand_code | model_code |
| ---- | ---------- | ---------- |
| A1   | AUD        | AUD_A1     |
| A3   | AUD        | AUD_A3     |
| X5   | BMW        | BMW_X5     |
| X6   | BMW        | BMW_X6     |

As you can see, each brand has a `code` that serves as the identifier for grouping associated models. The `brand_code` in the `Model` collection is used to filter which models are shown based on the selected brand. In this setup, models belonging to Audi have a `brand_code` of `"AUD"`, and models belonging to BMW use `"BMW"`.

### Leveraging the Parent-Child Relation Custom Field in Strapi

The **Parent-Child Relation** custom field is instrumental in configuring which fields will establish the hierarchical relationship. In our scenario, the fields involved are:

- `code` in the `Brand` collection
- `brand_code` in the `Model` collection

While these fields do not share the exact same name, the values must match to create the desired parent-child filtering effect.

In our example, selecting the Audi brand with `code: "AUD"` will cause the custom field to filter and display only models that also have a `brand_code` of `"AUD"`.

### Step-by-Step Configuration in Strapi

#### Step 1: Create the Car Collection

Create the `Car` collection type in Strapi, including the necessary relational fields (`brand` and `model`) that will require filtering.

<br>
<img src="./static/content-type-builder-car-creation-first-step.png" alt="Content Type Builder - Creating Car Collection" /> <br/>

#### Step 2: Add Parent-Child Relation Custom Fields

Next, add a **Parent-Child Relation** custom field for each of the relational fields involved in the filtering operation.

- **Brand Field**: Set the **Relation name** as `brand`.

<img src="./static/content-type-builder-car-creation-first-step-c_brand.png" alt="Content Type Builder - Adding Custom Field for Brand" /> <br/>
<br>

- **Model Field**: Set the **Relation name** as `model`.

<img src="./static/content-type-builder-car-creation-first-step-c_model.png" alt="Content Type Builder - Adding Custom Field for Model" /> <br/>
<br>

#### Final Overview of Car Collection Type Fields

Here is a visual overview of the fields configured for the `Car` collection type:

<img src="./static/content-type-builder-car-creation-first-step-overview.png" alt="Content Type Builder - Car Configuration Fields Overview" /> <br/>
<br>

### Advanced Configuration of Filtering Logic

- **Brand Field Configuration**: The `c_brand` field will be configured without a parent. The filtering configuration ensures that the models displayed have a matching `brand_code` to the selected brand's `code`.

<img src="./static/content-type-builder-car-creation-first-step-c_brand-advanced-settings.png" alt="Advanced Settings - Brand Field" /> <br/>
<br>

- **Model Field Configuration**: For the model field (`c_model`), specify that its parent is `c_brand`.

<img src="./static/content-type-builder-car-creation-first-step-c_model-advanced-settings.png" alt="Advanced Settings - Model Field" /> <br/>

This configuration establishes that the `c_model` field depends on the `c_brand` field for filtering, effectively creating a parent-child relationship.

### Conclusion

You have now successfully set up a hierarchical relationship between `brand` and `model` in your `Car` collection type by specifying parent-child filtering rules.
