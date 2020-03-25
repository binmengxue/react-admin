import React, { Component } from 'react'
import {Form,Input,} from 'antd'
const Item=Form.Item
class AddFrom extends Component {
    constructor(props) {
    super(props);
    this.state = {}
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator}=this.props.form
        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:12}
        }
       return (
           <Form {...formItemLayout}>
              <Item label="角色名称">
                {
                    getFieldDecorator("roleName",{
                        initialValue:'',
                        rules:[
                            {required:true,message:'角色名称必须输入'} 
                         ]
                    })(
                        <Input type="text"placeholder="请输入角色名称" />
                    )
                }
                
               </Item>
            </Form>
       );
    }
}

export default Form.create()(AddFrom)