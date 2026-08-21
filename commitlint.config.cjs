module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "core",
        //
        "ai",
        "ui",
        "stores",
        "env",
        //
        "config",
        //
        "db",
        //
        "utils",
        "types",
        "repo",
        "turbo",
        "ci",
        "prettier",
      ],
    ],
  },
};
