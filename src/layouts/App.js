import React, { Fragment } from 'react';
import { Row, Col, Divider } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Layout } from 'antd';
import styles from './App.less'
import { Helmet } from 'react-helmet';
import { routerRedux } from 'dva/router';
import Link from 'umi/link';

const { Header, Footer, Content } = Layout;

const App = ({
  children, dispatch, app, loading, location,
}) => {

  const offset = (location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? {xs:2, sm:4, md:4, lg:4, xl:5, xxl:6} : {xs:2, sm:4, md:3, lg:3, xl:3, xxl:2}
  const content = (location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? {xs:20, sm:16, md:16, lg:16, xl:14, xxl:12} : {xs:20, sm:14, md:12, lg:10, xl:9, xxl:8}

  const handleLogout = () => {
    window.sessionStorage.clear()
    dispatch(routerRedux.push('/owner'))
  }

	return (
		<Fragment>
      <Helmet>
        <title>heyheybaby</title>
      </Helmet>
			<Content className={styles.content}>
				<Row>
					<Col {...offset}>
            <Row>
              <Col>Project</Col>
            </Row>
          </Col>
					<Col {...content} >{ children }</Col>
          <Col {...offset}></Col>
				</Row>
			</Content>
			<Footer></Footer>					
		</Fragment>
	)
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))