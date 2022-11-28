# 按钮组件

- ***名称***：`sc-button`
- ***说明***：小程序按钮默认提供的选项能力较差，如尺寸、颜色等都被限制在少数内。所以基于小程序 `button` 组件重新封装一个灵活性较高的组件。
- ***功能属性***
  |属性名|说明|数据类型|默认值|
  |---|---|:---:|:---:|
  |background|按钮背景色|`String`|`#385aff`|
  |text|按钮显示文本|`String`||
  |color|按钮字体颜色|`String`|`#ffffff`|
  |disabledBackground|按钮禁用背景色|`String`||
  |disabledColor|按钮禁用字体颜色|`String`||
  |borderWidth|按钮边框宽度|`String`|`1rpx`|
  |borderColor|按钮边框颜色|`String`| |
  |width|按钮宽度|`String`|`100%`|
  |height|按钮高度|`String`|`80rpx`|
  |size|字体大小，单位`rpx`|`String`/`Number`|`32`|
  |bold|按钮是否粗体|`Boolean`|`false`|
  |margin|外边距|`String`|`0`|
  |radius|按钮圆角|`String`|`0`|
  |plain|是否为朴素型按钮|`Boolean`|`false`|
  |link|是否为链接类型按钮|`Boolean`|`false`|
  |disabled|是否禁用按钮|`Boolean`|`false`|
  |loading|是否处于加载中状态|`Boolean`|`false`|
  |formType|用于[form](https://developers.weixin.qq.com/miniprogram/dev/component/form.html)组件，点击分别会触发[form](https://developers.weixin.qq.com/miniprogram/dev/component/form.html)组件的 submit/reset 事件|`String`||
  |openType|微信开放能力|`String`||
- ***交互事件***
  |操作|事件名|说明|回调参数|
  |---|---|---|---|
  |点击|`click`|一般点击事件||
  |点击|`getuserinfo`|设置openType=”getUserInfo”时点击按钮获取用户信息|获取到的用户信息|
  |点击|`contact`|open-type="contact”时点击按钮|客服消息回调|
  |点击|`getphonenumber`|open-type=”getPhoneNumber”时点击按钮获取手机号|获取到的手机号数据|
  |点击|`error`|当使用开放能力时，发生错误的回调||
  |点击|`opensetting`|open-type=”openSetting”时点击按钮打开授权设置页|打开授权设置页后回调|
  |点击|`chooseavatar`|open-type=“chooseAvatar”时点击按钮获取用户头像|获取用户头像回调|
- ***插槽***
  - `default`