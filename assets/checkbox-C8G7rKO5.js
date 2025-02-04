import{_ as f,r as l,$ as C,j as c,a0 as k,a3 as R,a8 as g,bc as F,a1 as H,a2 as M,a4 as q,bd as B,be as D,a7 as T,ag as Y,bf as _,bg as z,aa as m,ab as U,a9 as W}from"./index-BPee_KE3.js";const[le,w]=f({name:"FieldContext",hookName:"useFieldContext",providerName:"<FieldProvider />",strict:!1}),[V,v]=f({name:"CheckboxContext",hookName:"useCheckboxContext",providerName:"<CheckboxProvider />"}),N=l.forwardRef((n,o)=>{const e=v(),t=C(e.getControlProps(),n);return c.jsx(k.div,{...t,ref:o})});N.displayName="CheckboxControl";function J(n){const{value:o,onChange:e,defaultValue:t}=n,[r,a]=l.useState(t),s=o!==void 0,d=s?o:r,u=l.useCallback(h=>(s||a(h),e==null?void 0:e(h)),[s,e]);return[d,u]}function K(n={}){const{defaultValue:o,value:e,onValueChange:t,disabled:r,readOnly:a,name:s,invalid:d}=n,u=!(r||a),h=R(t,{sync:!0}),[b,p]=J({value:e,defaultValue:o||[],onChange:h}),x=i=>b.some(P=>String(P)===String(i)),y=i=>{x(i)?O(i):j(i)},j=i=>{u&&(x(i)||p(b.concat(i)))},O=i=>{u&&p(b.filter(P=>String(P)!==String(i)))};return{isChecked:x,value:b,name:s,disabled:!!r,readOnly:!!a,invalid:!!d,setValue:p,addValue:j,toggleValue:y,getItemProps:i=>({checked:i.value!=null?x(i.value):void 0,onCheckedChange(){i.value!=null&&y(i.value)},name:s,disabled:r,readOnly:a,invalid:d})}}const[Q,X]=f({name:"CheckboxGroupContext",hookName:"useCheckboxGroupContext",providerName:"<CheckboxGroupProvider />",strict:!1}),S=l.forwardRef((n,o)=>{const[e,t]=g()(n,["defaultValue","value","onValueChange","disabled","invalid","readOnly","name"]),r=K(e);return c.jsx(Q,{value:r,children:c.jsx(k.div,{ref:o,role:"group",...t,...F.build().group.attrs})})});S.displayName="CheckboxGroup";const I=l.forwardRef((n,o)=>{const e=v(),t=C(e.getHiddenInputProps(),n),r=w();return c.jsx(k.input,{"aria-describedby":r==null?void 0:r.ariaDescribedby,...t,ref:o})});I.displayName="CheckboxHiddenInput";const G=l.forwardRef((n,o)=>{const e=v(),t=C(e.getLabelProps(),n);return c.jsx(k.span,{...t,ref:o})});G.displayName="CheckboxLabel";const Z=(n={})=>{const o=X(),e=w(),t=l.useMemo(()=>C(n,(o==null?void 0:o.getItemProps({value:n.value}))??{}),[n,o]),{getRootNode:r}=H(),{dir:a}=M(),s={id:l.useId(),ids:{label:e==null?void 0:e.ids.label,hiddenInput:e==null?void 0:e.ids.control},dir:a,disabled:e==null?void 0:e.disabled,readOnly:e==null?void 0:e.readOnly,invalid:e==null?void 0:e.invalid,required:e==null?void 0:e.required,getRootNode:r,checked:t.defaultChecked,...t},d={...s,checked:t.checked,onCheckedChange:R(t.onCheckedChange,{sync:!0})},[u,h]=q(B(s),{context:d});return D(u,h,T)},L=l.forwardRef((n,o)=>{const[e,t]=g()(n,["checked","defaultChecked","disabled","form","id","ids","invalid","name","onCheckedChange","readOnly","required","value"]),r=Z(e),a=C(r.getRootProps(),t);return c.jsx(V,{value:r,children:c.jsx(k.label,{...a,ref:o})})});L.displayName="CheckboxRoot";const A=l.forwardRef((n,o)=>{const[{value:e},t]=g()(n,["value"]),r=C(e.getRootProps(),t);return c.jsx(V,{value:e,children:c.jsx(k.label,{...r,ref:o})})});A.displayName="CheckboxRootProvider";const{PropsProvider:ue,withContext:ee}=Y({key:"badge"}),he=ee("span"),oe=l.forwardRef(function(o,e){const t=_({key:"checkmark",recipe:o.recipe}),[r,a]=t.splitVariantProps(o),{checked:s,indeterminate:d,disabled:u,unstyled:h,children:b,...p}=a,x=h?z:t(r);return c.jsx(m.svg,{ref:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3px",strokeLinecap:"round",strokeLinejoin:"round","data-state":d?"indeterminate":s?"checked":"unchecked","data-disabled":U(u),css:[x,o.css],...p,children:d?c.jsx("path",{d:"M5 12h14"}):s?c.jsx("polyline",{points:"20 6 9 17 4 12"}):null})}),{withProvider:$,withContext:E,useStyles:te,PropsProvider:xe}=W({key:"checkbox"});$(A,"root",{forwardAsChild:!0});const re=$(L,"root",{forwardAsChild:!0}),ne=E(G,"label",{forwardAsChild:!0}),se=E(N,"control",{forwardAsChild:!0}),ce=l.forwardRef(function(o,e){const{checked:t,indeterminate:r,...a}=o,s=v(),d=te();return t&&s.checked?c.jsx(m.svg,{ref:e,asChild:!0,...a,css:[d.indicator,o.css],children:t}):r&&s.indeterminate?c.jsx(m.svg,{ref:e,asChild:!0,...a,css:[d.indicator,o.css],children:r}):c.jsx(oe,{ref:e,checked:s.checked,indeterminate:s.indeterminate,disabled:s.disabled,unstyled:!0,...a,css:[d.indicator,o.css]})});m(S,{base:{display:"flex",flexDirection:"column",gap:"1.5"}},{forwardAsChild:!0});const ae=I,Ce=l.forwardRef(function(o,e){const{icon:t,children:r,inputProps:a,rootRef:s,controlProps:d,...u}=o;return c.jsxs(re,{ref:s,...u,children:[c.jsx(ae,{ref:e,...a}),c.jsx(se,{...d,children:t||c.jsx(ce,{})}),r!=null&&c.jsx(ne,{children:r})]})});export{he as B,Ce as C,w as u};
