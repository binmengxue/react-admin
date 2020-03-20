import React, { Component } from 'react'
import {reqCategorys} from '../../api/index'
import {Card,Icon,Form,Input,Cascader,Button,message} from 'antd'
const {Item}=Form
const {TextArea} = Input
class ProductAddUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[]
        }
    }
    /**验证价格 */
    validatorPrice=(rule,value,callback)=>{
        console.log(value)
     if(value*1>0){
         callback()
     }else{
        callback('价格必须大于0') 
     }
    }
    //查询一级分类/二级分类列表
    getCategorys= async(parentId)=>{
      const result=await  reqCategorys(parentId)
      if(result.data.status===0){
          const categorys=result.data.data
          if(parentId==="0"){
            this.initOptions(categorys)
          }else{
            return categorys
          }
          
      }
    }
    //处理一级数据
    initOptions= async(categorys)=>{
       const options=categorys.map(item=>({
          value:item._id,
          label:item.name,
          isLeaf:false
        }))
        const {isUpdate,product}=this
        const {pCategoryId,categoryId,name,desc,price}=product
        if(isUpdate){
            const subCategorys=await this.getCategorys(pCategoryId)
            const childOptions=subCategorys.map(item=>({
                value:item._id,
                label:item.name,
                isLeaf:true
            }))
           const targetOption=options.find(item=>item.value===pCategoryId)
           if(targetOption){
               targetOption.children=childOptions
           }
        }
        this.setState({options})
    }
    //点击获取二级分类
    loadData = async(selectedOptions) => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const subCategorys= await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if(subCategorys && subCategorys.length>0){
            const childOptions=subCategorys.map(item=>({
                value:item._id,
                label:item.name,
                isLeaf:true
            }))
            targetOption.children=childOptions
            this.setState({
                options: [...this.state.options],
            });
        }else{
            targetOption.isLeaf=true
        }
      }
    submit=()=>{
        this.props.form.validateFields((errors, values)=>{
          if(!errors){

          }else{
              
          }
        })
    }
    componentDidMount(){
        this.getCategorys('0')
    }
    componentWillMount(){
        //取出数据
       const product=this.props.location.state
       this.isUpdate=!!product
       this.product=product||{}
    }
    render() {
        const {isUpdate,product}=this
        const {getFieldDecorator}=this.props.form
        const {pCategoryId,categoryId,name,desc,price}=product
        const categorys=[]
        if(pCategoryId=="0"){
            categorys.push(categoryId)
        }else{
            categorys.push(pCategoryId)
            categorys.push(categoryId)
        }
        const title=(
            <div>
              <Icon 
              type="arrow-left" 
              style={{color:'#1DA57A',marginRight:'10px',cursor:'pointer'}}
              onClick={()=>this.props.history.goBack()}
               />
              <span>{isUpdate?'修改商品':'添加商品'}</span>
            </div>
        )
        const formItemLayout = {
            labelCol: {span:2},
            wrapperCol: {span:8}
        }
        
        return (
            <Card title={title} style={{ width:'100%',height:'100%' }}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name',{
                                initialValue:name,
                                rules:[
                                    {required:true,message:'必须输入商品名称'}
                                ]
                            })(<Input type="text" placeholder="请输入商品名称" />)
                        }
                    </Item>  
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc', {
                                initialValue:desc,
                                rules: [
                                {required: true, message: '必须输入商品描述'}
                                ]
                            })(<TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />)
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                        getFieldDecorator('price', {
                            initialValue:price,
                            rules: [
                            {required: true, message: '必须输入商品价格'},
                            {validator:this.validatorPrice}
                            ]
                        })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                        }
                    </Item>
                    <Item label="商品分类">
                        {
                            getFieldDecorator('categorys', {
                                initialValue:categorys,
                                rules: [
                                {required: true, message: '必须输入商品分类'}
                                ]
                            })(<Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                            />)
                        }
                    </Item>

                    <Item>
                         <Button type="primary" onClick={this.submit}>提交</Button>
                    </Item>   
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate)