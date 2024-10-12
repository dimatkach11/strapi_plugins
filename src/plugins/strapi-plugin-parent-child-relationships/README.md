# Strapi Plugin: Parent-Child Relationships

## ✨ Features

- **Custom Fields** (Introduces two new custom fields: Parent-Child Relation and Dynamic Relation Root)
- **Hierarchical Relationships** (Enables creation and management of parent-child structures between content types)
- **Contextual Filtering** (Automatically filters and displays relevant child content based on parent selection)
- **Flexible Configuration** (Supports various settings for fine-tuning relationship behaviors)
- **Advanced Filtering Options** (Includes additional filtering capabilities like `current table column filter`)
- **Common Relational Table Support** (Allows filtering based on shared relational fields across collections)
- **Custom Query Parameters** (Passes dynamic or static parameters to child relation services)
- **Dynamic Relational Field Display** (Uses Dynamic Relation Root to conditionally show/hide relational fields based on user selection)

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

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-custom-fields.png" alt="content-type-builder-custom-fields" /> <br/>

<br/>

## 📝 Overview

The **Parent-Child Relationships** plugin for Strapi allows you to create and manage hierarchical relationships between content types using custom fields. Enhance your content organization and establish clear hierarchical connections within your Strapi application. This functionality is ideal for structuring related data, such as a **Brand** -> **Model** -> **Version** hierarchy. It ensures contextual filtering and improves content organization and efficiency.

### Default Strapi Relationships

In Strapi by default, relationships between content types are managed using standard relation fields.
These allow you to link different content types but lack advanced features for managing hierarchical relationships such as parent-child structures

<br>

<img style="width: 100%; height: auto;" src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/default-relationships.gif" alt="default-strapi-relationships" /> <br/>

<br/>

### Parent-Child Relationships with the Plugin

The **Parent-Child Relationships** plugin introduces custom fields that extend default relationships, enabling you to filter and display data in a parent-child manner. For example, selecting a brand filters models associated with that brand, and selecting a model filters the available versions.

<br>

<img style="width: 100%; height: auto;" src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/parent-child-relationships.gif" alt="parent-child-relationships" /> <br/>

<br/>

## 🔧 Configuration - Setting Up a Parent-Child Relationship

In this section we will use the following custom field:

### Parent-Child Relation

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/parent-child-relation-custom-field.png" alt="parent-child-relation-custom-field" /> <br/>

Where you have the ability to configure some **BASIC** and **ADVANCED SETTINGS**.
For now, it's not necessary to understand the purpose of every field in the settings I'm about to list. I’ll explain how to configure them step-by-step using examples.

#### BASIC SETTINGS

- **`Name`**  
  _(This is the only default Strapi basic settings field)_

- **`Relation name`**

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/parent-child-relation-custom-field-basic-settings.png" alt="parent-child-relation-custom-field-basic-settings" /> <br/>

#### ADVANCED SETTINGS

- **`parent`**

- **`current table column`**

- **`child table column`**

- **`common relational table`**

- **`current table column filter`**

- **`db_name: param_name - one per row`**

- **`static_value: param_name - one per row`**

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/parent-child-relation-custom-field-advanced-settings.png" alt="parent-child-relation-custom-field-advanced-settings" /> <br/>

---

### Example: Car Collection

In this section, we'll demonstrate the configuration of a parent-child relationship using only the following options available in the **Parent-Child Relation** custom field settings:

#### BASIC OPTIONS:

- **Name**
- **Relation name**

#### ADVANCED OPTIONS:

- **parent**
- **current table column**
- **child table column**

In this example, we will configure a parent-child relationship using the **Parent-Child Relationships** plugin by creating a `Car` collection type. This collection will include the following relational fields:

- **brand** (Relationship with the `Brand` collection) - e.g., Audi, BMW
- **model** (Relationship with the `Model` collection) - e.g., A1, A3, X5, X6

When a specific brand is selected—let's say Audi—our objective is to dynamically filter and display only the associated models for that brand (e.g., A1, A3) while excluding unrelated models.

### Achieving Contextual Filtering Using the Parent-Child Schema

To accomplish this, we need to establish a parent-child hierarchy where selecting a brand automatically filters the available model options. This setup requires that the model results are dynamically filtered based on the identifier of the selected parent brand.

For our example, we will use the `code` field in the `Brand` collection and the `brand_code` field in the `Model` collection to create this relationship. By linking these two fields, we can ensure that when a brand is chosen, only its corresponding models are displayed.

### Collections Schema

#### Brand

| name | code |
| ---- | ---- |
| Audi | AUD  |
| BMW  | BMW  |

#### Model

