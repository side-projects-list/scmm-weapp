import{u as e,_ as t}from"./sc-scroll-top.615c849b.js";import{u as r}from"./hook-handler.d0811128.js";import{d as a,b as l,e as s,f as o,h as n,H as u,m as i,p as c,t as d,B as p,s as x,M as f,C as m,D as b,v as g,r as v,x as _,Z as h,y,z as k,j,A as w,k as A,l as M,F as I,E as P,ai as z,a6 as B,a1 as D,G as C}from"./index.4b002d2b.js";import{u as S}from"./order-store.0b99a3d0.js";import{_ as N}from"./sc-icon.52d4ad3f.js";import{_ as T}from"./sc-nav-bar.e258cf45.js";import{_ as E}from"./sc-countdown.dec08283.js";import{_ as H}from"./sc-number-box.81c41bd6.js";import{_ as F}from"./sc-button.3d3eb510.js";import{p as U,t as R}from"./index.dfc28261.js";import{_ as V}from"./_plugin-vue_export-helper.cdc0426e.js";import"./order.e64a24ff.js";import{a as O}from"./product.8632e308.js";import{t as Y,r as J}from"./route.99ab519a.js";import"./uni-qrcode.a0d42b81.js";import"./order.c4e6208f.js";import"./product.d0fc3ac7.js";const q=V(a({__name:"sc-submit-bar",props:{...{showButtonPrice:{type:Boolean,default:!1},priceData:{type:Object,default:()=>({currentPrice:1900,originPrice:2030})},buttonText:{type:String,default:"立即支付"},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},actionIcon:{type:String,default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAASFBMVEUAAAAyMjIyMjIyMjIzMzMyMjI0NDQ2NjYyMjIyMjIzMzMzMzMyMjIyMjIwMDAzMzM1NTUwMDAwMDA0NDQyMjI0NDQyMjIzMzMYCsiBAAAAF3RSTlMAgO/fIMBAEJCfUM9wYECwMFAwgKDP0OpV9zgAAAHWSURBVFjD7ZfdkoIwDIX73/JTUFjt+7/pTrPVOmpIsO6VniuGnvkMzWkE8ckyyzRNppExdjoVDfO4vEbxskCqdDT7iwkqPVNndlajEiYp+FquD6VsiL1zLkp7RWt2UeOFEpy4kev0vqJkwaz+YSnqSuJygn+6eWshcTnaoe3UlURzTn4jGANYRiI+f2Hxm9nowHTYBGmqHiBBTXrLJXk58fB7knowRt4c5AM3/uT1VTAUICGbBWnPAXmVS8KsMYPijvjLjZZp7nxQuHmBCAmmAvQFP/SOC3J4vOe8f4Ithdaf82r5IItuUu0Df5PEo6Y5L8xHLmey0Jt7v7HERGb6F5WuUuh8oP2m3t86jLRfww0bZC4Ybx3p74Hr4FIRqcT8dXr0NbD4OcH9NYl4zqoIf01izRki3P+4IHeC5Bf0Bf0DKHBAlF/fn50BIVD+7mYUHInTj/rrS0oPI12VEYGI8JdBJwNc4FME879/ZosD81+E9hudiixRD+nvu3NKunOC/6JF+fkVGdGsnxKfVkXmWwKv/WM7R5cYNmpSb3kwHxLINVYTSqZjSy3HcMmz6l9FxDBnSNHJNHS7Sr3c9/kWM6xetIPOa1OzDvDZNI+9F43yzogP1i/M0U9U6O1QjgAAAABJRU5ErkJggg=="},actionText:{type:String,default:"客服"}}},emits:["submit"],setup:(e,{emit:t})=>(e,r)=>{const a=p,g=x,v=f,_=m(b("sc-button"),F);return l(),s(g,{class:"sc-submit-bar bg-white fixed inset-x-0 bottom-0 z-99 pt-24rpx px-32rpx flex items-center"},{default:o((()=>[n(g,{class:"mr-10rpx flex-shrink-0"},{default:o((()=>[u(e.$slots,"action",{},(()=>[n(g,{class:"flex flex-col items-center px-22rpx",onClick:i(U)},{default:o((()=>[n(a,{src:e.actionIcon,class:"w-48rpx h-48rpx"},null,8,["src"]),n(g,{class:"mt-8rpx text-28rpx text-black leading-none"},{default:o((()=>[c(d(e.actionText),1)])),_:1})])),_:1},8,["onClick"])]),!0)])),_:3}),n(g,{class:"w-full"},{default:o((()=>[u(e.$slots,"default",{},(()=>[n(_,{background:"#eb483f",type:"danger",radius:"80rpx",shape:"circle",height:"88rpx",disabled:e.disabled,loading:e.loading,onClick:r[0]||(r[0]=e=>t("submit"))},{default:o((()=>[e.showButtonPrice?(l(),s(g,{key:1,class:"flex items-center justify-between pl-32rpx w-full"},{default:o((()=>[n(g,{class:"flex items-baseline"},{default:o((()=>[n(g,{class:"text-32rpx font-600"},{default:o((()=>[c(" ¥"),n(v,{class:"text-48rpx"},{default:o((()=>[c(d(e.priceData.currentPrice),1)])),_:1})])),_:1}),n(g,{class:"text-24rpx font-500 ml-6rpx line-through"},{default:o((()=>[c(" ¥"+d(e.priceData.originPrice),1)])),_:1})])),_:1}),n(g,{class:"flex"},{default:o((()=>[n(g,{class:"w-2rpx h-40rpx bg-white mt-24rpx"}),n(g,{class:"font-500 text-36rpx px-48rpx"},{default:o((()=>[c(d(e.buttonText),1)])),_:1})])),_:1})])),_:1})):(l(),s(g,{key:0,class:"font-500 text-36rpx"},{default:o((()=>[c(d(e.buttonText),1)])),_:1}))])),_:1},8,["disabled","loading"])]),!0)])),_:3})])),_:3})}}),[["__scopeId","data-v-8a883897"]]),Q=V(a({__name:"index",setup(a){const{handlePageScroll:u,scrollTop:F,opacity:U}=e(750),{handlePulldownRefresh:V}=r(),Q=g(),G=S(),L=v(0),W=v(),Z=v(0);function K(e){Z.value=e.detail.current}const $=v(1);function X(e){$.value=e.value}const ee=_((()=>{var e,t;return{currentPrice:$.value*((null==(e=W.value)?void 0:e.price)||0),originPrice:$.value*((null==(t=W.value)?void 0:t.originPrice)||0)}}));function te(){G.setCheckoutData({quality:$.value,product:W.value}),J("/pages/order/checkout/index")}function re(e){let t=`<p class="flex items-center justify-between">${e.split("").map((e=>`<span>${e}</span>`)).join("")}</p>`;return t=t.replace(/uno-\w+\s/g,""),t}return h((e=>{const{id:t}=e;if(!Number(t))return R("无效商品"),void setTimeout((()=>{Y()}),1501);L.value=Number(t),W.value=O(L.value)})),y(u),k(V),(e,r)=>{const a=m(b("sc-icon"),N),u=x,g=m(b("sc-nav-bar"),T),v=p,_=C,h=P,y=f,k=m(b("sc-countdown"),E),S=m(b("sc-number-box"),H),R=z,V=m(b("sc-scroll-top"),t);return l(),s(u,{class:"product-detail"},{default:o((()=>{var e;return[n(g,{fixed:!0,"bg-color":`rgba(255,255,255,${i(U)})`,title:null==(e=i(W))?void 0:e.name,"title-style":{fontSize:"32rpx",fontWeight:500,color:`rgba(0,0,0,${i(U)})`},"status-bar-height":i(Q).getSystemInfo().statusBarHeight,onLeftClick:i(Y)},{left:o((()=>[n(u,{class:"rounded-50rpx w-40rpx h-40rpx border-1rpx flex items-center justify-center",style:j({borderColor:`rgba(255,255,255,${1-i(U)})`})},{default:o((()=>[n(a,{name:"arrow-left",size:"40",bold:!1})])),_:1},8,["style"])])),_:1},8,["bg-color","title","title-style","status-bar-height","onLeftClick"]),w(" 轮播图 "),n(u,{class:"relative"},{default:o((()=>{var e;return[n(h,{autoplay:"",current:i(Z),interval:6e3,circular:"",class:"w-full h-750rpx",onChange:K},{default:o((()=>{var e;return[(l(!0),A(I,null,M(null==(e=i(W))?void 0:e.images,((e,t)=>(l(),s(_,{key:t,class:"w-full h-750rpx"},{default:o((()=>[n(u,{class:"w-full h-750rpx"},{default:o((()=>[n(v,{src:e,mode:"aspectFill",class:"w-full h-full",onClick:e=>function(e){var t;D({urls:(null==(t=W.value)?void 0:t.images)||[],current:e})}(t)},null,8,["src","onClick"])])),_:2},1024)])),_:2},1024)))),128))]})),_:1},8,["current"]),(null==(e=i(W).images)?void 0:e.length)>0?(l(),s(u,{key:0,class:"absolute right-32rpx bottom-20rpx bg-opacity-50 bg-black-dark h-32rpx leading-32rpx text-white rounded-32rpx px-14rpx text-24rpx"},{default:o((()=>{var e;return[c(d(i(Z)+1)+"/"+d(null==(e=i(W))?void 0:e.images.length),1)]})),_:1})):w("v-if",!0)]})),_:1}),w(" 商品说明 "),n(u,{class:"bg-white mx-32rpx rounded-24rpx p-32rpx box-border mt-32rpx"},{default:o((()=>{var e;return[n(u,{class:"flex items-end justify-between"},{default:o((()=>[n(u,{class:"text-error text-32rpx font-600"},{default:o((()=>{var e;return[c(" ¥"),n(y,{class:"text-56rpx ml-6rpx"},{default:o((()=>{var e;return[c(d((null==(e=i(W))?void 0:e.price)||0),1)]})),_:1}),(null==(e=i(W))?void 0:e.originPrice)?(l(),s(y,{key:0,class:"ml-16rpx line-through text-gray-light font-400"},{default:o((()=>[c(" ¥"+d(i(W).originPrice),1)])),_:1})):w("v-if",!0)]})),_:1}),n(u,{class:"text-24rpx text-gray-light"},{default:o((()=>{var e;return[c(" 库存"+d((null==(e=i(W))?void 0:e.stock)||0)+"件 ",1)]})),_:1})])),_:1}),n(u,{class:"font-500 text-36rpx mt-24rpx"},{default:o((()=>{var e;return[c(d((null==(e=i(W))?void 0:e.name)||""),1)]})),_:1}),(null==(e=i(W))?void 0:e.description)?(l(),s(u,{key:0,class:"text-gray-light mt-8rpx"},{default:o((()=>[c(d(i(W).description),1)])),_:1})):w("v-if",!0),n(u,{class:"text-24rpx text-error mt-16rpx flex"},{default:o((()=>[c(" 距离结束还剩 "),n(k,{time:112259,days:"","border-color":"transparent","colon-color":i(B),color:i(B),"background-color":"transparent","is-colon":!1,size:24,"colon-size":24,onEnd:r[0]||(r[0]=()=>{})},null,8,["colon-color","color"])])),_:1}),n(u,{class:"pt-30rpx border-t-2rpx border-gray-200 flex items-center justify-between mt-20rpx"},{default:o((()=>[n(u,{class:"text-black-dark"},{default:o((()=>{var e;return[c(" 购买数量"),(null==(e=i(W))?void 0:e.maxPurchaseQuantity)?(l(),s(y,{key:0,class:"text-20rpx"},{default:o((()=>[c(" （限购"+d(i(W).maxPurchaseQuantity)+"件） ",1)])),_:1})):w("v-if",!0)]})),_:1}),n(u,{class:"border-2rpx rounded-24rpx border-gray-200"},{default:o((()=>{var e,t;return[n(S,{value:i($),min:1,max:(null==(e=i(W))?void 0:e.maxPurchaseQuantity)?i(W).maxPurchaseQuantity:null==(t=i(W))?void 0:t.stock,"icon-color":"#333","background-color":"transparent",onChange:X},null,8,["value","max"])]})),_:1})])),_:1})]})),_:1}),w(" 单品类型细节 "),n(u,{class:"mx-32rpx mt-32rpx bg-white rounded-24rpx p-32rpx box-border leading-none"},{default:o((()=>[n(u,{class:"flex items-start py-20rpx"},{default:o((()=>[n(u,{class:"flex-shrink-0 w-120rpx specific-label mr-60rpx"},{default:o((()=>[n(R,{nodes:re("限购")},null,8,["nodes"])])),_:1}),n(u,null,{default:o((()=>{var e;return[c(d((null==(e=i(W))?void 0:e.maxPurchaseQuantity)?"限购":"不限购"),1)]})),_:1})])),_:1}),n(u,{class:"flex items-start py-20rpx"},{default:o((()=>[n(u,{class:"flex-shrink-0 w-120rpx specific-label mr-60rpx"},{default:o((()=>[n(R,{nodes:re("有效期")},null,8,["nodes"])])),_:1}),n(u,null,{default:o((()=>[c("购买后180天有效")])),_:1})])),_:1}),n(u,{class:"flex items-start py-20rpx"},{default:o((()=>[n(u,{class:"flex-shrink-0 w-120rpx specific-label mr-60rpx"},{default:o((()=>[n(R,{nodes:re("适用门店")},null,8,["nodes"])])),_:1}),n(u,null,{default:o((()=>[c("5家门店适用")])),_:1})])),_:1})])),_:1}),n(u,{class:"text-center mt-48rpx"},{default:o((()=>[n(y,{class:"text-gray-light"},{default:o((()=>[c(" — ")])),_:1}),c(" 商品详情 "),n(y,{class:"text-gray-light"},{default:o((()=>[c(" — ")])),_:1})])),_:1}),n(u,{class:"product-content mx-32rpx mt-32rpx bg-white rounded-24rpx overflow-hidden"},{default:o((()=>{var e;return[n(R,{nodes:(null==(e=i(W))?void 0:e.content)||""},null,8,["nodes"])]})),_:1}),n(q,{"show-button-price":"","price-data":i(ee),"button-text":"限时抢购","action-text":"咨询",onSubmit:te},null,8,["price-data"]),n(V,{"scroll-top":i(F),bottom:240},null,8,["scroll-top"])]})),_:1})}}}),[["__scopeId","data-v-2680ebce"]]);export{Q as default};
