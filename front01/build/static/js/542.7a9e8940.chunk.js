"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[542],{3999:function(e,n,t){t.d(n,{Z:function(){return s}});t(2791);var r=t(1523),c=t(184),s=function(e){return e.href?(0,c.jsx)("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,children:e.children}):e.to?(0,c.jsx)(r.rU,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),children:e.children}):(0,c.jsx)("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,children:e.children})}},3373:function(e,n,t){t.d(n,{Z:function(){return c}});t(2791);var r=t(184),c=function(e){return(0,r.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},5434:function(e,n,t){t(2791);var r=t(2921),c=t(3999),s=t(184);n.Z=function(e){return(0,s.jsx)(r.Z,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:(0,s.jsx)(c.Z,{onClick:e.onClear,children:"Okay"}),children:(0,s.jsx)("p",{children:e.error})})}},2921:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(1413),c=t(2791),s=t(4164),a=t(4595),o=t(9422),i=t(184),u=function(e){var n=(0,i.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[(0,i.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:(0,i.jsx)("h2",{children:e.header})}),(0,i.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[(0,i.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),(0,i.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});return s.createPortal(n,document.getElementById("modal-hook"))},l=function(e){return(0,i.jsxs)(c.Fragment,{children:[e.show&&(0,i.jsx)(o.Z,{onClick:e.onCancel}),(0,i.jsx)(a.Z,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:(0,i.jsx)(u,(0,r.Z)({},e))})]})}},9508:function(e,n,t){t.d(n,{x:function(){return i}});var r=t(5861),c=t(885),s=t(7757),a=t.n(s),o=t(2791),i=function(){var e=(0,o.useState)(!1),n=(0,c.Z)(e,2),t=n[0],s=n[1],i=(0,o.useState)(),u=(0,c.Z)(i,2),l=u[0],d=u[1],h=(0,o.useRef)([]),f=(0,o.useCallback)(function(){var e=(0,r.Z)(a().mark((function e(n){var t,r,c,o,i,u,l=arguments;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=l.length>1&&void 0!==l[1]?l[1]:"GET",r=l.length>2&&void 0!==l[2]?l[2]:null,c=l.length>3&&void 0!==l[3]?l[3]:{},s(!0),o=new AbortController,h.current.push(o),e.prev=6,e.next=9,fetch(n,{method:t,body:r,headers:c,signal:o.signal});case 9:return i=e.sent,e.next=12,i.json();case 12:if(u=e.sent,h.current=h.current.filter((function(e){return e!==o})),i.ok){e.next=16;break}throw new Error(u.message);case 16:return s(!1),e.abrupt("return",u);case 20:throw e.prev=20,e.t0=e.catch(6),d(e.t0.message),s(!1),e.t0;case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(n){return e.apply(this,arguments)}}(),[]);return(0,o.useEffect)((function(){return function(){h.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:t,error:l,sendRequest:f,clearError:function(){d(null)}}}},6542:function(e,n,t){t.r(n),t.d(n,{default:function(){return j}});var r=t(5861),c=t(885),s=t(7757),a=t.n(s),o=t(2791),i=t(1523),u=t(184),l=function(e){return(0,u.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:(0,u.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})},d=t(3373),h=function(e){return(0,u.jsx)("li",{className:"user-item",children:(0,u.jsx)(d.Z,{className:"user-item__content",children:(0,u.jsxs)(i.rU,{to:"/".concat(e.id,"/places"),children:[(0,u.jsx)("div",{className:"user-item__image",children:(0,u.jsx)(l,{image:"http://localhost:5000"+"/".concat(e.image),alt:e.name})}),(0,u.jsxs)("div",{className:"user-item__info",children:[(0,u.jsx)("h2",{children:e.name}),(0,u.jsxs)("h3",{children:[e.placeCount," ",1===e.placeCount?"Place":"Places"]})]})]})})})},f=function(e){return 0===e.items.length?(0,u.jsx)("div",{className:"center",children:(0,u.jsx)(d.Z,{children:(0,u.jsx)("h2",{children:"No users found."})})}):(0,u.jsx)("ul",{className:"users-list",children:e.items.map((function(e){return(0,u.jsx)(h,{id:e.id,image:e.image,name:e.name,placeCount:e.places.length},e.id)}))})},m=t(5434),x=t(9895),v=t(9508),j=function(){var e=(0,v.x)(),n=e.isLoading,t=e.error,s=e.sendRequest,i=e.clearError,l=(0,o.useState)(),d=(0,c.Z)(l,2),h=d[0],j=d[1];return(0,o.useEffect)((function(){var e=function(){var e=(0,r.Z)(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s("http://localhost:5000/api/users");case 3:n=e.sent,j(n.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[s]),(0,u.jsxs)(o.Fragment,{children:[(0,u.jsx)(m.Z,{error:t,onClear:i}),n&&(0,u.jsx)("div",{className:"center",children:(0,u.jsx)(x.Z,{})}),!n&&h&&(0,u.jsx)(f,{items:h})]})}}}]);
//# sourceMappingURL=542.7a9e8940.chunk.js.map