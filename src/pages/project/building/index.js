import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col } from 'antd';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.css';

const Building = ({ building, dispatch }) => {

  const swiperProps = {
    slidesPerView: 1.5,
    spaceBetween: 30,
    freeMode: true,
    lazy: true,
    rebuildOnUpdate: true,
  }

  return (    
    <Fragment>
      <Row className={styles.building}>
        <Col span={24}>
          <Swiper {...swiperProps} >
            {building.imgList.map((item ,key)=>{
             return (<div key={key} className={styles.single_item}><img alt={key} src={item.url}/></div>)
            })}
          </Swiper>
        </Col>     
      </Row>   
    </Fragment>
  );
}

Building.propTypes = {
  operate: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ building }) => ({ building }))(Building);