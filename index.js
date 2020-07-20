let q=Object.defineProperty,y=Object.prototype.hasOwnProperty,z=a=>q(a,"__esModule",{value:!0}),M=(a,b)=>{z(a);for(let e in b)q(a,e,{get:b[e],enumerable:!0})},N=(a,b)=>{z(a);for(let e in b)y.call(b,e)&&!y.call(a,e)&&e!=="default"&&q(a,e,{get:()=>b[e],enumerable:!0});return a},O=a=>a&&a.__esModule?a:N(q({},"default",{value:a,enumerable:!0}),a);let B={data:""},C=a=>{try{let b=a?a.querySelector("#_goober"):self._goober;return b||(b=(a||document.head).appendChild(document.createElement("style")),b.innerHTML=" ",b.id="_goober"),b.firstChild}catch(b){}return B},D=/(?:([a-z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi,E=/\/\*.*?\*\/|\s{2,}|\n/gm,m=(a,b,e)=>{let h="",i="",g="";for(let d in a){let c=a[d];if("object"==typeof c){let f=b+" "+d;/&/g.test(d)&&(f=d.replace(/&/g,b)),"@"==d[0]&&(f=b,"f"==d[1]&&(f=d)),/@k/.test(d)?i+=d+"{"+m(c,"","")+"}":i+=m(c,f,f==b?d:e||"")}else/^@i/.test(d)?h=d+" "+c+";":g+=m.p?m.p(d.replace(/[A-Z]/g,"-$&").toLowerCase(),c):d.replace(/[A-Z]/g,"-$&").toLowerCase()+":"+c+";"}if(g[0]){let d=b+"{"+g+"}";return e?i+e+"{"+d+"}":h+d+i}return h+i},o={},F=(a,b,e,h)=>{let i=a.toLowerCase?a:function d(c){let f="";for(let l in c)"object"==typeof val?f+=l+d(c[l]):f+=l+c[l];return f}(a),g=o[i]||(o[i]=".go"+i.split("").reduce((d,c)=>101*d+c.charCodeAt(0)>>>0,11));return((d,c,f)=>{c.data.indexOf(d)<0&&(c.data=f?d+c.data:c.data+d)})(o[g]||(o[g]=m(a[0]?(d=>{let c,f=[{}];for(;c=D.exec(d.replace(E,""));)c[4]&&f.shift(),c[3]?f.unshift(f[0][c[3]]=f[0][c[3]]||{}):c[4]||(f[0][c[1]]=c[2]);return f[0]})(a):a,e?"":g)),b,h),g.slice(1)},G=(a,b,e)=>a.reduce((h,i,g)=>{let d=b[g];if(d&&d.call){let c=d(e),f=c&&c.props&&c.props.className||/^go/.test(c)&&c;d=f?"."+f:c&&c.props?"":c}return h+i+(null==d?"":d)},"");function p(a){let b=this||{},e=a.call?a(b.p):a;return F(e.map?G(e,[].slice.call(arguments,1),b.p):e,C(b.target),b.g,b.o)}let t,r,V=p.bind({g:1});function u(a,b,e){m.p=b,t=a,r=e}function v(a,b){let e=this||{};return function(){let h=arguments;function i(g,d){let c=e.p=Object.assign({theme:r&&r()},g),f=c.className;return e.o=/\s*go[0-9]+/g.test(f),c.className=p.apply(e,h)+(f?" "+f:""),b&&(c.ref=d),t(c.as||a,c)}return b?b(i):i}}M(exports,{default:()=>J});const X=O(require("react"));u(X.default.createElement);const H=v("ol")`
  margin: 0;
  padding-bottom: 2.2rem;
  list-style-type: none;
`,I=a=>p`
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
`,w=(a,b)=>{let e=[];for(let h=0;h<b;h++)h<a?e.push("done"):h===a?e.push("doing"):e.push("todo");return e},x=(a,b)=>a>0&&a<b-1?{showPreviousBtn:!0,showNextBtn:!0}:a===0?{showPreviousBtn:!1,showNextBtn:!0}:{showPreviousBtn:!0,showNextBtn:!1};function J(a){const b=a.steps.length;let e=!0;a.showNavigation&&a.showNavigation&&(e=a.showNavigation);const[h,i]=X.useState(w(0,b)),[g,d]=X.useState(0),[c,f]=X.useState(x(0,b)),l=j=>{i(w(j,b)),d(j<a.steps.length?j:g),f(x(j,b))},A=()=>l(g+1),P=()=>l(g>0?g-1:g),Q=j=>j.which===13?A(b):{},R=j=>{j.currentTarget.value===b-1&&g===b-1?l(b):l(j.currentTarget.value)},S=()=>a.steps.map((j,n)=>X.default.createElement("li",{className:I({state:h[n]}),onClick:U=>{K(j)&&R(U)},key:n,value:n},X.default.createElement("span",null,j.name||n+1))),T=(j,n)=>j&&X.default.createElement("div",{className:"multistep-transition-btn-group"},X.default.createElement("button",{style:c.showPreviousBtn?{}:{display:"none"},onClick:P,className:"multistep-btn-prev"},"Prev"),X.default.createElement("button",{style:c.showNextBtn?{}:{display:"none"},onClick:A,disabled:L(a.steps[n]),className:"multistep-btn-next"},"Next"));return X.default.createElement("div",{onKeyDown:Q},X.default.createElement(H,null,S()),X.default.createElement("div",null,a.steps[g].component),X.default.createElement("div",null,T(e,g)))}function K({valid:a=void 0}){return a===void 0||a}function L({valid:a=void 0}){return a===!1}
