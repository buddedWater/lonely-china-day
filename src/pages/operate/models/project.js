import * as service from '../services/project'
export default {

  namespace: 'project_operate',

  state: {
    dataSource: [],
    columns: [{ title: '名称', dataIndex: 'name', key: 'name' }, 
      { title: '描述', dataIndex: 'desc', key: 'desc', width: 150 },
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if(pathname === '/operate'){
          dispatch({type:'query_project'})
        }
      });
    },
  },

  effects: {
    *query_project({ payload }, { call, put, select }) {
      const { current, pageSize, orderBy, order } = yield select(_ => _.project_operate)
      let data = yield call(service.getProject, { current, pageSize, orderBy, order })
      if(data.code === 1){
        yield put({type:'updateState',payload:{dataSource:data.list.map((item, key)=>{item.key = key; return item}),total:data.total}})
      }
    },
    *add({ payload }, { call, put }) {
      let data = yield call(service.addProject, payload.values)
      if(data.code === 1){
        yield put({type:'query_project'})
      }
      return data
    },
    *update({ payload }, { call, put }) {
      let data = yield call(service.updateProject, payload.values)
      if(data.code === 1){
        yield put({type:'query_project'})
      }
      return data
    },
    *delete({ payload }, { call, put }) {
      let data = yield call(service.deleteProject, payload)
      if(data.code === 1){
        yield put({type:'query_project'})
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
