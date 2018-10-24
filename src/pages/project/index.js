
import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col } from 'antd';
import SwiperModel from './swiperModel';
import VerticalModel from './verticalModel';

const Project = ({ project, dispatch, props, children }) => {

  const handleNav = (key) => {
    dispatch({type:'project/updateState', payload:{checkNav: key, imgList:[]}})
    dispatch({type:'project/query_photo', payload:{project: project.projectList[key]._id}})
  }

  const renderChildren = () => {
    if(project.projectList.length === 0) return
    let model = project.projectList[project.checkNav].model
    if(model === "swiperModel"){
      return <SwiperModel imgList={project.imgList} />
    }else if(model === "verticalModel"){
      return <VerticalModel imgList={project.imgList}/>
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
            {project.projectList.map((item, key)=>{
              return (
                <Col span={24} key={key} className={styles.subNav}><span onClick={()=>handleNav(key)} style={{color: project.checkNav === key ? '#000' : '' }}>{item.name}</span></Col>
              )
            })}
          </Row>
        </Col> 
        <Col {...contentGrid} className={styles.children}>
          { renderChildren() }    
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