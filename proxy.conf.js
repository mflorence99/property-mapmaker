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
  },
  {
    changeOrigin: true,
    context: ['/topo'],
    pathRewrite: {
      '/topo': ''
    },
    target:
      'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
    secure: true
  }
];

module.exports = PROXY_CONFIG;
