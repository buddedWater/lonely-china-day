import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col, } from 'antd';


const AboutMe = ({ aboutMe, dispatch }) => {

  return (    
    <Fragment>
      <Row className={styles.about}>
        <Col span={2} className={styles.navCol}>
          <Row className={styles.projectTitle}>
            <Col span={24} className={styles.title}>About Me</Col>
          </Row>
        </Col>  
        <Col span={20} className={styles.info}>
          <Row>
            <Col span={24}>This is L0nely China Day!</Col>
          </Row>
        </Col> 
      </Row>
    </Fragment>
  );
}

AboutMe.propTypes = {
  operate: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ aboutMe }) => ({ aboutMe }))(AboutMe);