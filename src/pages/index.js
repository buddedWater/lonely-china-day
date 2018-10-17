import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Link from 'umi/link';
//import main from '../assets/ajuandbbf3.jpg';

function IndexPage() {
  return (    
    <div className={styles.normal}>
      <Link to="/project/building" className={styles.nav}>Lonely China Day!</Link>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
