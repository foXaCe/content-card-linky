const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let o=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=a.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&a.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new o(a,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,m=globalThis,u=m.trustedTypes,g=u?u.emptyScript:"",y=m.reactiveElementPolyfillSupport,v=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!r(e,t),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&l(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:o}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=a?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(t)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of a){const a=document.createElement("style"),o=e.litNonce;void 0!==o&&a.setAttribute("nonce",o),a.textContent=t.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const s=o.fromAttribute(t,e.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,t,i,a=!1,o){if(void 0!==e){const s=this.constructor;if(!1===a&&(o=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??w)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,y?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const _=globalThis,x=e=>e,k=_.trustedTypes,D=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+A,C=`<${S}>`,P=document,H=()=>P.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,N="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,W=/>/g,R=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,L=/"/g,U=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Y=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),V=new WeakMap,J=P.createTreeWalker(P,129);function B(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==D?D.createHTML(t):t}const q=(e,t)=>{const i=e.length-1,a=[];let o,s=2===t?"<svg>":3===t?"<math>":"",n=F;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===F?"!--"===l[1]?n=z:void 0!==l[1]?n=W:void 0!==l[2]?(U.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=o??F,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?R:'"'===l[3]?L:O):n===L||n===O?n=R:n===z||n===W?n=F:(n=R,o=void 0);const h=n===R&&e[t+1].startsWith("/>")?" ":"";s+=n===F?i+C:c>=0?(a.push(r),i.slice(0,c)+E+i.slice(c)+A+h):i+A+(-2===c?t:h)}return[B(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class K{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let o=0,s=0;const n=e.length-1,r=this.parts,[l,c]=q(e,t);if(this.el=K.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=J.nextNode())&&r.length<n;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(E)){const t=c[s++],i=a.getAttribute(e).split(A),n=/([.?@])?(.*)/.exec(t);r.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?ee:"?"===n[1]?te:"@"===n[1]?ie:X}),a.removeAttribute(e)}else e.startsWith(A)&&(r.push({type:6,index:o}),a.removeAttribute(e));if(U.test(a.tagName)){const e=a.textContent.split(A),t=e.length-1;if(t>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],H()),J.nextNode(),r.push({type:2,index:++o});a.append(e[t],H())}}}else if(8===a.nodeType)if(a.data===S)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=a.data.indexOf(A,e+1));)r.push({type:7,index:o}),e+=A.length-1}o++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,a){if(t===Y)return t;let o=void 0!==a?i._$Co?.[a]:i._$Cl;const s=M(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(e),o._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=o:i._$Cl=o),void 0!==o&&(t=G(e,o._$AS(e,t.values),o,a)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??P).importNode(t,!0);J.currentNode=a;let o=J.nextNode(),s=0,n=0,r=i[0];for(;void 0!==r;){if(s===r.index){let t;2===r.type?t=new Q(o,o.nextSibling,this,e):1===r.type?t=new r.ctor(o,r.name,r.strings,this,e):6===r.type&&(t=new ae(o,this,e)),this._$AV.push(t),r=i[++n]}s!==r?.index&&(o=J.nextNode(),s++)}return J.currentNode=P,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),M(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=K.createElement(B(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Z(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new K(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const o of e)a===t.length?t.push(i=new Q(this.O(H()),this.O(H()),this,this.options)):i=t[a],i._$AI(o),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}_$AI(e,t=this,i,a){const o=this.strings;let s=!1;if(void 0===o)e=G(this,e,t,0),s=!M(e)||e!==this._$AH&&e!==Y,s&&(this._$AH=e);else{const a=e;let n,r;for(e=o[0],n=0;n<o.length-1;n++)r=G(this,a[i+n],t,n),r===Y&&(r=this._$AH[n]),s||=!M(r)||r!==this._$AH[n],r===j?e=j:e!==j&&(e+=(r??"")+o[n+1]),this._$AH[n]=r}s&&!a&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}class te extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}}class ie extends X{constructor(e,t,i,a,o){super(e,t,i,a,o),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??j)===Y)return;const i=this._$AH,a=e===j&&i!==j||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==j&&(i===j||a);a&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const oe=_.litHtmlPolyfillSupport;oe?.(K,Q),(_.litHtmlVersions??=[]).push("3.3.2");const se=globalThis;class ne extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let o=a._$litPart$;if(void 0===o){const e=i?.renderBefore??null;a._$litPart$=o=new Q(t.insertBefore(H(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}ne._$litElement$=!0,ne.finalized=!0,se.litElementHydrateSupport?.({LitElement:ne});const re=se.litElementPolyfillSupport;re?.({LitElement:ne}),(se.litElementVersions??=[]).push("4.2.2");const le={en:{card:{name:"Linky Card",description:"Card for the MyElectricalData integration — modern Linky data display with coloured trends",data_unavailable:"Linky: data unavailable for {entity}",current_week:"Current week",since:"since",previous_year:"vs {year}",previous_month:"vs {month}",current_month:"vs {month}",previous_week:"vs {week}",before_yesterday:"vs {date}",in_off_peak:"(off-peak)",in_peak:"(peak)",daily_cost:"Daily cost",version_available:"New version available {version}",migrate_med:"Please migrate to MyElectricalData. EnedisGateway is no longer supported.",monthly_view:"Monthly view",yearly_view:"Yearly view",detailed_comparison:"Detailed comparison",ecowatt:"EcoWatt",tempo:"Tempo",remaining_blue_days:"Remaining blue days",remaining_white_days:"Remaining white days",remaining_red_days:"Remaining red days"},editor:{entity:"Entity (required)",title_name:"Card title",show_icon:"Show Linky icon",show_history:"Show history",show_price:"Show price",show_day_price:"Show daily price",show_week_ratio:"Show week trend",show_current_month_ratio:"Show current month trend"}},fr:{card:{name:"Carte Enedis",description:"Carte pour l'intégration MyElectricalData — affichage moderne des données Linky avec évolutions colorées",data_unavailable:"Linky : données inaccessibles pour {entity}",current_week:"Semaine en cours",since:"depuis",previous_year:"vs {year}",previous_month:"vs {month}",current_month:"vs {month}",previous_week:"vs {week}",before_yesterday:"vs {date}",in_off_peak:"(en HC)",in_peak:"(en HP)",daily_cost:"Coût journalier",version_available:"Nouvelle version disponible {version}",migrate_med:"Merci de migrer sur MyElectricalData. EnedisGateway n'est plus supporté.",monthly_view:"Vue mensuelle",yearly_view:"Vue annuelle",detailed_comparison:"Comparaison détaillée",ecowatt:"EcoWatt",tempo:"Tempo",remaining_blue_days:"Jours bleus restants",remaining_white_days:"Jours blancs restants",remaining_red_days:"Jours rouges restants"},editor:{entity:"Entité (requis)",title_name:"Titre de la carte",show_icon:"Afficher l'icône Linky",show_history:"Afficher l'historique",show_price:"Afficher le prix",show_day_price:"Afficher le prix journalier",show_week_ratio:"Afficher l'évolution hebdo",show_current_month_ratio:"Afficher l'évolution du mois en cours"}}},ce="en";function de(e,t){return t.split(".").reduce((e,t)=>e&&null!=e[t]?e[t]:void 0,e)}function he(e,t,i={}){const a=function(e){const t=String(e?.locale?.language||e?.language||ce).toLowerCase().split("-")[0];return le[t]?t:ce}(e),o=de(le[a],t)??de(le[ce],t)??t;return"string"!=typeof o?t:o.replace(/\{(\w+)\}/g,(e,t)=>null!=i[t]?String(i[t]):`{${t}}`)}const pe="1.7.0";window.customCards=window.customCards||[],window.customCards.push({type:"content-card-linky",name:"Carte Enedis",description:"Carte pour l'intégration MyElectricalData - Affichage moderne des données Linky avec évolutions colorées",preview:!0,documentationURL:"https://github.com/MyElectricalData/content-card-linky",version:pe}),console.info(`%c content-card-linky %c v${pe} `,"color: white; background: #4caf50; font-weight: 700;","color: white; background: #1976d2; font-weight: 700;");const me=["entity","ewEntity","ewEntityJ1","ewEntityJ2","tempoEntity","tempoEntityInfo","tempoEntityJ0","tempoEntityJ1","tempoInfo","detailedComparisonEntity"],ue=new Map([["Pas de valeur","green"],[1,"green"],[2,"yellow"],[3,"red"]]),ge=new Map([["unknown","grey"],["Inconnu","grey"],["BLUE","blue"],["WHITE","white"],["RED","red"]]);function ye(e){const t=Number(e);return isNaN(t)?0:Math.round(t)}customElements.define("content-card-linky",class extends ne{static get properties(){return{config:{attribute:!1},hass:{attribute:!1},_monthlyExpanded:{state:!0},_yearlyExpanded:{state:!0},_detailedExpanded:{state:!0}}}constructor(){super(),this._monthlyExpanded=!1,this._yearlyExpanded=!1,this._detailedExpanded=!1}static async getConfigElement(){return await import("./content-card-linky-editor.js"),document.createElement("content-card-linky-editor")}static async getStubConfig(e){let t="sensor.linky_consumption";if(e&&e.states){const i=Object.keys(e.states).find(t=>{if(!t.startsWith("sensor."))return!1;const i=e.states[t].attributes||{};return/linky/i.test(t)||"consommation"===i.typeCompteur||void 0!==i.daily&&void 0!==i.dailyweek});i&&(t=i)}return{type:"custom:content-card-linky",entity:t,titleName:"LINKY",nbJoursAffichage:"7",showIcon:!0,showHistory:!0,showPrice:!0,showDayPrice:!0,showCurrentMonthRatio:!0,showWeekRatio:!0,showDayName:"long",showDayMaxPower:!0,showTitleLine:!0,showEcoWatt:!0,showTempo:!1,showMonthlyView:!0,showYearlyView:!0,showDetailedComparison:!0,detailedComparisonEntity:"sensor.linky_consumption_last5day"}}render(){if(!this.config||!this.hass)return I``;const e=this.hass.states[this.config.entity];if(!e)return I`
        <ha-card>
          <div class="card">
            <div id="states">
              <div class="name">
                <ha-icon
                  id="icon"
                  icon="mdi:flash"
                  data-state="unavailable"
                  data-domain="connection"
                  style="color: var(--state-icon-unavailable-color)"
                ></ha-icon>
                <span style="margin-right:2em"
                  >${he(this.hass,"card.data_unavailable",{entity:this.config.entity})}</span
                >
              </div>
            </div>
          </div>
        </ha-card>
      `;const t=e.attributes,i=t.typeCompteur;return"consommation"!==i&&i?"production"===i?I` <ha-card>
        <div class="card">
          <div class="main-info">
            ${this.config.showIcon?I` <div class="icon-block">
                  <span
                    class="linky-icon bigger"
                    style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
                  ></span>
                </div>`:I``}
            <div class="cout-block">${this.renderProductionValue(e.state,t)}</div>
          </div>
          ${this.renderError(t.errorLastCall)}
        </div>
      </ha-card>`:void 0:I` <ha-card id="card" @click="${()=>this._showDetails(this.config.entity)}">
        ${this.renderTitle()}
        <div class="card">
          ${this.renderHeader(t,this.config,e)}
          <div class="variations">
            ${this.config.showYearRatio?I` <span class="variations-linky">
                  <div class="percentage-line">
                    <span class="ha-icon">
                      <ha-icon
                        icon="mdi:arrow-right"
                        style="display: inline-block; transform: rotate(${t.yearly_evolution<0?"45":0===t.yearly_evolution?"0":"-45"}deg)"
                      >
                      </ha-icon>
                    </span>
                    <span
                      class="percentage-value ${t.yearly_evolution>0?"percentage-positive":t.yearly_evolution<0?"percentage-negative":"percentage-neutral"}"
                      aria-label="Évolution annuelle: ${ye(t.yearly_evolution)}%"
                      role="text"
                      >${ye(t.yearly_evolution)}<span class="unit"> %</span></span
                    >
                  </div>
                  <div class="tooltip">
                    <span class="year">vs ${this.previousYear()}</span>
                    <span class="tooltiptext"
                      >A-1 : ${t.current_year_last_year}<br />A : ${t.current_year}</span
                    >
                  </div>
                </span>`:I``}
            ${this.config.showMonthRatio?I` <span class="variations-linky">
                  <div class="percentage-line">
                    <span class="ha-icon">
                      <ha-icon
                        icon="mdi:arrow-right"
                        style="display: inline-block; transform: rotate(${t.monthly_evolution<0?"45":0===t.monthly_evolution?"0":"-45"}deg)"
                      >
                      </ha-icon>
                    </span>
                    <span
                      class="percentage-value ${t.monthly_evolution>0?"percentage-positive":t.monthly_evolution<0?"percentage-negative":"percentage-neutral"}"
                      aria-label="Évolution mensuelle: ${ye(t.monthly_evolution)}%"
                      role="text"
                      >${ye(t.monthly_evolution)}<span class="unit"> %</span></span
                    >
                  </div>
                  <div class="tooltip">
                    <span class="previous-month">vs ${this.previousMonth()}</span>
                    <span class="tooltiptext"
                      >Mois Precedent A-1 : ${t.last_month_last_year}<br />Mois Precedent :
                      ${t.last_month}</span
                    >
                  </div>
                </span>`:I``}
            ${this.config.showCurrentMonthRatio?I` <span class="variations-linky">
                  <div class="percentage-line">
                    <span class="ha-icon">
                      <ha-icon
                        icon="mdi:arrow-right"
                        style="display: inline-block; transform: rotate(${t.current_month_evolution<0?"45":0===t.current_month_evolution?"0":"-45"}deg)"
                      >
                      </ha-icon>
                    </span>
                    <span
                      class="percentage-value ${t.current_month_evolution>0?"percentage-positive":t.current_month_evolution<0?"percentage-negative":"percentage-neutral"}"
                      aria-label="Évolution du mois courant: ${ye(t.current_month_evolution)}%"
                      role="text"
                      >${ye(t.current_month_evolution)}<span class="unit"> %</span></span
                    >
                  </div>
                  <div class="tooltip">
                    <span class="current-month">vs ${this.currentMonth()}</span>
                    <span class="tooltiptext"
                      >Mois A-1 : ${t.current_month_last_year}<br />Mois : ${t.current_month}</span
                    >
                  </div>
                </span>`:I``}
            ${this.config.showWeekRatio?I` <span class="variations-linky">
                  <div class="percentage-line">
                    <span class="ha-icon">
                      <ha-icon
                        icon="mdi:arrow-right"
                        style="display: inline-block; transform: rotate(${t.current_week_evolution<0?"45":0===t.current_week_evolution?"0":"-45"}deg)"
                      >
                      </ha-icon>
                    </span>
                    <span
                      class="percentage-value ${t.current_week_evolution>0?"percentage-positive":t.current_week_evolution<0?"percentage-negative":"percentage-neutral"}"
                      aria-label="Évolution hebdomadaire: ${ye(t.current_week_evolution)}%"
                      role="text"
                      >${ye(t.current_week_evolution)}<span class="unit"> %</span></span
                    >
                  </div>
                  <div class="tooltip">
                    <span class="previous-month">vs ${this.weekBefore()}</span>
                    <span class="tooltiptext"
                      >Semaine dernière : ${t.last_week}<br />Semaine courante :
                      ${t.current_week}</span
                    >
                  </div>
                </span>`:I``}
            ${this.config.showYesterdayRatio?I` <span class="variations-linky">
                  <div class="percentage-line">
                    <span class="ha-icon">
                      <ha-icon
                        icon="mdi:arrow-right"
                        style="display: inline-block; transform: rotate(${t.yesterday_evolution<0?"45":0===t.yesterday_evolution?"0":"-45"}deg)"
                      >
                      </ha-icon>
                    </span>
                    <span
                      class="percentage-value ${t.yesterday_evolution>0?"percentage-positive":t.yesterday_evolution<0?"percentage-negative":"percentage-neutral"}"
                      aria-label="Évolution quotidienne: ${ye(t.yesterday_evolution)}%"
                      role="text"
                      >${ye(t.yesterday_evolution)}<span class="unit"> %</span></span
                    >
                  </div>
                  <div class="tooltip">
                    <span class="previous-month">vs ${this.dayBeforeYesterday()}</span>
                    <span class="tooltiptext"
                      >Avant-hier : ${t.day_2}<br />Hier : ${t.yesterday}</span
                    >
                  </div>
                </span>`:I``}
            ${this.config.showPeakOffPeak?I` <span class="variations-linky">
                  <span class="ha-icon">
                    <ha-icon icon="mdi:flash"></ha-icon>
                  </span>
                  ${ye(t.peak_offpeak_percent)}<span class="unit"> % HP</span>
                </span>`:I``}
          </div>
          ${!1!==this.config.showSmartInsights?this.renderSmartInsights(t.daily,t.dailyweek,t.dailyweek_cost):I``}
          ${this.renderHistory(t.daily,t.unit_of_measurement,t.dailyweek,t.dailyweek_cost,t.dailyweek_costHC,t.dailyweek_costHP,t.dailyweek_HC,t.dailyweek_HP,t.dailyweek_MP,t.dailyweek_MP_over,t.dailyweek_MP_time,t.dailyweek_Tempo,this.config,t)}
          ${this.renderMonthlyView(t,this.config)} ${this.renderYearlyView(t,this.config)}
          ${this.renderDetailedComparison(t,this.config)} ${this.renderEcoWatt(t)}
          ${this.renderTempo(t)} ${this.renderError(t.errorLastCall)}
          ${this.renderVersion(t.versionUpdateAvailable,t.versionGit)}
          ${this.renderInformation(t,this.config)}
        </div>
      </ha-card>`}_showDetails(e){return((e,t,i={},a={})=>{const o=new Event(t,{bubbles:a.bubbles??!0,cancelable:Boolean(a.cancelable),composed:a.composed??!0});return o.detail=i,e.dispatchEvent(o),o})(this,"hass-more-info",{entityId:e})}renderTitle(){if(!0===this.config.showTitle)return I` <div class="card">
        <div class="main-title">
          <span>${this.config.titleName}</span>
        </div>
      </div>`}renderHeader(e,t,i){if(!0===this.config.showHeader)return t.showPeakOffPeak?I` <div class="main-info">
          ${this.renderIcon()}
          <div class="hp-hc-block">
            <span class="conso-hc">${this.toFloat(e.yesterday_HC)}</span
            ><span class="conso-unit-hc">
              ${e.unit_of_measurement}
              <span class="more-unit">${he(this.hass,"card.in_off_peak")}</span></span
            ><br />
            <span class="conso-hp">${this.toFloat(e.yesterday_HP)}</span
            ><span class="conso-unit-hp">
              ${e.unit_of_measurement}
              <span class="more-unit">${he(this.hass,"card.in_peak")}</span></span
            >
          </div>
          ${this.renderPrice(e)}
        </div>`:I` <div class="main-info">
          ${this.renderIcon()}
          <div class="cout-block">
            <span class="cout">${this.toFloat(i.state)}</span>
            <span class="cout-unit">${e.unit_of_measurement}</span>
          </div>
          ${this.renderPrice(e)}
        </div>`}renderIcon(){return this.config.showIcon?I` <div class="icon-block">
        <span
          class="linky-icon bigger"
          style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
        ></span>
      </div>`:I``}renderPrice(e){return this.config.showPrice?I` <div class="cout-block">
        <span class="cout" title="${he(this.hass,"card.daily_cost")}"
          >${this.toFloat(e.daily_cost,2)}</span
        ><span class="cout-unit"> €</span>
      </div>`:I``}renderError(e){if(!0===this.config.showError&&""!==e)return I`
          <div class="error-msg" style="color: var(--error-color, red)">
            <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
            ${e}
          </div>
        `}renderInformation(e,t){return!1===t.showInformation||void 0===e.serviceEnedis?I``:"myElectricalData"!==e.serviceEnedis?I`
          <div class="information-msg" style="color: var(--error-color, red)">
            <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
            ${he(this.hass,"card.migrate_med")}
          </div>
        `:void 0}renderVersion(e,t){return!0===e?I`
        <div class="information-msg" style="color: var(--error-color, red)">
          <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
          ${he(this.hass,"card.version_available",{version:t})}
        </div>
      `:I``}calculateWeekTotal(e,t,i){if(!e)return 0;const a=new Date,o=0===a.getDay()?6:a.getDay()-1;let s=0;for(let t=Math.min(o-1,e.length-1);t>=0;t--)if(t<e.length){const a=new Date;a.setDate(a.getDate()-t);const o=a.getDay(),n=parseFloat(e[t]);if(0!==o)if(isNaN(n)||-1===n||0===n){if(i){const a=i.toString().split(","),o=parseFloat(a[t]?.replace(",","."));if(!isNaN(o)&&o>0){const i=[];for(let o=0;o<Math.min(e.length,a.length,7);o++)if(o!==t){const t=parseFloat(e[o]),s=parseFloat(a[o]?.replace(",","."));!isNaN(t)&&!isNaN(s)&&t>0&&s>0&&-1!==t&&-1!==s&&i.push(t/s)}if(i.length>0){const e=o*(i.reduce((e,t)=>e+t,0)/i.length);e>0&&(s+=e)}}}}else s+=n}return s}calculateWeekCost(e,t){if(!e)return 0;const i=new Date,a=0===i.getDay()?6:i.getDay()-1,o=e.toString().split(",");let s=0;for(let e=Math.min(a-1,o.length-1);e>=0;e--)if(e<o.length){const t=new Date;t.setDate(t.getDate()-e);const i=t.getDay(),a=parseFloat(o[e].replace(",","."));0===i||isNaN(a)||-1===a||(s+=a)}return s}getDynamicGradient(e,t=50){const i=e/t;return i<=.7?"linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)":i<=1?"linear-gradient(135deg, #2196f3 0%, #03dac6 100%)":i<=1.3?"linear-gradient(135deg, #ff9800 0%, #ffc107 100%)":"linear-gradient(135deg, #f44336 0%, #e91e63 100%)"}getSeasonalTheme(){const e=(new Date).getMonth();return e>=2&&e<=4?{primary:"#66bb6a",accent:"#81c784",icon:"mdi:flower"}:e>=5&&e<=7?{primary:"#42a5f5",accent:"#29b6f6",icon:"mdi:white-balance-sunny"}:e>=8&&e<=10?{primary:"#ff7043",accent:"#ffab40",icon:"mdi:leaf"}:{primary:"#5c6bc0",accent:"#7986cb",icon:"mdi:snowflake"}}renderWeekSummary(e,t,i,a){if(!this.config.showWeekSummary&&void 0!==this.config.showWeekSummary)return I``;const o=this.calculateWeekTotal(e,i,a),s=this.calculateWeekCost(a,i),n=new Date,r=new Date(n);r.setDate(n.getDate()-(0===n.getDay()?6:n.getDay()-1));const l=e.slice(0,7).reduce((e,t)=>e+parseFloat(t||0),0)/7*5,c=this.getDynamicGradient(o,l),d=this.getSeasonalTheme();return I`
      <div class="week-summary-card" style="background: ${c}">
        <div class="week-summary-header">
          <ha-icon icon="${d.icon}" class="week-summary-icon"></ha-icon>
          <span class="week-summary-title">${he(this.hass,"card.current_week")}</span>
          <span class="week-summary-period"
            >${he(this.hass,"card.since")}
            ${r.toLocaleDateString(this.hass?.locale?.language||"fr-FR",{day:"numeric",month:"short"})}</span
          >
        </div>
        <div class="week-summary-content">
          <div class="week-summary-main">
            <span class="week-summary-value">${this.toFloat(o,1)}</span>
            <span class="week-summary-unit">${t}</span>
          </div>
          ${s>0?I`
                <div class="week-summary-cost">
                  <span class="week-summary-cost-value">${s.toFixed(2).replace(/\.00$/,"")}</span>
                  <span class="week-summary-cost-unit">€</span>
                </div>
              `:I``}
        </div>
      </div>
    `}renderSmartInsights(e,t,i){const a=this.hass.states[this.config.entity],o=a?a.attributes:{},s=t&&Array.isArray(t)?t.reduce((e,t)=>e+parseFloat(t||0),0):0,n=i&&Array.isArray(i)?i.reduce((e,t)=>e+parseFloat(t||0),0):0,r=parseFloat((o.current_month||0).toString().replace(",",".")),l=r>0?r/(new Date).getDate()*new Date((new Date).getFullYear(),(new Date).getMonth()+1,0).getDate():s>0?s/7*30:0,c=n>0?n/7*30:0,d=parseFloat((o.current_week_evolution||0).toString().replace(",",".")),h=parseFloat((o.monthly_evolution||0).toString().replace(",",".")),p=parseFloat((o.yearly_evolution||0).toString().replace(",",".")),m=d<0,u=h<0,g=p<0,y=m?"mdi:trending-down":"mdi:trending-up",v=m?"#4caf50":"#f44336",f=u?"mdi:trending-down":"mdi:trending-up",w=u?"#4caf50":"#f44336",b=g?"mdi:trending-down":"mdi:trending-up",$=g?"#4caf50":"#f44336";return I`
      <div class="smart-insights">
        <div class="insight-row">
          <div class="insight-item">
            <ha-icon icon="mdi:calendar-month" class="insight-icon"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">Prédiction mensuelle</div>
              <div class="insight-value">
                ${l.toFixed(0)} kWh • ${c.toFixed(0)}€
              </div>
            </div>
          </div>

          <div class="insight-item">
            <ha-icon icon="${y}" class="insight-icon" style="color: ${v}"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">vs semaine dernière</div>
              <div class="insight-value" style="color: ${v}">
                ${d>0?"+":""}${d}%
              </div>
            </div>
          </div>
        </div>

        <div class="insight-row">
          <div class="insight-item">
            <ha-icon icon="${f}" class="insight-icon" style="color: ${w}"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">vs mois dernier</div>
              <div class="insight-value" style="color: ${w}">
                ${h>0?"+":""}${h}%
              </div>
            </div>
          </div>

          <div class="insight-item">
            <ha-icon icon="${b}" class="insight-icon" style="color: ${$}"></ha-icon>
            <div class="insight-content">
              <div class="insight-label">vs année dernière</div>
              <div class="insight-value" style="color: ${$}">
                ${p>0?"+":""}${p}%
              </div>
            </div>
          </div>
        </div>
      </div>
    `}renderHistory(e,t,i,a,o,s,n,r,l,c,d,h,p,m){if(!0===this.config.showHistory&&void 0!==i){let m=i.toString().split(",").length;return p.nbJoursAffichage<=m&&(m=p.nbJoursAffichage),I`
          ${this.renderWeekSummary(e,t,i,a)}
          <div class="week-history">
            ${this.renderTitreLigne()}
            ${e.slice(-m).map((u,g)=>{const y=e.length-m+g+1;return this.renderDay(u,y,t,i,a,o,s,n,r,l,c,d,h,p)}).reverse()}
          </div>
        `}}renderDay(e,t,i,a,o,s,n,r,l,c,d,h,p,m){return I`
      <div class="day">
        ${this.renderDailyWeek(a,p,t,m)}
        ${this.renderDailyValue(e,t,i,m,o)}
        ${this.renderDayPrice(o,t,m)}
        ${this.renderDayPriceHCHP(s,t,m)}
        ${this.renderDayPriceHCHP(n,t,m)}
        ${this.renderDayHCHP(r,t,i,m)}
        ${this.renderDayHCHP(l,t,i,m)}
        ${this.renderDayMaxPower(c,t,d,h,m)}
      </div>
    `}renderDailyWeekTitre(e,t){if(!0===e){return I`<span class="titre-desktop">${t}</span><span class="titre-mobile">${{"Prix HC":"€ HC","Prix HP":"€ HP"}[t]||t}</span
        ><br /> `}return I``}renderTitreLigne(){if(!0===this.config.showTitleLign)return I`
        <div class="day">
          ${this.renderDailyWeekTitre(!0,"")} ${this.renderDailyWeekTitre(!0,"Conso")}
          ${this.renderDailyWeekTitre(this.config.showDayPrice,"Prix")}
          ${this.renderDailyWeekTitre(this.config.showDayPriceHCHP,"Prix HC")}
          ${this.renderDailyWeekTitre(this.config.showDayPriceHCHP,"Prix HP")}
          ${this.renderDailyWeekTitre(this.config.showDayHCHP,"HC")}
          ${this.renderDailyWeekTitre(this.config.showDayHCHP,"HP")}
          ${this.renderDailyWeekTitre(this.config.showDayMaxPower,"MP")}
          ${this.renderDailyWeekTitre(this.config.showDayMaxPowerTime,"MPtime")}
        </div>
      `}findTempoEntities(){const e=["sensor.rte_tempo_today","sensor.edf_tempo_today","sensor.tempo_today","sensor.rte_tempo_tomorrow","sensor.edf_tempo_tomorrow","sensor.tempo_tomorrow"],t={};for(const i of e)if(this.hass.states[i]){const e=this.hass.states[i];e.state&&ge.has(e.state)&&(i.includes("today")?t.today=i:i.includes("tomorrow")&&(t.tomorrow=i))}if(this.config.tempoEntity&&this.hass.states[this.config.tempoEntity]){const e=this.hass.states[this.config.tempoEntity];e.state&&ge.has(e.state)&&(t.today=this.config.tempoEntity)}return t}getTempoColorForDay(e,t,i){if(e&&"undefined"!==e.toString()){const i=e.toString().split(",")[t-1];if(i&&"-1"!==i)return i.toLowerCase()}const a=this.findTempoEntities();if(i&&Object.keys(a).length>0){const e=new Date(i),t=new Date,o=new Date;if(o.setDate(t.getDate()+1),e.toDateString()===t.toDateString()&&a.today){const e=this.hass.states[a.today];if(e&&e.state&&ge.has(e.state))return ge.get(e.state)}if(e.toDateString()===o.toDateString()&&a.tomorrow){const e=this.hass.states[a.tomorrow];if(e&&e.state&&ge.has(e.state))return ge.get(e.state)}}return"grey"}renderDailyWeek(e,t,i,a){const o=e.toString().split(",")[i-1];let s="grey";return a.showTempoColor&&(s=this.getTempoColorForDay(t,i,o)),I`
      <span class="tempo-day-wrapper">
        <span
          class="tempoday-${s}"
          style="display: inline-block;"
          title="Tempo: ${s} - Date: ${o}"
          >${new Date(o).toLocaleDateString("fr-FR",{weekday:a.showDayName})}</span
        >
      </span>
    `}renderNoData(){return I`
      <br /><span class="cons-val" title="Donnée indisponible"
        ><ha-icon id="icon" icon="mdi:alert-outline"></ha-icon
      ></span>
    `}renderPendingData(){return I`
      <br /><span class="cons-val pending" title="Données en attente de remontée"
        ><ha-icon id="icon" icon="mdi:clock-outline" style="color: #ff9800;"></ha-icon
      ></span>
    `}estimateMissingKwh(e,t,i){if(!e||!i)return 0;const a=i.toString().split(","),o=parseFloat(a[t-1]?.replace(",","."));if(isNaN(o)||o<=0)return 0;const s=[];for(let t=0;t<Math.min(e.length,a.length,7);t++){const i=parseFloat(e[t]),o=parseFloat(a[t]?.replace(",","."));!isNaN(i)&&!isNaN(o)&&i>0&&o>0&&-1!==i&&-1!==o&&s.push(i/o)}if(0===s.length)return 0;return o*(s.reduce((e,t)=>e+t,0)/s.length)}renderProductionValue(e,t){const i=parseFloat(e);if(isNaN(i)||-1===i||0===i||"0"===e||null==e){if(!t.dailyweek_cost||!t.daily)return I`
          <span
            class="cout pending"
            title="Données de production en attente"
            style="color: #ff9800; font-style: italic;"
          >
            <ha-icon icon="mdi:clock-outline"></ha-icon>
          </span>
          <span class="cout-unit">${t.unit_of_measurement}</span>
        `;{const e=t.dailyweek_cost.toString().split(","),i=parseFloat(e[0]?.replace(",","."));if(!isNaN(i)&&i>0){const e=this.estimateMissingKwh(t.daily,1,t.dailyweek_cost);if(e>0)return I`
              <span class="cout estimated" title="Estimation production basée sur les données précédentes"
                >${this.toFloat(e)}</span
              >
              <span class="cout-unit">${t.unit_of_measurement}</span>
            `}else if(0===i||isNaN(i)||!e[0]||"-1"===e[0])return I`
            <span
              class="cout pending"
              title="Données de production en attente"
              style="color: #ff9800; font-style: italic;"
            >
              <ha-icon icon="mdi:clock-outline"></ha-icon>
            </span>
            <span class="cout-unit">${t.unit_of_measurement}</span>
          `}}return I`
      <span class="cout">${this.toFloat(e)}</span>
      <span class="cout-unit">${t.unit_of_measurement}</span>
    `}renderDailyValue(e,t,i,a,o){if(-1===e||0===e||"0"===e||null==e){if(!o)return this.renderPendingData();{const e=o.toString().split(",")[t-1];if(e&&"-1"!==e&&parseFloat(e.replace(",","."))>0){const e=this.estimateMissingKwh(this.hass.states[this.config.entity].attributes.daily,t,o);if(e>0)return I`
              <br /><span
                class="cons-val estimated"
                title="Estimation basée sur les jours précédents - Données kWh non disponibles"
                >${this.toFloat(e)}
                ${this.config.showInTableUnit?I` ${i}`:I``}</span
              >
            `}else if(!e||"-1"===e)return this.renderPendingData()}return this.renderNoData()}return I`
        <br /><span class="cons-val"
          >${this.toFloat(e)} ${this.config.showInTableUnit?I` ${i}`:I``}</span
        >
      `}renderDayPrice(e,t,i){if(i.showDayPrice){const i=e.toString().split(",")[t-1];return"-1"===i?this.renderNoData():I` <br /><span class="cons-val">${this.toFloat(i,2)} €</span> `}if(i.kWhPrice)return I` <br /><span class="cons-val">${this.toFloat(e*i.kWhPrice,2)} €</span> `}renderDayPriceHCHP(e,t,i){if(i.showDayPriceHCHP){const i=e.toString().split(",")[t-1];return"-1"===i?this.renderNoData():I` <br /><span class="cons-val">${this.toFloat(i,2)} €</span> `}}renderDayHCHP(e,t,i,a){if(a.showDayHCHP){const a=e.toString().split(",")[t-1];return"-1"===a?this.renderNoData():I`
          <br /><span class="cons-val"
            >${this.toFloat(a,2)} ${this.config.showInTableUnit?I` ${i}`:I``}</span
          >
        `}}renderDayMaxPower(e,t,i,a,o){if(o.showDayMaxPower){const o=e.toString().split(",")[t-1],s=i.toString().split(",")[t-1];return"-1"===o?this.renderNoData():"true"===s?I`
            <br /><span class="cons-val" style="color:red">${this.toFloat(o,2)}</span> <br /><span
              class="cons-val"
              style="color:red"
              >${new Date(a.toString().split(",")[t-1]).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</span
            >
          `:I`
            <br /><span class="cons-val">${this.toFloat(o,2)}</span> <br /><span class="cons-val"
              >${new Date(a.toString().split(",")[t-1]).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</span
            >
          `}}getOneDayNextEcoWattText(e){const t=new Date(e.attributes.date);for(const[t,i]of Object.entries(e.attributes.forecast))if(void 0!==t&&"green"!==ue.get(i))return I`Actuellement: ${ue.get(i)}`;return I`Ecowatt ${t.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric"})}`}getOneDayNextEcoWatt(e){const t=[];for(let[i,a]of Object.entries(e.attributes.forecast))void 0!==i&&(i=i.replace("h","").trim(),i=i.replace("min","").trim(),t.push([i,ue.get(a),a]));return t}renderEcoWatt(e){if(void 0===e.serviceEnedis)return I``;if("myElectricalData"!==e.serviceEnedis)return I`EcoWatt : uniquement disponible avec myElectricData`;const t=this.config.ewEntity,i=t?this.hass.states[t]:void 0,a=this.config.ewEntityJ1,o=a?this.hass.states[a]:void 0,s=this.config.ewEntityJ2,n=s?this.hass.states[s]:void 0;return this.config.showEcoWatt&&!i?I`<div class="error-msg">EcoWatt : entité J+0 non configurée ou introuvable</div>`:!this.config.showEcoWattJ12||o&&n?I`
      <table style="width:100%">
        ${this.config.showEcoWatt?I` <tr style="line-height:80%">
              <td style="width:5%">J+0</td>
              <td style="width:95%">
                <ul class="flow-row oneHour">
                  ${I`
                    ${this.getOneDayNextEcoWatt(i).map(e=>I` <li
                          class="ecowatt-${e[0]}"
                          style="background: ${e[1]}"
                          title="${e[1]} - ${e[0]}"
                        ></li>`)}
                  `}
                </ul>
              </td>
            </tr>`:I``}
        ${this.config.showEcoWattJ12?I`
              <tr style="line-height:80%">
                <td style="width:5%">J+1</td>
                <td style="width:95%">
                  <ul class="flow-row oneHour">
                    ${I`
                      ${this.getOneDayNextEcoWatt(o).map(e=>I` <li
                            class="ecowatt-${e[0]}"
                            style="background: ${e[1]}"
                            title="${e[1]} - ${e[0]}"
                          ></li>`)}
                    `}
                  </ul>
                </td>
              </tr>
              <tr style="line-height:80%">
                <td style="width:5%">J+2</td>
                <td style="width:95%">
                  <ul class="flow-row oneHour">
                    ${I`
                      ${this.getOneDayNextEcoWatt(n).map(e=>I` <li
                            class="ecowatt-${e[0]}"
                            style="background: ${e[1]}"
                            title="${e[1]} - ${e[0]}"
                          ></li>`)}
                    `}
                  </ul>
                </td>
              </tr>
              <tr style="line-height:80%">
                <td style="width:5%"></td>
                <td style="width:95%">
                  <ul class="flow-row oneHourLabel">
                    ${I`
                      ${this.getOneDayNextEcoWatt(n).map(e=>I` <li title="${e[0]}">${e[0]%2==1?e[0]:""}</li>`)}
                    `}
                  </ul>
                </td>
              </tr>
            `:I``}
      </table>
    `:I`<div class="error-msg">EcoWatt : entité(s) J+1/J+2 non configurée(s) ou introuvable(s)</div>`}getTempoDateValue(e){const t=new Date(e.attributes.date),i=e.state;return[t,ge.get(i),i]}getTempoRemainingDays(e){return[e.attributes.days_red,e.attributes.days_white,e.attributes.days_blue]}renderTempo(e){if(void 0===e.serviceEnedis)return I``;if("myElectricalData"!==e.serviceEnedis)return I`EcoWatt : uniquement disponible avec myElectricData`;if(!1===this.config.showTempo)return I``;const t=this.config.tempoEntityInfo,i=this.hass.states[t],a=this.config.tempoEntityJ0,o=this.hass.states[a],s=this.config.tempoEntityJ1,n=this.hass.states[s];if(!(o&&o.state&&n&&n.state))return I`Tempo: sensor(s) J0 et/ou J1 indisponible ou incorrecte`;if(!i||!i.state)return I`Tempo: sensor 'info' indisponible ou incorrecte`;const[r,l]=this.getTempoDateValue(o),[c,d]=this.getTempoDateValue(n),[h,p,m]=this.getTempoRemainingDays(i);return I`
      <table class="tempo-color">
        <tr>
          <td class="tempo-${l}" style="width:50%">
            ${new Date(r).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric"})}
          </td>
          <td class="tempo-${d}" style="width:50%">
            ${new Date(c).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric"})}
          </td>
        </tr>
      </table>
      <table class="tempo-days">
        <tr>
          <td class="tempo-blue" style="width:33.33%">${m}</td>
          <td class="tempo-white" style="width:33.33%">${p}</td>
          <td class="tempo-red" style="width:33.33%">${h}</td>
        </tr>
      </table>
    `}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");if(e.kWhPrice&&isNaN(e.kWhPrice))throw new Error("kWhPrice should be a number");const t={showHistory:!0,showHeader:!0,showPeakOffPeak:!0,showIcon:!1,showInTableUnit:!1,showDayPrice:!1,showDayPriceHCHP:!1,showDayMaxPower:!1,showDayHCHP:!1,showDayName:"long",showError:!0,showInformation:!0,showPrice:!0,showTitle:!1,showCurrentMonthRatio:!0,showMonthRatio:!0,showWeekRatio:!1,showYesterdayRatio:!1,showTitleLign:!1,showEcoWatt:!1,showEcoWattJ12:!1,showTempo:!1,showTempoColor:!0,showWeekSummary:!0,showMonthlyView:!0,showYearlyView:!0,showDetailedComparison:!0,detailedComparisonEntity:"sensor.linky_consumption_last5day",tempoEntity:"sensor.rte_tempo_today",titleName:"LINKY",nbJoursAffichage:"7",kWhPrice:void 0};this.config={...t,...e}}shouldUpdate(e){return function(e,t){if(t.has("config"))return!0;const i=t.get("hass");if(!i)return!0;const a=e.config||{};for(const t of me){const o=a[t];if(o&&i.states[o]!==e.hass.states[o])return!0}return!1}(this,e)}updated(e){super.updated(e);const t=this.shadowRoot.querySelector(".week-history");t&&(t.scrollLeft=t.scrollWidth-t.clientWidth)}getCardSize(){const e=this.config||{};let t=2;return e.showHistory&&(t+=2),!1!==e.showSmartInsights&&(t+=1),e.showMonthlyView&&(t+=1),e.showYearlyView&&(t+=1),e.showDetailedComparison&&(t+=1),(e.showEcoWatt||e.showEcoWattJ12)&&(t+=1),e.showTempo&&(t+=1),t}getGridOptions(){const e=this.getCardSize();return{columns:12,rows:Math.max(3,Math.min(e,12)),min_columns:6,min_rows:3}}getLayoutOptions(){const e=this.getCardSize();return{grid_columns:4,grid_rows:Math.max(3,Math.min(e,12)),grid_min_columns:2,grid_min_rows:3}}toFloat(e,t=1){const i=Number.parseFloat(e);return isNaN(i)?"–":i.toFixed(t)}toggleMonthlyView(e){e.stopPropagation(),e.preventDefault(),this._monthlyExpanded=!this._monthlyExpanded}toggleYearlyView(e){e.stopPropagation(),e.preventDefault(),this._yearlyExpanded=!this._yearlyExpanded}toggleDetailedComparison(e){e.stopPropagation(),e.preventDefault(),this._detailedExpanded=!this._detailedExpanded}renderMonthlyView(e,t){if(!t.showMonthlyView)return I``;const i=e.current_month||"N/A",a=e.last_month||"N/A",o=e.current_month_last_year||"N/A",s=e.last_month_last_year||"N/A",n=[{name:"Mois actuel",value:i,year:(new Date).getFullYear(),evolution:"N/A"!==o&&"N/A"!==i?((parseFloat(i)-parseFloat(o))/parseFloat(o)*100).toFixed(1):null},{name:"Mois précédent",value:a,year:(new Date).getFullYear(),evolution:"N/A"!==s&&"N/A"!==a?((parseFloat(a)-parseFloat(s))/parseFloat(s)*100).toFixed(1):null},{name:"Mois actuel A-1",value:o,year:(new Date).getFullYear()-1,evolution:null},{name:"Mois préc. A-1",value:s,year:(new Date).getFullYear()-1,evolution:null}].filter(e=>"N/A"!==e.value);return I`
      <div class="collapsible-section">
        <div class="collapsible-header" @click="${this.toggleMonthlyView}">
          <ha-icon icon="${this._monthlyExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
          <span class="section-title">Mensuel</span>
          <span class="section-summary"> ${n.length>0?`${n.length} mois`:"Aucune donnée"} </span>
        </div>
        <div class="collapsible-content ${this._monthlyExpanded?"expanded":"collapsed"}">
          <div class="month-history">
            ${n.map(t=>I`
                <div class="month-item">
                  <div class="month-name">${t.name} (${t.year})</div>
                  <div class="month-value">${this.toFloat(t.value)} ${e.unit_of_measurement}</div>
                  <div class="month-evolution">
                    ${null!==t.evolution?I`
                          <span class="evolution-percent ${parseFloat(t.evolution)>=0?"positive":"negative"}">
                            ${parseFloat(t.evolution)>=0?"+":""}${t.evolution}%
                          </span>
                        `:"-"}
                  </div>
                </div>
              `)}
          </div>
        </div>
      </div>
    `}renderYearlyView(e,t){if(!t.showYearlyView)return I``;const i=e.current_year||"N/A",a=e.current_year_last_year||"N/A",o=[{name:(new Date).getFullYear(),value:i,evolution:"N/A"!==a&&"N/A"!==i?((parseFloat(i)-parseFloat(a))/parseFloat(a)*100).toFixed(1):null},{name:(new Date).getFullYear()-1,value:a,evolution:null}].filter(e=>"N/A"!==e.value);return I`
      <div class="collapsible-section">
        <div class="collapsible-header" @click="${this.toggleYearlyView}">
          <ha-icon icon="${this._yearlyExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
          <span class="section-title">Annuel</span>
          <span class="section-summary"> ${o.length>0?`${o.length} ans`:"Aucune donnée"} </span>
        </div>
        <div class="collapsible-content ${this._yearlyExpanded?"expanded":"collapsed"}">
          <div class="year-history">
            ${o.map(t=>I`
                <div class="year-item">
                  <div class="year-name">${t.name}</div>
                  <div class="year-value">${this.toFloat(t.value)} ${e.unit_of_measurement}</div>
                  <div class="year-evolution">
                    ${null!==t.evolution?I`
                          <span class="evolution-percent ${parseFloat(t.evolution)>=0?"positive":"negative"}">
                            ${parseFloat(t.evolution)>=0?"+":""}${t.evolution}%
                          </span>
                        `:"-"}
                  </div>
                </div>
              `)}
          </div>
        </div>
      </div>
    `}renderDetailedComparison(e,t){if(!t.showDetailedComparison)return I``;if(!t.detailedComparisonEntity)return I``;const i=this.hass.states[t.detailedComparisonEntity];if(!i)return I`
        <div class="collapsible-section">
          <div class="collapsible-header">
            <span class="section-title">Aujourd'hui vs Hier</span>
            <span class="section-summary">Entité ${t.detailedComparisonEntity} introuvable</span>
          </div>
        </div>
      `;const a=i.attributes.Daily,o=i.attributes.Dailyweek;if(!a||!o){const e=Object.keys(i.attributes).join(", ");return I`
        <div class="collapsible-section">
          <div class="collapsible-header">
            <span class="section-title">Aujourd'hui vs Hier</span>
            <span class="section-summary">Attributs disponibles: ${e}</span>
          </div>
        </div>
      `}const s=this.parseDetailedData({Daily:a,Dailyweek:o});return s.today&&s.yesterday?I`
      <div class="collapsible-section">
        <div class="collapsible-header" @click="${this.toggleDetailedComparison}">
          <ha-icon icon="${this._detailedExpanded?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
          <span class="section-title">Aujourd'hui vs Hier</span>
          <span class="section-summary">
            ${s.todayTotal.toFixed(1)} vs ${s.yesterdayTotal.toFixed(1)} kWh
          </span>
        </div>
        <div class="collapsible-content ${this._detailedExpanded?"expanded":"collapsed"}">
          <div class="detailed-comparison">
            ${this.renderComparisonCharts(s,e.unit_of_measurement)}
            ${this.renderComparisonStats(s)}
          </div>
        </div>
      </div>
    `:I`
        <div class="collapsible-section">
          <div class="collapsible-header">
            <span class="section-title">Aujourd'hui vs Hier</span>
            <span class="section-summary"
              >Données aujourd'hui/hier manquantes (${s.today?.length||0} /
              ${s.yesterday?.length||0})</span
            >
          </div>
        </div>
      `}parseDetailedData(e){const t=e.Daily.split(",").map(e=>parseFloat(e.trim().replace(",","."))),i=e.Dailyweek.split(",").map(e=>{const[t,i]=e.trim().split("/"),a=(new Date).getFullYear();return new Date(a,parseInt(i)-1,parseInt(t))}),a=new Date,o=new Date(a.getFullYear(),a.getMonth(),a.getDate()),s=new Date(o.getTime()-864e5),n=[],r=[];i.forEach((e,i)=>{const a=t[i]||0,l=new Date(e.getFullYear(),e.getMonth(),e.getDate());l.getTime()===o.getTime()?n.push({time:e,consumption:a}):l.getTime()===s.getTime()&&r.push({time:e,consumption:a})});const l=n.reduce((e,t)=>e+t.consumption,0)/1e3,c=r.reduce((e,t)=>e+t.consumption,0)/1e3;return{today:n,yesterday:r,todayTotal:l,yesterdayTotal:c,evolution:l>0&&0!==c?(l-c)/c*100:0}}renderComparisonCharts(e,t){const i=Math.max(...e.today.map(e=>e.consumption),...e.yesterday.map(e=>e.consumption));return I`
      <div class="comparison-charts">
        <div class="chart-day">
          <h4>Aujourd'hui</h4>
          <div class="mini-chart">${this.renderMiniChart(e.today,i,"#2196f3")}</div>
          <div class="day-stats">
            <span class="total">${e.todayTotal.toFixed(1)} ${t}</span>
            <span class="peak">Pic: ${Math.max(...e.today.map(e=>e.consumption))}W</span>
          </div>
        </div>
        <div class="chart-day">
          <h4>Hier</h4>
          <div class="mini-chart">${this.renderMiniChart(e.yesterday,i,"#666")}</div>
          <div class="day-stats">
            <span class="total">${e.yesterdayTotal.toFixed(1)} ${t}</span>
            <span class="peak">Pic: ${Math.max(...e.yesterday.map(e=>e.consumption))}W</span>
          </div>
        </div>
      </div>
    `}renderMiniChart(e,t,i){if(!e||e.length<=1||0===t)return I`<svg viewBox="0 0 100 50" class="consumption-chart"></svg>`;const a=e.map((i,a)=>`${a/(e.length-1)*100},${100-i.consumption/t*100}`).join(" ");return I`
      <svg viewBox="0 0 100 50" class="consumption-chart">
        <polyline points="${a}" fill="none" stroke="${i}" stroke-width="2" />
      </svg>
    `}renderComparisonStats(e){const t=e.evolution;return I`
      <div class="comparison-stats">
        <div class="stat-item evolution ${t>0?"increase":t<0?"decrease":"stable"}">
          <ha-icon icon="${t>0?"mdi:trending-up":t<0?"mdi:trending-down":"mdi:trending-neutral"}"></ha-icon>
          <span class="label">Évolution</span>
          <span class="value">${Math.abs(t).toFixed(1)}%</span>
        </div>
        <div class="stat-item difference">
          <ha-icon icon="mdi:calculator"></ha-icon>
          <span class="label">Différence</span>
          <span class="value">${Math.abs(e.todayTotal-e.yesterdayTotal).toFixed(2)} kWh</span>
        </div>
      </div>
    `}previousYear(){const e=new Date;return e.setFullYear(e.getFullYear()-1),e.toLocaleDateString("fr-FR",{year:"numeric"})}previousMonth(){const e=new Date;return e.setMonth(e.getMonth()-1),e.setFullYear(e.getFullYear()-1),e.toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}currentMonth(){const e=new Date;return e.setFullYear(e.getFullYear()-1),e.toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}weekBefore(){return"semaine"}dayBeforeYesterday(){return"avant-hier"}static get styles(){return s`
      .card {
        margin: auto;
        padding: 1.5em 1em 1em 1em;
        position: relative;
        cursor: pointer;
        background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color)));
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 4px 8px 0 rgba(0, 0, 0, 0.1));
        transition: all 0.3s ease;
      }

      .card:hover {
        transform: translateY(-2px);
        box-shadow: var(--ha-card-box-shadow, 0 8px 16px 0 rgba(0, 0, 0, 0.15));
      }

      /* Desktop - masquer les titres mobiles */
      .titre-mobile {
        display: none;
      }
      .titre-desktop {
        display: inline;
      }

      @media (max-width: 768px) {
        .card {
          padding: 2em 1em 1em 1em;
        }
        .main-title {
          font-size: 1.8em;
        }
        .conso-hp,
        .conso-hc {
          font-size: 1.8em;
        }
        /* Titres colonnes plus petits sur tablette */
        .day {
          font-size: 0.9em;
        }
        /* Afficher titres mobiles sur tablette */
        .titre-mobile {
          display: inline;
        }
        .titre-desktop {
          display: none;
        }
        /* Réduire la taille des textes de pourcentage */
        .year,
        .previous-month,
        .current-month {
          font-size: 0.7em !important;
        }
        .variations-linky {
          font-size: 0.9em;
        }
        .percentage-value {
          font-size: 1em;
        }
      }

      @media (max-width: 480px) {
        .card {
          padding: 2.2em 0.8em 1em 0.8em;
        }
        .main-title {
          font-size: 1.6em;
        }
        .conso-hp,
        .conso-hc {
          font-size: 1.6em;
        }
        /* Titres colonnes encore plus petits sur mobile */
        .day {
          font-size: 0.8em;
          line-height: 1.6;
        }
        /* S'assurer que les titres mobiles sont affichés */
        .titre-mobile {
          display: inline;
        }
        .titre-desktop {
          display: none;
        }
        /* Ajuster les textes de pourcentage sur mobile */
        .year,
        .previous-month,
        .current-month {
          font-size: 0.75em !important;
          white-space: nowrap;
        }
        .variations-linky {
          font-size: 0.8em;
        }
        .percentage-value {
          font-size: 0.9em;
        }
        /* Forcer le nowrap pour éviter les retours à la ligne */
        .tooltip {
          white-space: nowrap;
        }
      }

      ha-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .main-title {
        margin: auto;
        text-align: center;
        font-weight: 200;
        font-size: 2em;
        justify-content: space-between;
      }
      .main-info {
        display: flex;
        overflow: visible;
        align-items: center;
        justify-content: space-between;
        min-height: 75px;
        padding: 1em;
        background: linear-gradient(135deg, var(--primary-color, #1976d2), var(--accent-color, #03dac6));
        border-radius: 12px;
        margin-bottom: 1em;
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .ha-icon {
        margin-right: 5px;
        color: var(--state-icon-color);
      }

      .cout {
        font-weight: 300;
        font-size: clamp(2.5em, 5vw, 3.5em);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .cout.estimated {
        color: #ff6b6b !important;
        font-style: italic !important;
        position: relative;
      }

      .cout.estimated::before {
        content: "~";
        font-weight: bold;
        margin-right: 2px;
      }

      .cout.estimated::after {
        content: "est.";
        font-size: 0.3em;
        opacity: 0.8;
        margin-left: 4px;
        font-weight: normal;
        position: absolute;
        top: 0.2em;
      }

      .cout-unit {
        font-weight: 300;
        font-size: 1.2em;
        display: inline-block;
        white-space: nowrap;
      }

      .conso-hp,
      .conso-hc {
        font-weight: 200;
        font-size: 2em;
      }

      .conso-unit-hc,
      .conso-unit-hp {
        font-weight: 100;
        font-size: 1em;
        white-space: nowrap;
      }

      .more-unit {
        font-style: italic;
        font-size: 0.8em;
      }

      .variations {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 0.5em;
        overflow: hidden;
        margin-bottom: 1em;
      }

      .variations-linky {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 300;
        margin: 0;
        overflow: hidden;
        text-align: center;
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 8px;
        padding: 0.5em;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
      }

      .variations-linky:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .percentage-line {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin-bottom: 2px;
      }

      .percentage-line ha-icon {
        transition: transform 0.3s ease;
      }

      .variations-linky:hover .percentage-line ha-icon {
        transform: scale(1.2);
      }

      .percentage-value {
        font-weight: 500;
        font-size: 1.1em;
      }

      .variations-linky .percentage-value.percentage-positive {
        color: var(--error-color, var(--red-color, #e74c3c));
      }

      .variations-linky .percentage-value.percentage-negative {
        color: var(--success-color, var(--green-color, #27ae60));
      }

      .variations-linky .percentage-value.percentage-neutral {
        color: var(--primary-text-color, var(--text-primary-color, #212121));
      }

      .unit {
        font-size: 0.8em;
      }

      .week-history {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-top: 0.5em;
        scroll-behavior: smooth;
      }

      .day {
        flex: auto;
        text-align: center;
        border-right: 0.1em solid var(--divider-color);
        line-height: 2;
        box-sizing: border-box;
        transition: all 0.2s ease;
        padding: 0.5em 0.2em;
      }

      .day:hover {
        background: var(--primary-color, #1976d2);
        color: white;
        transform: scale(1.02);
      }

      .dayname {
        font-weight: bold;
        text-transform: capitalize;
      }

      .week-history .day:last-child {
        border-right: none;
      }

      .cons-val {
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.2s ease;
      }

      .cons-val.estimated {
        color: #ff6b6b !important;
        font-style: italic !important;
        position: relative;
      }

      .cons-val.estimated::before {
        content: "~";
        font-weight: bold;
        margin-right: 2px;
      }

      .cons-val.estimated::after {
        content: "est.";
        font-size: 0.7em;
        opacity: 0.8;
        margin-left: 2px;
        font-weight: normal;
      }

      .cons-val.pending {
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
        100% {
          opacity: 1;
        }
      }

      .year {
        font-size: 0.8em;
        font-style: italic;
        margin-left: 5px;
      }
      .previous-month {
        font-size: 0.8em;
        font-style: italic;
        margin-left: 5px;
      }
      .current-month {
        font-size: 0.8em;
        font-style: italic;
        margin-left: 5px;
      }
      .linky-icon.bigger {
        width: 6em;
        height: 5em;
        display: inline-block;
      }
      .error {
        font-size: 0.8em;
        font-weight: bold;
        margin-left: 5px;
      }
      .tooltip .tooltiptext {
        visibility: hidden;
        background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color)));
        box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2));
        cursor: default;
        font-size: 14px;
        opacity: 1;
        pointer-events: none;
        position: absolute;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 12;
        transition: 0.15s ease all;
        padding: 5px;
        border: 1px solid var(--divider-color, var(--outline-color, #e0e0e0));
        border-radius: 3px;
      }
      .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--divider-color, var(--outline-color, #555)) transparent transparent transparent;
      }
      .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
      }

      .flow-row {
        display: flex;
        flex-flow: row wrap;
      }
      /* One Hour Forecast */
      .oneHour {
        height: 1em;
      }
      .oneHour > li {
        background-color: var(--state-icon-color);
        border-right: 1px solid var(--lovelace-background, var(--primary-background-color));
      }
      .oneHour > li:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .oneHour > li:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border: 0;
      }
      /* One Hour Labels */
      .ecowatt-00,
      .ecowatt-01,
      .ecowatt-02,
      .ecowatt-03,
      .ecowatt-04,
      .ecowatt-05,
      .ecowatt-06,
      .ecowatt-07 {
        flex: 2 1 0;
      }
      .ecowatt-08,
      .ecowatt-09,
      .ecowatt-10,
      .ecowatt-11,
      .ecowatt-12,
      .ecowatt-13,
      .ecowatt-14,
      .ecowatt-15 {
        flex: 2 1 0;
      }
      .ecowatt-16,
      .ecowatt-17,
      .ecowatt-18,
      .ecowatt-19,
      .ecowatt-20,
      .ecowatt-21,
      .ecowatt-22,
      .ecowatt-23 {
        flex: 2 1 0;
      }

      .oneHourLabel > li:first-child {
        flex: 0.7 1 0;
      }
      .oneHourLabel > li {
        flex: 1 1 0;
        text-align: left;
      }
      /* One Hour Header */
      .oneHourHeader {
        justify-content: space-between;
      }
      .oneHourHeader li:last-child {
        text-align: right;
      }
      .tempo-days {
        width: 100%;
        border-spacing: 2px;
      }
      .tempo-color {
        width: 100%;
        border-spacing: 2px;
      }
      .tempoborder-color {
        width: 100%;
        border-spacing: 2px;
      }
      .tempo-blue {
        color: white;
        text-align: center;
        background: var(--accent-color, var(--primary-color, #009dfa));
        border: 2px solid var(--divider-color);
        box-shadow: var(--ha-card-box-shadow, none);
        text-transform: capitalize;
      }
      .tempoday-blue {
        color: white !important;
        background: var(--accent-color, var(--primary-color, #009dfa)) !important;
        font-weight: bold;
        text-align: center;
        box-shadow: var(--ha-card-box-shadow, none);
        text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }
      .tempo-white {
        color: var(--text-primary-color, var(--primary-text-color, #002654));
        text-align: center;
        background: white;
        border: 2px solid var(--divider-color);
        box-shadow: var(--ha-card-box-shadow, none);
        text-transform: capitalize;
      }
      .tempoday-white {
        color: #002654 !important;
        background: white !important;
        border: 1px solid #ccc !important;
        font-weight: bold;
        text-align: center;
        text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }
      .tempoday-grey {
        color: white !important;
        background: grey !important;
        font-weight: bold;
        text-align: center;
        text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }
      .tempo-red {
        color: white;
        text-align: center;
        background: var(--error-color, var(--red-color, #ff2700));
        border: 2px solid var(--divider-color);
        box-shadow: var(--ha-card-box-shadow, none);
        text-transform: capitalize;
      }
      .tempoday-red {
        color: white !important;
        background: var(--error-color, var(--red-color, #ff2700)) !important;
        font-weight: bold;
        text-align: center;
        box-shadow: var(--ha-card-box-shadow, none);
        text-transform: capitalize;
        border-radius: 4px;
        padding: 2px 4px;
        margin: 1px;
      }
      .tempo-grey {
        color: var(--text-primary-color, var(--primary-text-color, #002654));
        text-align: center;
        background: grey;
        border: 2px solid var(--divider-color);
        box-shadow: var(--ha-card-box-shadow, none);
        background-image: linear-gradient(
          45deg,
          #d6d6d6 25%,
          #dedede 25%,
          #dedede 50%,
          #d6d6d6 50%,
          #d6d6d6 75%,
          #dedede 75%,
          #dedede 100%
        );
        background-size: 28.28px 28.28px;
        text-transform: capitalize;
      }

      /* Week Summary Card */
      .week-summary-card {
        background: linear-gradient(135deg, var(--primary-color, #1976d2) 0%, var(--accent-color, #03dac6) 100%);
        border-radius: 12px;
        padding: 1em;
        margin-bottom: 1em;
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
      }

      .week-summary-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      .week-summary-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .week-summary-icon {
        font-size: 1.2em;
        opacity: 0.9;
      }

      .week-summary-title {
        font-weight: 500;
        font-size: 1.1em;
      }

      .week-summary-period {
        font-size: 0.9em;
        opacity: 0.8;
        margin-left: auto;
      }

      .week-summary-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1em;
      }

      .week-summary-main {
        display: flex;
        align-items: baseline;
        gap: 0.3em;
      }

      .week-summary-value {
        font-size: 2.5em;
        font-weight: 300;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .week-summary-unit {
        font-size: 1.2em;
        opacity: 0.9;
      }

      .week-summary-cost {
        display: flex;
        align-items: baseline;
        gap: 0.2em;
        text-align: center;
      }

      .week-summary-cost-value {
        font-size: 1.8em;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        white-space: nowrap;
      }

      .week-summary-cost-unit {
        font-size: 1.2em;
        opacity: 0.9;
        white-space: nowrap;
      }

      /* Smart Insights */
      .smart-insights {
        margin-top: 1em;
      }

      .insight-row {
        display: flex;
        gap: 1.5em;
        flex-wrap: wrap;
      }

      .insight-item {
        display: flex;
        align-items: center;
        gap: 0.5em;
        flex: 1;
        min-width: 140px;
      }

      .insight-icon {
        font-size: 1.1em;
        opacity: 0.9;
      }

      .insight-content {
        display: flex;
        flex-direction: column;
      }

      .insight-label {
        font-size: 0.7em;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .insight-value {
        font-size: 0.9em;
        font-weight: 500;
        margin-top: 2px;
      }

      /* Responsive improvements */
      @media (max-width: 768px) {
        .variations {
          grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
          gap: 0.3em;
        }

        .week-summary-value {
          font-size: 2em;
        }

        .week-summary-cost-value {
          font-size: 1.5em;
        }

        .week-summary-header {
          flex-wrap: wrap;
        }

        .week-summary-period {
          margin-left: 0;
          order: 3;
          flex: 100%;
        }

        .week-summary-content {
          gap: 0.5em;
        }
      }

      @media (max-width: 480px) {
        .variations {
          grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
          gap: 0.2em;
        }

        .week-summary-card {
          padding: 0.8em;
        }

        .week-summary-value {
          font-size: 1.8em;
        }

        .week-summary-cost-value {
          font-size: 1.3em;
        }

        .week-summary-content {
          flex-direction: row !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 0.5em;
        }

        .week-summary-cost {
          margin-top: 0.2em;
        }
      }

      /* Dark mode improvements */
      @media (prefers-color-scheme: dark) {
        .week-summary-card {
          background: linear-gradient(135deg, var(--primary-color, #2196f3) 0%, var(--accent-color, #00bcd4) 100%);
        }

        .variations-linky {
          background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
          border: 1px solid var(--divider-color, #333);
        }

        .week-history {
          background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
          border: 1px solid var(--divider-color, #333);
        }

        .day:hover {
          background: var(--primary-color, #2196f3);
        }
      }

      /* Container queries for better responsive design */
      @container (max-width: 400px) {
        .variations {
          grid-template-columns: 1fr;
          gap: 0.2em;
        }

        .week-summary-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2em;
        }

        .week-summary-period {
          margin-left: 0;
        }
      }

      /* Enhanced animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .week-summary-card,
      .variations-linky,
      .week-history {
        animation: fadeInUp 0.3s ease-out;
      }

      .variations-linky:nth-child(2) {
        animation-delay: 0.1s;
      }
      .variations-linky:nth-child(3) {
        animation-delay: 0.2s;
      }
      .variations-linky:nth-child(4) {
        animation-delay: 0.3s;
      }
      .variations-linky:nth-child(5) {
        animation-delay: 0.4s;
      }

      /* Focus states for accessibility */
      .variations-linky:focus,
      .day:focus {
        outline: 2px solid var(--accent-color, #03dac6);
        outline-offset: 2px;
      }

      /* Wrapper for tempo day styling */
      .tempo-day-wrapper {
        display: inline-block;
        width: 100%;
      }

      /* Force tempo colors to override any conflicting styles */
      .tempo-day-wrapper .tempoday-blue,
      .tempo-day-wrapper .tempoday-white,
      .tempo-day-wrapper .tempoday-red,
      .tempo-day-wrapper .tempoday-grey {
        all: unset;
        display: inline-block !important;
        text-align: center !important;
        font-weight: bold !important;
        text-transform: capitalize !important;
        border-radius: 4px !important;
        padding: 2px 4px !important;
        margin: 1px !important;
        box-sizing: border-box !important;
      }

      .tempo-day-wrapper .tempoday-blue {
        color: white !important;
        background: #009dfa !important;
      }

      .tempo-day-wrapper .tempoday-white {
        color: #002654 !important;
        background: white !important;
        border: 1px solid #ccc !important;
      }

      .tempo-day-wrapper .tempoday-red {
        color: white !important;
        background: #ff2700 !important;
      }

      .tempo-day-wrapper .tempoday-grey {
        color: white !important;
        background: #666 !important;
      }

      /* Collapsible sections styles */
      .collapsible-section {
        margin-top: 1em;
        border-radius: 12px;
        background: var(--ha-card-background, var(--card-background-color, white));
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .collapsible-header {
        padding: 0.6em 1em;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5em;
        background: var(--primary-color, #1976d2);
        color: white;
        transition: background-color 0.2s ease;
        user-select: none;
        min-height: auto;
      }

      .collapsible-header:hover {
        background: var(--primary-color-light, #2196f3);
      }

      .collapsible-header ha-icon {
        transition: transform 0.3s ease;
      }

      .section-title {
        font-weight: bold;
        font-size: 1em;
        flex-grow: 1;
      }

      .section-summary {
        font-size: 0.8em;
        opacity: 0.9;
      }

      .collapsible-content {
        overflow: hidden;
        transition:
          max-height 0.3s ease-out,
          padding 0.3s ease-out;
      }

      .collapsible-content.collapsed {
        max-height: 0;
        padding: 0 1em;
      }

      .collapsible-content.expanded {
        max-height: 1000px;
        padding: 1em;
      }

      .month-history,
      .year-history {
        display: grid;
        gap: 0.5em;
      }

      .month-item,
      .year-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1em;
        padding: 0.5em;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        align-items: center;
      }

      .month-name,
      .year-name {
        font-weight: bold;
        color: var(--primary-text-color, #333);
      }

      .month-value,
      .year-value {
        text-align: center;
        font-size: 1.1em;
        color: var(--accent-color, #03dac6);
      }

      .month-cost,
      .year-cost {
        text-align: right;
        font-weight: bold;
        color: var(--primary-color, #1976d2);
      }

      .month-evolution,
      .year-evolution {
        text-align: right;
        font-size: 0.9em;
      }

      .evolution-percent {
        font-weight: bold;
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-size: 0.85em;
      }

      .evolution-percent.positive {
        color: #d32f2f;
        background-color: rgba(211, 47, 47, 0.1);
      }

      .evolution-percent.negative {
        color: #388e3c;
        background-color: rgba(56, 142, 60, 0.1);
      }

      @media (max-width: 768px) {
        .month-item,
        .year-item {
          grid-template-columns: 1fr;
          text-align: center;
          gap: 0.3em;
        }

        .month-value,
        .year-value,
        .month-cost,
        .year-cost {
          text-align: center;
        }

        .collapsible-header {
          padding: 0.5em 0.8em;
          font-size: 0.9em;
        }

        .section-title {
          font-size: 0.9em;
        }

        .section-summary {
          font-size: 0.75em;
        }
      }

      @media (prefers-color-scheme: dark) {
        .collapsible-section {
          background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
          border: 1px solid var(--divider-color, #333);
        }

        .month-item,
        .year-item {
          background: var(--secondary-background-color, #2e2e2e);
        }
      }

      /* Detailed comparison styles */
      .detailed-comparison {
        padding: 1em 0;
      }

      .comparison-charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        margin-bottom: 1em;
      }

      .chart-day {
        text-align: center;
      }

      .chart-day h4 {
        margin: 0 0 0.5em 0;
        font-size: 0.9em;
        color: var(--primary-text-color, #333);
      }

      .mini-chart {
        height: 60px;
        margin-bottom: 0.5em;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 0.5em;
      }

      .consumption-chart {
        width: 100%;
        height: 100%;
      }

      .day-stats {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
        font-size: 0.8em;
      }

      .day-stats .total {
        font-weight: bold;
        color: var(--primary-color, #1976d2);
      }

      .day-stats .peak {
        color: var(--accent-color, #03dac6);
      }

      .comparison-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        padding-top: 1em;
        border-top: 1px solid var(--divider-color, #ddd);
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.5em;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .stat-item ha-icon {
        width: 20px;
        height: 20px;
      }

      .stat-item .label {
        flex-grow: 1;
        font-size: 0.9em;
        color: var(--secondary-text-color, #666);
      }

      .stat-item .value {
        font-weight: bold;
        font-size: 1em;
      }

      .stat-item.evolution.increase {
        border-left: 4px solid #f44336;
      }

      .stat-item.evolution.increase .value {
        color: #f44336;
      }

      .stat-item.evolution.decrease {
        border-left: 4px solid #4caf50;
      }

      .stat-item.evolution.decrease .value {
        color: #4caf50;
      }

      .stat-item.evolution.stable {
        border-left: 4px solid #9e9e9e;
      }

      .stat-item.evolution.stable .value {
        color: #9e9e9e;
      }

      @media (max-width: 768px) {
        .comparison-charts {
          grid-template-columns: 1fr;
          gap: 0.5em;
        }

        .comparison-stats {
          grid-template-columns: 1fr;
          gap: 0.5em;
        }
      }

      @media (prefers-color-scheme: dark) {
        .mini-chart {
          background: var(--secondary-background-color, #2e2e2e);
        }

        .stat-item {
          background: var(--secondary-background-color, #2e2e2e);
        }
      }
    `}});
