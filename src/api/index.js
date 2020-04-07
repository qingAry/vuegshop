import ajax from './ajax' //所有的接口
// 获取商品的三级目录
export  let  reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
