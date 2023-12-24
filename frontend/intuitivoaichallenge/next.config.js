module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? process.env.BACK_URL || 'http://localhost:8001/api' // development api
        : process.env.BACK_URL || 'http://localhost:8001/api' // production api
}
}
