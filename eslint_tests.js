
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
                                "age"  : 12,
                                "debt" : 9001,
                                "description" : null
                            }, 
                            exclusive: true] // Must only be these variables 
*/
function validateVariables(context) {
    return {
        VariableDeclarator: function (node) {

            console.log(node);
            

            // Retreive the variable paramaters
            var variables = context.options[0]["variables"];
            var exclusive = context.options[1];
            
            var varName = node.id.name;
            var varVal  = node.init.value;

            console.log(exclusive);
            console.log(varName);

            // Validate variable existance
            if (varName in variables){
                
                assertOk(true, "", "Found variable " + varName);
            
                // Validate variable value
                if (varVal == variables[varName])
                {
                    assertOk(true, "", "Variable " + varName + " value set correctly to " + varVal);
                }else{
                    assertOk(true, "", "Variable " + varName + " value is set incorrectly");
                }
            }else{
                if (exclusive){
                    assertOk(true, "", "Variable " + varName + " not expected");
                }
            }
        }
    };
};

eslint.defineRule("if-curly-formatting", ifCurlyFormatting);
eslint.defineRule("check-if-var-exists", checkIfVarExists);
eslint.defineRule("validate-variables",  validateVariables);
