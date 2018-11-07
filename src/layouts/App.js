import React, { Fragment } from 'react';
import { Row, Col, BackTop, Avatar, Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Layout } from 'antd';
import styles from './App.less'
import { Helmet } from 'react-helmet';
import { routerRedux } from 'dva/router';
import logo from '../assets/icon.jpg';
import NProgress from 'nprogress';

const { Header, Footer, Content } = Layout;
let lastHref

const App = ({
  children, dispatch, app, loading, location,
}) => {

  const { href } = window.location


  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }else{
    if(loading.global){
      NProgress.start()
    }else{
      NProgress.done()
    }
  }

  const offset = (location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? {xs:2, sm:4, md:4, lg:4, xl:5, xxl:6} : {xs:4, sm:4, md:4, lg:3, xl:2, xxl:2}
  const content = (location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? {xs:20, sm:16, md:16, lg:16, xl:14, xxl:12} : {xs:20, sm:20, md:20, lg:20, xl:21, xxl:21}

  const handleLogout = () => {
    window.sessionStorage.clear()
    dispatch(routerRedux.push('/owner'))
  }

  const handleNav = (num) => {
    if(num === 1){
      dispatch({type:'app/updateState', payload:{checkNav: 1}})
      dispatch(routerRedux.push('/project'))
    }else if(num === 2){
      dispatch({type:'app/updateState', payload:{checkNav: 2}})
      dispatch(routerRedux.push('/about'))
    }
  }

  const clickMenu = ({key}) => {
    if(key === "2"){handleLogout()}
  }

  const menu = (
    <Menu onClick={({key})=>clickMenu({key})}>
      <Menu.Item key="1">{JSON.parse(window.sessionStorage.getItem("user"))}</Menu.Item>
      <Menu.Item key="2"><a style={{color: "#1890ff"}} href="javascript:;">登出</a></Menu.Item>
    </Menu>
  );

  const renderNavs = () => {
    return (
      <Row className={styles.navs}>       
        <Col span={24} className={styles.nav} ><span onClick={()=>handleNav(1)} style={{color: app.checkNav === 1 ? '#008080' : '' }}>Project</span></Col>
        <Col span={24} className={styles.nav} ><span onClick={()=>handleNav(2)} style={{color: app.checkNav === 2 ? '#008080' : '' }}>About Me</span></Col>
      </Row>
    )
  }

	return (
		<Fragment>
      <Helmet>
        <title>l0nelychinaday</title>
        <link rel="icon" href={logo} type="image/x-icon" />
      </Helmet>
      <Header></Header>
			<Content className={styles.content}>
				<Row>
					<Col {...offset}>
            {(location.pathname === "/" || location.pathname === "/owner" || location.pathname === "/operate") ? null: renderNavs()}
          </Col>
					<Col {...content} >{ children }</Col>
          <Col {...offset}>
            {location.pathname === "/operate" ? 
              <Dropdown overlay={menu}>
                <Avatar style={{backgroundColor:'#DAA520'}}>USER</Avatar>
              </Dropdown> : null}         
          </Col>
				</Row>
			</Content>
			<Footer></Footer>	
      <BackTop/>				
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