const {
  forceComponentPropsDeclaration,
} = require("./forceComponentPropsDeclaration");
module.exports = {
  rules: {
    "force-component-props-declaration": {
      create: forceComponentPropsDeclaration,
      meta: {
        type: "suggestion",
        docs: {
          description: "enforce the declaration of component props",
        },
        schema: ["ignoreGlobs"],
      },
    },
  },
};
