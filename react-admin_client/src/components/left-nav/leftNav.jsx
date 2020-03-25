import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../pages/login/images/logo.png'
import './left-nav.less'
import { Menu, Icon} from 'antd';
import menList from '../../config/menuConfig'
import memoryUtils from "../../utils/memoryUtils"
const { SubMenu } = Menu;
class LeftNav extends Component {
  //判断当前登录用户item是否有权限
  hsAuth=(item)=>{
   const key=item.key
   const menus=memoryUtils.user.role.menus
   if(item.isPublic || memoryUtils.user.username==="admin" || menus.indexOf(key) !==-1){
     return true
   }else if(item.children){
      return  !!item.children.find(child=>menus.indexOf(child.key) !==-1)
   }
   return false
  }
  getMenuNodes=(menList)=>{
      return  menList.map(item=>{
       //如果当前用户对应的item才显示菜单项
        if(this.hsAuth(item)){
          if(item.children){
                const path=this.props.location.pathname
                const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0)
                if(cItem){
                  this.openKey=item.key
                }
              return (
                <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                  {this.getMenuNodes(item.children)} 
                </SubMenu>
              )  
          }else{
            return (
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            ) 
          }
        }
       
         
      })
  }
  componentWillMount(){
    this.menuNodes=this.getMenuNodes(menList)
  }
render() {
let path=this.props.location.pathname
const openKey=this.openKey
if(path.indexOf('/product')===0){
  path='/product'
}
return (
    <div className="left-nav">
       <Link to="/" className="left-nav-header">
           <img src={logo} alt="logo" />
           <h2>react后台</h2>
       </Link>
       <Menu selectedKeys={[path]} defaultOpenKeys={[openKey]}  mode="inline" theme="dark">
          {this.menuNodes} 
        </Menu>
    </div>
);
}
}
export default withRouter(LeftNav)