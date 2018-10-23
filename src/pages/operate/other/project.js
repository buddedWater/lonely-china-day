import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './project.less';
import AddProjectModal from './addProjectModal';
import { Row, Col, Table, Divider, Button, Popconfirm } from 'antd';

const ProjectOperate = ({ project_operate, dispatch }) => {

  project_operate.columns[2].render = (text, record) => {
    return <span title={text} className="text_span">{text}</span>
  }

  project_operate.columns[4].render = (text, record) => (
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
    dispatch({type:"project_operate/query_project_operate"})
  }

  const handleModify = (record) => {
    dispatch({type:"project_operate/updateState", payload:{modalVisible:true, modalTitle:"修改", modifyData:record}})
  }

  const handleDelete = (record) => {
    dispatch({type:"project_operate/delete", payload:{_id:record._id}})
  }

  const handleAdd = (show, title, num) => {
    dispatch({type:"project_operate/updateState", payload:{modalVisible:show, modalTitle:title}})  
  }

  const onCancel = () =>{
    dispatch({type:"project_operate/updateState", payload:{modalVisible:false, modifyData:{}}})  
  }

  const addData = {
    modalVisible: project_operate.modalVisible,
    modalTitle: project_operate.modalTitle,
    modifyData: project_operate.modifyData,
    onCancel: ()=>onCancel(),
    dispatch
  }

  return (    
    <Fragment>
      <Row className={styles.project_operate}>
        <Col span={24} className={styles.new_col}>
          <Button type="primary" onClick={()=>handleAdd(true,"新增",1)}>新增</Button>
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