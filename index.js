let q=Object.defineProperty,z=Object.prototype.hasOwnProperty,A=a=>q(a,"__esModule",{value:!0}),T=(a,b)=>{A(a);for(let e in b)q(a,e,{get:b[e],enumerable:!0})},U=(a,b)=>{A(a);for(let e in b)z.call(b,e)&&!z.call(a,e)&&e!=="default"&&q(a,e,{get:()=>b[e],enumerable:!0});return a},V=a=>a&&a.__esModule?a:U(q({},"default",{value:a,enumerable:!0}),a);let B={data:""},C=a=>{try{let b=a?a.querySelector("#_goober"):self._goober;return b||(b=(a||document.head).appendChild(document.createElement("style")),b.innerHTML=" ",b.id="_goober"),b.firstChild}catch(b){}return B},D=/(?:([a-z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi,E=/\/\*.*?\*\/|\s{2,}|\n/gm,l=(a,b,e)=>{let f="",h="",i="";for(let c in a){let d=a[c];if("object"==typeof d){let g=b+" "+c;/&/g.test(c)&&(g=c.replace(/&/g,b)),"@"==c[0]&&(g=b,"f"==c[1]&&(g=c)),/@k/.test(c)?h+=c+"{"+l(d,"","")+"}":h+=l(d,g,g==b?c:e||"")}else/^@i/.test(c)?f=c+" "+d+";":i+=l.p?l.p(c.replace(/[A-Z]/g,"-$&").toLowerCase(),d):c.replace(/[A-Z]/g,"-$&").toLowerCase()+":"+d+";"}if(i[0]){let c=b+"{"+i+"}";return e?h+e+"{"+c+"}":f+c+h}return f+h},n={},F=(a,b,e,f)=>{let h=a.toLowerCase?a:function c(d){let g="";for(let k in d)"object"==typeof val?g+=k+c(d[k]):g+=k+d[k];return g}(a),i=n[h]||(n[h]=".go"+h.split("").reduce((c,d)=>101*c+d.charCodeAt(0)>>>0,11));return((c,d,g)=>{d.data.indexOf(c)<0&&(d.data=g?c+d.data:d.data+c)})(n[i]||(n[i]=l(a[0]?(c=>{let d,g=[{}];for(;d=D.exec(c.replace(E,""));)d[4]&&g.shift(),d[3]?g.unshift(g[0][d[3]]=g[0][d[3]]||{}):d[4]||(g[0][d[1]]=d[2]);return g[0]})(a):a,e?"":i)),b,f),i.slice(1)},G=(a,b,e)=>a.reduce((f,h,i)=>{let c=b[i];if(c&&c.call){let d=c(e),g=d&&d.props&&d.props.className||/^go/.test(d)&&d;c=g?"."+g:d&&d.props?"":d}return f+h+(null==c?"":c)},"");function o(a){let b=this||{},e=a.call?a(b.p):a;return F(e.map?G(e,[].slice.call(arguments,1),b.p):e,C(b.target),b.g,b.o)}let u,r,W=o.bind({g:1});function v(a,b,e){l.p=b,u=a,r=e}function w(a,b){let e=this||{};return function(){let f=arguments;function h(i,c){let d=e.p=Object.assign({theme:r&&r()},i),g=d.className;return e.o=/\s*go[0-9]+/g.test(g),d.className=o.apply(e,f)+(g?" "+g:""),b&&(d.ref=c),u(d.as||a,d)}return b?b(h):h}}T(exports,{MultiStep:()=>M});const Y=V(require("react"));v(Y.default.createElement);const J=w("ol")`
  margin: 0;
  padding-bottom: 2.2rem;
  list-style-type: none;
`,K=a=>o`
  display: inline-block;
  text-align: center;
  line-height: 4.5rem;
  padding: 0 0.7rem;
  cursor: pointer;

  color: ${a.state==="todo"?"silver":"black"};
  border-bottom: 4px solid ${a.state==="todo"?"silver":"#33C3F0"};

  &:before {
    position: relative;
    bottom: -3.99rem;
    float: left;
    left: 50%;

    ${a.state==="todo"?'content: "Ο";':a.state==="doing"?'content: "•";':'content: "✓";'}
    color: ${a.state==="todo"?"silver":"white"};
    background-color: ${a.state==="todo"?"white":"#33C3F0"};  
    width: 1.2em;
    line-height: ${a.state==="todo"?"1.2em":"1.4em"};
    border-radius: ${a.state==="todo"?"0":"1.2em"};
  }
  &:hover,
  &::before {
    color: #0FA0CE;
  }
  &:after {
    content: "\\00a0\\00a0";
  }   
  span {
    padding: 0 1.5rem;
  }
`,x=(a,b)=>{let e=[];for(let f=0;f<b;f++)f<a?e.push("done"):f===a?e.push("doing"):e.push("todo");return e},y=(a,b)=>a>0&&a<b-1?{showPreviousBtn:!0,showNextBtn:!0}:a===0?{showPreviousBtn:!1,showNextBtn:!0}:{showPreviousBtn:!0,showNextBtn:!1},p=Y.createContext({step:0,buttons:{},styles:{}});function L(a){const b=f=>y(f,a),e=f=>x(f,a);return(f={},h)=>{switch(h.type){case"INCREMENT":const i=f.step+1;return{step:i<a?i:f.step,buttons:b(i),styles:e(i)};case"DECREMENT":const c=f.step-1;return{step:c>-1?c:f.step,buttons:b(c),styles:e(c)};case"JUMP":return{step:h.step,buttons:b(h.step),styles:e(h.step)};default:return f}}}const M={Provider:N,Status:O,Step:P,NavButtons:Q};function N({steps:a,showNavigation:b=void 0,children:e}){const f=a.length,h=L(f),[{step:i,buttons:c,styles:d},g]=Y.useReducer(h,{step:0,buttons:y(0,f),styles:x(0,f)}),k={showNavigation:b===void 0?!0:!!b,stepsLen:f,steps:a,step:i,buttons:c,styles:d,next:()=>g({type:"INCREMENT"}),previous:()=>g({type:"DECREMENT"}),jump:m=>g({type:"JUMP",step:m})},t=m=>m.which===13?g({type:"JUMP",step:f-1}):{};return Y.default.createElement(p.Provider,{value:k},Y.default.createElement("div",{onKeyDown:t},e))}function O(){const{steps:a,step:b,styles:e,stepsLen:f,jump:h}=Y.useContext(p),i=c=>{c.currentTarget.value===f-1&&b===f-1?h(f-1):h(parseInt(c.currentTarget.value))};return Y.default.createElement(J,null,a.map((c,d)=>Y.default.createElement("li",{className:K({state:e[d]}),onClick:g=>{R(c)&&i(g)},key:d,value:d},Y.default.createElement("span",null,c.name||d+1))))}function P({className:a="",style:b={}}){const{step:e,steps:f}=Y.useContext(p);return Y.default.createElement("div",{className:a,style:b},f[e].component)}function Q({style:a={},className:b="",prevStyle:e={},prevClassName:f="",nextStyle:h={},nextClassName:i=""}){const{buttons:c,steps:d,step:g,showNavigation:k,next:t,previous:m}=Y.useContext(p);return k?Y.default.createElement("div",{className:b,style:a},Y.default.createElement("button",{style:c.showPreviousBtn?e:{display:"none"},onClick:m,className:f},"Prev"),Y.default.createElement("button",{style:c.showNextBtn?h:{display:"none"},onClick:t,disabled:S(d[g]),className:i},"Next")):null}function R({valid:a=void 0}){return a===void 0||a}function S({valid:a=void 0}){return a===!1}
