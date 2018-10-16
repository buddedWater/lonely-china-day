import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Link from 'umi/link';
//import main from '../assets/ajuandbbf3.jpg';

function IndexPage() {
  return (    
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to hey hey baby!</h1>
      <div><img alt="main" src={''} className={styles.main}/></div>
      <div className={styles.list}>Someone Must Shout That We Will Build The Pyramids.</div>
      <Link to="/first" className={styles.nav}>Gooooooooooooo!</Link>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
