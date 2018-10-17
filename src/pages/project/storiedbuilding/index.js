import React, { Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col } from 'antd';

const StoriedBuilding = ({ storiedBuilding, dispatch }) => {

  return (    
    <Fragment>
      <Row className={styles.storiedBuilding}>
        <Col span={18}>
          <Row gutter={24}>
            {storiedBuilding.imgList.map((item ,key)=>{
             return (<Col span={12} key={key} className={styles.single_item}><img alt={key} src={item.url}/></Col>)
            })}
          </Row>
        </Col>     
      </Row>   
    </Fragment>
  );
}

StoriedBuilding.propTypes = {
  operate: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ storiedBuilding }) => ({ storiedBuilding }))(StoriedBuilding);