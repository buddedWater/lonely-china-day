import * as service from './service'
export default {

  namespace: 'project',

  state: {
    checkNav: 0,
    projectList: [],
    imgList: [],
    orderBy: 'priority',
    order: 1,
    fullVisible: false,
    url:''
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
      const { orderBy, order } = yield select(_ => _.project)
      let data = yield call(service.getPhoto, { project: payload.project, orderBy, order })
      if(data.code === 1){
        yield put({type:'updateState',payload:{imgList:data.list}})
      }
    }, 

    *query_project({ payload }, { call, put, select }) {
      const { orderBy, order } = yield select(_ => _.project)
      let data = yield call(service.getProject, { orderBy, order })
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
