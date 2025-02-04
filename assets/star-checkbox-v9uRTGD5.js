import{r as p,$ as w,j as n,a0 as E,aa as S,ag as k,ah as R,Z as $,H,I as P,k as m,ai as b,aj as z,n as F,q as W,L as B,t as C,p as L,ak as A,C as G,F as M,al as _,am as N}from"./index-BPee_KE3.js";import{C as O}from"./icons-C5oXAZEU.js";import{P as V,a as D,b as q,T as X,c as Z,d as J,j as v,k as y,E as K,m as Q,n as U,i as Y,p as ee}from"./content-checkbox-8E5krUOt.js";import{u as ne,B as te,C as re}from"./checkbox-C8G7rKO5.js";import{a as se}from"./index-DiS1clUK.js";const T=p.forwardRef((e,r)=>{const t=ne(),s=w(t==null?void 0:t.getInputProps(),e);return n.jsx(E.input,{...s,ref:r})});T.displayName="FieldInput";const oe=S("div",{base:{display:"flex",alignItems:"center",justifyContent:"center"},variants:{inline:{true:{display:"inline-flex"}}}});oe.displayName="Center";const{withContext:ae,PropsProvider:je}=k({key:"input"}),ie=ae(T),I=S("div",{base:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",zIndex:2,color:"fg.subtle",height:"full",fontSize:"sm",px:"3"},variants:{placement:{start:{insetInlineStart:"0"},end:{insetInlineEnd:"0"}}}});function be(e,r){const[t,s]=p.useState(e);return p.useEffect(()=>{const o=setTimeout(()=>{s(e)},r);return()=>{clearTimeout(o)}},[e,r]),t}const ce=p.forwardRef(function(r,t){const{startElement:s,startElementProps:o,endElement:a,endElementProps:c,children:i,startOffset:l="6px",endOffset:f="6px",...u}=r,d=p.Children.only(i);return n.jsxs(R,{ref:t,...u,children:[s&&n.jsx(I,{pointerEvents:"none",...o,children:s}),p.cloneElement(d,{...s&&{ps:`calc(var(--input-height) - ${l})`},...a&&{pe:`calc(var(--input-height) - ${f})`},...i.props}),a&&n.jsx(I,{placement:"end",...c,children:a})]})});function Ce({tabs:e,tab:r,search:t,onTabChange:s,onSearchChange:o}){const{width:a}=$(),c=i=>{o(i)};return n.jsxs(H,{justifyContent:{md:"space-between",base:"center"},mb:2,children:[n.jsxs(V,{open:t!=null&&t.trim()?!0:void 0,positioning:{placement:a.md?"right":"top-start"},children:[n.jsx(D,{asChild:!0,children:n.jsx(P,{"aria-label":"Search",variant:"outline",size:"lg",bgColor:{base:"bg.muted",_hover:"bg"},borderRadius:"md",children:n.jsx(m,{icon:b})})}),n.jsx(q,{children:n.jsx(ce,{width:"360px",maxWidth:"100%",startElement:n.jsx(m,{icon:b}),endElement:t!=null&&t.trim()?n.jsx(m,{onClick:()=>c(""),cursor:"pointer",icon:z}):void 0,children:n.jsx(ie,{placeholder:"Search",variant:"subtle",value:t,onChange:i=>c(i.target.value)})})})]}),n.jsx(X,{size:"sm",value:r,onValueChange:i=>s(i.value),variant:"enclosed",width:{md:"unset",base:"100%"},flex:{md:"unset",base:1},children:n.jsx(Z,{flex:{md:"unset",base:1},width:{md:"unset",base:"100%"},children:Object.entries(e).map(([i,l])=>n.jsxs(J,{value:l,width:{md:"unset",base:"100%"},children:[n.jsx(O,{category:i}),n.jsx(F,{hideBelow:l==="All"?void 0:"md",textWrap:"nowrap",userSelect:"none",children:l})]},l))})})]})}function le({cols:e}){return n.jsx(v,{bgColor:"transparent",children:n.jsx(y,{colSpan:e,minWidth:"100%",children:n.jsx(K,{icon:n.jsx(m,{icon:W}),title:"No results found",description:"Try adjusting your search",children:n.jsxs(B,{variant:"marker",children:[n.jsx(C,{children:"Try removing filters"}),n.jsx(C,{children:"Try different categories"})]})})})})}function de(){return n.jsx(v,{bgColor:"transparent",children:n.jsx(y,{colSpan:8,minWidth:"100%",children:n.jsx(L,{flex:1,justifyContent:"center",alignItems:"center",children:n.jsx(A,{size:"md",borderWidth:"2px"})})})})}function Ie({list:e,rows:r,cols:t,children:s}){const o=p.useRef(null),[a,c]=p.useState(1),{onScroll:i}=G(),l=20,f=a*l<((e==null?void 0:e.length)??0),u=p.useMemo(()=>e==null?void 0:e.slice(0,Math.min(e.length,a*l)),[e,a]),d=h=>{i(h);const x=(h.currentTarget.scrollTop+(h.currentTarget.clientHeight??0))/h.currentTarget.scrollHeight;!(a*l>((e==null?void 0:e.length)??0))&&x>.8&&c(j=>j+1)};return p.useEffect(()=>{var x,g;!(a*l>((e==null?void 0:e.length)??0))&&(((x=o.current)==null?void 0:x.scrollHeight)??0)<=(((g=o.current)==null?void 0:g.clientHeight)??0)&&c(j=>j+1)},[a]),p.useEffect(()=>{var h;(h=o.current)==null||h.scrollTo(0,0)},[e]),n.jsx(Q,{width:"100%",borderRadius:"md",ref:o,onScroll:d,children:n.jsxs(U,{stickyHeader:!0,size:"sm",striped:!0,children:[n.jsx(Y,{children:s}),n.jsxs(ee,{children:[n.jsx(M,{fallback:n.jsx(le,{cols:t}),each:u,children:r}),f&&n.jsx(de,{})]})]})})}function ue(e,r){if(!/^#?[0-9A-Fa-f]{6}$/.test(e))throw new Error("Invalid hex color format");const t=e.startsWith("#")?e.slice(1):e,s=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16),c=d=>Math.floor(d*(1-r)),i=c(s),l=c(o),f=c(a),u=d=>d.toString(16).padStart(2,"0");return`#${u(i)}${u(l)}${u(f)}`}function pe(e,r){if(!/^#?[0-9A-Fa-f]{6}$/.test(e))throw new Error("Invalid hex color format");const t=e.startsWith("#")?e.slice(1):e,s=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16),c=d=>Math.floor(d+(255-d)*r),i=c(s),l=c(o),f=c(a),u=d=>d.toString(16).padStart(2,"0");return`#${u(i)}${u(l)}${u(f)}`}function Se({letter:e,color:r,...t}){const s=ue(`#${r}`,.3),o=pe(`#${r}`,.7);return n.jsx(te,{bg:{base:o,_dark:s},color:{base:s,_dark:o},borderColor:`#${r}`,borderWidth:1,fontWeight:"bold",...t,children:e})}function ve({checked:e,onCheckedChange:r,...t}){return n.jsx(re,{checked:e,onCheckedChange:r,controlProps:{border:"0",p:0,_checked:{bg:"transparent"}},size:"lg",icon:n.jsx(_,{_hover:{color:"yellow"},color:e?"orange":"gray",children:n.jsx(m,{icon:e?N:se,size:"lg"})}),...t})}export{oe as C,Ie as I,Se as L,ve as S,Ce as a,be as u};
