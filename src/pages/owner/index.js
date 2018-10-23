import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col, Form, Icon, Input, Button, notification } from 'antd';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;

const Owner = ({ owner, dispatch, form }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({type:'app/login', payload:{fields:values}}).then((data)=>{
          if(data === 1){
            dispatch(routerRedux.push("/operate"))
          }else{
            notification["error"]({
              message: '登录失败',
              description: '用户名或者密码错误！',
            });
          }
        })
      }
    });
  }

  return (    
    <Fragment>
      <Row type="flex" align="middle" justify="center" className={styles.owner}>
        <Col span={10} className={styles.title}>L0NELY CHINA DAY</Col>
        <Col span={10} className={styles.container}>
          <Form onSubmit={(e)=>handleSubmit(e)}>
            <FormItem>
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  />
              )}
            </FormItem>
            <FormItem>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.button}>
                Log in
              </Button>
            </FormItem>
          </Form>          
        </Col>
      </Row>
    </Fragment>
  );
}

Owner.propTypes = {
  owner: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
};

export default connect(({ owner }) => ({ owner }))(Form.create()(Owner));