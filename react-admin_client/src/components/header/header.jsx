import React, { Component } from 'react'
import { Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import './header.less'
import {formateDate} from '../../utils/dateUtils'
import  memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import  {reqWeather} from '../../api/index'
class Header extends Component {
    state={
       currentTime:formateDate(Date.now()),
       dayPictureUrl:'',
       weather:'',
    }
    getTime=()=>{
       this.time= setInterval(()=>{
         const  currentTime=formateDate(Date.now())
         this.setState({currentTime})
        },1000)
    }
    getWeather=async()=>{
        const {dayPictureUrl,weather}= await reqWeather("北京")
        this.setState({dayPictureUrl,weather})
    }
    getTitle=()=>{
        const path=this.props.location.pathname
        let title=""
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title;
            }else if(item.children){
                item.children.forEach(citem=>{
                    if(citem.key===path){
                        title=citem.title;
                    }
                    
                })
            }
        })
        return  title
    }
    logout=()=>{
        Modal.confirm({
            content:'确定退出吗？',
            onOk:()=>{
                storageUtils.removeUser();
                memoryUtils.user={}
              this.props.history.replace("/login")
            }
        })
    }
   /*第一次render()之后执行*/
    componentDidMount(){
       this.getTime()
       this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.time)
    }
   render() {
       const {currentTime,dayPictureUrl,weather}=this.state
       const user=memoryUtils.user.username
       const title=this.getTitle()
    return (
        <div className="header">
            <div className="header-top">
                欢迎{user}
                <span className="btn" onClick={this.logout}>退出</span>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{title}</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    <img src={dayPictureUrl} alt="" />
                    <span>{weather}</span>
                </div>
            </div>
        </div>
    )
   }
}
export default withRouter(Header)