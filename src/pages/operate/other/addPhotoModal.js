import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './addPhotoModal.less';
import moment from 'moment';
import { Row, Col, Input, Form, Modal, notification } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea

const AddPhotoModal = ({ addData, form }) => {

  const modalProps = {
    title: addData.modalTitle,
    visible: addData.modalVisible,
    onOk: (e)=>onOK(e),
    onCancel: ()=>onCancel()
  }

  const onCancel = () => {
    addData.onCancel()
    form.resetFields()
  }

  const onOK = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit(values)
      }
    });
  }

  const handleSubmit = (values) => {
    if(values._id){
      values.modifyTime = moment().format('YYYY-MM-DD HH:mm:ss')
      addData.dispatch({type:"photo_operate/update", payload:{values}}).then((data)=>{
        if(data.code === 1){
          onCancel();
          notification['success']({
            message: '修改成功',
          })
        }else{
          notification['error']({
            message: '修改失败',
            description: ''
          })
        }
      })
    }else{
      delete values['_id']
      values.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
      values.modifyTime = moment().format('YYYY-MM-DD HH:mm:ss')
      addData.dispatch({type:"photo_operate/add", payload:{values}}).then((data)=>{
        if(data.code === 1){
          onCancel();
          notification['success']({
            message: '新增成功',
          })
        }else{
          notification['error']({
            message: '新增失败',
            description: ''
          })
        }
      })
    }   
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  return (    
    <Fragment>
      <Row className={styles.operate}>
        <Col span={24}>
          <Modal {...modalProps}>
            <Form>
              <FormItem {...formItemLayout} label="_id" style={{display:'none'}}>
                {form.getFieldDecorator('_id', {
                  initialValue: addData.modifyData._id ? addData.modifyData._id : "",
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="标题">
                {form.getFieldDecorator('name', {
                  initialValue: addData.modifyData.name ? addData.modifyData.name : "",
                  rules: [{ required: true, message: '请输入标题!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="图片链接">
                {form.getFieldDecorator('url', {
                  initialValue: addData.modifyData.url ? addData.modifyData.url : "",
                  rules: [{ required: true, message: '请输入内容!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="描述">
                {form.getFieldDecorator('desc', {
                  initialValue: addData.modifyData.desc ? addData.modifyData.desc : "",
                })(
                  <TextArea rows={6}/>
                )}
              </FormItem>              
            </Form>
          </Modal>
        </Col>
      </Row>
    </Fragment>
  );
}

AddPhotoModal.propTypes = {
  addData: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

export default Form.create()(AddPhotoModal)