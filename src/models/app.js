import * as service from '../services/app';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'app',

  state: {
    user:'',
    locationQuery: {},
    locationPathname: '',
  },

  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationQuery: location.query,
            locationPathname: location.pathname,
          },
        })
      })
    },


    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if(pathname === '/operate'){
          dispatch({type:'auth'})
        }
      });
    },
  },

  effects: {
    *auth({ payload }, { call, put, select }) {
      if(!window.sessionStorage.getItem('token')){
        yield put(routerRedux.push({pathname: '/owner'}))
      }
    },
    *login({ payload }, { call, put }) {
      let data = yield call(service.userLogin, {...payload.fields})
      if(data.code === 1){
        //yield put({type:'updateState', payload:{user:payload.fields.name}})
        window.sessionStorage.setItem('token',JSON.stringify(data.token))
        window.sessionStorage.setItem('user',JSON.stringify(payload.fields.name))
      }
      return data.code;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateState(state,  { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

};