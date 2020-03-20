import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout} from 'antd';
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/leftNav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const {  Content, Footer, Sider } = Layout;
export default class Admin extends Component {
    render() {
        const user=memoryUtils.user
        if(!user || !user._id){
           return <Redirect to="/login" />
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{backgroundColor:'#f1f1f1',padding:'10px 10px 0px 10px',height:'100%'}}>
                        <Switch>
                            <Redirect from='/' exact to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/line" component={Line}/>
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>推荐使用google浏览器</Footer>
                </Layout>
            </Layout>
        );
    }
}