import React, { Component } from 'react'
import{connect} from 'react-redux'
import {Card,Icon,List} from 'antd'
import {reqCategory} from '../../api/index'
import {BASE_IMGURL} from '../../utils/constants'
import{saveProduct} from '../../redux/actions'
const Item=List.Item
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cName1:'',
            cName2:''
        }
    }
    async componentDidMount (){
        const{pCategoryId,categoryId}=this.props.getProduct
        if(pCategoryId==="0"){
            const reslut= await reqCategory(categoryId)
            if(reslut.data.data){
               const cName1=reslut.data.data.name
               this.setState({cName1})
            }
        }else{
            const results=await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            if(results[0].data.data){
                const cName1=results[0].data.data.name
                const cName2=results[1].data.data.name
                this.setState({cName1,cName2})
            }
        }
    }
    componentWillUnmount(){
       
    }
    goback=()=>{
        this.props.history.goBack()
    }
    render() {
        const title=(
            <div>
              <Icon 
              type="arrow-left" 
              style={{color:'#1DA57A',marginRight:'10px',cursor:'pointer'}}
              onClick={this.goback}
               />
              <span>商品详情</span>
            </div>
         )
        const {name,desc,price,imgs,detail}=this.props.getProduct
        console.log(this.props.getProduct)
        const {cName1,cName2}=this.state
        return (
            <Card title={title} style={{ width:'100%',height:'100%' }}>
                <List>
                    <Item style={{ justifyContent: 'flex-start'}}>
                        <span style={{fontWeight:'bold',marginRight:'10px'}}>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item style={{ justifyContent: 'flex-start'}}>
                        <span style={{fontWeight:'bold'}}>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item style={{ justifyContent: 'flex-start'}}>
                        <span style={{fontWeight:'bold'}}>商品价格：</span>
                        <span>￥{price}元</span>
                    </Item>
                    <Item style={{ justifyContent: 'flex-start'}}>
                        <span style={{fontWeight:'bold'}}>属于分类：</span>
                        <span>{cName1}{cName2?'>'+cName2:''}</span>
                    </Item>
                    <Item style={{ justifyContent: 'flex-start'}}>
                        <span style={{fontWeight:'bold'}}>商品图片：</span>
                        <div>
                            {
                                imgs.map(item=>(
                                    <img key={item} style={{width:'100px',marginRight:'10px'}} src={BASE_IMGURL+item} alt="" />
                                ))
                            }
                        </div>
                    </Item>
                    <Item style={{ justifyContent: 'flex-start'}}>
                        <span style={{fontWeight:'bold'}}>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </Item>
                </List>
           </Card>
        );
    }
}
export default connect(
    state=>({getProduct:state.getProduct}),
    {saveProduct}
  )(Detail)