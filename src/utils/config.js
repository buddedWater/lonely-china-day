const API = '/api'

module.exports = {
  /*name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  logo: '/public/logo.svg',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',*/
  CORS: [],
  //openPages: ['/login'],
  //apiPrefix: '/api/v1',
  API,
  api: {
    login: `${API}/api1/login`,
    article: `${API}/api1/article`,
    articleAuth: `${API}/api2/article`,
    orange: `${API}/api1/orange`,
    orangeAuth: `${API}/api2/orange`,
  },
}
