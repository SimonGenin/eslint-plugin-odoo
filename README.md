# eslint-plugin-owl
Owl specific rules for Odoo development

## Installation
```bash
npm install @odoo/eslint-plugin-owl
```
Add the plugin to your list in your eslint config file.
```js
plugins: ["@odoo/owl"]
```
Use the following available rules in your `rules` object.
The rules are namespaced by `@odoo/owl`.
Exemple:
```js
// ...
plugins: ["@odoo/owl"],
rules: {
    "@odoo/owl/force-component-props-declaration": 2, // 1 for warning, 2 for error
},
// ...
```

## Rules

#### `force-component-props-declaration`
Enforce the need to declare a props property to any class extending directly from `Component`.
##### Options: 
`ignoreGlobs` Allow to define path globs to be ignored by the rule
```js
"@odoo/owl/force-component-props-declaration": [2, { ignoreGlobs: "**/tests/**" }]
```
