
export default {

  namespace: 'project',

  state: {
   checkNav: 1,
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
