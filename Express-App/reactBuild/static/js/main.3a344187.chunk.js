(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t,a){e.exports={darkBG:"Modal_darkBG__1VMxW",centered:"Modal_centered__zOeRT",modal:"Modal_modal__Ava1j",actionsContainer:"Modal_actionsContainer__2mi8B",submitButton:"Modal_submitButton__2F94L",boxText:"Modal_boxText__3X-tb",labels:"Modal_labels__fYidt"}},18:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(6),s=a.n(l),o=(a(18),a(2)),r=(a(19),a(3)),i=a(4),m=a.n(i);var u=function e(t){var a=Object(n.useState)([]),l=Object(o.a)(a,2),s=l[0],i=l[1],u=Object(n.useState)(!0),d=Object(o.a)(u,2),p=d[0],f=d[1],b=Object(n.useState)(!1),E=Object(o.a)(b,2),g=(E[0],E[1]),x=Object(n.useState)(!1),v=Object(o.a)(x,2),j=v[0],N=v[1],T=Object(n.useState)(!0),y=Object(o.a)(T,2),k=y[0],O=y[1];function D(e){fetch(h.baseAPI+"/api/v1/tasks/deleteTaskByID/".concat(e),{method:"DELETE"}).then(function(e){return e.json()}).then(function(t){t.success?i(function(t){return t.filter(function(t){return t._id!==e})}):alert("Task deletion failed. Please try again.")})}e.addTask=function(e){var t={title:m()("#boxTitleText").val(),desc:m()("#boxDescriptionText").val(),dueDate:m()("#boxDueDateText").val(),tags:m()("#boxTagsText").val().split(",").map(function(e){return e.trim()})};fetch(h.baseAPI+"/api/v1/tasks/createTask",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){if(e.success){e.insertedId;var a=Object(r.a)(Object(r.a)({},t),{},{_id:e.insertedId,title:t.title,desc:t.desc,dueDate:t.dueDate,tags:t.tags,status:"incomplete",completed:!1});i(function(e){return e.concat(a)})}})},e.removeTask=D;var _=Object(n.useState)(null),B=Object(o.a)(_,2),C=B[0],S=B[1],I=Object(n.useState)(""),w=Object(o.a)(I,2),A=w[0],M=w[1],P=Object(n.useState)(""),F=Object(o.a)(P,2),L=F[0],q=F[1],G=Object(n.useState)(""),J=Object(o.a)(G,2),R=J[0],U=J[1],V=Object(n.useState)(""),W=Object(o.a)(V,2),z=W[0],Q=W[1];function X(e){var t={title:A,dueDate:L,desc:R,tags:z.split(",").map(function(e){return e.trim()})};s.map(function(t){if(t._id===e){var a={title:A,desc:R,dueDate:L,tags:z.split(",").map(function(e){return e.trim()}),status:t.status,completed:t.completed};fetch(h.baseAPI+"/api/v1/tasks/updateTaskByID/"+e,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(a)})}});var a=s.map(function(a){return a._id===e?Object(r.a)(Object(r.a)({},a),t):a});i(a),S(null)}e.editTask=X;var Y=Object(n.useState)(!1),H=Object(o.a)(Y,2),K=H[0];H[1];return Object(n.useEffect)(function(){k&&fetch(h.baseAPI+"/api/v1/tasks/getTasks",{method:"GET"}).then(function(e){return e.json()}).then(function(e){null!=e.length&&(i(e),O(!1),f(!1))})}),c.a.createElement("section",{className:"cardContainer"},c.a.createElement("div",{className:"".concat(p?"LoadingScreen":"hideLoading")},c.a.createElement("svg",{width:"".concat(p?"100":"0"),height:"".concat(p?"100":"0"),viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg"},c.a.createElement("defs",null,c.a.createElement("linearGradient",{x1:"8.042%",y1:"0%",x2:"65.682%",y2:"23.865%",id:"a"},c.a.createElement("stop",{"stop-color":"#fff","stop-opacity":"0",offset:"0%"}),c.a.createElement("stop",{"stop-color":"#fff","stop-opacity":".631",offset:"63.146%"}),c.a.createElement("stop",{"stop-color":"#fff",offset:"100%"}))),c.a.createElement("g",{fill:"none","fill-rule":"evenodd"},c.a.createElement("g",{transform:"translate(1 1)"},c.a.createElement("path",{d:"M36 18c0-9.94-8.06-18-18-18",id:"Oval-2",stroke:"url(#a)","stroke-width":"2"},c.a.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.9s",repeatCount:"indefinite"})),c.a.createElement("circle",{fill:"#fff",cx:"36",cy:"18",r:"1"},c.a.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.9s",repeatCount:"indefinite"})))))),s.map(function(e){return c.a.createElement("div",{key:e._id,className:" ".concat(e.completed?"completed completedBackground":"")},"incomplete"==e.status?c.a.createElement("div",{className:"card ".concat(K?"completed":"")},C===e._id?c.a.createElement("div",{className:"editView"},c.a.createElement("button",{className:"accentButton cardButton",onClick:function(){return X(e._id)},style:{marginRight:"0px"}},"Save"),c.a.createElement("div",{className:"editFields"},c.a.createElement("input",{className:"editInput",type:"text",value:A,onChange:function(e){return M(e.target.value)}}),c.a.createElement("input",{className:"editInput",type:"text",value:L,onChange:function(e){return q(e.target.value)}}),c.a.createElement("input",{className:"editInput",type:"text",value:R,onChange:function(e){return U(e.target.value)}}),c.a.createElement("input",{className:"editInput",type:"text",value:z,onChange:function(e){return Q(e.target.value)}}))):c.a.createElement("button",{className:"accentButton cardButton",onClick:function(){S(e._id),M(e.title),q(e.dueDate),U(e.desc),Q(e.tags.join(", ")),g(!0)},style:{marginLeft:"30px"}},"Edit"),c.a.createElement("p",{className:"cardDueDate ".concat(e.completed?"completed":"uncompleted")},e.dueDate),c.a.createElement("div",null,c.a.createElement("h1",{className:"cardTitle ".concat(e.completed?"completed":"uncompleted")},e.title),c.a.createElement("p",{className:"cardDescription ".concat(e.completed?"completed":"uncompleted")},e.desc),c.a.createElement("div",{className:"cardTags"},e.tags.map(function(e){return c.a.createElement("h2",{className:"tag"},e)}))),c.a.createElement("button",{className:"accentButton cardButton spaceButton",onClick:function(){!function(e){var t=null;s.map(function(a){if(a._id===e){t=!a.completed;var n={title:a.title,desc:a.desc,dueDate:a.dueDate,tags:a.tags,status:a.status,completed:t};console.log(n),fetch(h.baseAPI+"/api/v1/tasks/updateTaskByID/"+e,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})}}),i(function(a){return a.map(function(a){return a._id===e?Object(r.a)(Object(r.a)({},a),{},{completed:t}):a})})}(e._id),N(!j)},style:{marginLeft:"auto"}},e.completed?"Uncomplete":"Complete"),c.a.createElement("button",{className:"accentButton cardButton",onClick:function(){return D(e._id)},style:{marginRight:"50px"}},"Delete")):c.a.createElement("div",{className:"card"},c.a.createElement("p",{className:"cardDueDate",style:{"text-decoration":"line-through",color:"gray"}},e.dueDate),c.a.createElement("div",null,c.a.createElement("h1",{className:"cardTitle",style:{"text-decoration":"line-through",color:"gray"}},e.title),c.a.createElement("p",{className:"cardDescription",style:{"text-decoration":"line-through",color:"gray"}},e.desc),c.a.createElement("div",{className:"cardTags"},e.tags.map(function(e){return c.a.createElement("h2",{className:"tag"},e)}))),c.a.createElement("button",{className:"accentButton cardButton",style:{marginLeft:"auto"}},"Uncomplete"),c.a.createElement("button",{className:"accentButton cardButton",style:{marginRight:"50px"}},"Delete")),c.a.createElement("div",{className:"accentLine"}))}))},d=a(1),p=a.n(d),f=a(8),b=function(e){var t=e.setIsOpen;return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:p.a.darkBG,onClick:function(){return t(!1)}}),c.a.createElement("div",{className:p.a.centered},c.a.createElement("div",{className:p.a.modal},c.a.createElement("button",{className:p.a.submitButton,style:{"margin-left":"253px"},onClick:function(){return t(!1)}},c.a.createElement(f.a,null,"Close")),c.a.createElement("div",{className:p.a.modalActions},c.a.createElement("div",{className:p.a.actionsContainer},c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"boxTitleText",className:p.a.labels},"Title"),c.a.createElement("input",{type:"text",id:"boxTitleText",className:p.a.boxText}),c.a.createElement("br",null),c.a.createElement("label",{htmlFor:"boxDescriptionText",className:p.a.labels},"Description"),c.a.createElement("input",{type:"text",id:"boxDescriptionText",className:p.a.boxText}),c.a.createElement("br",null),c.a.createElement("label",{htmlFor:"dueDate",className:p.a.labels},"Due Date"),c.a.createElement("input",{type:"text",id:"boxDueDateText",className:p.a.boxText}),c.a.createElement("br",null),c.a.createElement("label",{htmlFor:"boxTagsText",className:p.a.labels},"Tags"),c.a.createElement("input",{type:"text",id:"boxTagsText",className:p.a.boxText})))),c.a.createElement("button",{className:p.a.submitButton,onClick:function(){t(!1),u.addTask()}},"Submit"))))},E=a(7),g=a.n(E);var h=function e(){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),l=a[0],s=a[1];e.baseAPI="http://localhost:3000";var r=Object(n.useState)([{id:0,title:"Simple Task",desc:"simple description",dueDate:"1/1/1",tags:["test","test1"],status:"incomplete"}]),i=Object(o.a)(r,2);i[0],i[1];return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),c.a.createElement("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:!0}),c.a.createElement("link",{href:"https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap",rel:"stylesheet"}),c.a.createElement("script",{src:"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"}),c.a.createElement("script",{src:"https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"}),c.a.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css"}),c.a.createElement("title",null,"Task Master")),c.a.createElement("div",{className:"accentBackDrop"}),c.a.createElement("div",{className:"bodyWorkAround"},c.a.createElement("section",{className:"titleSection"},c.a.createElement("h1",{className:"appTitle"},"T a s k  M a s t e r")),c.a.createElement(u,null),c.a.createElement("section",{className:"createCard"},c.a.createElement("main",null,c.a.createElement("button",{className:g.a.accentButton,onClick:function(){s(!0)}},"Add Task"),l&&c.a.createElement(b,{setIsOpen:s})))))},x=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,21)).then(function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,l=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),l(e),s(e)})};s.a.createRoot(document.getElementById("root")).render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(h,null))),x()},7:function(e,t,a){e.exports={accentButton:"App_accentButton__2a03Q"}},9:function(e,t,a){e.exports=a(20)}},[[9,1,2]]]);
//# sourceMappingURL=main.3a344187.chunk.js.map