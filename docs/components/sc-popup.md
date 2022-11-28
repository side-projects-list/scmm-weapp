# 弹框组件

- ***名称***：`sc-popup`
- ***说明***：带有蒙层、过渡特效的弹框，可使用插槽添加需要显示的内容并设置显示位置。
- ***功能属性***
  |属性名|说明|数据类型|默认值|
  |---|---|:---:|:---:|
  |modelValue|双向绑定值，控制弹框是否显示|`Boolean`|`false`|
  |direction|弹框内容显示的位置|`top` `right` `bottom` `left` `center` | `center`|
  |size|弹框内容大小|`String`|`auto`|
  |backgroundColor|弹框内容背景色|`String`|`ffffff`|
  |radius|弹框内容圆角，非零需带单位|`String` `Number`|`0`|
  |padding|弹框内容内边距|`String`|`0`|
  |closeOnClickModal|是否允许点击蒙层关闭弹框|`Boolean`|`true`|
  |showModal|是否显示弹框蒙层|`Boolean`|`true`|
  |zIndex|层级|`Number`|`99`|
  |modalBackground|蒙层背景色|`String`|`rgba(0,0,0,0.3)`|
- ***交互事件***
  |操作|事件名|说明|回调参数|
  |---|---|---|---|
  |点击|`open`|打开回调||
  ||`opened`|||
  |点击|`close`|关闭回调|客服消息回调|
  ||`closed`|||
- ***插槽***
  - `default`