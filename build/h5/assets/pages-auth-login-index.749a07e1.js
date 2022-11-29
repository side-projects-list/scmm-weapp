import{d as e,v as a,a2 as t,u as l,r,x as o,Z as s,b as n,e as d,f as u,h as c,p,j as i,m as A,k as x,t as f,F as v,A as m,aj as b,B as g,s as h,a9 as k,C as V,D as S,ah as C}from"./index.4b002d2b.js";import{_ as I}from"./sc-countdown.dec08283.js";import{_ as P}from"./sc-button.3d3eb510.js";import{r as Y,a as z}from"./route.99ab519a.js";import"./uni-qrcode.a0d42b81.js";import{_ as B}from"./_plugin-vue_export-helper.cdc0426e.js";function D(e){return/^[1]([3-9])[0-9]{9}$/.test(e)}const Q=B(e({__name:"index",setup(e){const B=a(),Q=t(),w=(B.getSystemInfo().statusBarHeight||0)+l(88),y=r({phone:"",captcha:""}),M=r(""),W=r(!1),E=r(!1),F=o((()=>0===String(y.value.phone).length)),T=r(!1),R=r(0),U=r("");function O(){U.value=""}function L(){D(y.value.phone)?(T.value=!0,R.value++):U.value="请输入有效手机号！"}function j(){T.value=!1}function N(){const{captcha:e,phone:a}=y.value;e&&a?D(a)?(W.value=!0,E.value=!0,setTimeout((()=>{if(W.value=!1,E.value=!1,e!==b)return void(U.value="无效验证码");Q.setToken(`valid_token:${a}:${(new Date).getTime()}`),Q.setUserInfo({id:1,phone:a});const t=M.value||"/pages/mine/index/index";Y({url:t,mode:z(t)})}),1100)):U.value="请输入有效手机号！":U.value="请输入完表单！"}return s((e=>{M.value=(null==e?void 0:e.redirect)?decodeURIComponent(e.redirect):"",M.value=M.value&&!M.value.startsWith("/")?`/${M.value}`:M.value})),(e,a)=>{const t=g,l=h,r=k,o=V(S("sc-countdown"),I),s=V(S("sc-button"),P);return n(),d(l,{class:"login-index"},{default:u((()=>[c(l,{class:"flex items-center",style:i({paddingTop:`${w}px`})},{default:u((()=>[c(l,{class:"relative w-340rpx h-440rpx"},{default:u((()=>[c(t,{src:"data:image/png;base64,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",class:"w-full h-full absolute -z-1 -left-42rpx -rotate-0 scale-110",mode:"center"})])),_:1}),c(l,{class:"leading-none text-black-dark -ml-114rpx text-center"},{default:u((()=>[c(l,{class:"font-500 text-56rpx"},{default:u((()=>[p(" 欢迎来到SCMM ")])),_:1}),c(l,{class:"text-32rpx mt-16rpx"},{default:u((()=>[p(" 汽车养护商城 ")])),_:1})])),_:1})])),_:1},8,["style"]),c(l,{class:"mx-40rpx rounded-24rpx bg-gray-background h-752rpx box-border -mt-96rpx px-48rpx py-60rpx"},{default:u((()=>[c(l,{class:"text-36rpx font-600"},{default:u((()=>[p(" 账号 ")])),_:1}),c(l,{class:"py-32rpx border-b-1rpx border-gray-light border-opacity-30"},{default:u((()=>[c(r,{modelValue:A(y).phone,"onUpdate:modelValue":a[0]||(a[0]=e=>A(y).phone=e),"placeholder-class":"text-gray-light",maxlength:11,type:"number",placeholder:"请输入手机号","border-bottom":"","background-color":"transparent",padding:"30rpx 0","line-left":!1,onInput:O},null,8,["modelValue"])])),_:1}),c(l,{class:"text-36rpx font-600 mt-48rpx"},{default:u((()=>[p(" 验证码 ")])),_:1}),c(l,{class:"py-32rpx border-b-1rpx border-gray-light border-opacity-30 flex justify-between"},{default:u((()=>[c(r,{modelValue:A(y).captcha,"onUpdate:modelValue":a[1]||(a[1]=e=>A(y).captcha=e),"placeholder-class":"text-gray-light",maxlength:6,type:"number",placeholder:`输入：${A(b)}`,"border-bottom":"","background-color":"transparent",padding:"30rpx 0","line-left":!1,onInput:O},null,8,["modelValue","placeholder"]),c(s,{link:!0,plain:"",disabled:A(F)||A(T),color:A(C),width:"200rpx",height:"40rpx",onClick:L},{default:u((()=>[c(l,{class:"text-right text-32rpx"},{default:u((()=>[A(T)?(n(),d(l,{key:0,class:"flex items-center text-32rpx"},{default:u((()=>[c(o,{time:59,hours:!1,minutes:!1,"border-color":"transparent",color:A(C),"background-color":"transparent",size:32,onEnd:j},null,8,["color"]),p("s后重发 ")])),_:1})):(n(),x(v,{key:1},[p(f(A(R)?"重新发送":"获取验证码"),1)],64))])),_:1})])),_:1},8,["disabled","color"])])),_:1}),c(l,{class:"mt-64rpx"},{default:u((()=>[c(s,{radius:"60rpx",background:A(C),loading:A(W),disabled:A(E),onClick:N},{default:u((()=>[c(l,{class:"text-36rpx font-600"},{default:u((()=>[p(" 登录 ")])),_:1})])),_:1},8,["background","loading","disabled"])])),_:1}),A(U)?(n(),d(l,{key:0,class:"text-error text-32rpx text-center px-32rpx line-clamp-2 mt-64rpx"},{default:u((()=>[p(f(A(U)),1)])),_:1})):m("v-if",!0)])),_:1})])),_:1})}}}),[["__scopeId","data-v-d4b4995c"]]);export{Q as default};
