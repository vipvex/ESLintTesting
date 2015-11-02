
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

var expectedVariables = {};
var declaredVariables = {};

function validateVariables(context) {
    return {
        VariableDeclarator: function (node) {
            
            // Retreive the variable paramaters
            expectedVariables = context.options[0]["variables"];
            var exclusive = context.options[0]["exclusive"];
            
            var varName = node.id.name;
            var varVal  = node.init.value;

            // Validate variable existance
            if (varName in expectedVariables){
                
                assertOk(true, "Found variable " + varName, "");
                declaredVariables[varName] = undefined;
            
                // Validate variable value
                if (varVal == expectedVariables[varName]){
                    assertOk(true, "Variable " + varName + " value set correctly to " + varVal, "");
                    declaredVariables[varName] = varVal;
                }else{
                    assertOk(false, "", "Variable " + varName + " value is set incorrectly");
                }
            }else{
                if (exclusive){
                    assertOk(false, "", "Variable " + varName + " is not an expected variable");
                }
            }
        }
    };
};

function onESlintCompleted(){
    validatedExpectedVariablesDeclared();
}

// Finally check what variables were not defined
function validatedExpectedVariablesDeclared(){
    console.log(expectedVariables);
    console.log(declaredVariables);
    for (var key in expectedVariables){
        if (!declaredVariables[key]){
            assertOk(false, "", "Expected " + key + " to be defined.");
        }
    }
}

eslint.defineRule("if-curly-formatting", ifCurlyFormatting);
eslint.defineRule("check-if-var-exists", checkIfVarExists);
eslint.defineRule("validate-variables",  validateVariables);