| name | brand_code | model_code |
| ---- | ---------- | ---------- |
| A1   | AUD        | AUD_A1     |
| A3   | AUD        | AUD_A3     |
| X5   | BMW        | BMW_X5     |
| X6   | BMW        | BMW_X6     |

In this scheme, each brand has a `code` that can be used as a unique identifier to group the associated models. The `brand_code` field in the `Model` collection is used to filter the displayed models based on the selected brand.

For instance, models belonging to Audi have a `brand_code` of `"AUD"`, while models belonging to BMW use `"BMW"`.

### Leveraging the Parent-Child Relation Custom Field in Strapi

The **Parent-Child Relation** custom field is crucial for defining the hierarchical relationships between collections in Strapi. In our example, we will focus on the following fields:

- `code` in the **Brand** collection
- `brand_code` in the **Model** collection

While these fields do not share identical names, it is essential that their values match to establish the desired parent-child filtering effect.

For instance, when the Audi brand is selected, which has a `code` of `"AUD"`, the custom field will automatically filter and display only those models that have a corresponding `brand_code` of `"AUD"`.

### Step-by-Step Configuration in Strapi

#### Step 1: Create the Car Collection

Begin by creating the `Car` collection type in Strapi. Ensure that it includes the necessary relational fields (`brand` and `model`) that will require filtering.

<br>
<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-first-step.png" alt="Content Type Builder - Creating Car Collection" /> <br/>

#### Step 2: Add Parent-Child Relation Custom Fields

Next, add a **Parent-Child Relation** custom field for each of the relational fields involved in the filtering operation.

- **Brand Field**: Set the **Relation name** as `brand`

> **Note**: The **Name** chosen for this field is `c_brand`. This is just my convention to indicate that `c_brand` is a custom field related to the Brand collection. You can enter any name in this field; it has no restrictions. In contrast, the **Relation name** field must match the name of the related relational field to which it is linked. If you try to enter a relation name that does not exist in the collection (in our case, `Car`), this will not allow you to proceed when you click on the **finish** button, the window will remain open until a valid relation name is provided.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-first-step-c_brand.png" alt="Content Type Builder - Adding Custom Field for Brand" /> <br/>
<br>

- **Model Field**: Set the **Relation name** as `model`.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-first-step-c_model.png" alt="Content Type Builder - Adding Custom Field for Model" /> <br/>
<br>

#### Final Overview of Car Collection Type Fields

Here is a visual overview of the fields configured for the `Car` collection type:

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-first-step-overview.png" alt="Content Type Builder - Car Configuration Fields Overview" /> <br/>
<br>

### Advanced Configuration of Filtering Logic

- **Brand Field Configuration**: The `c_brand` field will be configured without a parent.

  - Inside the **current table column** settings option, insert `code` (the field related to the `code` in the brand collection).

  - Inside the **child table column** settings option, insert `brand_code` (the field related to the `brand_code` in the child relation model collection).

This configuration ensures that the models displayed have a matching `brand_code` corresponding to the selected brand's `code`.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-first-step-c_brand-advanced-settings.png" alt="Advanced Settings - Brand Field" /> <br/>
<br>

- **Model Field Configuration**: For the model field (`c_model`), specify that its parent is `c_brand`.

  - Inside the **parent** settings option, choose `c_brand` as the parent field. This ensures that the filtering logic will be based on the brand selected in the `c_brand` field.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-first-step-c_model-advanced-settings.png" alt="Advanced Settings - Model Field" /> <br/>

This configuration establishes a dependent relationship where the `c_model` field (child) is filtered according to the selected `c_brand` field (parent), effectively creating a parent-child relationship between the two.

You have now successfully set up a hierarchical relationship between `brand` and `model` in your `Car` collection type by specifying parent-child filtering rules.

### Customizing the Content Manager View

In the Content Manager, you will now see both the default Strapi fields and the custom fields whit the same name. This is expected behavior.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-manager-car-creation-first-step-overview.png" alt="Content Manager - Car Collection Fields Overview" /> <br/>

To resolve this and display only the custom fields, use the **Configure The View** feature to hide the default fields.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-manager-car-creation-configure-the-view.png" alt="Content Manager - Configure The View" /> <br/>

### Final Output

Now, you can start creating entries with the correctly filtered brand and model relationships.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/brand-model-relationships.gif" alt="Content Manager - Creating Brand and Model Relationships" /> <br/>

### ## Next Step: Extending Parent-Child Relationships to Versions

Now that we’ve learned how to create parent-child relationships between brands and models, we can extend this concept further by introducing **versions**.

### Objective: Filter Versions Based on Model Selection

