 import { getUUID } from '@/untils/usersUntils' //引入获取的随机tempid
 import { reqLogin,reqRegister,reqLogout } from '@/api'
export default {
  state: { 
    userInfo:JSON.parse(localStorage.getItem('USER_INFO_KEY')) || {},//用户登录信息
    userTempId : getUUID()
   },
  mutations: { 
    RECEIVE_USERINFO(state,userInfo){
       state.userInfo = userInfo
    },
    CLEAR__USERINFO(state){
      state.userInfo = {}
    }

   },
  actions: { 
    async getLogin({commit},{mobile,password}){
      let result = await reqLogin(mobile,password);
      if(result.code === 200){
        let userInfo = result.data
        commit('RECEIVE_USERINFO',userInfo)
        // 每次登录之后，都要把信息存储起来
        localStorage.setItem('USER_INFO_KEY', JSON.stringify(userInfo))
      }else{
        throw new Error(result.message || '登录失败')
      }
    },

    async getRegister({commit},userInfo){
       let result = await reqRegister(userInfo);
      //  console.log(result)
       if(result.code !== 200){
        throw new Error(result.message || '注册失败')
      }
    },
    async getLogout({commit}){
      let result = await reqLogout();
       if(result.code === 200){
        let userInfo = result.data
        // 退出登录之后 刷新不保存登录状态
        localStorage.removeItem('USER_INFO_KEY')
        commit('CLEAR__USERINFO')
      }else{
        throw new Error(result.message || '退出登录操作失败')
      }
    }
   },
  getters:{ }

}