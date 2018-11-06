import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './addProjectModal.less';
import dayjs from 'dayjs';
import { Row, Col, Input, Form, Modal, notification, Select, InputNumber } from 'antd';

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

const AddProjectModal = ({ addData, form }) => {

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
    if(addData.selectModel === "swiperModel"){
      form.validateFields((err, values) => {
        if (!err) {
          handleSubmit(values)
        }
      });
    }else{
      form.validateFields(['_id', 'name', 'model', 'priority', 'desc'],(err, values) => {
        if (!err) {
          handleSubmit(values)
        }
      });
    }  
  }

  const handleSubmit = (values) => {
    if(values._id){
      values.modifyTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      addData.dispatch({type:"project_operate/update", payload:{values}}).then((data)=>{
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
      values.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      values.modifyTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      addData.dispatch({type:"project_operate/add", payload:{values}}).then((data)=>{
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
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
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
              <FormItem {...formItemLayout} label="名称">
                {form.getFieldDecorator('name', {
                  initialValue: addData.modifyData.name ? addData.modifyData.name : "",
                  rules: [{ required: true, message: '请输入名称!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="布局模式">
                {form.getFieldDecorator('model', {
                  initialValue: addData.modifyData.model ? addData.modifyData.model : "",
                  rules: [{ required: true, message: '请选择布局模式!' }],
                })(
                  <Select placeholder="请选择" onChange={(val)=>addData.onSelectChange(val)}>
                    {addData.modelList.map((item, key)=>{
                      return (
                        <Option key={key} value={item.value}>{item.name}</Option>
                      )
                    })}
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="单页图片数" style={{display:addData.selectModel === "swiperModel" ? "block": "none"}}>
                {form.getFieldDecorator('number', {
                  initialValue: addData.modifyData.number ? addData.modifyData.number : "",
                  rules: [{ required: true, message: '请输入单页图片数!' }],
                })(
                  <InputNumber  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="优先级">
                {form.getFieldDecorator('priority', {
                  initialValue: addData.modifyData.priority ? addData.modifyData.priority : "",
                  rules: [{ required: true, message: '请输入项目优先级!' }],
                })(
                  <InputNumber  />
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

AddProjectModal.propTypes = {
  addData: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

export default Form.create()(AddProjectModal)