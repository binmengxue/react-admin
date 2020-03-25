import React, { Component } from 'react'
import {Form,Select,Input,} from 'antd'
import PropTypes from 'prop-types'
const Item=Form.Item
const Option=Select.Option
class UserFrom extends Component {
    constructor(props) {
    super(props);
    this.state = {}
    }
    static propTypes={
        setForm:PropTypes.func.isRequired,
        roles:PropTypes.array.isRequired,
        user: PropTypes.object
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator}=this.props.form
        const {roles}=this.props
        const user=this.props.user||{}
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
          }
       return (
           <Form {...formItemLayout}>
               <Item label='用户名'>
                {
                    getFieldDecorator('username', {
                    initialValue: user.username,
                    })(
                    <Input placeholder='请输入用户名'/>
                    )
                }
                </Item>

                {
                    !user._id?(
                    <Item label='密码'>
                    {
                        getFieldDecorator('password', {
                        initialValue: user.password,
                        })(
                        <Input type='password' placeholder='请输入密码'/>
                        )
                    }
                    </Item>
                    ):''
                }

                <Item label='手机号'>
                {
                    getFieldDecorator('phone', {
                    initialValue: user.phone,
                    })(
                    <Input placeholder='请输入手机号'/>
                    )
                }
                </Item>
                <Item label='邮箱'>
                {
                    getFieldDecorator('email', {
                    initialValue: user.email,
                    })(
                    <Input placeholder='请输入邮箱'/>
                    )
                }
                </Item>

                <Item label='角色'>
                {
                    getFieldDecorator('role_id', {
                    initialValue: user.role_id,
                    })(
                    <Select> 
                        {
                           roles.map(item=>(
                            <Option key={item._id} value={item._id}>{item.name}</Option>
                           )) 
                        }
                    </Select>
                    )
                }
                </Item>
            </Form>
       );
    }
}

export default Form.create()(UserFrom)