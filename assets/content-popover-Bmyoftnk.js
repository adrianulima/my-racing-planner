import{j as e,F as j,D as b,n as c,G as T,J as w,T as y}from"./index-BjDCwdPj.js";import{u as g,h as S,i as z,m as R,k as W,f as l,q as v,r as A,s as B,n as P,C as F,e as J}from"./tracks-CMEQG_zc.js";function N({content:a,list:x}){const[t,i]=a==="cars"?[v,A]:[B,P],d=a==="cars"?F:J,{wishCars:h,wishTracks:p,myCars:u,myTracks:k}=g(),[f,C]=a==="cars"?[h,u]:[p,k];return e.jsx(S,{width:"100%",maxH:"320px",children:e.jsx(z,{size:"sm",striped:!0,children:e.jsx(R,{fontSize:"xs",children:e.jsx(j,{each:x,children:n=>{const s=d[n.toString()],r=f.includes(s==null?void 0:s.sku),o=C.includes(s==null?void 0:s.sku);return s&&e.jsxs(W,{bgColor:"transparent",children:[e.jsx(l,{w:"20px",p:0,borderBottom:0,px:"4px",children:e.jsx(b,{size:"xs",mt:"4px",readOnly:s.free,colorPalette:s.free?"green":r?"blue":void 0,checked:s.free||o||r,controlProps:{borderColor:!s.free&&!r&&!o?"gray.400":void 0},icon:s.free?e.jsx(c,{size:"xs",icon:T}):r?e.jsx(c,{size:"xs",icon:w}):void 0,onClick:m=>m.stopPropagation(),onCheckedChange:()=>{o?(t(s.sku,!1),i(s.sku,!0)):r?i(s.sku,!1):t(s.sku,!0)}})}),e.jsx(l,{width:"100%",display:"flex",alignItems:"center",p:0,borderBottom:0,px:"4px",fontWeight:"bold",maxW:"284px",children:e.jsx(y,{truncate:!0,children:s.name})})]},n)}})})})})}export{N as C};
