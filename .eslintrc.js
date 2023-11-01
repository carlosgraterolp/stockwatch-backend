module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "array-bracket-spacing": "error",
        "arrow-spacing": "error",
        "arrow-parens": "error",
        "eol-last": "error",
        "func-call-spacing": "error",
        indent: ["error", 4],
        "key-spacing": "error",
        "max-len": [
            "error",
            {
                code: 80,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreUrls: true
            },
        ],
    },
}
