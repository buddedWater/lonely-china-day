import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Link from 'umi/link';

function IndexPage() {
  return (    
    <div className={styles.normal}>
      <Link to="/project" className={styles.nav}>L0nely China Day!</Link>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
