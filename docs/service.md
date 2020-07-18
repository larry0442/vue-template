- 请求的URL必须以（/）结尾，避免重定向
- 尽量使用fetch、query、create、update、delete等字段命名方法
- 接口查、改、增、删进行归类有序编写

## 常见的接口调用方法
### 方法一 
1. 接口文件中导出接口调用函数

```js
// account.js 定义账号相关的接口文件
const baseURL = process.env.VUE_APP_API_PAAS_URL;

/**
 * 修改用户信息
 */
export function updateAccount(params) {
  return request.post(`${baseURL}/auth/personal/updatePersonalInformation`, params);
}
```
2. 页面组件中 导入 函数
3. 使用时以普通函数调用方式
```js
  // vue页面组件中引入并使用

  // 引入
  import { updateAccount } from 'account.js';

  // 使用
  functio handleUpdate () {
    // 注意页面函数和接口请求函数的命名规范
    updateAccount (params)
    .then ( (res) => {
      // ...
    })
  }
  
```

## 方法二
1. 接口挂载在this.$api上
  ```js
  class account {
    static updataAccount(){//...}
  }
  export default account;
  ```
2. 使用时：
  ```js
    this.$api.account.updateAccount()
      .then(()=>{})
  ```