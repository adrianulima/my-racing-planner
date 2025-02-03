import{Z as N,r as i,_ as h,j as n,$ as l,a0 as $,a1 as A,a2 as E,a3 as U,a4 as M,a5 as H,a6 as O,a7 as C,a8 as q,a9 as x,aa as g,u as L}from"./index-sXrlPjm0.js";import{u as k}from"./checkbox-DmF2D5qL.js";import{S as f}from"./content-checkbox-DI4l5-lN.js";const[P,u]=N({name:"SwitchContext",hookName:"useSwitchContext",providerName:"<SwitchProvider />"}),b=i.forwardRef((e,s)=>{const o=u(),t=h(o.getControlProps(),e);return n.jsx(l.span,{...t,ref:s})});b.displayName="SwitchControl";const y=i.forwardRef((e,s)=>{const o=u(),t=h(o.getHiddenInputProps(),e),r=k();return n.jsx(l.input,{"aria-describedby":r==null?void 0:r.ariaDescribedby,...t,ref:s})});y.displayName="SwitchHiddenInput";const R=i.forwardRef((e,s)=>{const o=u(),t=h(o.getLabelProps(),e);return n.jsx(l.span,{...t,ref:s})});R.displayName="SwitchLabel";const _=(e={})=>{const{getRootNode:s}=$(),{dir:o}=A(),t=k(),r={id:i.useId(),ids:{label:t==null?void 0:t.ids.label,hiddenInput:t==null?void 0:t.ids.control},dir:o,disabled:t==null?void 0:t.disabled,readOnly:t==null?void 0:t.readOnly,invalid:t==null?void 0:t.invalid,required:t==null?void 0:t.required,getRootNode:s,checked:e.defaultChecked,...e},c={...r,checked:e.checked,onCheckedChange:E(e.onCheckedChange,{sync:!0})},[d,a]=U(M(r),{context:c});return H(d,a,O)},j=i.forwardRef((e,s)=>{const[o,t]=C()(e,["checked","defaultChecked","disabled","form","id","ids","invalid","label","name","onCheckedChange","readOnly","required","value"]),r=_(o),c=h(r.getRootProps(),t);return n.jsx(P,{value:r,children:n.jsx(l.label,{...c,ref:s})})});j.displayName="SwitchRoot";const v=i.forwardRef((e,s)=>{const[{value:o},t]=C()(e,["value"]),r=h(o.getRootProps(),t);return n.jsx(P,{value:o,children:n.jsx(l.label,{...r,ref:s})})});v.displayName="SwitchRootProvider";const T=i.forwardRef((e,s)=>{const o=u(),t=h(o.getThumbProps(),e);return n.jsx(l.span,{...t,ref:s})});T.displayName="SwitchThumb";const{withProvider:I,withContext:p,useStyles:F,PropsProvider:tt}=q({key:"switch"});I(v,"root",{forwardAsChild:!0});const z=I(j,"root",{forwardAsChild:!0}),J=p(R,"label",{forwardAsChild:!0}),Y=p(b,"control",{forwardAsChild:!0}),Z=p(T,"thumb",{forwardAsChild:!0}),B=i.forwardRef(function(s,o){const t=u(),r=F(),{fallback:c,children:d,...a}=s;return n.jsx(x.span,{ref:o,"data-checked":g(t.checked),...a,css:[r.indicator,s.css],children:t.checked?d:c})}),G=i.forwardRef(function(s,o){const t=u(),{fallback:r,children:c,...d}=s;return n.jsx(x.span,{ref:o,"data-checked":g(t.checked),...d,children:t.checked?c:r})}),K=y,et=i.forwardRef(function(s,o){const{inputProps:t,children:r,rootRef:c,trackLabel:d,thumbLabel:a,...w}=s;return n.jsxs(z,{ref:c,...w,children:[n.jsx(K,{ref:o,...t}),n.jsxs(Y,{children:[n.jsx(Z,{children:a&&n.jsx(G,{fallback:a==null?void 0:a.off,children:a==null?void 0:a.on})}),d&&n.jsx(B,{fallback:d.off,children:d.on})]}),r!=null&&n.jsx(J,{children:r})]})});function m(e){const s=new Date(e),o=s.getUTCDay();if(o!==2){const t=o-2>=0?o-2:o-2+7;s.setUTCDate(s.getUTCDate()-t)}return Q(s)}function Q(e){const s=e.getUTCFullYear(),o=String(e.getUTCMonth()+1).padStart(2,"0"),t=String(e.getUTCDate()).padStart(2,"0");return`${s}-${o}-${t}`}const st=()=>{const{favoriteSeries:e}=L(),s=i.useMemo(()=>[...new Set(e.map(t=>f[t.toString()].weeks.map(r=>m(r.date))).flat())],[e]),o=i.useMemo(()=>e.reduce((t,r)=>{const c=f[r.toString()];return{...t,[r]:c.weeks.reduce((d,a)=>{var S;const w=m(a.date);return{...d,[w]:a.track.id,...c.switching?{[`${w}_cars`]:(S=a.cars)==null?void 0:S.map(D=>D.id)}:{}}},{})}},{}),[e]);return{weeksStartDates:s,seriesDateMap:o}};export{et as S,Q as f,m as g,st as u};
