import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import Detail from './detail'
import Home from './home'
import ProductAddUpdate from './product-add-update'
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
          <Switch>
             <Route path="/product" component={Home}  exact/>
             <Route path="/product/addupdate" component={ProductAddUpdate} exact />
             <Route path="/product/detail" component={Detail} exact />
             <Redirect to="/product" />
          </Switch>
        )
    }
}