The goal is to dynamically filter and display only the versions associated with a selected model. This setup requires establishing a parent-child relationship between the selected **model** and its corresponding **versions**.

### Collections Schema

#### Brand

| name | code |
| ---- | ---- |
| Audi | AUD  |
| BMW  | BMW  |

#### Model

| name | brand_code | model_code |
| ---- | ---------- | ---------- |
| A1   | AUD        | AUD_A1     |
| A3   | AUD        | AUD_A3     |
| X5   | BMW        | BMW_X5     |
| X6   | BMW        | BMW_X6     |

#### Version

| name               | version_code |
| ------------------ | ------------ |
| Sport line edition | AUD_A1       |
| Business edition   | AUD_A1       |
| S line             | AUD_A3       |
| xDrive sport       | BMW_X5       |
| xDrive city        | BMW_X5       |
| xDrive competition | BMW_X6       |
| xDrive sport       | BMW_X6       |
| xDrive 4X4         | BMW_X6       |

### How It Works

- Each **model** has a `model_code` that can be used as a unique identifier for grouping associated versions.
- The `version_code` field in the **Version** collection is used to filter the versions based on the selected model.

For example, versions belonging to the **A1** model will have a `version_code` of `"AUD_A1"`, and versions for the **X5** model will use `"BMW_X5"`.

### Setting Up Version Filtering in the Content Type Builder

Let's begin by adding a relational field for **version** in the `Car` collection type and creating the custom field for the newly added relational field.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-version-step-overview.png" alt="Content Type Builder - Adding Version Field" /> <br/>
<br/>

Next, we will configure the custom field for **version** and specify that its parent is the custom field **c_model**.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-c_version-advanced.png" alt="Content Type Builder - Configuring Version Field Parent" /> <br/>
<br/>

Finally, we need to configure the **c_model** field, defining the fields involved in filtering the versions based on the selected model.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-car-creation-c_version_parent-advanced.png" alt="Content Type Builder - Configuring Version Filter by Model" /> <br/>
<br/>

### Content Manager View with Version Filtering

In the Content Manager, you will now see three default relational fields provided by Strapi:

- **brand**
- **model**
- **version**

And three custom fields you have created:

- **c_brand**
- **c_model**
- **c_version**

In the video below, you can see the difference between using the original fields (the first three in a row, right below the name), which display all possible results without any filtering, and the custom fields displayed in separate rows.

Notice how the default fields show no filtering, while the custom fields provide contextual filtering based on your selections. You cannot select a model without first choosing a brand, and similarly, you cannot select a version without first selecting a model.

In **Configure The View**, you can hide the default fields and display only the custom fields to streamline the interface.

This entire process is demonstrated in the video.

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/brand-model-version-relationships.gif" alt="Content Manager - Managing Brand, Model, and Version Relationships" /> <br/>
<br/>

---

### Advanced Field Options: Explanation of Additional Fields

In this section, we'll explain some advanced options available in the Parent-Child Relationship settings, such as:

- **common relational table**
- **current table column filter**
- **db_name: param_name - one per row**
- **static_value: param_name - one per row**

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/content-type-builder-relation-advanced-other-fields.png" alt="Advanced Field Options in Parent-Child Relationship" /> <br/>
<br/>

---

### `current table column filter`

The `current table column filter` field allows you to add an extra layer of filtering to the results returned by a relation. Let’s look at an example.

Suppose we have an additional field called **segment** in our `Versions` collection:

#### Versions

| name               | version_code | segment |
| ------------------ | ------------ | ------- |
| Sport line edition | AUD_A1       | sport   |
| Business edition   | AUD_A1       | city    |
| S line             | AUD_A3       | sport   |
| xDrive sport       | BMW_X5       | sport   |
| xDrive city        | BMW_X5       | city    |
| xDrive competition | BMW_X6       | sport   |
| xDrive sport       | BMW_X6       | sport   |
| xDrive 4X4         | BMW_X6       | suv     |

With the `current table column filter`, you can apply a JSON filter to limit the results further.

For instance, if we only want to display sports versions of cars, we can apply the following filter:

```json
{ "segment": "sport" }
```

By adding this filter, only the sports versions will be displayed in the results.

For example, if we select the brand **BMW** and the model **X5**, without the filter we would see:

- xDrive sport
- xDrive city

With the filter applied, we will only see:

- xDrive sport

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/current-table-column-filter-version-segment.png" alt="Example of the current table column filter in action, showing only sports versions of the BMW X5 after filtering." />

It's possible to create more complex filters.

For example, let's say we want to introduce an additional condition, where we only want versions whose names contain **xdrive** (case-insensitive).

