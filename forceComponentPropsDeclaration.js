const forceComponentPropsDeclaration = (context) => {
  return {
    ClassDeclaration: (node) => {
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
        const siblings = node.parent.body;
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
