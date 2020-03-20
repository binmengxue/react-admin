import React, { Component } from 'react'
import { Card ,Table,Button,Icon, message,Modal} from 'antd';
import  './category.less'
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api/index'
import AddFrom from './add-from'
import Update from './update'
export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            categorys:[],//一级分类数组
            subCategorys:[],//二级分类数组
            parentId:'0',
            categoryName:'',
            showVisble:0  //0:为都不显示 1：显示添加分类 2:显示修改分类
        }
    }
    //初始化所有的例数
    inintColumns=()=>{
        this.columns = [
            {
              title: '分类',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              render:(category)=>(
                  <div className="btnDiv">
                       <div className="cc" onClick={()=>this.showUpdatePop(category)}>修改分类</div> 
                       {
                          this.state.parentId==='0'?<div className="btn2" onClick={()=>this.getSubCategorys(category)}>查看子分类</div>:''
                       }
                       
                  </div>
              )
            }
        ]
    }
    getCategorys= async()=>{
        this.setState({loading:true})
        const result=await reqCategorys(this.state.parentId);
        this.setState({loading:false})
        if(result.data.status===0){
            const categorys=result.data.data
            if(this.state.parentId==='0'){
                this.setState({categorys})
            }else{
                this.setState({subCategorys:categorys})
            }
            
        }else{
           message.error('获取列表失败')
        }
    }
    //二级分类列表
    getSubCategorys=(category)=>{
        this.setState({
            parentId:category._id,
            categoryName:category.name
        },()=>{
            this.getCategorys()
        })
    }
    //点击获取一级分类列表
    getClickCategorys=()=>{
        this.setState({
            parentId:'0',
            categoryName:'',
            subCategorys:[]
        },()=>{
            this.getCategorys()
        })
    }
    //显示添加分类对话框
    showAddPop=()=>{
        this.setState({
            showVisble:1
        })
    }
    //添加分类
    addCategory=()=>{
        this.form.validateFields(async(errors,values)=>{
          if(!errors){
            this.setState({
                showVisble:0
            })
            const {categoryName,parentId}=values
            this.form.resetFields()//重置所有的数据
            const reslut=await reqAddCategory(parentId,categoryName)
            if(reslut.data.status===0){
                if(parentId===this.state.parentId){//填写的ID和当前的ID相同再刷新
                    this.getCategorys()
                }
                
            }
          }
        })
        
    }
    //显示修改分类对话框
    showUpdatePop=(category)=>{
        this.category=category
        this.setState({
            showVisble:2
        })
    }
    //修改分类
    updateCategory=()=>{
        this.form.validateFields(async(errors,values)=>{
            if(!errors){
                this.setState({
                    showVisble:0
                })
                const categoryId=this.category._id
                const categoryName=values
                this.form.resetFields()//重置所有的数据
                const reslut=await reqUpdateCategory(categoryId,categoryName)
                if(reslut.data.status===0){
                    this.getCategorys()
                }
            }
        })   
    }
    //关闭对话框
    handleCancel=()=>{
        this.form.resetFields()
        this.setState({
            showVisble:0
        })
    }
    componentWillMount(){
       this.inintColumns() 
    }
    componentDidMount(){
        this.getCategorys()
    }
    render() {
        const extra=(
            <Button type='primary' onClick={this.showAddPop}>
                <Icon type="plus" />添加
            </Button>
        )
        const{parentId,categorys,subCategorys,categoryName,loading,showVisble}=this.state
        const category=this.category ||{}
        return (
         <Card  title={parentId==="0"?'一级分类':(
                 <div>
                    <span style={{color:'#1DA57A',cursor:'pointer'}} onClick={this.getClickCategorys}>一级分类</span>
                    <Icon type="arrow-right" style={{margin:'0px 10px'}} />
                     <span>{categoryName}</span>
                 </div>
              )} tabBarExtraContent={<div>ddsads</div>} extra={extra} style={{ width:'100%',height:'100%'}}>
          
            <Table  
            rowKey="_id" 
            bordered 
            dataSource={parentId==="0"?categorys:subCategorys} 
            columns={this.columns} 
            pagination={{defaultPageSize:8,showQuickJumper:true}}
            loading={loading}
            />
            <Modal
                title="添加分类"
                visible={showVisble===1}
                onOk={this.addCategory}
                onCancel={this.handleCancel}
                >
                <AddFrom 
                categorys={categorys} 
                parentId={parentId}  
                setForm={(form)=>this.form=form}
                 />
            </Modal>
            <Modal
                title="修改分类"
                visible={showVisble===2}
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
                >
                <Update categoryName={category.name} setForm={(form)=>this.form=form}/>
            </Modal>
        </Card>
          
        );
    }
}

