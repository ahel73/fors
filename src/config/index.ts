const env = process.env;

export default Object.freeze({
  apiUrl: env.VUE_APP_API || '/housing-subsidies/api',
  securityUrl: env.VUE_APP_SECURITY_API || '/security/api',
  filesApiUrl: env.VUE_APP_FILES_API || '/file-repository-service',
});
