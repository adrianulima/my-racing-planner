import{u as h,j as e,F as u,n as m}from"./index-BPee_KE3.js";import{m as j,n as C,p as b,j as w,k as o,l as T,C as f,e as k}from"./content-checkbox-8E5krUOt.js";function R({content:r,list:t}){const n=r==="cars"?f:k,{wishCars:i,wishTracks:x,myCars:l,myTracks:c}=h(),[d,p]=r==="cars"?[i,l]:[x,c];return e.jsx(j,{width:"100%",maxH:"320px",children:e.jsx(C,{size:"sm",striped:!0,children:e.jsx(b,{fontSize:"xs",children:e.jsx(u,{each:t,children:a=>{const s=n[a.toString()];return s&&e.jsxs(w,{bgColor:"transparent",children:[e.jsx(o,{w:"20px",p:0,borderBottom:0,px:"4px",children:e.jsx(T,{size:"xs",mt:"4px",content:r,contentId:s.id,sku:s.sku,free:s.free,owned:p.includes(s==null?void 0:s.sku),wish:d.includes(s==null?void 0:s.sku)})}),e.jsx(o,{width:"100%",display:"flex",alignItems:"center",p:0,borderBottom:0,px:"4px",fontWeight:"bold",maxW:"284px",children:e.jsx(m,{truncate:!0,children:s.name})})]},a)}})})})})}export{R as C};
