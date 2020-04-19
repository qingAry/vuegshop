import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'

//使用mock创建远程的数据
//地址可以任意命名，和请求的地址相同就可以
Mock.mock('/mock/banners',{code:200,data:banners});
Mock.mock('/mock/floors',{code:200,data:floors});

// console.log('执行了')