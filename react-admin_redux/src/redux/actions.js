import {
    SET_HEAD_TITLE,
    SETUSER,
    SHOW_ERROR_MSG,
    RESET_USER,
    SAVEPROUDUCT
} from './action-types'
import {reqLogin} from '../api/index'
import storageUtils from '../utils/storageUtils'
export const setHeadTitle=(headTile)=>({
    type:SET_HEAD_TITLE,
    data:headTile
})
export const saveProduct=(product)=>{
    storageUtils.saveProduct(product)
    return {type:SAVEPROUDUCT,product}
}
export const setUser=(user)=>({
    type:SETUSER,
    user
})
export const showErrorMsg=(errorMsg)=>({
    type:SHOW_ERROR_MSG,
    errorMsg
})
export const logout=()=>{
    storageUtils.removeUser()
    return { type:RESET_USER}
}
export const login=(username,password)=>{
    return  async  dispath=>{
      const result=await reqLogin(username,password)
      if(result.data.status===0){
         const user=result.data.data
         storageUtils.saveUser(user)
         dispath(setUser(user))
      }else{
          const msg=result.data.msg
          dispath(showErrorMsg(msg))
      }
    }
}