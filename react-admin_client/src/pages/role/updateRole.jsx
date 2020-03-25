import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Tree,Button} from 'antd'
import menuList from '../../config/menuConfig'
const Item=Form.Item
const { TreeNode } = Tree;
export default class UpdateRole extends Component {
    static propTypes={
        role:PropTypes.object
       }
    constructor(props) {
        super(props);
        const {menus}=this.props.role
        console.log(menus)
        this.state = {
            checkedKeys:menus
        }
    } 
    getTreeBodes=(menuList)=>{
       return  menuList.map(item=>(
             <TreeNode title={item.title} key={item.key} >
                 {
                    item.children?this.getTreeBodes(item.children):''
                 }
             </TreeNode>
        ))
    }
    onCheck=(checkedKeys,event)=>{
        this.setState({checkedKeys})
    }
    componentWillMount(){
      this.treeNodes=this.getTreeBodes(menuList)
    }
    componentWillReceiveProps(nextProps){
        const menus=nextProps.role.menus
        this.setState({checkedKeys:menus})
    }
    getMenus=()=> this.state.checkedKeys
    render() {
        const {role}=this.props
        const {checkedKeys}=this.state
        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:12}
        }
       return (
        <div>
            <Item label="角色名称" {...formItemLayout}>
                <Input type="text"placeholder="请输入角色名称" value={role.name} />
                
            </Item>
            <Item>
            <Tree 
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
                >
              <TreeNode title='平台权限' key='all' >
                  {this.treeNodes}
              </TreeNode>
            </Tree>
            </Item>
        </div>
       );
    }
}
