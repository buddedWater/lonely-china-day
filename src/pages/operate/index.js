import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import PhotoOperate from './other/photo';
import ProjectOperate from './other/project';
import { Row, Col, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

const Operate = ({ operate, dispatch }) => {

  const onTabChange = (key) => {

  }

  return (    
    <Fragment>
      <Row className={styles.operate}>
        <Col span={24}>
          <Tabs onChange={(key)=>onTabChange(key)} type="card">
            <TabPane tab="项目管理" key="1">
              <ProjectOperate />
            </TabPane>
            <TabPane tab="照片管理" key="2">
              <PhotoOperate />
            </TabPane>
          </Tabs>
        </Col>        
      </Row>   
    </Fragment>
  );
}

Operate.propTypes = {
  operate: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ operate }) => ({ operate }))(Operate);