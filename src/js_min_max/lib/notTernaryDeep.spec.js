
const { RuleTester } = require("eslint");
const { rules } = require("./index");

const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 2015 } });

ruleTester.run("disallow-deep-ternary", rules["disallow-deep-ternary"], {
    valid: [
        {
            code: 'const res = a&b?x:y;',
        },
    ],
    invalid: [
        {
            code: "const res =  condition1 ? (condition2 ? (condition3 ? 'foo' : 'bar') : 'baz') : 'qux';",
            errors: 3,
        },
        {
            code: "const res =  condition1 ? a : condition2 ? b : c;",
            errors: 1,
        },
    ],
});
