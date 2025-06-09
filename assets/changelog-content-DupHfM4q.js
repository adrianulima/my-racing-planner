import{r as H,be as ve,bf as we,bg as Ae,j as Ce,b6 as Se,p as Re,L as Ie,w as Ee}from"./index-DGpmBzQ5.js";function E(){return E=Object.assign?Object.assign.bind():function(a){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var u in t)Object.prototype.hasOwnProperty.call(t,u)&&(a[u]=t[u])}return a},E.apply(this,arguments)}const $e=["children","options"],s={blockQuote:"0",breakLine:"1",breakThematic:"2",codeBlock:"3",codeFenced:"4",codeInline:"5",footnote:"6",footnoteReference:"7",gfmTask:"8",heading:"9",headingSetext:"10",htmlBlock:"11",htmlComment:"12",htmlSelfClosing:"13",image:"14",link:"15",linkAngleBraceStyleDetector:"16",linkBareUrlDetector:"17",linkMailtoDetector:"18",newlineCoalescer:"19",orderedList:"20",paragraph:"21",ref:"22",refImage:"23",refLink:"24",table:"25",tableSeparator:"26",text:"27",textBolded:"28",textEmphasized:"29",textEscaped:"30",textMarked:"31",textStrikethroughed:"32",unorderedList:"33"};var Z;(function(a){a[a.MAX=0]="MAX",a[a.HIGH=1]="HIGH",a[a.MED=2]="MED",a[a.LOW=3]="LOW",a[a.MIN=4]="MIN"})(Z||(Z={}));const q=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((a,o)=>(a[o.toLowerCase()]=o,a),{class:"className",for:"htmlFor"}),V={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Le=["style","script"],Me=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Te=/mailto:/i,Fe=/\n{2,}$/,ee=/^(\s*>[\s\S]*?)(?=\n\n|$)/,ze=/^ *> ?/gm,Oe=/^(?:\[!([^\]]*)\]\n)?([\s\S]*)/,Pe=/^ {2,}\n/,Be=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,ne=/^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/,te=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Ue=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,je=/^(?:\n *)*\n/,De=/\r\n?/g,He=/^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/,Ne=/^\[\^([^\]]+)]/,We=/\f/g,_e=/^---[ \t]*\n(.|\n)*\n---[ \t]*\n/,Ge=/^\s*?\[(x|\s)\]/,re=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,oe=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ae=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,j=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i,Ze=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,ie=/^<!--[\s\S]*?(?:-->)/,qe=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,D=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Ve=/^\{.*\}$/,Qe=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Xe=/^<([^ >]+@[^ >]+)>/,Je=/^<([^ >]+:\/[^ >]+)>/,Ke=/-([a-z])?/gi,se=/^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/,Ye=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,en=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,nn=/^\[([^\]]*)\] ?\[([^\]]*)\]/,tn=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,rn=/\t/g,on=/(^ *\||\| *$)/g,an=/^ *:-+: *$/,sn=/^ *:-+ *$/,ln=/^ *-+: *$/,F="((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)",cn=new RegExp(`^([*_])\\1${F}\\1\\1(?!\\1)`),dn=new RegExp(`^([*_])${F}\\1(?!\\1|\\w)`),pn=new RegExp(`^==${F}==`),un=new RegExp(`^~~${F}~~`),hn=/^\\([^0-9A-Za-z\s])/,mn=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,gn=/^\n+/,fn=/^([ \t]*)/,yn=/\\([^\\])/g,Q=/ *\n+$/,kn=/(?:^|\n)( *)$/,N="(?:\\d+\\.)",W="(?:[*+-])";function le(a){return"( *)("+(a===1?N:W)+") +"}const ce=le(1),de=le(2);function pe(a){return new RegExp("^"+(a===1?ce:de))}const xn=pe(1),bn=pe(2);function ue(a){return new RegExp("^"+(a===1?ce:de)+"[^\\n]*(?:\\n(?!\\1"+(a===1?N:W)+" )[^\\n]*)*(\\n|$)","gm")}const he=ue(1),me=ue(2);function ge(a){const o=a===1?N:W;return new RegExp("^( *)("+o+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+o+" (?!"+o+" ))\\n*|\\s*\\n*$)")}const fe=ge(1),ye=ge(2);function X(a,o){const t=o===1,u=t?fe:ye,c=t?he:me,f=t?xn:bn;return{match(p,g){const h=kn.exec(g.prevCapture);return h&&(g.list||!g.inline&&!g.simple)?u.exec(p=h[1]+p):null},order:1,parse(p,g,h){const w=t?+p[2]:void 0,C=p[0].replace(Fe,`
`).match(c);let $=!1;return{items:C.map(function(e,r){const n=f.exec(e)[0].length,l=new RegExp("^ {1,"+n+"}","gm"),i=e.replace(l,"").replace(f,""),d=r===C.length-1,m=i.indexOf(`

`)!==-1||d&&$;$=m;const k=h.inline,v=h.list;let b;h.list=!0,m?(h.inline=!1,b=i.replace(Q,`

`)):(h.inline=!0,b=i.replace(Q,""));const y=g(b,h);return h.inline=k,h.list=v,y}),ordered:t,start:w}},render:(p,g,h)=>a(p.ordered?"ol":"ul",{key:h.key,start:p.type===s.orderedList?p.start:void 0},p.items.map(function(w,C){return a("li",{key:C},g(w,h))}))}}const vn=new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),wn=/^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,ke=[ee,ne,te,re,ae,oe,ie,se,he,fe,me,ye],An=[...ke,/^[^\n]+(?:  \n|\n{2,})/,j,D];function L(a){return a.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Cn(a){return ln.test(a)?"right":an.test(a)?"center":sn.test(a)?"left":null}function J(a,o,t,u){const c=t.inTable;t.inTable=!0;let f=[[]],p="";function g(){if(!p)return;const h=f[f.length-1];h.push.apply(h,o(p,t)),p=""}return a.trim().split(/(`[^`]*`|\\\||\|)/).filter(Boolean).forEach((h,w,C)=>{h.trim()==="|"&&(g(),u)?w!==0&&w!==C.length-1&&f.push([]):p+=h}),g(),t.inTable=c,f}function Sn(a,o,t){t.inline=!0;const u=a[2]?a[2].replace(on,"").split("|").map(Cn):[],c=a[3]?function(p,g,h){return p.trim().split(`
`).map(function(w){return J(w,g,h,!0)})}(a[3],o,t):[],f=J(a[1],o,t,!!c.length);return t.inline=!1,c.length?{align:u,cells:c,header:f,type:s.table}:{children:f,type:s.paragraph}}function K(a,o){return a.align[o]==null?{}:{textAlign:a.align[o]}}function R(a){return function(o,t){return t.inline?a.exec(o):null}}function I(a){return function(o,t){return t.inline||t.simple?a.exec(o):null}}function S(a){return function(o,t){return t.inline||t.simple?null:a.exec(o)}}function M(a){return function(o){return a.exec(o)}}function Rn(a,o){if(o.inline||o.simple)return null;let t="";a.split(`
`).every(c=>(c+=`
`,!ke.some(f=>f.test(c))&&(t+=c,!!c.trim())));const u=t.trimEnd();return u==""?null:[t,u]}function In(a){try{if(decodeURIComponent(a).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return null}catch{return null}return a}function Y(a){return a.replace(yn,"$1")}function T(a,o,t){const u=t.inline||!1,c=t.simple||!1;t.inline=!0,t.simple=!0;const f=a(o,t);return t.inline=u,t.simple=c,f}function En(a,o,t){const u=t.inline||!1,c=t.simple||!1;t.inline=!1,t.simple=!0;const f=a(o,t);return t.inline=u,t.simple=c,f}function $n(a,o,t){const u=t.inline||!1;t.inline=!1;const c=a(o,t);return t.inline=u,c}const O=(a,o,t)=>({children:T(o,a[1],t)});function P(){return{}}function B(){return null}function Ln(...a){return a.filter(Boolean).join(" ")}function U(a,o,t){let u=a;const c=o.split(".");for(;c.length&&(u=u[c[0]],u!==void 0);)c.shift();return u||t}function Mn(a="",o={}){function t(e,r,...n){const l=U(o.overrides,`${e}.props`,{});return o.createElement(function(i,d){const m=U(d,i);return m?typeof m=="function"||typeof m=="object"&&"render"in m?m:U(d,`${i}.component`,i):i}(e,o.overrides),E({},r,l,{className:Ln(r==null?void 0:r.className,l.className)||void 0}),...n)}function u(e){e=e.replace(_e,"");let r=!1;o.forceInline?r=!0:o.forceBlock||(r=tn.test(e)===!1);const n=w(h(r?e:`${e.trimEnd().replace(gn,"")}

`,{inline:r}));for(;typeof n[n.length-1]=="string"&&!n[n.length-1].trim();)n.pop();if(o.wrapper===null)return n;const l=o.wrapper||(r?"span":"div");let i;if(n.length>1||o.forceWrapper)i=n;else{if(n.length===1)return i=n[0],typeof i=="string"?t("span",{key:"outer"},i):i;i=null}return o.createElement(l,{key:"outer"},i)}function c(e,r){const n=r.match(Me);return n?n.reduce(function(l,i){const d=i.indexOf("=");if(d!==-1){const m=function(y){return y.indexOf("-")!==-1&&y.match(qe)===null&&(y=y.replace(Ke,function(x,A){return A.toUpperCase()})),y}(i.slice(0,d)).trim(),k=function(y){const x=y[0];return(x==='"'||x==="'")&&y.length>=2&&y[y.length-1]===x?y.slice(1,-1):y}(i.slice(d+1).trim()),v=q[m]||m;if(v==="ref")return l;const b=l[v]=function(y,x,A,xe){return x==="style"?A.split(/;\s?/).reduce(function(_,z){const G=z.slice(0,z.indexOf(":"));return _[G.trim().replace(/(-[a-z])/g,be=>be[1].toUpperCase())]=z.slice(G.length+1).trim(),_},{}):x==="href"||x==="src"?xe(A,y,x):(A.match(Ve)&&(A=A.slice(1,A.length-1)),A==="true"||A!=="false"&&A)}(e,m,k,o.sanitizer);typeof b=="string"&&(j.test(b)||D.test(b))&&(l[v]=u(b.trim()))}else i!=="style"&&(l[q[i]||i]=!0);return l},{}):null}o.overrides=o.overrides||{},o.sanitizer=o.sanitizer||In,o.slugify=o.slugify||L,o.namedCodesToUnicode=o.namedCodesToUnicode?E({},V,o.namedCodesToUnicode):V,o.createElement=o.createElement||H.createElement;const f=[],p={},g={[s.blockQuote]:{match:S(ee),order:1,parse(e,r,n){const[,l,i]=e[0].replace(ze,"").match(Oe);return{alert:l,children:r(i,n)}},render(e,r,n){const l={key:n.key};return e.alert&&(l.className="markdown-alert-"+o.slugify(e.alert.toLowerCase(),L),e.children.unshift({attrs:{},children:[{type:s.text,text:e.alert}],noInnerParse:!0,type:s.htmlBlock,tag:"header"})),t("blockquote",l,r(e.children,n))}},[s.breakLine]:{match:M(Pe),order:1,parse:P,render:(e,r,n)=>t("br",{key:n.key})},[s.breakThematic]:{match:S(Be),order:1,parse:P,render:(e,r,n)=>t("hr",{key:n.key})},[s.codeBlock]:{match:S(te),order:0,parse:e=>({lang:void 0,text:e[0].replace(/^ {4}/gm,"").replace(/\n+$/,"")}),render:(e,r,n)=>t("pre",{key:n.key},t("code",E({},e.attrs,{className:e.lang?`lang-${e.lang}`:""}),e.text))},[s.codeFenced]:{match:S(ne),order:0,parse:e=>({attrs:c("code",e[3]||""),lang:e[2]||void 0,text:e[4],type:s.codeBlock})},[s.codeInline]:{match:I(Ue),order:3,parse:e=>({text:e[2]}),render:(e,r,n)=>t("code",{key:n.key},e.text)},[s.footnote]:{match:S(He),order:0,parse:e=>(f.push({footnote:e[2],identifier:e[1]}),{}),render:B},[s.footnoteReference]:{match:R(Ne),order:1,parse:e=>({target:`#${o.slugify(e[1],L)}`,text:e[1]}),render:(e,r,n)=>t("a",{key:n.key,href:o.sanitizer(e.target,"a","href")},t("sup",{key:n.key},e.text))},[s.gfmTask]:{match:R(Ge),order:1,parse:e=>({completed:e[1].toLowerCase()==="x"}),render:(e,r,n)=>t("input",{checked:e.completed,key:n.key,readOnly:!0,type:"checkbox"})},[s.heading]:{match:S(o.enforceAtxHeadings?oe:re),order:1,parse:(e,r,n)=>({children:T(r,e[2],n),id:o.slugify(e[2],L),level:e[1].length}),render:(e,r,n)=>t(`h${e.level}`,{id:e.id,key:n.key},r(e.children,n))},[s.headingSetext]:{match:S(ae),order:0,parse:(e,r,n)=>({children:T(r,e[1],n),level:e[2]==="="?1:2,type:s.heading})},[s.htmlBlock]:{match:M(j),order:1,parse(e,r,n){const[,l]=e[3].match(fn),i=new RegExp(`^${l}`,"gm"),d=e[3].replace(i,""),m=(k=d,An.some(A=>A.test(k))?$n:T);var k;const v=e[1].toLowerCase(),b=Le.indexOf(v)!==-1,y=(b?v:e[1]).trim(),x={attrs:c(y,e[2]),noInnerParse:b,tag:y};return n.inAnchor=n.inAnchor||v==="a",b?x.text=e[3]:x.children=m(r,d,n),n.inAnchor=!1,x},render:(e,r,n)=>t(e.tag,E({key:n.key},e.attrs),e.text||(e.children?r(e.children,n):""))},[s.htmlSelfClosing]:{match:M(D),order:1,parse(e){const r=e[1].trim();return{attrs:c(r,e[2]||""),tag:r}},render:(e,r,n)=>t(e.tag,E({},e.attrs,{key:n.key}))},[s.htmlComment]:{match:M(ie),order:1,parse:()=>({}),render:B},[s.image]:{match:I(wn),order:1,parse:e=>({alt:e[1],target:Y(e[2]),title:e[3]}),render:(e,r,n)=>t("img",{key:n.key,alt:e.alt||void 0,title:e.title||void 0,src:o.sanitizer(e.target,"img","src")})},[s.link]:{match:R(vn),order:3,parse:(e,r,n)=>({children:En(r,e[1],n),target:Y(e[2]),title:e[3]}),render:(e,r,n)=>t("a",{key:n.key,href:o.sanitizer(e.target,"a","href"),title:e.title},r(e.children,n))},[s.linkAngleBraceStyleDetector]:{match:R(Je),order:0,parse:e=>({children:[{text:e[1],type:s.text}],target:e[1],type:s.link})},[s.linkBareUrlDetector]:{match:(e,r)=>r.inAnchor||o.disableAutoLink?null:R(Qe)(e,r),order:0,parse:e=>({children:[{text:e[1],type:s.text}],target:e[1],title:void 0,type:s.link})},[s.linkMailtoDetector]:{match:R(Xe),order:0,parse(e){let r=e[1],n=e[1];return Te.test(n)||(n="mailto:"+n),{children:[{text:r.replace("mailto:",""),type:s.text}],target:n,type:s.link}}},[s.orderedList]:X(t,1),[s.unorderedList]:X(t,2),[s.newlineCoalescer]:{match:S(je),order:3,parse:P,render:()=>`
`},[s.paragraph]:{match:Rn,order:3,parse:O,render:(e,r,n)=>t("p",{key:n.key},r(e.children,n))},[s.ref]:{match:R(Ye),order:0,parse:e=>(p[e[1]]={target:e[2],title:e[4]},{}),render:B},[s.refImage]:{match:I(en),order:0,parse:e=>({alt:e[1]||void 0,ref:e[2]}),render:(e,r,n)=>p[e.ref]?t("img",{key:n.key,alt:e.alt,src:o.sanitizer(p[e.ref].target,"img","src"),title:p[e.ref].title}):null},[s.refLink]:{match:R(nn),order:0,parse:(e,r,n)=>({children:r(e[1],n),fallbackChildren:e[0],ref:e[2]}),render:(e,r,n)=>p[e.ref]?t("a",{key:n.key,href:o.sanitizer(p[e.ref].target,"a","href"),title:p[e.ref].title},r(e.children,n)):t("span",{key:n.key},e.fallbackChildren)},[s.table]:{match:S(se),order:1,parse:Sn,render(e,r,n){const l=e;return t("table",{key:n.key},t("thead",null,t("tr",null,l.header.map(function(i,d){return t("th",{key:d,style:K(l,d)},r(i,n))}))),t("tbody",null,l.cells.map(function(i,d){return t("tr",{key:d},i.map(function(m,k){return t("td",{key:k,style:K(l,k)},r(m,n))}))})))}},[s.text]:{match:M(mn),order:4,parse:e=>({text:e[0].replace(Ze,(r,n)=>o.namedCodesToUnicode[n]?o.namedCodesToUnicode[n]:r)}),render:e=>e.text},[s.textBolded]:{match:I(cn),order:2,parse:(e,r,n)=>({children:r(e[2],n)}),render:(e,r,n)=>t("strong",{key:n.key},r(e.children,n))},[s.textEmphasized]:{match:I(dn),order:3,parse:(e,r,n)=>({children:r(e[2],n)}),render:(e,r,n)=>t("em",{key:n.key},r(e.children,n))},[s.textEscaped]:{match:I(hn),order:1,parse:e=>({text:e[1],type:s.text})},[s.textMarked]:{match:I(pn),order:3,parse:O,render:(e,r,n)=>t("mark",{key:n.key},r(e.children,n))},[s.textStrikethroughed]:{match:I(un),order:3,parse:O,render:(e,r,n)=>t("del",{key:n.key},r(e.children,n))}};o.disableParsingRawHTML===!0&&(delete g[s.htmlBlock],delete g[s.htmlSelfClosing]);const h=function(e){let r=Object.keys(e);function n(l,i){let d=[];for(i.prevCapture=i.prevCapture||"";l;){let m=0;for(;m<r.length;){const k=r[m],v=e[k],b=v.match(l,i);if(b){const y=b[0];i.prevCapture+=y,l=l.substring(y.length);const x=v.parse(b,n,i);x.type==null&&(x.type=k),d.push(x);break}m++}}return i.prevCapture="",d}return r.sort(function(l,i){let d=e[l].order,m=e[i].order;return d!==m?d-m:l<i?-1:1}),function(l,i){return n(function(d){return d.replace(De,`
`).replace(We,"").replace(rn,"    ")}(l),i)}}(g),w=(C=function(e,r){return function(n,l,i){const d=e[n.type].render;return r?r(()=>d(n,l,i),n,l,i):d(n,l,i)}}(g,o.renderRule),function e(r,n={}){if(Array.isArray(r)){const l=n.key,i=[];let d=!1;for(let m=0;m<r.length;m++){n.key=m;const k=e(r[m],n),v=typeof k=="string";v&&d?i[i.length-1]+=k:k!==null&&i.push(k),d=v}return n.key=l,i}return C(r,e,n)});var C;const $=u(a);return f.length?t("div",null,$,t("footer",{key:"footer"},f.map(function(e){return t("div",{id:o.slugify(e.identifier,L),key:e.identifier},e.identifier,w(h(e.footnote,{inline:!0})))}))):$}const Tn=a=>{let{children:o="",options:t}=a,u=function(c,f){if(c==null)return{};var p,g,h={},w=Object.keys(c);for(g=0;g<w.length;g++)f.indexOf(p=w[g])>=0||(h[p]=c[p]);return h}(a,$e);return H.cloneElement(Mn(o,t),u)};function zn(){return ve(we.Changelog),H.useEffect(Ae,[]),Ce.jsx(Tn,{options:{overrides:{h1:{component:"h1",props:{hidden:!0}},h2:{component:Se,props:{size:"md",mt:2}},p:{component:Re},ul:{component:Ie},li:{component:Ee}}},children:`# Racing Planner Change Log

All notable changes to the **"my-racing-planner"** project will be documented in this file.

## 0.8.0

- Renamed to Racing Planner and some configs to work on new domain

## 0.7.9

- New selector in settings popover to display track rain chance

## 0.7.8

- Fixed an issue with the export link loading content when there is no data for wish car or tracks

## 0.7.7

- Fix problem with series like Ring Meister by Ricmotech when activate the option to show participation on the credit program

## 0.7.6

- New selector in settings popover to display track participation view
- Track participation view shows if user has enough tracks to earn credits from a series

## 0.7.5

- Fixed another issue caused by previously favorite series was removed in the new season

## 0.7.4

- Fixed an issue with the tracks not being found at the checkout page

## 0.7.3

- Fixed an issue caused by previously favorite series was removed in the new season

## 0.7.2

- Update with data of Season 2 of 2025
- Added current season text to top bar

## 0.7.1

- Replaced drag control by a swap button to reorder series columns at the season table
- Removed Retired tracks from My Tracks table

## 0.7.0

- Added Tracks Usage History page
- Removed Info Link to iRacing members site on Content tables

## 0.6.4

- Added link to Volume Discount blog post on iRacing site
- Fixed cases where content bellow $6 were counting to volume discount

## 0.6.3

- Added Filter to My Series table to show only favorite series
- Added Filter to My Cars and My Tracks to show only selected check state

## 0.6.2

- Little improvement to license badge, looking better on light theme
- Added track config to season planner table
- Track highlight color more subtle on the season planner table

## 0.6.1

- Updated Season Series getting latest data from iRacing
- Fixed My content wrong position on mobile bottom navigation bar

## 0.6.0

- Implemented top bar and moved some items from the navigation bar.
- Separated the Privacy Policy from the About page into a dedicated page.
- Implemented an infinite table instead of pagination.
- Fixed incorrect width of the series table empty state.
- Added a changelog dialog that automatically loads from repo's markdown file.
- Made week column of the season table sticky
- Implemented preferences transfer to other devices using url and qr code
- Implemented ui notification store and added to privacy policy and changelog buttons

## 0.5.3

- Improved performance of the season table when clicking track checkboxes.
- Fixed issue where the "Tracks Used" table broke with a small number of tracks.
- Improved Wishlist display on small screens.

## 0.5.2

- Fixed crash when a track is undefined in the season table.

## 0.5.1

- Fixed styling of the empty "Tracks Used" table.
- Fixed sticky header in the "Tracks Used" table.
- Implemented header collapse on page content scroll.

## 0.5.0

- Improved car switching in series to show cars in the season planner table.
- Added option for special promotions in some countries.
- Removed the sticky header from season planner settings; it is now always enabled.

## 0.4.2

- Improved text styles and fixed typos on the Help page.
- Added a sticky header to season planner settings.
- Added a smooth transition for the sticky header.

## 0.4.1

- Fixed hover highlight on "More Menu" in light color mode.
- Added "Buy Me a Coffee" link.
- Merged About and Privacy Policy pages.
- Replaced buttons with anchors in navigation menu items.

## 0.4.0

- Added lazy loading for images.
- Added Hash Router using Wouter.
- Added Google Analytics for page visits and outbound clicks.
- Added Privacy Policy page.
- Added instructions for PWA on Android and iOS.

## 0.3.5

- Improved code splitting by lazy-loading pages.
- Made tables scroll to the top when changing pages.
- Disabled text selection on images and button text.
- Reduced header height on small screens.

## 0.3.4

- Fixed checkout button link.
- Improved spacing in the left navigation menu for small screens.
- Adjusted navigation colors to better match iRacing.com.
- Added version number to the About page.
- Fixed container shadow being cut off due to overflow.

## 0.3.3

- Improved PWA safe area.
- Added iOS PWA icon.
- Changed colors to better match iRacing.com.

## 0.3.2

- Fixed viewport height bug on iOS devices related to using \`100vh\` instead of \`100dvh\`.

## 0.3.1

- Improved Season Planner table cell colors.

## 0.3.0

- Fixed responsiveness issues of the main container.
- Fixed responsiveness issues of tables and pages.
- Improved navigation on small screens.

## 0.2.1

- Fixed app logo path.

## 0.2.0

- Implemented About page.
- Implemented Help dialog.
- Automatically open Help dialog on first visit.
- Improved empty states.

## 0.1.0

- Initial release.
`})}export{zn as default};
