# ⚠️ Important: Plugin Moved and Updated ⚠️

The `custom-fields` plugin from this repository has been **moved** and **updated** to a new repository. If you are using this plugin and wish to upgrade while retaining your existing configurations, a migration process is required.

## New Repository

The plugin is now maintained at [strapi-plugin-parent-child-relationships](https://github.com/dimatkach11/strapi-plugin-parent-child-relationships), where it is also fully documented.

- [NPM Package](https://www.npmjs.com/package/strapi-plugin-parent-child-relationships)

## Migration Guide

**Note**: We recommend migrating as soon as possible to benefit from new features and fixes.

Thank you for your support and understanding. Follow the steps below to ensure a smooth migration.

### Step 1: Remove Old Plugin Configuration

In your `./config/plugins.js`, remove the current configuration for `custom-fields`, remove the following:

```js
"custom-fields": {
  enabled: true,
  resolve: "./src/plugins/custom-fields",
},
```

### Step 2: Update Custom Fields Configuration

In the `./src` folder of your Strapi project, replace the old configuration for the custom fields as outlined below:

#### Replacing Configuration of Custom Relation Field

- **Old**:

```json
"customField": "plugin::custom-fields.custom-relation"
```

- **Replace with:**

```json
"customField": "plugin::parent-child-relationships.relation"
```

#### Replacing Configuration of Custom Enumeration Field

- **Old**:

```json
"customField": "plugin::custom-fields.custom-enumeration"
```

- **Replace with:**

```json
"customField": "plugin::parent-child-relationships.dynamic-root"
```

#### Final Step: Install the New Plugin

Run the following command in your Strapi project directory:

With `npm`:

```bash
npm install strapi-plugin-parent-child-relationships
```

With `yarn`:

```bash
yarn add strapi-plugin-parent-child-relationships
```

After installation, start your application in **development** with:

```bash
npm run develop
# or
yarn develop
```

Once everything is working as expected, you can safely remove the old `custom-fields` plugin folder located at `./src/plugins/custom-fields`.

---

## Plugin Overview

### Normal Behavior

![](https://github.com/dimatkach11/strapi_plugins/blob/master/befor-plugin.gif)

### The Behavior With The Custom Field

![](https://github.com/dimatkach11/strapi_plugins/blob/master/after-plugin.gif)
