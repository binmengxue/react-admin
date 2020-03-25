import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import{connect} from 'react-redux'
import {login} from '../../redux/actions'
import { Form,Icon,Input,Button,message } from 'antd';
import './login.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'
class Login extends Component {
    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault()
        // 对所有表单字段进行检验
        this.props.form.validateFields(async(err, values) => {
          // 检验成功
          if (!err) {
              //查看alt+<查看
              const {username,password}=values
              //调用分发action函数
              this.props.login(username,password)
          }else{
              console.log('校验失败')
          }
        });
     }
     validatePwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value)
        if(!value) {
          callback('密码必须输入')
        } else if (value.length<4) {
          callback('密码长度不能小于4位')
        } else if (value.length>12) {
          callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          callback('密码必须是英文、数字或下划线组成')
        } else {
          callback() // 验证通过
        }
    }
    render() {
        const user=this.props.user
        if(user._id){
           return <Redirect to="/" />
        }
        let errormasg
        if(user){
          errormasg=this.props.user.errorMsg
        }
      const form = this.props.form
      const { getFieldDecorator } = form;
      return (
        <div className="login">
        <header className="login-header">
            <img  src={logo} className="logo"  alt="" />
            <h2>react后台管理系统</h2>
        </header>
        <section  className="login-content">
            <div className="error-msg">{errormasg}</div>
            <h2>用户登录</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                   {
                    getFieldDecorator('username', {
                            rules: [
                            { required: true,whitespace:true, message: '用户名必须输入!' },
                            {min:4,message: "用户名至少4位"},
                            {max:12,message: "用户名最多12位"},
                            {pattern:/^[a-zA-Z0-9_]+$/,message: "用户名必须是英文，数字或者下划线组成"}
                        ]
                    })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                       placeholder="用户名"
                    />
                    )
                    }
                </Form.Item>
                <Form.Item>
                   {
                   getFieldDecorator('password', {
                        rules: [{validator:this.validatePwd}]  
                                 
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        />
                    )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        </section>
        </div>
     )
    }
}
const WrapLogin= Form.create()(Login)
export default  connect(
  state=>({user:state.user}),
  {login}
)(WrapLogin) 


