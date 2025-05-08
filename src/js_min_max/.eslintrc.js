const { rules } = require("./lib");

module.exports = {
    env: {
        node: true,
    },
    parseOptions:{
        ecmaVersion: 2018,
        sourceType: "module",
    },
    extends: ["plugin:github/recommended"],
    plugins: [rules["disallow-deep-ternary"]],
    rules: {
        "disallow-deep-ternary": "warning"
      },
}