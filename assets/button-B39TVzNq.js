import{ab as h,t as m,j as t,_ as u,a0 as p,ak as b}from"./index-l4xYVy1r.js";function j(o){const e=new Map;return function(r,a){const s=r+(a?Object.entries(a).sort((c,d)=>c[0]<d[0]?-1:1).join():"");if(e.has(s))return e.get(s);let i=new o(r,a);return e.set(s,i),i}}var F=j(Intl.NumberFormat);function g(o,e,n={}){return F(e,n).format(o)}const f=o=>{const{value:e,...n}=o,{locale:r}=h(),a=m.useMemo(()=>g(e,r,n),[e,r,n]);return t.jsx(t.Fragment,{children:a})};f.displayName="FormatNumber";const v=f,y=u("span"),x=u("div",{base:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},variants:{axis:{horizontal:{insetStart:"50%",transform:"translateX(-50%)"},vertical:{top:"50%",transform:"translateY(-50%)"},both:{insetStart:"50%",top:"50%",transform:"translate(-50%, -50%)"}}},defaultVariants:{axis:"both"}});x.displayName="AbsoluteCenter";const{withContext:C,PropsProvider:w}=p({key:"spinner"}),l=C("span"),B=m.forwardRef(function(e,n){const{loading:r,disabled:a,loadingText:s,children:i,...c}=e;return t.jsx(b,{disabled:r||a,ref:n,...c,children:r&&!s?t.jsxs(t.Fragment,{children:[t.jsx(x,{display:"inline-flex",children:t.jsx(l,{size:"inherit",color:"inherit"})}),t.jsx(y,{opacity:0,children:i})]}):r&&s?t.jsxs(t.Fragment,{children:[t.jsx(l,{size:"inherit",color:"inherit"}),s]}):i})});export{B,v as F};
