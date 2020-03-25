import React, { Component } from 'react'
import {Form,Select,Input,} from 'antd'
import PropTypes from 'prop-types'
const Item=Form.Item
const Option=Select.Option
class AddFrom extends Component {
    constructor(props) {
    super(props);
    this.state = {}
    }
    static propTypes={
        categorys:PropTypes.array.isRequired,
        parentId:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator}=this.props.form
        const {categorys, parentId}=this.props
       return (
           <Form>
              <Item>
                  {
                    getFieldDecorator("parentId",{
                        initialValue:parentId
                    })(
                    <Select>
                        <Option value="0">一级分类</Option>
                        {
                            categorys.map(item=>{
                            return  <Option value={item._id} key={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                    )
                  }
              </Item>
              <Item>
                {
                    getFieldDecorator("categoryName",{
                        initialValue:'',
                        rules:[
                            {required:true,message:'分类名称必须输入'} 
                         ]
                    })(
                        <Input type="text"placeholder="请输入分类名称" />
                    )
                  }
                
               </Item>
            </Form>
       );
    }
}

export default Form.create()(AddFrom)