import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col } from 'antd'
import './index.less'

class FullPageImage extends React.Component {

  onCancel () {
    this.props.handleCancel()
  }

  render () {
    const { visible, url } = this.props
    const modalProps = {
      visible: visible,
      footer: null,
      width: 700,
      wrapClassName: 'full-page-image',
      onCancel: ()=>this.onCancel()
    }

    return (
      <Row>
        <Col span={24}>
          <Modal {...modalProps}>
            <img alt={url} src={url}/>
          </Modal>
        </Col>
      </Row>     
    )
  }
}

FullPageImage.propTypes = {
  visible: PropTypes.bool,
  url: PropTypes.string,
}

export default FullPageImage
