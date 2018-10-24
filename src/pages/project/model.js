import * as service from './service'
export default {

  namespace: 'project',

  state: {
   checkNav: 0,
   projectList: [],
   imgList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if(pathname === '/project'){
          dispatch({type:'query_project'})
        }
      });
    },
  },

  effects: {


    *query_photo({ payload }, { call, put, select }) {
      let data = yield call(service.getPhoto, { project: payload.project })
      if(data.code === 1){
        yield put({type:'updateState',payload:{imgList:data.list}})
      }
    }, 

    *query_project({ payload }, { call, put, select }) {
      let data = yield call(service.getProject)
      if(data.code === 1){
        yield put({type:'updateState',payload:{projectList:data.list}})
        yield put({type:"query_photo",payload:{project:data.list[0]._id}})
      }
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
