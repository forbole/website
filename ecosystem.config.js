module.exports = {
  apps : [
      {
        name: "forbole",
        script: "dist/index.js",
        watch: true,
        env: {
          "NODE_ENV": "production",
        }
      }
  ]
}