We can modify the previously applied filter like this:

```json
{ "segment": "sport", "name": { "$containsi": "xdrive" } }
```

<img src="https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/current-table-column-filter-version-segment-name.png" alt="" />

Now, the results will only return versions where the `segment` is equal to "sport" and the `name` contains the word "xdrive" (case-insensitive).

---

### `common relational table`

To understand how the **common relational table** filter works, let's walk through an example.

Suppose we've already created several entries in the `Car` collection. Now, we want to associate the `Car` collection as a relational field in another collection called `Lead` with the following relational fields:

- **car** (Relationship with the `Car` collection)
- **options** (Relationship with the `Option` collection)

### Collections Schema

Fields marked with \* are relational fields.

- **brand\***
- **model\***
- **version\***

#### Cars

| name               | brand\* | model\* | version\*          |
| ------------------ | ------- | ------- | ------------------ |
| BMW X5 SPORT       | BMW     | X5      | xDrive sport       |
| BMW X6 COMPETITION | BMW     | X6      | xDrive competition |

`Cars` have a relationship with **brand**, **model**, and **version**.

#### Options

| name             | version\*          |
| ---------------- | ------------------ |
| co-pilot pack    | S line             |
| color pure white | xDrive competition |
| full lead        | xDrive competition |

`Options` have a relationship with **version\***.

As you can see, both `Cars` and `Options` share a common relational field, **version\***.

### Filtering Options Based on a Common Relation

During the creation of a `Lead`, after selecting a specific car (for instance, **BMW X6 COMPETITION**), we want to filter the `Options` displayed based on the common relational field they share—**version**.

This means only the following options should be displayed:

- **color pure white**
- **full lead**

Both the **BMW X6 COMPETITION** and these two options share the same version, **xDrive competition**.

### How to Configure

We follow a similar approach as when we configured the parent-child relationship between **brand** and **model**. This time, the configuration is between **car** and **options**, specifying the common relational table they share.

Below are the configuration details with corresponding images:

- Overview of the `Lead` fields.

  ![Lead content type builder overview](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/lead-content-type-builder-overview.png)  
  <br/>

- Configuration of `c_car`.

  ![Car field configuration in Lead](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/lead-content-type-builder-overview-1.png)  
  <br/>

  ![Car field advanced settings](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/lead-content-type-builder-overview-2.png)  
  <br/>

- Configuration of `c_options`.

  ![Options field configuration in Lead](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/lead-content-type-builder-overview-3.png)  
  <br/>

  ![Options field advanced settings](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/lead-content-type-builder-overview-4.png)  
  <br/>

### Lead - Content Manager View

![Lead Content Manager overview](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/lead-content-manager-view.gif)  
<br/>

---

### `db_name: param_name - one per row` OR **DYNAMIC FILTER PARAMS**

Let’s take a closer look at the `Car` collection and its relational field `model`, which includes the following fields and values:

#### Models

| name | brand_code | model_code |
| ---- | ---------- | ---------- |
| A1   | AUD        | AUD_A1     |
| A3   | AUD        | AUD_A3     |
| X5   | BMW        | BMW_X5     |
| X6   | BMW        | BMW_X6     |

In the advanced settings of `c_model`, you can define `db_name: param_name - one per row` like this:

- **model_code: different_model_code_name**

This configuration enables passing a dynamic `filters` object to the child collection’s service, formatted as:

```bash
filters: { different_model_code_name: { '$eq': [selected_model_code_value] } }
```

When the model X6 is selected, and we click on the **versions** select, the following **dynamic filter** will be populated and sent to the version service:

```bash
filters: { different_model_code_name: { '$eq': 'BMW_X6' } }
```

![Lead Content Manager overview](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/car-db-params-model-to-version.png)  
<br/>

---

### `static_value: param_name - one per row` OR **STATIC FILTER PARAMS**

In the advanced settings of `c_model`, if we define `static_value: param_name - one per row`, for example:

- **static_value: generic_param_name**

This configuration allows you to set static filter parameters that are sent directly to the child collection’s service. When we click on the versions select, the following **static filter** is populated and sent to the version service:

```bash
filters: { generic_param_name: { '$eq': 'static_value' } }
```

This is useful when you need to apply a fixed value to your query, independent of dynamic user selection.

![Lead Content Manager overview](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/car-db-static-params-model-to-version.png)  
<br/>

---

## 🔧 Configuration - Setting Up a **Dynamic Relation Root**

![Dynamic Relation Root Custom Field](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/dynamic-relation-root.png)  
<br/>

Where you have the ability to configure only some **BASIC SETTINGS**

#### BASIC SETTINGS

