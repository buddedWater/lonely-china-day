import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col } from 'antd';

const VerticalModel = ({ imgList }) => {

  return (    
    <Fragment>
      <Row className={styles.verticalModel}>
        <Col span={18}>         
          {imgList.map((item ,key)=>{
           let temp = key % 2 === 0 ? <Row gutter={24}><Col span={12} key={key} className={styles.single_item}><img alt={key} src={item.url}/></Col><Col span={12}></Col></Row>:
            <Row gutter={24}><Col span={12}></Col><Col span={12} key={key} className={styles.single_item}><img alt={key} src={item.url}/></Col></Row>
            return temp 
          })}
        </Col>     
      </Row>   
    </Fragment>
  );
}

VerticalModel.propTypes = {
  imgList: PropTypes.array
};

export default VerticalModel;