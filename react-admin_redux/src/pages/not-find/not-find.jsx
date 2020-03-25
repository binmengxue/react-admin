import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button, Row, Col} from 'antd'
import {setHeadTitle} from '../../redux/actions'
import './not-find.less'
class NotFind extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    goHome=()=>{
        this.props.setHeadTitle(' 首页')
        this.props.history.replace('/home')
    }
    render() {
        return (
            <Row className='not-found'>
                <Col span={12} className='left'></Col>
                <Col span={12} className='right'>
                <h1>404</h1>
                <h2>抱歉，你访问的页面不存在</h2>
                <div>
                <Button type='primary' onClick={this.goHome}>
                    回到首页
                </Button>
                </div>
                </Col>
            </Row>
        );
    }
}
export default connect(
    state=>({}),
    {setHeadTitle}
)(NotFind)

