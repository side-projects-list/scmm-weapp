# 底部提交栏

- ***名称***：`sc-submit-bar`

- ***说明***：提交栏，可用于商品下单、确认支付的固定底部提交操作栏。组件分为左侧（操作区）和右侧（主按钮区），提供两个对应的插槽。

  组件有两种模式，1).主按钮区划分左右两侧分别显示金额和提交按钮；2).主按钮区单一显示提交按钮

- ***功能属性***
  |属性名|说明|数据类型|默认值|
  |---|---|:---:|:---:|
  |showButtonPrice|是否在主按钮显示价格/划线价|`Boolean`|`false`|
  |priceData|价格（优惠价、划线价）对象|`Object: {currentPrice: number,originPrice: number}`|`{currentPrice: 1900,originPrice: 2030,}`|
  |buttonText|主按钮显示操作文字|`String`|`立即支付`|
  |disabled|是否禁用主按钮|`Boolean`|`false`|
  |loading|主按钮是否处于加载中|`Boolean`|`false`|
  |actionIcon|操作按钮（左侧）图标|`String`|`/static/images/icons/ic_kf.png`|
  |actionText|操作按钮（左侧）文字|`String`|`客服`|
  
- ***交互事件***
  |操作|事件名|说明|回调参数|
  |---|---|---|---|
  |点击|`submit`|主按钮点击事件||

- ***插槽***

  - `action`：左侧操作区
  - `default`：主按钮区