- **`Name`**  
  _(This is the only default Strapi basic settings field)_

- **`Relations: one per row`**

![Dynamic Relation Root Content Type Builder Basic Settings](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/dinamic-root-basic-settings.png)  
<br/>

The **Dynamic Relation Root** custom field is a conditional custom field that allows defining a set of relational fields that can dynamically change based on a simple select input.

To understand it better, let's look at this example where we build the `Course Page` collection with the following relevant fields:

- **free_course** (Relation with `Free_course`)
- **paid_course** (Relation with `Paid_course`)

Our goal is to hide both fields in the Content Manager and provide the ability to choose from a dropdown which field to display/use.

### Step-by-Step Configuration

The configuration is quite simple this time. You need to define in an enumeration field which relations can be selected from a dropdown.

![Dynamic Relation Root Content Type Builder Configuration](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/dynamic-relation-root-content-type-builder.png)  
<br/>

As shown in the image, we have named the custom field **c_course_type**.

Now, we need to add the custom field we’ve discussed before, **Parent-Child Relation**, and in the basic settings, for the `relation name`, we enter `c_course_type`.

![Dynamic Relation Root Content Type Builder Configuration](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/dynamic-relation-root-c_course.png)  
<br/>

In the **advanced settings**, specify that the `parent` is always `c_course_type`.

![Parent-Child Relation with Dynamic Relation Root - Content Type Builder Configuration](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/dynamic-relation-root-c_options.png)  
<br/>

That’s it! The configuration is now complete. In the Content Manager, you will have a dropdown that dynamically changes the **Parent-Child Relation** custom field we named `c_course`.

From this point forward, you can proceed with the same logic used for the **Parent-Child Relation** field.

In this example, the filtering logic is based on a shared `course` relational table between the selected course type (either `free_course` or `paid_course`) and the `course_options` that must share the same relational table as the selected course.

Even though I didn’t explicitly mention it earlier, all the collections **free_course**, **paid_course**, and **course_options** have a relation to the `Course` collection.

![Dynamic Relation Root Content Type Builder Configuration](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/dynamic-relation-root-c_course-advanced-settings.png)  
<br/>

Below is the schema with some values that these collections have in the database:

### Collections Schema

#### Free_course

| name                      | course\*                  | other_fields |
| ------------------------- | ------------------------- | ------------ |
| Building Website with PHP | Building Website with PHP | ...          |
| Mastering Node.js         | Mastering Node.js         | ...          |
| PHP and MySQL             | PHP and MySQL             | ...          |

#### Paid_course

| name                            | course\*                        | other_fields |
| ------------------------------- | ------------------------------- | ------------ |
| Advanced Python Data Structures | Advanced Python Data Structures | ...          |
| PHP Automation Scripts          | PHP Automation Scripts          | ...          |
| Python for Automation           | Python for Automation           | ...          |

- course\* indicates that this is a relational field within the schema (Relation with `Course`).
- Note that the names within the records match the associated course names. This is just a coincidence.

#### Course Option

| name                                    | course\*                        | other_fields |
| --------------------------------------- | ------------------------------- | ------------ |
| Opt - 1 Advanced Python Data Structures | Advanced Python Data Structures | ...          |
| Opt - 2 Advanced Python Data Structures | Advanced Python Data Structures | ...          |
| Opt - 3 Advanced Python Data Structures | Advanced Python Data Structures | ...          |
| ...                                     | ...                             | ...          |
| Opt - 1 Building Website with PHP       | Building Website with PHP       | ...          |
| Opt - 2 Building Website with PHP       | Building Website with PHP       | ...          |
| Opt - 3 Building Website with PHP       | Building Website with PHP       | ...          |
| ...                                     | ...                             | ...          |

Here’s the video of how this looks in the Content Manager:

![Course Page - Content Manager Video](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships/raw/main/static/course-page-content-manager.gif)  
<br/>

## 🤝 Contributing

Feel free to fork and make a pull request of this plugin. All the input is welcome!

## ⭐️ Show your support

Give a star if this project helped you.

## 🔗 Links

- [NPM package](https://www.npmjs.com/package/strapi-plugin-parent-child-relationships)
- [GitHub repository](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships)

### GitHub Repository with Examples

You can clone the repository and explore all the examples described in this guide, as well as additional configurations and use cases.

- [GitHub Repository with Examples](https://github.com/dimatkach11/strapi_plugins/tree/strapi-plugin-parent-child-relationships-examples)

## 🌎 Community support

- You can contact me on the Strapi Discord [channel](https://discord.strapi.io/).

## 📝 License

- [MIT License](LICENSE.md)
