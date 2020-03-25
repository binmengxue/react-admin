import React, { Component } from 'react'
import{Card,Button,Table, message,Modal} from 'antd'
import {PAGESIZE} from '../../utils/constants'
import{connect} from 'react-redux'
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api/index'
import AddFrom from './add-from'
import UpdateRole from './updateRole'
import {formateDate} from '../../utils/dateUtils'
import {logout} from '../../redux/actions'
import  './role.less'
class Role extends Component {
    constructor(props) {
        super(props);
        this.auth=React.createRef()
        this.state = {
            roles:[],//所有角色
            role:{},//相中的对象
            menus:[],
            showVisble:0
        }
    }
    inintColumns=()=>{
        this.columns = [
            {
              title: '角色名称',
              dataIndex: 'name',
              key: 'name',
              align:'left',
              width:'20%'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                align:'left',
                render:(create_time)=>formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                align:'left',
                render:formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name',
                align:'left'
            },
        ]
    }
    onRow=(role)=>{
       return{
           onClick:event=>{
              this.setState({role})
           }
       }
    }
    getRoles=async()=>{
        const reslut=await reqRoles()
        if(reslut.data.status===0){
            const roles=reslut.data.data
            this.setState({roles})
        }
    }
    addRole= async()=>{
      this.form.validateFields(async(errors,values)=>{
        if(!errors){
          this.setState({
              showVisble:0
          })
          const {roleName}=values
          this.form.resetFields()//重置所有的数据
          const reslut=await reqAddRole(roleName)
          if(reslut.data.status===0){
              message.success('添加角色成功')
              //更新toles状态：基于原来状态更新
              this.setState(state=>({
                    roles:[...state.roles,reslut.data.data]
            }))
                //this.getRoles()
              
          }else{
             message.success('添加角色失败')
          }
        }
      })

    }
    //更新角色
    updateRole=async()=>{
        this.setState({
            showVisble:0
        })
      const role=this.state.role
      const menus=this.auth.current.getMenus();
            role.menus=menus
    role.auth_name=this.props.user.username
 
    role.auth_time=Date.now()
      const result=await reqUpdateRole(role)
      console.log(result)
      console.log(this.props.user)
        if(result.data.status===0){
            if(role._id===this.props.user.role_id){
                
                this.props.logout()
                this.props.history.replace('/login')
            }else{
                message.success('角色设置成功')
                this.getRoles()
            }
        }else{
            message.success('角色设置失败') 
        }
    }
    //显示添加角色
    showAddPop=()=>{
        this.setState({
            showVisble:1
        }) 
    }
    //显示设置角色权限
    showUpdatePop=()=>{
        this.setState({
            showVisble:2
        })  
    }
    handleCancel=()=>{
        this.setState({
            showVisble:0
        })
    }
    //关闭添加角色
    componentWillMount(){
        this.inintColumns()
    }
    componentDidMount(){
         this.getRoles()
    }
    render() {
        const {roles,role,showVisble}=this.state
        const title=(
            <div>
              <Button  type='primary' onClick={this.showAddPop}>创建角色</Button>
              <Button  type='primary' style={{marginLeft:'10px'}} disabled={!role._id} onClick={this.showUpdatePop}>设置角色权限</Button>
            </div>
         )
        return (
            <Card className="cardtitle" title={title}  style={{ width:'100%',height:'100%',overflow:'auto' }}>
                <Table  
                bordered 
                rowKey='_id'
                rowSelection={{
                    type:'radio',
                    selectedRowKeys:[role._id],
                    onSelect:(role)=>{
                      this.setState({role})
                    }
                }}
                dataSource={roles} 
                columns={this.columns} 
                pagination={{
                    defaultPageSize:PAGESIZE,
                    showQuickJumper:true
                }}
                onRow={this.onRow}
               
                />
                <Modal
                    title="添加角色"
                    visible={showVisble===1}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                    >
                    <AddFrom 
                    setForm={(form)=>this.form=form}
                    />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={showVisble===2}
                    onOk={this.updateRole}
                    onCancel={this.handleCancel}
                    >
                    <UpdateRole role={role} ref={this.auth} />
                </Modal>
            </Card>
            
        );
    }
}
export default connect(
    state=>({user:state.user}),
    {logout}
)(Role) 