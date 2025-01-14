var f=t=>{throw TypeError(t)};var _=(t,e,s)=>e.has(t)||f("Cannot "+s);var l=(t,e,s)=>(_(t,e,"read from private field"),s?s.call(t):e.get(t)),d=(t,e,s)=>e.has(t)?f("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();var i,a;class h{constructor(){d(this,i,"3vLlhLsn5MSlQI96Cy78HBPNhef1xnsS");d(this,a,"https://app.ticketmaster.com/discovery/v2/events.json");this.page=0,this.pageSize=12}async fetchEvents(){const e=new URLSearchParams({apikey:l(this,i),page:this.page,size:this.pageSize}),s=`${l(this,a)}?${e}&classificationName=music`,o=await fetch(s);if(!o.ok)throw new Error("Failed to fetch events");return o.json()}}i=new WeakMap,a=new WeakMap;function g(t){return t.map(s=>{var u,m;const o=((u=s.images[0])==null?void 0:u.url)||"",r=s.name||"No name available",n=s.dates.start.localDate||"Unknown date",c=((m=s._embedded)==null?void 0:m.venues[0].name)||"Unknown location",p=s.url||"#";return`
        <li class="cards__item">
                <img src="${o}" alt="${r}" class="cards__item__img">
                <h2 class="cards__item__title">
                    ${r}
                </h2>
                <p class="cards__item__date">${n}</p>
                <a href="${p}" class="cards__item__location__link">
                    <svg class="location__item__icon">
                        <use href="/img/icons/sprite.svg#icon-location"> </use>
                    </svg>

                   ${c} </a>
            </li>
      `}).join("")}const v=document.querySelector(".cards__list"),y=new h;L();async function L(){var t;try{const s=((t=(await y.fetchEvents())._embedded)==null?void 0:t.events)||"",o=g(s);v.insertAdjacentHTML("beforeend",o)}catch(e){console.error(e)}}
//# sourceMappingURL=index.js.map
