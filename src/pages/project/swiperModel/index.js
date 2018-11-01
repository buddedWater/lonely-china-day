import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col } from 'antd';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.css';


const SwiperModel = ({ imgList, number, handleView }) => {

  const swiperProps = {
    slidesPerView: number,
    spaceBetween: 30,
    freeMode: true,
    lazy: true,
    rebuildOnUpdate: true,
  }

  return (    
    <Fragment>
      <Row className={styles.swiperModel}>
        <Col span={24}>
          <Swiper {...swiperProps} style={{height:'600px'}}>
            {imgList.map((item ,key)=>{
             return (<div key={key} className={styles.single_item}><img onClick={()=>handleView(item.url)} alt={key} src={item.url}/></div>)
            })}
          </Swiper>
        </Col>     
      </Row>   
    </Fragment>
  );
}

SwiperModel.propTypes = {
  imgList: PropTypes.array,
  number: PropTypes.number,
  handleView: PropTypes.func
};

export default SwiperModel;