import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form,Icon,Input,Button,message } from 'antd';
import './login.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
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
              const response=await reqLogin(username,password)
              const result=response.data
              if(result.status===0){
                 message.success("登录成功")
                 memoryUtils.user=result.data
                 storageUtils.saveUser(result.data)
                 //调整后台界面，不需要回退登录界面
                 this.props.history.replace("/")
              }else{
                message.error(result.message)
              }
           
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
        const user=memoryUtils.user
        if(user._id){
           return <Redirect to="/" />
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
export default WrapLogin


