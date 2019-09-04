module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "globals": {
        "$": "readonly",
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "extends": "airbnb-base",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "rules": {
      "linebreak-style": 0,
      "class-methods-use-this": 0
    }
};
