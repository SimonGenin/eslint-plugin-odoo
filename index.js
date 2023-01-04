const { forceComponentPropsDeclaration } = require("./forceComponentPropsDeclaration");
module.exports = {
  rules: {
    "force-component-props-declaration": {
      create: forceComponentPropsDeclaration,
    },
  },
};
