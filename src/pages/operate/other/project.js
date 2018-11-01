import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './project.less';
import AddProjectModal from './addProjectModal';
import { Row, Col, Table, Divider, Button, Popconfirm } from 'antd';

const ProjectOperate = ({ project_operate, dispatch }) => {

  project_operate.columns[4].render = (text, record) => {
    return <span title={text} className="text_span">{text}</span>
  }

  project_operate.columns[6].render = (text, record) => (
    <span>
      <a href="javascript:;" onClick={()=>handleModify(record)}>修改</a>
      <Divider type="vertical" />
      <Popconfirm title="确认删除吗？" onConfirm={()=>handleDelete(record)}>
        <a href="javascript:;">删除</a>
      </Popconfirm>
    </span>
  )

  const paginationProps = {
    pageSize: project_operate.pageSize,
    current: project_operate.current,
    total: project_operate.total,
    showQuickJumper: true
  }

  const tableProps = {
    pagination: paginationProps,
    dataSource: project_operate.dataSource,
    columns: project_operate.columns,
    scroll: { x: true },
    onChange: (pagination, filters, sorter,)=>onTableChange(pagination, filters, sorter)
  }

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({type:"project_operate/updateState", payload:{current:pagination.current, orderBy:sorter.field, order:sorter.order === "descend"?-1:1}})
    dispatch({type:"project_operate/query_project"})
  }

  const handleModify = (record) => {
    dispatch({type:"project_operate/updateState", payload:{modalVisible:true, selectModel:record.model, modalTitle:"修改项目", modifyData:record}})
  }

  const handleDelete = (record) => {
    dispatch({type:"project_operate/delete", payload:{_id:record._id}})
  }

  const handleAdd = (show, title, num) => {
    dispatch({type:"project_operate/updateState", payload:{modalVisible:show, modalTitle:title}})  
  }

  const onCancel = () => {
    dispatch({type:"project_operate/updateState", payload:{modalVisible:false, modifyData:{}, selectModel:""}})  
  }

  const addData = {
    modalVisible: project_operate.modalVisible,
    modalTitle: project_operate.modalTitle,
    modifyData: project_operate.modifyData,
    modelList: project_operate.modelList,
    selectModel: project_operate.selectModel,
    onSelectChange: (val)=>onSelectChange(val),
    onCancel: ()=>onCancel(),
    dispatch
  }

  const onSelectChange = (val) => {
    dispatch({type:"project_operate/updateState", payload:{selectModel:val}})  
  }

  return (    
    <Fragment>
      <Row className={styles.project_operate}>
        <Col span={24} className={styles.new_col}>
          <Button type="primary" onClick={()=>handleAdd(true,"新增项目",1)}>新增</Button>
        </Col>
        <Col span={24} style={{padding: '10px 0'}}>
          <Table {...tableProps}></Table>
        </Col>
      </Row>
      <AddProjectModal addData={addData}/>
    </Fragment>
  );
}

ProjectOperate.propTypes = {
  project_operate: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ project_operate }) => ({ project_operate }))(ProjectOperate);