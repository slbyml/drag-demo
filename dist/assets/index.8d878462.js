import{u as e,D as o}from"./index.75413458.js";import{_ as s,r as n}from"./index.4a41d5c3.js";import{d as t,a,f as l,I as c,J as d,o as i,c as r,F as m,L as p,P as v,H as f}from"./vendor.5ed3c467.js";var u=t({components:{componentBox:s},setup(){const s=e();let t=0;const c=a([]);window.addEventListener("message",(function(e){c.value=e.data}));const d=l((()=>c.value||[]));return{componentEl:e=>{d.value&&n(d.value[t],s,e),t++},components:d,onComponent:async(e,s)=>{const n=[];if(s.events){for(let e=0;e<s.events.length;e++){const t=s.events[e];"href"===t.method&&t.href&&n.push((()=>new Promise((e=>{window.location.href=t.href,e(void 0)})))),"alert"===t.method&&t.dialog.message&&n.push((()=>o.alert({title:t.dialog.title,message:t.dialog.message,showCancelButton:t.dialog.showCancelButton})))}for(const e of n)await e()}}}}});const h=f("data-v-676b6a57");c("data-v-676b6a57");const g={class:"page"};d();const w=h(((e,o,s,n,t,a)=>(i(),r("div",g,[(i(!0),r(m,null,p(e.components,((o,s)=>(i(),r("div",{key:o.id,class:"item",style:o.style,ref:e.componentEl,onClick:s=>e.onComponent(s,o)},[(i(),r(v(o.component),o.props,null,16))],12,["onClick"])))),128))]))));u.render=w,u.__scopeId="data-v-676b6a57";export default u;