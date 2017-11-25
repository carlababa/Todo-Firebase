module.exports = {
  "env": {
    "es6": true,
    "browser": true,
    "mocha": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
       "ecmaVersion": 6,
       "sourceType": "module",
       "ecmaFeatures": {
           "jsx": true
       }
   },
  "extends": "airbnb",
  "rules": {
  "import/no-extraneous-dependencies": 0,
  "jsx-a11y/no-static-element-interactions": 0,
  "import/no-unresolved": 0,
  "import/extensions": 0,
  "react/forbid-prop-types": 0,
  "react/no-array-index-key": 0,
  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  "class-methods-use-this": 0
  },
  overrides: [
    {
      files: "*.test.js",
      rules: {
        "no-unused-expressions": "off"
      }
    }
  ]
};
