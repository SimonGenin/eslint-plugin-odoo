const minimatch = require('minimatch');

const forceComponentPropsDeclaration = (context) => {
  return {
    ClassDeclaration: (node) => {

        // If there are globs to ignore, we do it first
        if (context.options && context.options[0] && context.options[0].ignoreGlobs) {
          const globs = context.options[0].ignoreGlobs;
          const filepath = context.getFilename().replace(context.getCwd(), "");
          for (const glob of globs) {
            console.log(filepath, glob, minimatch(filepath, glob))
            if (minimatch(filepath, glob)) return;
          } 
        }

        // Are we a direct child of the Component class ?
        if (!node.superClass) return;
        if (node.superClass.name !== "Component") return;

        // We check for the inner class static props property
        const classContent = node.body.body;
        for (const classElement of classContent) {
            if (classElement.type !== "PropertyDefinition") continue;
            if (!classElement.static) continue;
            if (classElement.key.name === "props") return;
        }

        // We check for the outer class static expression
        let parent = node.parent; // can't be insufficient, in case of export keyword by example
        while (!parent.body) { 
          parent = parent.parent;
        }
        const siblings = parent.body;
        for (const sibling of siblings) {
            if (sibling.type !== "ExpressionStatement") continue;
            if (sibling.expression.type !== "AssignmentExpression") continue;
            if (sibling.expression.left.type !== "MemberExpression") continue;
            if (sibling.expression.left.object.name !== node.id.name) continue;
            if (sibling.expression.left.property.name === "props") return;
        }

        context.report(node, `The Component class '${node.id.name}' doesn't declare explicitly its props.`);
    }
  };
};
module.exports = { forceComponentPropsDeclaration };
