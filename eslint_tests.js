
// Example
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


// Config example: "check-if-var-exists": [2, "myVar"]
function checkIfVarExists(context) {
    return {
        VariableDeclarator: function (node) {
            var varName = node.id.name;
            if (!(varName == context.options[0])) {
                context.report(node, "Variable not named myVar");
            }
        }
    };
};

/* 
    Config example: 
    
    "validate-variables" : [2, 
                            "variables" : {
                                "name" : "Jon Smith",
                                "age"  : 12
                                "debt" : 9001
                                "description" : null
                            }, 
                            exclusive: true] // Must only be these variables 
*/
function validateVariables(context) {
    return {
        VariableDeclarator: function (node) {
            
            // check if exliusive
            
                // if exluisive check if var name matchest one of the variables
                // check if var has value
                // check if vars value matches with what is expected
            
            var varName = node.id.name;
            if (!(varName == context.options[0])) {
                context.report(node, "Variable not named myVar");
            }
        }
    };
};

eslint.defineRule("if-curly-formatting", ifCurlyFormatting);
eslint.defineRule("check-if-var-exists", checkIfVarExists);
