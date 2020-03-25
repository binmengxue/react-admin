import React, { Component } from 'react'
import { Card ,Table,Button, message,Modal} from 'antd';
import {reqUserList,reqUserDelete,reqUserAddOrUpdate} from '../../api/index'
import UserFrom from './user-from'
const { confirm } = Modal;
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            roles:[],
            isVisble:false
        }
    }
    //初始化所有的例数
    inintColumns=()=>{
        this.columns = [
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render:(role_id)=>this.rolesName[role_id]
            },
            {
              title: '操作',
              render:(user)=>(
                  <div className="btnDiv">
                       <div onClick={()=>this.showUpdatePop(user)}>修改</div> 
                       <div onClick={()=>this.showDetePop(user)} style={{marginLeft:'10px'}}>删除</div> 
                  </div>
              )
            }
        ]
    }
    getuserList=async()=>{
        const reslut=await reqUserList()
        if(reslut.data.status===0){
           const {users,roles}=reslut.data.data
           this.initRoleseNames(roles)
           this.setState({users,roles})
        }
    }
    //根据role生成对象
    initRoleseNames=(roles)=>{
        const rolseNames=roles.reduce((pre,role)=>{
            pre[role._id]=role.name
          return  pre
         },{})
         this.rolesName=rolseNames
    }

    addOrUpdateUser= async()=>{
        this.setState({isVisble:false})
        // 1. 收集输入数据
        const user = this.form.getFieldsValue()
        this.form.resetFields()
        if(this.user){
            user._id=this.user._id
        }
        const result= await reqUserAddOrUpdate(user)
        if(result.data.status===0){
            message.success(`${this.user?'修改':'添加'}用户成功`)
            this.getuserList()
         }else{
            message.success(`${this.user?'修改':'添加'}用户失败`)
         }
    }
    handleCancel=()=>{
        this.setState({isVisble:false})
        this.form.resetFields()
    }
    //更新用户
    showUpdatePop=(user)=>{
        this.user=user
        this.setState({isVisble:true}) 
    }
    //显示添加用户
    showAddPop=()=>{
        this.user=null
        this.setState({isVisble:true}) 
    }
    showDetePop=(user)=>{
        confirm({
            title: `确定删除${user.username}?`,
             onOk:async()=> {
                const result=await reqUserDelete(user._id)
                if(result.data.status===0){
                    message.success('删除用户成功')
                    this.getuserList()
                }else{
                    message.success('删除用户失败')
                }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    componentWillMount(){
       this.inintColumns() 
    }
    componentDidMount(){
        this.getuserList()
    }
    render() {
        const title=(
            <Button type="primary" onClick={this.showAddPop}>创建用户</Button>
        )
        const {users,isVisble,roles}=this.state
        const {user}=this
       return (
            <Card  title={title}  style={{ width:'100%',height:'100%'}}>
                <Table  
                rowKey="_id" 
                bordered 
                dataSource={users} 
                columns={this.columns} 
                pagination={{defaultPageSize:8,showQuickJumper:true}}
                />
                <Modal
                    title={user?'修改用户':'添加用户'}
                    visible={isVisble===true}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancel}
                 >
                    <UserFrom user={user} roles={roles} setForm={form=>this.form=form} />
                    
                </Modal>
            </Card>
       )
    }
}