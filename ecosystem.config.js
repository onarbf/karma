module.exports = {
  apps : [{
    name: "karma",
    script: "./server.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    watch_delay: 1000,
    ignore_watch : ["node_modules", "client/img"]
  }]
}
