
export default {

  namespace: 'building',

  state: {
   imgList: [{url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/buildings/building1.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/buildings/building2.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/buildings/building3.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/buildings/building4.jpg'},
    {url: 'https://lonelychinaday.oss-cn-beijing.aliyuncs.com/buildings/building5.jpg'}]
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
