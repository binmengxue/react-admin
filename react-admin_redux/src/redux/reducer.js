import storageUtils from '../utils/storageUtils'
import {combineReducers} from 'redux'
import {
    SET_HEAD_TITLE,
    SETUSER,
    SHOW_ERROR_MSG,
    RESET_USER,
    SAVEPROUDUCT
} from './action-types'
const initHeadTile=''
function headerTile(state=initHeadTile,action){
    console.log(state,action)
 switch(action.type){
     case SET_HEAD_TITLE:
        return action.data
     default:
         return state
 }
}
const initProduct=storageUtils.getProduct()
function getProduct(state=initProduct,action){
    console.log(action.product)
    switch(action.type){
        case SAVEPROUDUCT:
           return action.product
        default:
           return state
    }
}
const initUser=storageUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
        case SETUSER:
             return action.user
        case RESET_USER:
             return {}
        case SHOW_ERROR_MSG:
            const errorMsg=action.errorMsg
             return {...state,errorMsg}
        default:
            return state
    }
}
export default combineReducers({
    headerTile,
    user,
    getProduct
})