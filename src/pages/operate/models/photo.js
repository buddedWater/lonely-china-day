import * as service from '../services/photo'
import { getProject } from '../services/project'
export default {

  namespace: 'photo_operate',

  state: {
    dataSource: [],
    columns: [{ title: '标题', dataIndex: 'name', key: 'name' }, 
      { title: '所属项目', dataIndex: 'project', key: 'project' }, 
      { title: '图片', dataIndex: 'url', key: 'url' }, 
      { title: '优先级', dataIndex: 'priority', key: 'priority' },
      { title: '描述', dataIndex: 'desc', key: 'desc' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', sorter: (a, b) => a.createTime - b.createTime },
      { title: '修改时间', dataIndex: 'modifyTime', key: 'modifyTime', sorter: (a, b) => a.modifyTime - b.modifyTime },
      { title: '操作', dataIndex: 'operate', key: 'operate' },
    ],
    pageSize: 10,
    current: 1,
    total: 4,
    modalVisible: false,
    modalTitle: '',
    modifyData: {},
    orderBy: 'modifyTime',
    order: -1,
    fullVisible: false,
    url: '',
    projectList: [],
    project: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if(pathname === '/operate'){
          dispatch({type:'query'})
        }
      });
    },
  },

  effects: {

    *query({ payload }, { call, put, select }) {
      yield put({type:'query_project'})
      yield put({type:'query_photo'})
    },

    *query_project({ payload }, { call, put, select }) {
      let data = yield call(getProject)
      if(data.code === 1){
        yield put({type:'updateState',payload:{projectList:data.list.map((item, key)=>{return {name:item.name, value:item._id}})}})
      }
    },

    *query_photo({ payload }, { call, put, select }) {
      const { current, pageSize, orderBy, order, project } = yield select(_ => _.photo_operate)
      let data = yield call(service.getPhoto, { current, pageSize, orderBy, order, project })
      if(data.code === 1){
        yield put({type:'updateState',payload:{dataSource:data.list.map((item, key)=>{item.key = key; return item}),total:data.total}})
      }
    },

    *add({ payload }, { call, put }) {
      let data = yield call(service.addPhoto, payload.values)
      if(data.code === 1){
        yield put({type:'query_photo'})
      }
      return data
    },

    *update({ payload }, { call, put }) {
      let data = yield call(service.updatePhoto, payload.values)
      if(data.code === 1){
        yield put({type:'query_photo'})
      }
      return data
    },

    *delete({ payload }, { call, put }) {
      let data = yield call(service.deletePhoto, payload)
      if(data.code === 1){
        yield put({type:'query_photo'})
      }
      return data
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
