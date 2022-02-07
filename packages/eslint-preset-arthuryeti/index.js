module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: ["./apps/*/", "./packages/*/"],
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": "off",
  },
};
