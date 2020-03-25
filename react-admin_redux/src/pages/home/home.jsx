import React, { Component } from 'react'
export default class Home extends Component {
    constructor(props) {
    super(props);
    this.state = {}
    }
    render() {
        return (
        <div style={{height:'100%',backgroundColor:'#fff',display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            <h2 style={{fontSize:'30px'}}>欢迎使用react管理系统</h2>
        </div>
        )
    }
}