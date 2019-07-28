/**
 * 使用module.exports = value向外暴露一个对象
 */
"use strict"
module.exports = {
  msg: 'moudle1',
  foo() {
    console.log(this.msg)
  }
}