import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales:[5, 20, 36, 10, 10, 20],
            stores:[52, 40, 50, 90, 30, 70]
        }
    }
    getOption=()=>{
        const {sales,stores}=this.state
        return {
            title: {
                text: '柱状图'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data:sales
                },
                {
                name: '库存',
                type: 'bar',
                data: stores
                }
          ]
        }

    }
    update=()=>{
        this.setState(state=>({
            sales:state.sales.map(sale=>sale+1),
            stores:state.stores.map(sale=>sale+1)
        }))
    }
    render() {
         return (
             <div>
                 <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>
                <Card title=' 柱状图一'>
                  <ReactEcharts option={this.getOption()} style={{height: 300}}/>
                </Card>
             </div>
         );
    }
}