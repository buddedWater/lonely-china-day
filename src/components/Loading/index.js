import React from 'react'
import NProgress from 'nprogress'

class Loading extends React.Component {

  componentDidMount(){
    NProgress.start()
  }

  componentWillUnmount(){
    NProgress.done()
  }

  render () {
    return ( 
      this.porps.children       
    )
  }
}


export default Loading