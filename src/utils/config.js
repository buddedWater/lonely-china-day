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
    project: `${API}/api1/project`,
    projectAuth: `${API}/api2/project`,
    photo: `${API}/api1/photo`,
    photoAuth: `${API}/api2/photo`,
  },
}
