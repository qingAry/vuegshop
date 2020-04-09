import ajax from './ajax' //所有的接口
import mockAjax from './mockAjax'
// 获取商品的三级目录
export  let  reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
export let reqBanners = () => mockAjax.get('/banners');
export let reqFloors = () => mockAjax.get('/floors');
