import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './photo.less';
import AddPhotoModal from './addPhotoModal';
import { Row, Col, Table, Divider, Button, Popconfirm, Select } from 'antd';
import { FullPageImage } from '../../../components';

const Option = Select.Option

const PhotoOperate = ({ photo_operate, dispatch }) => {

  photo_operate.columns[1].render = (text, record) => {
    let obj = photo_operate.projectList.find((item, key)=>{return item.value === text})
    return <span>{obj.name}</span>
  }

  photo_operate.columns[2].render = (text, record) => {
    return <a href="javascript:;" onClick={()=>handleView(text)}>预览</a>
  }

  photo_operate.columns[4].render = (text, record) => {
    return <span title={text} className="text_span">{text}</span>
  }

  photo_operate.columns[7].render = (text, record) => (
    <span>
      <a href="javascript:;" onClick={()=>handleModify(record)}>修改</a>
      <Divider type="vertical" />
      <Popconfirm title="确认删除吗？" onConfirm={()=>handleDelete(record)}>
        <a href="javascript:;">删除</a>
      </Popconfirm>
    </span>
  )

  const paginationProps = {
    pageSize: photo_operate.pageSize,
    current: photo_operate.current,
    total: photo_operate.total,
    showQuickJumper: true
  }

  const tableProps = {
    pagination: paginationProps,
    dataSource: photo_operate.dataSource,
    columns: photo_operate.columns,
    scroll: { x: true },
    onChange: (pagination, filters, sorter,)=>onTableChange(pagination, filters, sorter)
  }

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({type:"photo_operate/updateState", payload:{current:pagination.current, orderBy:sorter.field, order:sorter.order === "descend"?-1:1}})
    dispatch({type:"photo_operate/query_photo"})
  }

  const handleView = (text) => {
    dispatch({type:"photo_operate/updateState", payload:{fullVisible:true, url:text}})
  }

  const handleModify = (record) => {
    dispatch({type:"photo_operate/updateState", payload:{modalVisible:true, modalTitle:"修改照片", modifyData:record}})
  }

  const handleDelete = (record) => {
    dispatch({type:"photo_operate/delete", payload:{_id:record._id}})
  }

  const handleAdd = (show, title, num) => {
    dispatch({type:"photo_operate/updateState", payload:{modalVisible:show, modalTitle:title}})  
  }

  const onCancel = () =>{
    dispatch({type:"photo_operate/updateState", payload:{modalVisible:false, modifyData:{}}})  
  }

  const addData = {
    modalVisible: photo_operate.modalVisible,
    modalTitle: photo_operate.modalTitle,
    modifyData: photo_operate.modifyData,
    projectList: photo_operate.projectList,
    onCancel: ()=>onCancel(),
    dispatch
  }

  const fullPageData = {
    visible: photo_operate.fullVisible,
    url: photo_operate.url,
    handleCancel: ()=>handleCancel(),
  }

  const handleCancel = () => {
    dispatch({type:"photo_operate/updateState", payload:{fullVisible:false, url:""}})
  }

  const onSelecChange = (val) => {
    dispatch({type:"photo_operate/updateState", payload:{project:val}})
    dispatch({type:"photo_operate/query_photo"})
  }

  return (    
    <Fragment>
      <Row className={styles.photo_operate}>
        <Col span={24} style={{padding: '15px 0'}}>
          <Row>
            <Col span={20} className={styles.search_col}>
              <Select style={{ width: 200 }} placeholder="Please Select" onChange={(val)=>onSelecChange(val)}>
                {photo_operate.projectList.map((item, key)=>{
                  return (
                    <Option key={key} value={item.value}>{item.name}</Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={4} className={styles.new_col}><Button type="primary" onClick={()=>handleAdd(true,"新增照片",1)}>新增</Button></Col>
          </Row>        
        </Col>
        <Col span={24} style={{padding: '10px 0'}}>
          <Table {...tableProps}></Table>
        </Col>
      </Row>
      <AddPhotoModal addData={addData}/>
      <FullPageImage {...fullPageData}/>
    </Fragment>
  );
}

PhotoOperate.propTypes = {
  photo_operate: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ photo_operate }) => ({ photo_operate }))(PhotoOperate);