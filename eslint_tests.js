function ifCurlyFormatting(context) {
    return {
        IfStatement: function (node) {
            var source = context.getSource(node.test, 0, 3);
            if (!source.match(/ {$/)) {
                context.report(node, "Found improperly formatted if-statement");
            }
        }
    };
};

function checkIfVarExists(context) {
    return {
        VariableDeclarator: function (node) {
            console.log(node);
            console.log(context.options[0]);

            var varName = node.id.name;
            if (!(varName == context.options[0])) {
                context.report(node, "Variable not named myVar");
            }
        }
    };
};

eslint.defineRule("if-curly-formatting", ifCurlyFormatting);
eslint.defineRule("check-if-var-exists", checkIfVarExists);
