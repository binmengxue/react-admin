import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd';
import {reqDelete} from '../../api/index'
import {BASE_IMGURL} from '../../utils/constants'
export default class PicturesWall extends Component {
    static propTypes={
     imgs:PropTypes.array
    }
constructor(props) {
    super(props);
    let fileList=[]
    const {imgs}=this.props
    
    if(imgs && imgs.length>0){
        fileList= imgs.map((img,index)=>({
            uid:-index,
            name:img,
            status:'done',
            url:BASE_IMGURL+img
        }))
    }
    this.state = {
        previewVisible: false,//是否显示大图
        previewImage: '',
        fileList:fileList,
    };
}
getImgs=()=>{
    return this.state.fileList.map(file=>file.name)
}
handleCancel = () => this.setState({ previewVisible: false });//是否显示大图
getBase64=(file)=> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
handleChange = async({file, fileList }) => {
    if(file.status==="done"){
        
        const result=file.response
       
        if(result.status===0){
            message.success('上传图片成功')
            const {name,url}=result.data
            file=fileList[fileList.length-1]
            file.name=name
            file.url=url
            console.log(file)
        }else{
            message.success('上传图片失败') 
        }

    }else if(file.status==="removed"){
      const reslut= await reqDelete(file.name)
      if(reslut.data.status===0){
        message.success('删除图片成功') 
      }else{
        message.success('删除图片失败') 
      }
    }
    this.setState({ fileList })
}
render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          accept="image/*" /**只接受图片格式 */
          name='image'/**请求参数名 */
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
}
}