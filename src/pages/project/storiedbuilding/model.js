
export default {

  namespace: 'storiedBuilding',

  state: {
   imgList: [{url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding1.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding2.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding3.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding4.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding5.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding6.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding7.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/storiedbuilding/storiedbuilding8.jpg'}]
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
     updateState(state,  { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

};
