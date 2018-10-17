import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Layout } from 'antd';
import styles from './App.less'
import { Helmet } from 'react-helmet';
import { routerRedux } from 'dva/router';
import logo from '../assets/icon.png';

const { Header, Footer, Content } = Layout;

const App = ({
  children, dispatch, app, loading, location,
}) => {

  const offset = (location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? {xs:2, sm:4, md:4, lg:4, xl:5, xxl:6} : {xs:4, sm:4, md:4, lg:4, xl:3, xxl:2}
  const content = (location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? {xs:20, sm:16, md:16, lg:16, xl:14, xxl:12} : {xs:20, sm:20, md:20, lg:20, xl:20, xxl:22}

  const handleLogout = () => {
    window.sessionStorage.clear()
    dispatch(routerRedux.push('/owner'))
  }

  const handleNav = (num) => {
    if(num === 1){
      dispatch({type:'app/updateState', payload:{checkNav: 1}})
      dispatch(routerRedux.push('/project/building'))
    }else if(num === 2){
      dispatch({type:'app/updateState', payload:{checkNav: 2}})
      dispatch(routerRedux.push('/about'))
    }
  }

  const renderNavs = () => {
    return (
      <Row className={styles.navs}>
        <Col span={24}><h2>Lonely China Day</h2></Col>
        <Col span={24} className={styles.nav} ><span onClick={()=>handleNav(1)} style={{color: app.checkNav === 1 ? '#008080' : '' }}>Project</span></Col>
        <Col span={24} className={styles.nav} ><span onClick={()=>handleNav(2)} style={{color: app.checkNav === 2 ? '#008080' : '' }}>About Me</span></Col>
      </Row>
    )
  }

	return (
		<Fragment>
      <Helmet>
        <title>LONELYCHINADAY</title>
        <link rel="icon" href={logo} type="image/x-icon" />
      </Helmet>
      <Header></Header>
			<Content className={styles.content}>
				<Row>
					<Col {...offset}>
            {(location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? null: renderNavs()}
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