import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col, } from 'antd';
import { routerRedux } from 'dva/router';

const Project = ({ project, dispatch, props, children }) => {

  const handleNav = (num) => {
    if(num === 1){
      dispatch({type:'project/updateState', payload:{checkNav: 1}})
      dispatch(routerRedux.push('/project/building'))
    }else if(num === 2){
      dispatch({type:'project/updateState', payload:{checkNav: 2}})
      dispatch(routerRedux.push('/project/storiedbuilding'))
    }
  }

  const navGrid = {xs:4, sm:5, md:4, lg:3, xl:3, xxl:2} 
  const contentGrid = {xs:22, sm:17, md:18, lg:19, xl:19, xxl:20} 

  return (    
    <Fragment>
      <Row className={styles.project}>
        <Col {...navGrid} className={styles.navCol}>
          <Row className={styles.projectTitle}>
            <Col span={24} className={styles.title}>Project</Col>
          </Row>
          <Row className={styles.subNavs}>
            <Col span={24} className={styles.subNav}><span onClick={()=>handleNav(1)} style={{color: project.checkNav === 1 ? '#000' : '' }}>Building</span></Col>
            <Col span={24} className={styles.subNav}><span onClick={()=>handleNav(2)} style={{color: project.checkNav === 2 ? '#000' : '' }}>Storied Building</span></Col>
          </Row>
        </Col> 
        <Col {...contentGrid} className={styles.swiper}>
          { children }
        </Col>     
      </Row>   
    </Fragment>
  );
}

Project.propTypes = {
  operate: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ project }) => ({ project }))(Project);