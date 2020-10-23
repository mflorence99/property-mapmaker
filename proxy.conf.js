const PROXY_CONFIG = [
  {
    changeOrigin: true,
    context: ['/contours'],
    pathRewrite: {
      '/contours': ''
    },
    target:
      'https://carto.nationalmap.gov/arcgis/services/contours/MapServer/WmsServer',
    secure: true
  }
];

module.exports = PROXY_CONFIG;
