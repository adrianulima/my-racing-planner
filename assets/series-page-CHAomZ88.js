import{j as e,m as y,n as o,K as F,R as I,a as C,A as b,M as L,f as O,C as A,N as $,O as M,r as p,E as g,w as N}from"./index-BjDCwdPj.js";import{P as B,S as H,C as _,L as U,u as V,a as J}from"./star-checkbox-scEdvR-6.js";import{S as K,k as v,g as s,B as w,f as i,p as q,I as W,P as k,a as E,b as P,l as D,u as G}from"./tracks-CMEQG_zc.js";import{P as Q}from"./page-header-oFxzNBt7.js";import{V as R,C as X}from"./content-name-badge-CcxkRSLf.js";import{f as Y,C as Z}from"./index-DpQBr8-8.js";import{C as T}from"./content-popover-Bmyoftnk.js";const S=Object.values(K).sort((r,t)=>r.license.id-t.license.id||r.name.localeCompare(t.name));function ee(){return e.jsx(y,{padding:{base:"unset",md:4},justifyContent:"space-between",alignItems:"start",children:e.jsx(Q,{title:"My Favorite Series",description:"Select the series you wanna see in your season planner"})})}function ne({list:r,rows:t}){return e.jsx(B,{list:r,rows:t,children:e.jsxs(v,{bgColor:"bg.muted",children:[e.jsx(s,{minWidth:"40px",textAlign:"center",children:e.jsx(R,{children:"Favorite"})}),e.jsx(s,{minWidth:"60px",textAlign:"center",children:e.jsx(R,{children:"Series Logo"})}),e.jsx(s,{width:"100%",children:"Name"}),e.jsx(s,{minWidth:"90px",textAlign:"center",children:"Setup"}),e.jsx(s,{minWidth:"90px",textAlign:"center",children:"Cars"}),e.jsx(s,{minWidth:"90px",textAlign:"center",children:"Tracks"}),e.jsx(s,{minWidth:"90px",textAlign:"center",children:"Category"}),e.jsx(s,{minWidth:"90px",textAlign:"center",children:"Duration"}),e.jsx(s,{minWidth:"90px",textAlign:"center",children:"License"})]})})}function te({duration:r,laps:t}){const l=t?`${t} laps`:`${r} min`;return e.jsxs(w,{colorPalette:t?"pink":"purple",children:[e.jsx(o,{icon:t?F:Y,size:"xs"}),l]})}function re({id:r,logo:t,name:l,cars:d,tracks:h,favorite:j,fixed:u,category:c,license:n,color:a,duration:m,laps:x,official:z}){return e.jsxs(v,{bgColor:"transparent",children:[e.jsx(i,{minWidth:"40px",textAlign:"center",children:e.jsx(H,{onClick:f=>f.stopPropagation(),checked:j,onCheckedChange:f=>q(r,!!f.checked)})}),e.jsx(i,{minWidth:"60px",textAlign:"center",children:t&&e.jsx(_,{children:e.jsx(C,{lazyMount:!0,unmountOnExit:!0,content:e.jsx(b,{loading:"lazy",userSelect:"none",draggable:!1,h:"80px",w:"160px",fit:"contain",src:`${W.image}/img/logos/series/${t}`}),showArrow:!0,positioning:{placement:"top"},openDelay:200,closeDelay:100,children:e.jsx(b,{loading:"lazy",userSelect:"none",draggable:!1,h:"24px",fit:"contain",src:`${W.image}/img/logos/series/${t}`})},t)})}),e.jsx(i,{width:"100%",children:e.jsx(X,{name:l,children:!z&&e.jsx(w,{colorPalette:"yellow",mr:1,children:"Unranked"})})}),e.jsx(i,{minWidth:"90px",textAlign:"center",children:u&&e.jsx(C,{lazyMount:!0,unmountOnExit:!0,content:"Fixed Setup",showArrow:!0,positioning:{placement:"top"},openDelay:200,closeDelay:100,children:e.jsxs(w,{variant:"solid",_light:{bg:"gray.600"},children:[e.jsx(o,{icon:L,size:"sm"}),"Fixed"]})})}),e.jsx(i,{minWidth:"90px",textAlign:"center",children:e.jsxs(k,{lazyMount:!0,unmountOnExit:!0,children:[e.jsx(E,{asChild:!0,children:e.jsxs(y,{gap:1,justifyContent:"center",cursor:"pointer",children:[e.jsx(o,{icon:O}),d.length,e.jsx(o,{icon:A})]})}),e.jsxs(P,{p:2,children:[e.jsx(D,{}),e.jsx(T,{content:"cars",list:d})]})]})}),e.jsx(i,{minWidth:"90px",textAlign:"center",children:e.jsxs(k,{lazyMount:!0,unmountOnExit:!0,children:[e.jsx(E,{asChild:!0,children:e.jsxs(y,{gap:1,justifyContent:"center",cursor:"pointer",children:[e.jsx(o,{icon:$}),h.length,e.jsx(o,{icon:A})]})}),e.jsxs(P,{p:2,children:[e.jsx(D,{}),e.jsx(T,{content:"tracks",list:h})]})]})}),e.jsx(i,{minWidth:"90px",textAlign:"center",children:e.jsx(C,{lazyMount:!0,unmountOnExit:!0,content:M[c],showArrow:!0,positioning:{placement:"top"},openDelay:200,closeDelay:100,children:e.jsx(Z,{fontSize:"16px",category:c})},`${c}`)}),e.jsx(i,{minWidth:"90px",textAlign:"center",children:e.jsx(te,{duration:m,laps:x})}),e.jsx(i,{minWidth:"40px",textAlign:"center",children:e.jsx(U,{letter:n,color:a,children:n})})]})}const se=I.memo(re);function he(){const[r,t]=p.useState(g.all),[l,d]=p.useState(""),[h,j]=p.useState(S),u=V(l,500),{favoriteSeries:c}=G();return p.useEffect(()=>{const n=r===g.all?S:S.filter(x=>g[x.category]===r),a=u.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),m=a?n.filter(x=>x.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(a)):n;j(m)},[u,r]),e.jsxs(N,{direction:"column",height:"100%",width:"100%",gap:"8px",children:[e.jsx(ee,{}),e.jsx(J,{tabs:g,tab:r,onTabChange:t,onSearchChange:d}),e.jsx(ne,{list:h,rows:n=>e.jsx(se,{id:n.id,name:n.name,logo:n.logo,category:n.category,favorite:c.includes(n.id),fixed:n.fixed,cars:n.cars,tracks:[...new Set(n.weeks.map(a=>a.track.id))],license:n.license.letter,color:n.license.color,duration:n.duration,laps:n.laps,official:n.official},n.id)})]})}export{he as default};
