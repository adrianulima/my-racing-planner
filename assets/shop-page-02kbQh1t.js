import{j as e,B as W,m as i,u as k,o as T,i as p,p as R,T as b,H as u,A as z,r as h,F as A,a as P,I as B,k as F,Q as V,S as H,U as M,V as _,W as S,X as w,f as N,O as Y,Y as G}from"./index-sXrlPjm0.js";import{T as $,c as q,d as v,j as C,k as g,E as U,l as J,S as E,e as K,r as I,n as L,i as Q,h as f,p as X,P as Z,a as ee,b as se,V as te,I as ne,q as re,f as oe}from"./content-checkbox-DI4l5-lN.js";import{g as ae,S as D}from"./useSeason-B6tOweFy.js";import{C as ie,V as le}from"./content-name-badge-FICSraMy.js";import{B as ce}from"./checkbox-DmF2D5qL.js";import{S as de}from"./cars-CxObbU8V.js";import{F as m}from"./index-FE3L51Bb.js";import"./index-DiS1clUK.js";var y=(s=>(s.TracksUsed="TracksUsed",s.WishlistPanel="WishlistPanel",s))(y||{});function ue({tab:s,setTab:r,...o}){return e.jsx(W,{...o,children:e.jsx($,{size:"sm",value:s,onValueChange:t=>r(t.value),variant:"enclosed",width:"100%",flex:1,children:e.jsxs(q,{flex:1,width:"100%",children:[e.jsx(v,{value:"TracksUsed",width:"100%",children:e.jsx(i,{textWrap:"nowrap",children:"Tracks Used"})}),e.jsx(v,{value:"WishlistPanel",width:"100%",children:e.jsx(i,{textWrap:"nowrap",children:"Wishlist"})})]})})})}function he(){const{favoriteSeries:s}=k();return e.jsx(C,{bgColor:"transparent",children:e.jsx(g,{colSpan:8,minWidth:"100%",children:e.jsx(T,{justifyContent:"start",height:"100%",children:e.jsx(U,{icon:e.jsx(p,{icon:R}),title:s.length>0?"No paid tracks missing":"No series selected",description:s.length>0?"You already own all tracks of your favorite series":"You didn't choose any favorite series"})})})})}function xe({item:s}){const{myTracks:r,wishTracks:o}=k();return e.jsxs(C,{bgColor:"transparent",children:[e.jsx(g,{textAlign:"center",p:0,borderBottom:0,px:"4px",children:e.jsx(J,{size:"sm",mt:"2px",content:"tracks",sku:s.sku,contentId:s.id,free:!1,owned:r.includes(s==null?void 0:s.sku),wish:o.includes(s==null?void 0:s.sku)})}),e.jsx(g,{width:"100%",display:"flex",p:1,borderBottom:0,px:"4px",children:e.jsx(ie,{name:s.name})}),e.jsx(g,{textAlign:"center",p:1,borderBottom:0,px:"4px",children:e.jsx(b,{lazyMount:!0,unmountOnExit:!0,content:Object.keys(s.weeks).map(t=>e.jsxs(u,{justifyContent:"space-between",children:[e.jsx(i,{textAlign:"left",truncate:!0,children:E[t.toString()].name}),e.jsx(i,{textAlign:"right",children:s.weeks[parseInt(t)].join(", ")})]},t)),showArrow:!0,positioning:{placement:"top"},openDelay:200,closeDelay:100,children:e.jsxs(ce,{size:"xs",variant:"solid",_light:{bg:"gray.600"},children:[s.used,"x"]})})})]})}function pe(){const{wishTracks:s,favoriteSeries:r}=k(),{onScroll:o}=z(),t=h.useMemo(()=>r.reduce((n,a)=>{const l=E[a.toString()];return l.weeks.forEach(j=>{const d=K[j.track.id.toString()];if(d.free)return n;const c="group"in d?d.group:d.id;n[c]=n[c]??{id:c,name:d.name,sku:d.sku,weeks:{},used:0};const O=ae(j.date);n[c].weeks[l.id]=n[c].weeks[l.id]??[],n[c].weeks[l.id].push(O),n[c].used++},null),n},{}),[r]),x=h.useMemo(()=>Object.values(t).sort((n,a)=>a.used+Object.keys(a.weeks).length-(n.used+Object.keys(n.weeks).length)).concat(s.map(n=>{const a=I.find(l=>l.sku===n);return a&&!(a.id in t)?{id:a.id,name:a.name,sku:a.sku,weeks:{},used:0}:null}).filter(n=>!!n)),[t]);return e.jsx(T,{flex:1,borderRadius:"md",overflowY:"auto",maxH:"100%",h:x.length>0?void 0:"100%",alignItems:"start",onScroll:o,children:e.jsxs(L,{striped:!0,stickyHeader:!0,height:"100%",borderRadius:"md",width:"100%",children:[e.jsx(Q,{children:e.jsxs(C,{bgColor:"bg.muted",children:[e.jsx(f,{textAlign:"center",children:e.jsx(le,{children:"Owned content"})}),e.jsx(f,{width:"100%",children:"Name"}),e.jsx(f,{textAlign:"center",children:"Used"})]})}),e.jsx(X,{children:e.jsx(A,{fallback:e.jsx(he,{}),each:x,children:n=>e.jsx(xe,{item:n},n.id)})})]})})}function je(){const{shopLoyaltyDiscount:s,shopVolumeDiscount:r}=P();return e.jsxs(Z,{positioning:{placement:"left-start"},children:[e.jsx(ee,{asChild:!0,children:e.jsx(B,{"aria-label":"Settings",variant:"outline",size:"lg",bgColor:{base:"bg.muted",_hover:"bg"},borderRadius:"md",children:e.jsx(p,{icon:F})})}),e.jsx(se,{children:e.jsxs(te,{alignItems:"start",p:2,children:[e.jsx(b,{lazyMount:!0,unmountOnExit:!0,content:"Apply iRacing discounts for bundle purchases",showArrow:!0,positioning:{placement:"top"},openDelay:200,closeDelay:100,ids:{trigger:"volumeDiscount"},children:e.jsx(D,{ids:{root:"volumeDiscount"},checked:r,onCheckedChange:({checked:o})=>V(o),children:"Volume discount"})}),e.jsx(b,{lazyMount:!0,unmountOnExit:!0,content:"Apply iRacing loyalty discount",showArrow:!0,positioning:{placement:"top"},openDelay:200,closeDelay:100,ids:{trigger:"loyaltyDiscount"},children:e.jsx(D,{ids:{root:"loyaltyDiscount"},checked:s,onCheckedChange:({checked:o})=>H(o),children:"Loyalty discount"})})]})})]})}function ge({wishList:s}){return e.jsxs(M,{id:"checkout",as:"a",disabled:s.length<1,size:"lg",href:s.length>0?`${ne.store}?skus=${s.map(r=>r.sku)}`:void 0,target:"_blank",rel:"noreferrer",colorPalette:"blue",children:["Checkout on iRacing.com store",e.jsx(p,{icon:_})]})}function me({wishList:s}){const{shopLoyaltyDiscount:r,shopVolumeDiscount:o}=P(),t=h.useMemo(()=>s.reduce((l,j)=>l+j.price,0),[s]),x=r?20:o?s.length<3?0:s.length<6?10:s.length<20?15:20:0,n=t*x/100,a=t-n;return e.jsxs(u,{mt:2,justifyContent:"space-between",fontWeight:"bold",alignItems:"end",children:[e.jsx(i,{textStyle:"4xl",children:"Total"}),e.jsxs(S,{alignItems:"end",gap:0,children:[(o||r)&&e.jsxs(e.Fragment,{children:[e.jsxs(u,{color:"gray",children:[e.jsx(m,{style:"currency",currency:"USD",value:t}),e.jsx(i,{children:"-"}),e.jsx(m,{style:"currency",currency:"USD",value:n})]}),e.jsxs(i,{color:"gray",textAlign:"center",textStyle:"xs",fontWeight:"normal",children:[x,"% discount (",r?"loyalty":`${s.length} items`,")"]}),e.jsx(w,{mt:1})]}),e.jsx(i,{fontSize:"2xl",children:e.jsx(m,{style:"currency",currency:"USD",value:a})})]})]})}function ye(){const{wishCars:s,wishTracks:r}=k(),o=h.useMemo(()=>I.filter(t=>r.includes(t.sku)).map(t=>({...t,isCar:!1})).concat(de.filter(t=>s.includes(t.sku)).map(t=>({...t,isCar:!0}))),[r,s]);return e.jsxs(S,{flex:1,borderRadius:"md",w:"100%",h:"100%",maxH:"100%",bgColor:"bg.muted",p:4,children:[e.jsxs(u,{justifyContent:"space-between",children:[e.jsx(i,{textStyle:"3xl",children:"Wishlist"}),e.jsx(je,{})]}),e.jsxs(S,{overflowY:"auto",flex:1,fontSize:{base:"sm",md:"md"},gap:{base:1,md:2},children:[e.jsx(w,{}),e.jsx(A,{fallback:e.jsx(U,{icon:e.jsx(p,{icon:R}),title:"Empty wishlist",description:"Add some cars or tracks to your wishlist"}),each:o,children:t=>e.jsxs(h.Fragment,{children:[e.jsxs(u,{children:[e.jsx(p,{icon:t.isCar?N:Y,size:"sm"}),e.jsx(T,{flex:1,children:t.name}),e.jsx(m,{style:"currency",currency:"USD",value:t.price})]}),e.jsx(w,{})]},t.id)})]}),e.jsx(me,{wishList:o}),e.jsx(ge,{wishList:o})]})}function De(){const[s,r]=h.useState(y.TracksUsed),{width:o}=G();return e.jsxs(re,{children:[e.jsx(oe,{title:"Shop Guide",description:`See the tracks most used by your favorite series. Checkout your
          wishlist items at iracing.com`,children:e.jsx(ue,{hideFrom:"md",tab:s,setTab:r})}),e.jsxs(u,{flex:1,alignItems:"start",overflow:"hidden",gap:2,children:[(s===y.TracksUsed||o.md)&&e.jsx(pe,{}),(s===y.WishlistPanel||o.md)&&e.jsx(ye,{})]})]})}export{De as default};
