(this["webpackJsonpcoin-market-recap"]=this["webpackJsonpcoin-market-recap"]||[]).push([[0],{16:function(e,t,a){e.exports=a.p+"static/media/banner.dbe8047a.png"},17:function(e,t,a){e.exports=a(46)},22:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(13),o=a.n(r);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(22);var i=a(3),s=a.n(i),l=a(14),u=a(2);a(24),a(25);var m=function(e){return Math.round(e*Math.pow(10,4))/Math.pow(10,4)},p=function(e){var t=e.id,a=e.rank,n=e.name,r=e.symbol,o=e.circ,i=e.total,s=e.price,l=e.cap,u=e.change;return c.a.createElement("div",{className:"currency"},c.a.createElement("div",{className:"rank"},a),c.a.createElement("div",{className:"name"},n),c.a.createElement("div",{className:"symbol"},r),c.a.createElement("div",{className:"circ"},m(o)," ",r),c.a.createElement("div",{className:"total"},m(i)," ",r),c.a.createElement("div",{className:"price"},m(s)," \u20ac"),c.a.createElement("div",{className:"cap"},m(l)," \u20ac"),c.a.createElement("div",{className:"change "+(u<0?"neg":"pos")},m(u),"%"),c.a.createElement("img",{className:"history",src:"https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/".concat(t,".png")}))};a(26);var d=function(e){var t=e.id,a=e.handler,n=e.text;return c.a.createElement("div",{className:"heading",onClick:a,id:t},n)},f=a(15),v=a.n(f);var g=function(e,t){return e.toUpperCase().startsWith(t.toUpperCase())},h=function(e){return"string"==typeof e?e.toUpperCase():e},E=function(e,t,a){return console.log("newProp"),console.log(t),a?e.concat([]).sort((function(e,a){return h(e[t])>a[t]?1:-1})):e.concat([]).sort((function(e,a){return h(e[t])<a[t]?1:-1}))},b=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(0),i=Object(u.a)(o,2),m=i[0],f=i[1],h=Object(n.useState)(0),b=Object(u.a)(h,2),k=b[0],y=b[1],N=Object(n.useState)(""),w=Object(u.a)(N,2),O=w[0],j=w[1],x=Object(n.useState)(!0),C=Object(u.a)(x,2),R=C[0],S=C[1],U=Object(n.useState)("rank"),_=Object(u.a)(U,2),B=_[0],P=_[1],I=Object(n.useState)(""),A=Object(u.a)(I,2),M=A[0],D=A[1],q=a.length;Object(n.useEffect)((function(){if(""!=M){var e=setInterval((function(){return J()}),1e4);return function(){clearInterval(e)}}}),[]);var W=function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest","EUR",5e3,t={data:[]},console.log("API_KEY"),console.log(M),a={Accept:"application/json"},n={start:1,limit:5e3,convert:"EUR",CMC_PRO_API_KEY:M},e.next=10,v.a.get("https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",{headers:a,params:n}).then((function(e){t=e.data})).catch((function(e){console.log("ERROR (Axios): "),console.log(e)}));case 10:return e.abrupt("return",t.data.map((function(e){return{id:e.id,rank:e.cmc_rank,name:e.name,symbol:e.symbol,circ:e.circulating_supply,total:e.total_supply,price:e.quote.EUR.price,cap:e.quote.EUR.market_cap,change:e.quote.EUR.percent_change_24h}})));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){Date.now()-m>=5e3?(W().then((function(e){return r(E(e,B,R))})),f(Date.now()),console.log("Update handled")):console.log("Update limit")},K=function(e){var t=e.target.id;console.log("newProp "+t),r(E(a,t,R)),S(!R),P(t)};return c.a.createElement("div",{className:"currencyTable"},c.a.createElement("div",{className:"navigation"},c.a.createElement("div",{className:"pageDisplay"},c.a.createElement("form",{id:"keyForm",onSubmit:function(e){e.preventDefault(),36==e.target.keyBox.value.length?(D(e.target.keyBox.value),W().then((function(e){return r(E(e,B,R))})),e.target.classList.add("submitted")):window.alert("Enter a valid API key.")}},c.a.createElement("input",{name:"keyBox",id:"keyBox",placeholder:"Enter API key",onChange:function(e){D(e.target.value)}}),c.a.createElement("input",{name:"submit",type:"submit"})),c.a.createElement("input",{id:"searchBox",onChange:function(e){y(0),j(e.target.value)},placeholder:"Search"}),c.a.createElement("div",{className:"pageButton",onClick:function(){k-50>=0&&y(k-50)}},"Previous page"),c.a.createElement("div",{className:"pageButton",onClick:function(){k+50<q&&y(k+50)}},"Next page"),c.a.createElement("div",{id:"results"},"Results: ",k+1," - ",q))),c.a.createElement("div",{className:"headings"},["rank","name","symbol","circ","total","price","cap","change","history"].map((function(e){return c.a.createElement(d,{id:e,handler:K,text:e})}))),c.a.createElement("div",{className:"entries"},a.filter((function(e){return g(e.name,O)})).map((function(e,t){return c.a.createElement(p,{id:e.id,rank:e.rank,name:e.name,symbol:e.symbol,circ:e.circ,total:e.total,price:e.price,cap:e.cap,change:e.change,key:t})})).slice(k,k+50)))},k=a(16),y=a.n(k);a(44);var N=function(){return c.a.createElement("div",{className:"banner"},c.a.createElement("a",{href:"/"},c.a.createElement("img",{src:y.a})))};a(45);var w=function(){return c.a.createElement("div",{className:"header"},c.a.createElement(N,null))};o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(w,null),c.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.f55a3c69.chunk.js.map