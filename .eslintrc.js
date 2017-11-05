module.exports = {
  "extends": "loopback",
  "env": {
    "node": true,
    "mocha": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6
  },
   "rules": {
      /*** Loopback Overrides ***/
      "brace-style": [
         "error",
         "stroustrup",
         {
            "allowSingleLine": true
         }
      ],
      "camelcase": [
         "warn",
         {
            "properties": "never"
         }
      ],
      "indent": [
         "error",
         2,
         {
            "SwitchCase": 2
         }
      ],
      "max-len": [
         "warn", // TODO: fix and change to "error"
         120,
         4,
         {
            "ignoreComments": false,
            "ignoreUrls": true,
            "ignorePattern": "^\\s*((let)|(const))\\s.+=\\s*require\\s*\\("
         }
      ],
      "no-multiple-empty-lines": [
         2,
         {
            "max": 2
         }
      ],
      "one-var": 1, // TODO: fix and change to "error"

      /*** MCCP Specific ***/
      "space-before-function-paren": [
         "error",
         "always"
      ],
      "no-var": 2,
  //    "prefer-arrow-callback": 2,
      "prefer-spread": 2,
      "object-shorthand": [
         "error",
         "consistent-as-needed"
      ],
      "no-mixed-spaces-and-tabs": 2,
      "keyword-spacing": ["error", { "before": true }],
      "no-nested-ternary": 2,
      "no-new-object": 2,
      "curly": [
         "error",
         "all"
      ],
      "arrow-parens": [
         "error",
         "always"
      ],
      "block-scoped-var": 2,
      "eqeqeq": [
         "error",
         "always"
      ],
      "no-use-before-define": ["warn", {"functions": true, "classes": true}],
      "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }]
   }
}
