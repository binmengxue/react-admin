import React, { Component } from 'react'
import './home.less'
import{connect} from 'react-redux'
import{Card,Select,Input,Button,Icon,Table, message} from 'antd'
import {PAGESIZE} from '../../utils/constants'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api/index'
import{saveProduct} from '../../redux/actions'
const Option=Select.Option
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            total:0,
            searchName:'',
            searchType:'productName',
            loading:false
        }
        
    }
    inintColumns=()=>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>(
                    '￥'+price
                )
            },
            {
              title: '状态',
              render:(product)=>{
                const {status,_id}=product
                const newStatus=status===1?0:1
                return(
                    <div className="btnDiv">
                       <Button type="primary" onClick={()=>this.updateStatus(_id,newStatus)}>
                        {
                            status===1?'下架':'上架'
                        }
                       </Button>
                       <span style={{marginLeft:'10px',color:'#222'}}> 
                         {
                            status===1?'在售':'已下架'
                          }
                       </span>
                    </div>
                )
              }
              
            },
            {
              title: '操作',
              render:(product)=>{
                return(
                  <div className="btnDiv2">
                       <span onClick={()=>this.showDetail(product)}>详情</span>
                       <span style={{marginLeft:'10px'}} onClick={()=>this.showUpdate(product)}>修改</span>
                  </div>
                )
                   
              }
            }
        ]
    }
    showDetail=(product)=>{
        this.props.saveProduct(product)
        this.props.history.push('/product/detail')
    }
    showUpdate=(product)=>{
        this.props.saveProduct(product)
        this.props.history.push('/product/addupdate')
    }
    getProducts=async(pageNum)=>{
        this.pageNum=pageNum //这是为以后上架下架准备的页码存储
        this.setState({loading:true})
        const {searchName,searchType}=this.state
        let result
        if(searchName && searchName!==""){
            result=await reqSearchProducts({pageNum,pageSize:PAGESIZE,searchName,searchType})
        }else{
            result=await reqProducts(pageNum,PAGESIZE)
        }
        this.setState({loading:false})
        if(result.data.status===0){
            const {total,list}=result.data.data
           this.setState(
               {
                total,
                products:list 
               }
           )
        }
    }
    //对产品的上架或者下架
    updateStatus= async(parentId,status)=>{
        const result=await reqUpdateStatus(parentId,status)
        if(result.data.status===0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }
    }
     //更新商品
    showAddProduct=()=>{
        this.props.saveProduct({})
        this.props.history.push('/product/addupdate')
    }
    componentWillMount(){
        this.inintColumns()
    }
    componentDidMount(){
        this.getProducts(1)
    }
    render() {
        const {products,total,searchName,searchType,loading}=this.state
        const extra=(
            <Button type='primary' onClick={this.showAddProduct}>
                <Icon type="plus" />添加商品
            </Button>
        )
        const title=(
            <div>
              <Select value={searchType} onChange={(value)=>this.setState({searchType:value})}>
                  <Option value="productName">按名称搜索</Option>
                  <Option value="productDesc">按描述搜索</Option>
              </Select>
              <Input type="text" placeholder="关键字" 
              value={searchName} 
              style={{margin:'0px 10px',width:'150px'}} 
              onChange={(event)=>this.setState({searchName:event.target.value})}
              />
              <Button type='primary' onClick={()=>{this.getProducts(1)}}>搜索</Button>
            </div>
         )
        
        return (
          <Card className="cardtitle" title={title} extra={extra} style={{ width:'100%',height:'100%',overflow:'auto' }}>
              <Table  
                bordered 
                rowKey='_id'
                dataSource={products} 
                columns={this.columns} 
                loading={loading}
                pagination={{
                    defaultPageSize:PAGESIZE,
                    showQuickJumper:true,
                    onChange:this.getProducts ,
                    total,
                    current:this.pageNum
                }}
               
                />
          </Card>
        );
    }
}
export default connect(
    state=>({getProduct:state.getProduct}),
    {saveProduct}
  )(Home)