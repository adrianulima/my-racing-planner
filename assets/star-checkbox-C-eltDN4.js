import{r as p,_ as w,j as n,$ as E,a9 as S,af as R,ag as $,Y as k,H,I as P,i as m,ah as b,ai as z,m as F,p as W,L as B,q as I,o as L,aj as A,A as G,F as M,ak as _,al as N}from"./index-sXrlPjm0.js";import{C as O}from"./icons-DHbS040X.js";import{P as V,a as D,b as q,T as X,c as Y,d as J,j as v,k as y,E as K,m as Q,n as U,i as Z,p as ee}from"./content-checkbox-DI4l5-lN.js";import{u as ne,B as te,C as re}from"./checkbox-DmF2D5qL.js";import{a as se}from"./index-DiS1clUK.js";const T=p.forwardRef((e,r)=>{const t=ne(),a=w(t==null?void 0:t.getInputProps(),e);return n.jsx(E.input,{...a,ref:r})});T.displayName="FieldInput";const oe=S("div",{base:{display:"flex",alignItems:"center",justifyContent:"center"},variants:{inline:{true:{display:"inline-flex"}}}});oe.displayName="Center";const{withContext:ae,PropsProvider:je}=R({key:"input"}),ie=ae(T),C=S("div",{base:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",zIndex:2,color:"fg.subtle",height:"full",fontSize:"sm",px:"3"},variants:{placement:{start:{insetInlineStart:"0"},end:{insetInlineEnd:"0"}}}});function be(e,r){const[t,a]=p.useState(e);return p.useEffect(()=>{const l=setTimeout(()=>{a(e)},r);return()=>{clearTimeout(l)}},[e,r]),t}const ce=p.forwardRef(function(r,t){const{startElement:a,startElementProps:l,endElement:s,endElementProps:i,children:o,startOffset:c="6px",endOffset:f="6px",...u}=r,d=p.Children.only(o);return n.jsxs($,{ref:t,...u,children:[a&&n.jsx(C,{pointerEvents:"none",...l,children:a}),p.cloneElement(d,{...a&&{ps:`calc(var(--input-height) - ${c})`},...s&&{pe:`calc(var(--input-height) - ${f})`},...o.props}),s&&n.jsx(C,{placement:"end",...i,children:s})]})});function Ie({tabs:e,tab:r,search:t,onTabChange:a,onSearchChange:l}){const{width:s}=k(),i=o=>{l(o)};return n.jsxs(H,{justifyContent:{md:"space-between",base:"center"},mb:2,children:[n.jsxs(V,{open:t!=null&&t.trim()?!0:void 0,positioning:{placement:s.md?"right":"top-start"},children:[n.jsx(D,{asChild:!0,children:n.jsx(P,{"aria-label":"Search",variant:"outline",size:"lg",bgColor:{base:"bg.muted",_hover:"bg"},borderRadius:"md",children:n.jsx(m,{icon:b})})}),n.jsx(q,{children:n.jsx(ce,{width:"360px",maxWidth:"100%",startElement:n.jsx(m,{icon:b}),endElement:t!=null&&t.trim()?n.jsx(m,{onClick:()=>i(""),cursor:"pointer",icon:z}):void 0,children:n.jsx(ie,{placeholder:"Search",variant:"subtle",value:t,onChange:o=>i(o.target.value)})})})]}),n.jsx(X,{size:"sm",value:r,onValueChange:o=>a(o.value),variant:"enclosed",width:{md:"unset",base:"100%"},flex:{md:"unset",base:1},children:n.jsx(Y,{flex:{md:"unset",base:1},width:{md:"unset",base:"100%"},children:Object.entries(e).map(([o,c])=>n.jsxs(J,{value:c,width:{md:"unset",base:"100%"},children:[n.jsx(O,{category:o}),n.jsx(F,{hideBelow:c==="All"?void 0:"md",textWrap:"nowrap",userSelect:"none",children:c})]},c))})})]})}function le({cols:e}){return n.jsx(v,{bgColor:"transparent",children:n.jsx(y,{colSpan:e,minWidth:"100%",children:n.jsx(K,{icon:n.jsx(m,{icon:W}),title:"No results found",description:"Try adjusting your search",children:n.jsxs(B,{variant:"marker",children:[n.jsx(I,{children:"Try removing filters"}),n.jsx(I,{children:"Try different categories"})]})})})})}function de(){return n.jsx(v,{bgColor:"transparent",children:n.jsx(y,{colSpan:8,minWidth:"100%",children:n.jsx(L,{flex:1,justifyContent:"center",alignItems:"center",children:n.jsx(A,{size:"md",borderWidth:"2px"})})})})}function Ce({list:e,rows:r,cols:t,children:a}){const l=p.useRef(null),[s,i]=p.useState(1),{onScroll:o}=G(),c=20,f=s*c<((e==null?void 0:e.length)??0),u=p.useMemo(()=>e==null?void 0:e.slice(0,Math.min(e.length,s*c)),[e,s]),d=h=>{o(h);const x=(h.currentTarget.scrollTop+(h.currentTarget.clientHeight??0))/h.currentTarget.scrollHeight;!(s*c>((e==null?void 0:e.length)??0))&&x>.8&&i(j=>j+1)};return p.useEffect(()=>{var x,g;!(s*c>((e==null?void 0:e.length)??0))&&(((x=l.current)==null?void 0:x.scrollHeight)??0)<=(((g=l.current)==null?void 0:g.clientHeight)??0)&&i(j=>j+1)},[s]),p.useEffect(()=>{var h;(h=l.current)==null||h.scrollTo(0,0)},[e]),n.jsx(Q,{width:"100%",borderRadius:"md",ref:l,onScroll:d,children:n.jsxs(U,{stickyHeader:!0,size:"sm",striped:!0,children:[n.jsx(Z,{children:a}),n.jsxs(ee,{children:[n.jsx(M,{fallback:n.jsx(le,{cols:t}),each:u,children:r}),f&&n.jsx(de,{})]})]})})}function ue(e,r){if(!/^#?[0-9A-Fa-f]{6}$/.test(e))throw new Error("Invalid hex color format");const t=e.startsWith("#")?e.slice(1):e,a=parseInt(t.slice(0,2),16),l=parseInt(t.slice(2,4),16),s=parseInt(t.slice(4,6),16),i=d=>Math.floor(d*(1-r)),o=i(a),c=i(l),f=i(s),u=d=>d.toString(16).padStart(2,"0");return`#${u(o)}${u(c)}${u(f)}`}function pe(e,r){if(!/^#?[0-9A-Fa-f]{6}$/.test(e))throw new Error("Invalid hex color format");const t=e.startsWith("#")?e.slice(1):e,a=parseInt(t.slice(0,2),16),l=parseInt(t.slice(2,4),16),s=parseInt(t.slice(4,6),16),i=d=>Math.floor(d+(255-d)*r),o=i(a),c=i(l),f=i(s),u=d=>d.toString(16).padStart(2,"0");return`#${u(o)}${u(c)}${u(f)}`}function Se({letter:e,color:r,...t}){return n.jsx(te,{bg:ue(`#${r}`,.3),color:pe(`#${r}`,.7),borderColor:`#${r}`,borderWidth:1,fontWeight:"bold",...t,children:e})}function ve({checked:e,onCheckedChange:r,...t}){return n.jsx(re,{checked:e,onCheckedChange:r,controlProps:{border:"0",p:0,_checked:{bg:"transparent"}},size:"lg",icon:n.jsx(_,{_hover:{color:"yellow"},color:e?"orange":"gray",children:n.jsx(m,{icon:e?N:se,size:"lg"})}),...t})}export{oe as C,Ce as I,Se as L,ve as S,Ie as a,be as u};
