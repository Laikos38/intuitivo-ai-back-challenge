module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8001/api' // development api
        : 'http://localhost:8001/api' // production api
}
}
