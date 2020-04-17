import UUID from 'uuidjs'

export function getUUID(params) {
  let uuid = localStorage.getItem('UUID_KEY');
  //先保存到浏览器进行记录
  if(!uuid){
    uuid = UUID.generate();
    localStorage.setItem('UUID_KEY',uuid)
  }
  //返回一个uuid
  return uuid
}
