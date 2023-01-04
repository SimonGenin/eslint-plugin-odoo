# eslint-plugin-owl
Owl specific rules for Odoo development

## Installation
Add the plugin to your list in your eslint config file.
```js
plugins: ["eslint-plugin-owl"]
```
Use the following available rules in your `rules` object.
The rules are namespaced by `owl`.
Exemple:
```js
// ...
plugins: ["eslint-plugin-owl"],
rules: {
    "owl/force-component-props-declaration": 2, // 1 for warning, 2 for error
},
// ...
```

## Rules

#### `force-component-props-declaration`
Enforce the need to declare a props property to any class extending directly from `Component`.