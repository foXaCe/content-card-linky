const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),o=new WeakMap;let i=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const a=this.t;if(t&&void 0===e){const t=void 0!==a&&1===a.length;t&&(e=o.get(a)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(a,e))}return e}toString(){return this.cssText}};const n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new i("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:s,defineProperty:r,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:d}=Object,u=globalThis,h=u.trustedTypes,m=h?h.emptyScript:"",v=u.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},g=(e,t)=>!s(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),o=this.getPropertyDescriptor(e,a,t);void 0!==o&&r(this.prototype,e,o)}}static getPropertyDescriptor(e,t,a){const{get:o,set:i}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const n=o?.call(this);i?.call(this,t),this.requestUpdate(e,n,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=d(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const a=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((a,o)=>{if(t)a.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),i=e.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=t.cssText,a.appendChild(o)}})(a,this.constructor.elementStyles),a}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(void 0!==o&&!0===a.reflect){const i=(void 0!==a.converter?.toAttribute?a.converter:f).toAttribute(t,a.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const a=this.constructor,o=a._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=a.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=o;const n=i.fromAttribute(t,e.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(e,t,a,o=!1,i){if(void 0!==e){const n=this.constructor;if(!1===o&&(i=this[e]),a??=n.getPropertyOptions(e),!((a.hasChanged??g)(i,t)||a.useDefault&&a.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:o,wrapped:i},n){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==i||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,a,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[y("elementProperties")]=new Map,_[y("finalized")]=new Map,v?.({ReactiveElement:_}),(u.reactiveElementVersions??=[]).push("2.1.2");const b=globalThis,$=e=>e,k=b.trustedTypes,x=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+A,P=`<${D}>`,S=document,C=()=>S.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,W=/-->/g,z=/>/g,F=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,U=/^(?:script|style|textarea|title)$/i,O=(e=>(t,...a)=>({_$litType$:e,strings:t,values:a}))(1),Y=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),j=new WeakMap,I=S.createTreeWalker(S,129);function V(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const q=(e,t)=>{const a=e.length-1,o=[];let i,n=2===t?"<svg>":3===t?"<math>":"",s=N;for(let t=0;t<a;t++){const a=e[t];let r,l,c=-1,p=0;for(;p<a.length&&(s.lastIndex=p,l=s.exec(a),null!==l);)p=s.lastIndex,s===N?"!--"===l[1]?s=W:void 0!==l[1]?s=z:void 0!==l[2]?(U.test(l[2])&&(i=RegExp("</"+l[2],"g")),s=F):void 0!==l[3]&&(s=F):s===F?">"===l[0]?(s=i??N,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,r=l[1],s=void 0===l[3]?F:'"'===l[3]?L:R):s===L||s===R?s=F:s===W||s===z?s=N:(s=F,i=void 0);const d=s===F&&e[t+1].startsWith("/>")?" ":"";n+=s===N?a+P:c>=0?(o.push(r),a.slice(0,c)+E+a.slice(c)+A+d):a+A+(-2===c?t:d)}return[V(e,n+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class B{constructor({strings:e,_$litType$:t},a){let o;this.parts=[];let i=0,n=0;const s=e.length-1,r=this.parts,[l,c]=q(e,t);if(this.el=B.createElement(l,a),I.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=I.nextNode())&&r.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=c[n++],a=o.getAttribute(e).split(A),s=/([.?@])?(.*)/.exec(t);r.push({type:1,index:i,name:s[2],strings:a,ctor:"."===s[1]?Q:"?"===s[1]?ee:"@"===s[1]?te:X}),o.removeAttribute(e)}else e.startsWith(A)&&(r.push({type:6,index:i}),o.removeAttribute(e));if(U.test(o.tagName)){const e=o.textContent.split(A),t=e.length-1;if(t>0){o.textContent=k?k.emptyScript:"";for(let a=0;a<t;a++)o.append(e[a],C()),I.nextNode(),r.push({type:2,index:++i});o.append(e[t],C())}}}else if(8===o.nodeType)if(o.data===D)r.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(A,e+1));)r.push({type:7,index:i}),e+=A.length-1}i++}}static createElement(e,t){const a=S.createElement("template");return a.innerHTML=e,a}}function G(e,t,a=e,o){if(t===Y)return t;let i=void 0!==o?a._$Co?.[o]:a._$Cl;const n=M(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),void 0===n?i=void 0:(i=new n(e),i._$AT(e,a,o)),void 0!==o?(a._$Co??=[])[o]=i:a._$Cl=i),void 0!==i&&(t=G(e,i._$AS(e,t.values),i,o)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,o=(e?.creationScope??S).importNode(t,!0);I.currentNode=o;let i=I.nextNode(),n=0,s=0,r=a[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new Z(i,i.nextSibling,this,e):1===r.type?t=new r.ctor(i,r.name,r.strings,this,e):6===r.type&&(t=new ae(i,this,e)),this._$AV.push(t),r=a[++s]}n!==r?.index&&(i=I.nextNode(),n++)}return I.currentNode=S,o}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,o){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),M(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,o="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=B.createElement(V(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new K(o,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=j.get(e.strings);return void 0===t&&j.set(e.strings,t=new B(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,o=0;for(const i of e)o===t.length?t.push(a=new Z(this.O(C()),this.O(C()),this,this.options)):a=t[o],a._$AI(i),o++;o<t.length&&(this._$AR(a&&a._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,o,i){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=J}_$AI(e,t=this,a,o){const i=this.strings;let n=!1;if(void 0===i)e=G(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==Y,n&&(this._$AH=e);else{const o=e;let s,r;for(e=i[0],s=0;s<i.length-1;s++)r=G(this,o[a+s],t,s),r===Y&&(r=this._$AH[s]),n||=!M(r)||r!==this._$AH[s],r===J?e=J:e!==J&&(e+=(r??"")+i[s+1]),this._$AH[s]=r}n&&!o&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Q extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class ee extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class te extends X{constructor(e,t,a,o,i){super(e,t,a,o,i),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??J)===Y)return;const a=this._$AH,o=e===J&&a!==J||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==J&&(a===J||o);o&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const oe=b.litHtmlPolyfillSupport;oe?.(B,Z),(b.litHtmlVersions??=[]).push("3.3.2");const ie=globalThis;class ne extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{const o=a?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=a?.renderBefore??null;o._$litPart$=i=new Z(t.insertBefore(C(),e),e,void 0,a??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}ne._$litElement$=!0,ne.finalized=!0,ie.litElementHydrateSupport?.({LitElement:ne});const se=ie.litElementPolyfillSupport;se?.({LitElement:ne}),(ie.litElementVersions??=[]).push("4.2.2");const re={en:{card:{name:"Linky Card",description:"Card for the MyElectricalData integration — modern Linky data display with coloured trends",data_unavailable:"Linky: data unavailable for {entity}",current_week:"Current week",since:"since",previous_year:"vs {year}",previous_month:"vs {month}",current_month:"vs {month}",previous_week:"vs {week}",before_yesterday:"vs {date}",week_noun:"last week",day_before_noun:"day before",in_off_peak:"(off-peak)",in_peak:"(peak)",peak_pct:"% peak",daily_cost:"Daily cost",version_available:"New version available {version}",migrate_med:"Please migrate to MyElectricalData. EnedisGateway is no longer supported.",aria:{yearly_trend:"Yearly trend: {value}%",monthly_trend:"Monthly trend: {value}%",current_month_trend:"Current-month trend: {value}%",weekly_trend:"Weekly trend: {value}%",daily_trend:"Daily trend: {value}%"},tooltip:{year_prev:"Y-1: {value}",year:"Y: {value}",prev_month_prev_year:"Previous month Y-1: {value}",prev_month:"Previous month: {value}",month_prev_year:"Month Y-1: {value}",month:"Month: {value}",last_week:"Last week: {value}",this_week:"Current week: {value}",day_before_yesterday:"Day before yesterday: {value}",yesterday:"Yesterday: {value}"},insights:{monthly_prediction:"Monthly forecast",vs_last_week:"vs last week",vs_last_month:"vs last month",vs_last_year:"vs last year"},history:{data_unavailable:"Data unavailable",data_pending:"Data awaiting upload",tempo_day:"Tempo: {color} — Date: {date}",estimated:"Estimate based on previous days — kWh data unavailable",col_consumption:"Cons.",col_price:"Price",col_price_offpeak:"OP price",col_price_offpeak_mobile:"€ OP",col_price_peak:"P price",col_price_peak_mobile:"€ P",col_offpeak:"OP",col_peak:"P",col_max_power:"MP",col_max_power_time:"MP time"},production:{estimate:"Production estimate based on previous data",pending:"Production data awaiting upload"},comparison:{title:"Today vs yesterday",today:"Today",yesterday:"Yesterday",peak:"Peak: {value}W",evolution:"Trend",difference:"Difference",entity_not_found:"Entity {entity} not found",available_attrs:"Available attributes: {attrs}"},ecowatt:{only_med:"EcoWatt: only available with MyElectricalData",missing_today:"EcoWatt: today (D+0) entity not configured or not found",missing_j12:"EcoWatt: D+1/D+2 entity(ies) not configured or not found",today:"D+0",tomorrow:"D+1",after_tomorrow:"D+2"},tempo:{only_med:"Tempo: only available with MyElectricalData",missing_j01:"Tempo: J0 and/or J1 sensor(s) unavailable or invalid",missing_info:"Tempo: 'info' sensor unavailable or invalid"},temporal:{monthly:"Monthly",yearly:"Yearly",no_data:"No data",months_count:"{count} months",years_count:"{count} years",current_month:"Current month",previous_month:"Previous month",current_month_prev_year:"Current month Y-1",previous_month_prev_year:"Prev. month Y-1"}},editor:{section:{general:"General",linky:"Linky entity",ecowatt:"EcoWatt (RTE)",tempo:"Tempo (EDF)",display:"Display",history:"History & data",price:"Price & costs",peak_offpeak:"Peak / off-peak",max_power:"Max power",insights:"Smart insights & trends",ecowatt_tempo:"EcoWatt & Tempo",temporal:"Temporal views"},field:{entity:"Linky entity (required)",titleName:"Card title",kWhPrice:"kWh price (€)",nbJoursAffichage:"Days to display",showDayName:"Day name format",ewEntity:"EcoWatt today",ewEntityJ1:"EcoWatt D+1",ewEntityJ2:"EcoWatt D+2",tempoEntityInfo:"Tempo information",tempoEntityJ0:"Tempo today",tempoEntityJ1:"Tempo tomorrow",tempoEntity:"Tempo entity (per-day history colours)",detailedComparisonEntity:"Detailed comparison entity",showIcon:"Show icon",showTitle:"Show title",showHeader:"Show header",showError:"Show errors",showInformation:"Show information",showHistory:"Show history",showWeekSummary:"Show week summary",showInTableUnit:"Show units in table",showTitleLign:"Show row titles",showPrice:"Show prices",showDayPrice:"Show daily price",showDayPriceHCHP:"Show off-peak / peak prices",showPeakOffPeak:"Show off-peak / peak ratio",showDayHCHP:"Show off-peak / peak per day",showDayMaxPower:"Show daily max power",showSmartInsights:"Show smart insights",showYearRatio:"Yearly trend",showCurrentMonthRatio:"Current-month trend",showMonthRatio:"Previous-month trend",showWeekRatio:"Weekly trend",showYesterdayRatio:"Daily trend",showEcoWatt:"Show EcoWatt today",showEcoWattJ12:"Show EcoWatt D+1 / D+2",showTempo:"Show Tempo",showTempoColor:"Tempo colours per day",showMonthlyView:"Monthly view (collapsible)",showYearlyView:"Yearly view (collapsible)",showDetailedComparison:"Today vs yesterday comparison",appearance:"Appearance"},day_name:{long:"Full (Monday)",short:"Short (Mon)",narrow:"Minimal (M)"},appearance:{premium:"Premium (glass, motion)",minimal:"Minimal (plain)"}}},fr:{card:{name:"Carte Enedis",description:"Carte pour l'intégration MyElectricalData — affichage moderne des données Linky avec évolutions colorées",data_unavailable:"Linky : données inaccessibles pour {entity}",current_week:"Semaine en cours",since:"depuis",previous_year:"vs {year}",previous_month:"vs {month}",current_month:"vs {month}",previous_week:"vs {week}",before_yesterday:"vs {date}",week_noun:"semaine dernière",day_before_noun:"avant-hier",in_off_peak:"(en HC)",in_peak:"(en HP)",peak_pct:"% HP",daily_cost:"Coût journalier",version_available:"Nouvelle version disponible {version}",migrate_med:"Merci de migrer sur MyElectricalData. EnedisGateway n'est plus supporté.",aria:{yearly_trend:"Évolution annuelle : {value} %",monthly_trend:"Évolution mensuelle : {value} %",current_month_trend:"Évolution du mois courant : {value} %",weekly_trend:"Évolution hebdomadaire : {value} %",daily_trend:"Évolution quotidienne : {value} %"},tooltip:{year_prev:"A-1 : {value}",year:"A : {value}",prev_month_prev_year:"Mois précédent A-1 : {value}",prev_month:"Mois précédent : {value}",month_prev_year:"Mois A-1 : {value}",month:"Mois : {value}",last_week:"Semaine dernière : {value}",this_week:"Semaine courante : {value}",day_before_yesterday:"Avant-hier : {value}",yesterday:"Hier : {value}"},insights:{monthly_prediction:"Prédiction mensuelle",vs_last_week:"vs semaine dernière",vs_last_month:"vs mois dernier",vs_last_year:"vs année dernière"},history:{data_unavailable:"Donnée indisponible",data_pending:"Données en attente de remontée",tempo_day:"Tempo : {color} — Date : {date}",estimated:"Estimation basée sur les jours précédents — données kWh non disponibles",col_consumption:"Conso",col_price:"Prix",col_price_offpeak:"Prix HC",col_price_offpeak_mobile:"€ HC",col_price_peak:"Prix HP",col_price_peak_mobile:"€ HP",col_offpeak:"HC",col_peak:"HP",col_max_power:"MP",col_max_power_time:"MPtime"},production:{estimate:"Estimation production basée sur les données précédentes",pending:"Données de production en attente"},comparison:{title:"Aujourd'hui vs Hier",today:"Aujourd'hui",yesterday:"Hier",peak:"Pic : {value} W",evolution:"Évolution",difference:"Différence",entity_not_found:"Entité {entity} introuvable",available_attrs:"Attributs disponibles : {attrs}"},ecowatt:{only_med:"EcoWatt : uniquement disponible avec MyElectricalData",missing_today:"EcoWatt : entité J+0 non configurée ou introuvable",missing_j12:"EcoWatt : entité(s) J+1/J+2 non configurée(s) ou introuvable(s)",today:"J+0",tomorrow:"J+1",after_tomorrow:"J+2"},tempo:{only_med:"Tempo : uniquement disponible avec MyElectricalData",missing_j01:"Tempo : sensor(s) J0 et/ou J1 indisponible(s) ou incorrect(s)",missing_info:"Tempo : sensor « info » indisponible ou incorrect"},temporal:{monthly:"Mensuel",yearly:"Annuel",no_data:"Aucune donnée",months_count:"{count} mois",years_count:"{count} ans",current_month:"Mois actuel",previous_month:"Mois précédent",current_month_prev_year:"Mois actuel A-1",previous_month_prev_year:"Mois préc. A-1"}},editor:{section:{general:"Configuration générale",linky:"Entité Linky",ecowatt:"EcoWatt (RTE)",tempo:"Tempo (EDF)",display:"Affichage général",history:"Historique & données",price:"Prix & coûts",peak_offpeak:"Heures creuses / pleines",max_power:"Puissance maximale",insights:"Smart Insights & évolutions",ecowatt_tempo:"EcoWatt & Tempo",temporal:"Vues temporelles"},field:{entity:"Entité Linky (requis)",titleName:"Titre de la carte",kWhPrice:"Prix du kWh (€)",nbJoursAffichage:"Nombre de jours à afficher",showDayName:"Format des jours",ewEntity:"EcoWatt aujourd'hui",ewEntityJ1:"EcoWatt J+1",ewEntityJ2:"EcoWatt J+2",tempoEntityInfo:"Tempo informations",tempoEntityJ0:"Tempo aujourd'hui",tempoEntityJ1:"Tempo demain",tempoEntity:"Entité Tempo (couleurs par jour de l'historique)",detailedComparisonEntity:"Entité données détaillées",showIcon:"Afficher l'icône",showTitle:"Afficher le titre",showHeader:"Afficher l'en-tête",showError:"Afficher les erreurs",showInformation:"Afficher les informations",showHistory:"Afficher l'historique",showWeekSummary:"Afficher le résumé hebdo",showInTableUnit:"Afficher les unités",showTitleLign:"Afficher les titres de ligne",showPrice:"Afficher les prix",showDayPrice:"Afficher le prix par jour",showDayPriceHCHP:"Afficher les prix HC/HP",showPeakOffPeak:"Afficher le ratio HC/HP",showDayHCHP:"Afficher les jours HC/HP",showDayMaxPower:"Afficher la puissance max quotidienne",showSmartInsights:"Afficher les insights intelligents",showYearRatio:"Évolution annuelle",showCurrentMonthRatio:"Évolution mois courant",showMonthRatio:"Évolution mois précédent",showWeekRatio:"Évolution hebdomadaire",showYesterdayRatio:"Évolution quotidienne",showEcoWatt:"Afficher EcoWatt du jour",showEcoWattJ12:"Afficher EcoWatt J+1/J+2",showTempo:"Afficher Tempo",showTempoColor:"Couleurs Tempo du jour",showMonthlyView:"Vue mensuelle (repliable)",showYearlyView:"Vue annuelle (repliable)",showDetailedComparison:"Comparaison Aujourd'hui vs Hier",appearance:"Apparence"},day_name:{long:"Complet (Lundi)",short:"Abrégé (Lun)",narrow:"Minimal (L)"},appearance:{premium:"Premium (verre, animations)",minimal:"Minimal (sobre)"}}}},le="en";function ce(e,t){return t.split(".").reduce((e,t)=>e&&null!=e[t]?e[t]:void 0,e)}function pe(e,t,a={}){const o=function(e){const t=String(e?.locale?.language||e?.language||le).toLowerCase().split("-")[0];return re[t]?t:le}(e),i=ce(re[o],t)??ce(re[le],t)??t;return"string"!=typeof i?t:i.replace(/\{(\w+)\}/g,(e,t)=>null!=a[t]?String(a[t]):`{${t}}`)}const de=["entity","ewEntity","ewEntityJ1","ewEntityJ2","tempoEntity","tempoEntityInfo","tempoEntityJ0","tempoEntityJ1","detailedComparisonEntity"],ue=new Map([["unknown","grey"],["Inconnu","grey"],["BLUE","blue"],["WHITE","white"],["RED","red"]]),he={showHistory:!0,showHeader:!0,showPeakOffPeak:!0,showIcon:!1,showInTableUnit:!1,showDayPrice:!1,showDayPriceHCHP:!1,showDayMaxPower:!1,showDayHCHP:!1,showDayName:"long",showError:!0,showInformation:!0,showPrice:!0,showTitle:!1,showSmartInsights:!0,showYearRatio:!1,showCurrentMonthRatio:!0,showMonthRatio:!0,showWeekRatio:!1,showYesterdayRatio:!1,showTitleLign:!1,showEcoWatt:!1,showEcoWattJ12:!1,showTempo:!1,showTempoColor:!0,showWeekSummary:!0,showMonthlyView:!0,showYearlyView:!0,showDetailedComparison:!0,detailedComparisonEntity:"sensor.linky_consumption_last5day",tempoEntity:"sensor.rte_tempo_today",titleName:"LINKY",nbJoursAffichage:"7",kWhPrice:void 0},me=((e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,a,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[o+1],e[0]);return new i(o,e,a)})`
  :host {
    display: block;
    container-type: inline-size;

    /* Spacing — geometric scale */
    --p-space-1: 4px;
    --p-space-2: 8px;
    --p-space-3: 12px;
    --p-space-4: 16px;
    --p-space-5: 20px;
    --p-space-6: 24px;
    --p-space-8: 32px;

    /* Radius — Apple-rounded */
    --p-radius-xs: 8px;
    --p-radius-sm: 10px;
    --p-radius-md: 14px;
    --p-radius-lg: 18px;
    --p-radius-xl: 24px;
    --p-radius-full: 9999px;

    /* Typography — system stack (no web fonts) */
    --p-font:
      -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, "Helvetica Neue", sans-serif;
    --p-letter-tight: -0.022em;
    --p-letter-normal: -0.011em;

    /* Colours — all derived from the active HA theme */
    --p-fg-1: var(--primary-text-color, #1c1c1e);
    --p-fg-2: var(--secondary-text-color, #6b6b70);
    --p-fg-3: var(--disabled-text-color, #9b9ba1);
    --p-accent: var(--primary-color, #1976d2);
    --p-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --p-surface-1: color-mix(in oklab, var(--p-surface) 96%, var(--p-fg-1));
    --p-surface-2: color-mix(in oklab, var(--p-surface) 92%, var(--p-fg-1));
    --p-divider: color-mix(in oklab, var(--p-fg-1) 12%, transparent);
    --p-success: var(--success-color, var(--green-color, #2e9e5b));
    --p-error: var(--error-color, var(--red-color, #e5484d));
    --p-warning: var(--warning-color, #f5a623);
    --p-accent-wash: color-mix(in oklab, var(--p-accent) 12%, var(--p-surface));
    --p-accent-wash-2: color-mix(in oklab, var(--p-accent) 5%, var(--p-surface));

    /* Multi-layer shadows (theme-adaptive tint) */
    --p-elev-1:
      0 1px 2px color-mix(in oklab, var(--p-fg-1) 6%, transparent),
      0 1px 3px color-mix(in oklab, var(--p-fg-1) 5%, transparent);
    --p-elev-2:
      0 2px 6px color-mix(in oklab, var(--p-fg-1) 8%, transparent),
      0 8px 24px color-mix(in oklab, var(--p-fg-1) 7%, transparent);
    --p-elev-pressed: inset 0 1px 2px color-mix(in oklab, var(--p-fg-1) 10%, transparent);

    /* Motion — spring physics */
    --p-motion-fast: 150ms cubic-bezier(0.32, 0.72, 0, 1);
    --p-motion-normal: 240ms cubic-bezier(0.32, 0.72, 0, 1);
    --p-motion-spring: 480ms cubic-bezier(0.22, 1.2, 0.36, 1);

    /* Liquid Glass */
    --p-blur-glass: saturate(160%) blur(18px);
    --p-glass-border: 1px solid color-mix(in oklab, var(--p-fg-1) 10%, transparent);
  }

  ha-card {
    --ha-card-border-radius: var(--p-radius-xl);
    overflow: hidden;
    isolation: isolate;
  }

  .card {
    margin: auto;
    padding: var(--p-space-5) var(--p-space-4) var(--p-space-4);
    position: relative;
    cursor: pointer;
    background: transparent;
    color: var(--p-fg-1);
    font-family: var(--p-font);
  }

  ha-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* ── Title ───────────────────────────────────────────────────────── */
  .main-title {
    margin: auto;
    text-align: center;
    font-weight: 600;
    font-size: 1.6em;
    letter-spacing: var(--p-letter-tight);
    color: var(--p-fg-1);
  }

  /* ── Hero (consumption header) — subtle accent wash + glass edge ──── */
  .main-info {
    display: flex;
    overflow: visible;
    align-items: center;
    justify-content: space-between;
    gap: var(--p-space-4);
    min-height: 72px;
    padding: var(--p-space-5);
    background: linear-gradient(135deg, var(--p-accent-wash), var(--p-accent-wash-2));
    border: var(--p-glass-border);
    border-radius: var(--p-radius-lg);
    margin-bottom: var(--p-space-4);
    color: var(--p-fg-1);
    box-shadow: var(--p-elev-1);
  }

  .icon-block {
    display: flex;
    align-items: center;
  }

  .ha-icon {
    margin-right: 5px;
    color: var(--p-accent);
  }

  .cout {
    font-weight: 600;
    font-size: clamp(2.2em, 5vw, 3.2em);
    letter-spacing: var(--p-letter-tight);
    font-variant-numeric: tabular-nums;
    color: var(--p-fg-1);
  }

  .cout.estimated {
    color: var(--p-warning);
    font-style: italic;
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

  .cout.pending {
    color: var(--p-warning);
    font-style: italic;
  }

  .cout-unit {
    font-weight: 400;
    font-size: 1.1em;
    display: inline-block;
    white-space: nowrap;
    color: var(--p-fg-2);
  }

  .conso-hp,
  .conso-hc {
    font-weight: 600;
    font-size: 1.9em;
    letter-spacing: var(--p-letter-tight);
    font-variant-numeric: tabular-nums;
  }

  .conso-unit-hc,
  .conso-unit-hp {
    font-weight: 400;
    font-size: 1em;
    white-space: nowrap;
    color: var(--p-fg-2);
  }

  .more-unit {
    font-style: italic;
    font-size: 0.8em;
  }

  /* ── Variation tiles ─────────────────────────────────────────────── */
  .variations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: var(--p-space-2);
    overflow: hidden;
    margin-bottom: var(--p-space-4);
  }

  .variations-linky {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;
    margin: 0;
    overflow: hidden;
    text-align: center;
    background: var(--p-surface-1);
    border: 1px solid var(--p-divider);
    border-radius: var(--p-radius-md);
    padding: var(--p-space-2);
    box-shadow: var(--p-elev-1);
    transition:
      transform var(--p-motion-normal),
      box-shadow var(--p-motion-normal);
  }

  .variations-linky:hover {
    transform: translateY(-2px);
    box-shadow: var(--p-elev-2);
  }

  .percentage-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-bottom: 2px;
  }

  .percentage-line ha-icon {
    transition: transform var(--p-motion-fast);
  }

  .variations-linky:hover .percentage-line ha-icon {
    transform: scale(1.15);
  }

  .percentage-value {
    font-weight: 600;
    font-size: 1.1em;
    font-variant-numeric: tabular-nums;
  }

  .variations-linky .percentage-value.percentage-positive {
    color: var(--p-error);
  }

  .variations-linky .percentage-value.percentage-negative {
    color: var(--p-success);
  }

  .variations-linky .percentage-value.percentage-neutral {
    color: var(--p-fg-1);
  }

  .unit {
    font-size: 0.8em;
    color: var(--p-fg-2);
  }

  /* ── Weekly history table ────────────────────────────────────────── */
  .week-history {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--p-surface-1);
    border: 1px solid var(--p-divider);
    border-radius: var(--p-radius-lg);
    box-shadow: var(--p-elev-1);
    margin-top: var(--p-space-2);
    scroll-behavior: smooth;
  }

  .day {
    flex: auto;
    text-align: center;
    border-right: 1px solid var(--p-divider);
    line-height: 2;
    box-sizing: border-box;
    transition:
      background var(--p-motion-fast),
      color var(--p-motion-fast);
    padding: var(--p-space-2);
  }

  .day:hover {
    background: var(--p-accent-wash);
  }

  .dayname {
    font-weight: 600;
    text-transform: capitalize;
  }

  .week-history .day:last-child {
    border-right: none;
  }

  .cons-val {
    font-weight: 600;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .cons-val.estimated {
    color: var(--p-warning);
    font-style: italic;
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
    color: var(--p-warning);
    animation: pulse 1.8s cubic-bezier(0.32, 0.72, 0, 1) infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
    100% {
      opacity: 1;
    }
  }

  .year,
  .previous-month,
  .current-month {
    font-size: 0.8em;
    font-style: italic;
    margin-left: 5px;
    color: var(--p-fg-2);
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

  /* ── Tooltips ────────────────────────────────────────────────────── */
  .tooltip .tooltiptext {
    visibility: hidden;
    background: var(--p-surface);
    box-shadow: var(--p-elev-2);
    cursor: default;
    font-size: 14px;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 12;
    transition: opacity var(--p-motion-fast);
    padding: var(--p-space-2);
    border: 1px solid var(--p-divider);
    border-radius: var(--p-radius-sm);
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--p-divider) transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  /* ── EcoWatt forecast bars (semantic colours) ────────────────────── */
  .flow-row {
    display: flex;
    flex-flow: row wrap;
  }
  .oneHour {
    height: 1em;
  }
  .oneHour > li {
    background-color: var(--p-fg-3);
    border-right: 1px solid var(--p-surface);
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
  .ecowatt-00,
  .ecowatt-01,
  .ecowatt-02,
  .ecowatt-03,
  .ecowatt-04,
  .ecowatt-05,
  .ecowatt-06,
  .ecowatt-07,
  .ecowatt-08,
  .ecowatt-09,
  .ecowatt-10,
  .ecowatt-11,
  .ecowatt-12,
  .ecowatt-13,
  .ecowatt-14,
  .ecowatt-15,
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
  .oneHourHeader {
    justify-content: space-between;
  }
  .oneHourHeader li:last-child {
    text-align: right;
  }

  /* ── Tempo (semantic EDF blue / white / red) ─────────────────────── */
  .tempo-days,
  .tempo-color,
  .tempoborder-color {
    width: 100%;
    border-spacing: 4px;
  }
  .tempo-blue,
  .tempo-white,
  .tempo-red,
  .tempo-grey {
    text-align: center;
    text-transform: capitalize;
    border-radius: var(--p-radius-sm);
    font-variant-numeric: tabular-nums;
  }
  .tempo-blue {
    color: #fff;
    background: #2274d6;
  }
  .tempo-white {
    color: #1a2a4a;
    background: #f4f6fb;
    border: 1px solid var(--p-divider);
  }
  .tempo-red {
    color: #fff;
    background: #e5342b;
  }
  .tempo-grey {
    color: #1a2a4a;
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
    background-size: 28.28px 28.28px;
  }

  /* Wrapper for per-day tempo chips */
  .tempo-day-wrapper {
    display: inline-block;
    width: 100%;
  }
  .tempo-day-wrapper .tempoday-blue,
  .tempo-day-wrapper .tempoday-white,
  .tempo-day-wrapper .tempoday-red,
  .tempo-day-wrapper .tempoday-grey {
    all: unset;
    display: inline-block;
    text-align: center;
    font-weight: 600;
    text-transform: capitalize;
    border-radius: var(--p-radius-xs);
    padding: 2px 6px;
    margin: 1px;
    box-sizing: border-box;
  }
  .tempo-day-wrapper .tempoday-blue {
    color: #fff;
    background: #2274d6;
  }
  .tempo-day-wrapper .tempoday-white {
    color: #1a2a4a;
    background: #f4f6fb;
    border: 1px solid var(--p-divider);
  }
  .tempo-day-wrapper .tempoday-red {
    color: #fff;
    background: #e5342b;
  }
  .tempo-day-wrapper .tempoday-grey {
    color: #fff;
    background: #7d7d83;
  }

  /* ── Week summary hero — glass + seasonal accent ─────────────────── */
  .week-summary-card {
    position: relative;
    background: linear-gradient(135deg, var(--p-accent-wash), var(--p-accent-wash-2));
    border: var(--p-glass-border);
    border-radius: var(--p-radius-lg);
    padding: var(--p-space-4);
    margin-bottom: var(--p-space-4);
    color: var(--p-fg-1);
    box-shadow: var(--p-elev-1);
    backdrop-filter: var(--p-blur-glass);
    -webkit-backdrop-filter: var(--p-blur-glass);
    transition:
      transform var(--p-motion-normal),
      box-shadow var(--p-motion-normal);
  }

  .week-summary-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--p-elev-2);
  }

  .week-summary-header {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    margin-bottom: var(--p-space-2);
  }

  .week-summary-icon {
    font-size: 1.2em;
    color: var(--p-accent);
  }

  .week-summary-title {
    font-weight: 600;
    font-size: 1.05em;
    letter-spacing: var(--p-letter-normal);
  }

  .week-summary-period {
    font-size: 0.85em;
    color: var(--p-fg-2);
    margin-left: auto;
  }

  .week-summary-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--p-space-4);
  }

  .week-summary-main {
    display: flex;
    align-items: baseline;
    gap: var(--p-space-1);
  }

  .week-summary-value {
    font-size: 2.4em;
    font-weight: 600;
    letter-spacing: var(--p-letter-tight);
    font-variant-numeric: tabular-nums;
  }

  .week-summary-unit {
    font-size: 1.1em;
    color: var(--p-fg-2);
  }

  .week-summary-cost {
    display: flex;
    align-items: baseline;
    gap: var(--p-space-1);
    text-align: center;
  }

  .week-summary-cost-value {
    font-size: 1.7em;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .week-summary-cost-unit {
    font-size: 1.1em;
    color: var(--p-fg-2);
    white-space: nowrap;
  }

  /* ── Smart insights ──────────────────────────────────────────────── */
  .smart-insights {
    margin-top: var(--p-space-4);
  }

  .insight-row {
    display: flex;
    gap: var(--p-space-6);
    flex-wrap: wrap;
  }

  .insight-item {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    flex: 1;
    min-width: 140px;
  }

  .insight-icon {
    font-size: 1.1em;
    color: var(--p-accent);
  }

  .insight-icon.trend-good {
    color: var(--p-success);
  }
  .insight-icon.trend-bad {
    color: var(--p-error);
  }

  .insight-content {
    display: flex;
    flex-direction: column;
  }

  .insight-label {
    font-size: 0.7em;
    color: var(--p-fg-2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .insight-value {
    font-size: 0.9em;
    font-weight: 600;
    margin-top: 2px;
    font-variant-numeric: tabular-nums;
  }

  .insight-value.trend-good {
    color: var(--p-success);
  }
  .insight-value.trend-bad {
    color: var(--p-error);
  }

  /* ── Collapsible sections ────────────────────────────────────────── */
  .collapsible-section {
    margin-top: var(--p-space-4);
    border-radius: var(--p-radius-lg);
    background: var(--p-surface-1);
    border: 1px solid var(--p-divider);
    box-shadow: var(--p-elev-1);
    overflow: hidden;
  }

  .collapsible-header {
    padding: var(--p-space-3) var(--p-space-4);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    background: var(--p-accent-wash);
    color: var(--p-fg-1);
    transition: background var(--p-motion-fast);
    user-select: none;
  }

  .collapsible-header:hover {
    background: color-mix(in oklab, var(--p-accent) 18%, var(--p-surface));
  }

  .collapsible-header ha-icon {
    transition: transform var(--p-motion-normal);
    color: var(--p-accent);
  }

  .section-title {
    font-weight: 600;
    font-size: 1em;
    flex-grow: 1;
    letter-spacing: var(--p-letter-normal);
  }

  .section-summary {
    font-size: 0.8em;
    color: var(--p-fg-2);
    font-variant-numeric: tabular-nums;
  }

  .collapsible-content {
    overflow: hidden;
    transition:
      max-height var(--p-motion-normal),
      padding var(--p-motion-normal);
  }

  .collapsible-content.collapsed {
    max-height: 0;
    padding: 0 var(--p-space-4);
  }

  .collapsible-content.expanded {
    max-height: 1000px;
    padding: var(--p-space-4);
  }

  .month-history,
  .year-history {
    display: grid;
    gap: var(--p-space-2);
  }

  .month-item,
  .year-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--p-space-4);
    padding: var(--p-space-2);
    background: var(--p-surface-2);
    border-radius: var(--p-radius-sm);
    align-items: center;
  }

  .month-name,
  .year-name {
    font-weight: 600;
    color: var(--p-fg-1);
  }

  .month-value,
  .year-value {
    text-align: center;
    font-size: 1.1em;
    color: var(--p-fg-1);
    font-variant-numeric: tabular-nums;
  }

  .month-cost,
  .year-cost {
    text-align: right;
    font-weight: 600;
    color: var(--p-accent);
  }

  .month-evolution,
  .year-evolution {
    text-align: right;
    font-size: 0.9em;
  }

  .evolution-percent {
    font-weight: 600;
    padding: 0.2em 0.5em;
    border-radius: var(--p-radius-xs);
    font-size: 0.85em;
    font-variant-numeric: tabular-nums;
  }

  .evolution-percent.positive {
    color: var(--p-error);
    background-color: color-mix(in oklab, var(--p-error) 12%, transparent);
  }

  .evolution-percent.negative {
    color: var(--p-success);
    background-color: color-mix(in oklab, var(--p-success) 12%, transparent);
  }

  /* ── Detailed comparison ─────────────────────────────────────────── */
  .detailed-comparison {
    padding: var(--p-space-4) 0;
  }

  .comparison-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--p-space-4);
    margin-bottom: var(--p-space-4);
  }

  .chart-day {
    text-align: center;
  }

  .chart-day h4 {
    margin: 0 0 var(--p-space-2) 0;
    font-size: 0.9em;
    color: var(--p-fg-2);
    font-weight: 600;
  }

  .mini-chart {
    height: 60px;
    margin-bottom: var(--p-space-2);
    background: var(--p-surface-2);
    border-radius: var(--p-radius-sm);
    padding: var(--p-space-2);
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
    font-variant-numeric: tabular-nums;
  }

  .day-stats .total {
    font-weight: 600;
    color: var(--p-fg-1);
  }

  .day-stats .peak {
    color: var(--p-fg-2);
  }

  .comparison-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--p-space-4);
    padding-top: var(--p-space-4);
    border-top: 1px solid var(--p-divider);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    padding: var(--p-space-2);
    background: var(--p-surface-2);
    border-radius: var(--p-radius-sm);
  }

  .stat-item ha-icon {
    width: 20px;
    height: 20px;
  }

  .stat-item .label {
    flex-grow: 1;
    font-size: 0.9em;
    color: var(--p-fg-2);
  }

  .stat-item .value {
    font-weight: 600;
    font-size: 1em;
    font-variant-numeric: tabular-nums;
  }

  .stat-item.evolution.increase {
    border-left: 3px solid var(--p-error);
  }
  .stat-item.evolution.increase .value {
    color: var(--p-error);
  }
  .stat-item.evolution.decrease {
    border-left: 3px solid var(--p-success);
  }
  .stat-item.evolution.decrease .value {
    color: var(--p-success);
  }
  .stat-item.evolution.stable {
    border-left: 3px solid var(--p-fg-3);
  }
  .stat-item.evolution.stable .value {
    color: var(--p-fg-2);
  }

  /* ── Messages ────────────────────────────────────────────────────── */
  .error-msg,
  .information-msg {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    margin-top: var(--p-space-3);
    padding: var(--p-space-2) var(--p-space-3);
    border-radius: var(--p-radius-sm);
    background: color-mix(in oklab, var(--p-error) 8%, transparent);
    color: var(--p-error);
    font-size: 0.9em;
  }

  #states .name {
    display: flex;
    align-items: center;
    gap: var(--p-space-2);
    color: var(--p-fg-2);
  }

  /* ── Skeleton (loading) ──────────────────────────────────────────── */
  .skeleton {
    background: linear-gradient(
      100deg,
      color-mix(in oklab, var(--p-fg-1) 6%, transparent) 30%,
      color-mix(in oklab, var(--p-fg-1) 12%, transparent) 50%,
      color-mix(in oklab, var(--p-fg-1) 6%, transparent) 70%
    );
    background-size: 200% 100%;
    animation: shimmer 1.4s linear infinite;
    border-radius: var(--p-radius-sm);
  }
  @keyframes shimmer {
    to {
      background-position: -200% 0;
    }
  }

  /* ── Focus states (accessibility) ────────────────────────────────── */
  .variations-linky:focus-visible,
  .day:focus-visible,
  .collapsible-header:focus-visible {
    outline: 2px solid var(--p-accent);
    outline-offset: 3px;
    border-radius: var(--p-radius-sm);
  }

  /* ── Responsive (container queries — the card knows its own width) ── */
  .titre-mobile {
    display: none;
  }
  .titre-desktop {
    display: inline;
  }

  @container (max-width: 480px) {
    .titre-mobile {
      display: inline;
    }
    .titre-desktop {
      display: none;
    }
    .main-title {
      font-size: 1.4em;
    }
    .conso-hp,
    .conso-hc {
      font-size: 1.6em;
    }
    .day {
      font-size: 0.85em;
    }
    .year,
    .previous-month,
    .current-month {
      font-size: 0.72em;
      white-space: nowrap;
    }
    .variations {
      grid-template-columns: repeat(auto-fit, minmax(56px, 1fr));
      gap: var(--p-space-1);
    }
    .variations-linky {
      font-size: 0.85em;
    }
    .week-summary-value {
      font-size: 1.9em;
    }
    .week-summary-cost-value {
      font-size: 1.4em;
    }
    .comparison-charts,
    .comparison-stats {
      grid-template-columns: 1fr;
      gap: var(--p-space-2);
    }
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
  }

  @container (min-width: 481px) and (max-width: 768px) {
    .day {
      font-size: 0.9em;
    }
    .variations {
      grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
    }
  }

  /* ── Appearance: minimal (opt-out of glass + animation) ──────────── */
  :host([data-appearance="minimal"]) .week-summary-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--p-surface-1);
  }
  :host([data-appearance="minimal"]) .main-info {
    background: var(--p-surface-1);
  }
  :host([data-appearance="minimal"]) .cons-val.pending,
  :host([data-appearance="minimal"]) .skeleton {
    animation: none;
  }

  /* ── Reduced motion ──────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    :host {
      --p-motion-fast: 1ms;
      --p-motion-normal: 1ms;
      --p-motion-spring: 1ms;
    }
    .cons-val.pending,
    .skeleton {
      animation: none;
    }
    * {
      scroll-behavior: auto !important;
    }
  }
`;function ve(e,t=1){const a=Number.parseFloat(e);return isNaN(a)?"–":a.toFixed(t)}function ye(e){return e?.locale?.language||"en"}function fe(e){const t=Number(e);return isNaN(t)?0:Math.round(t)}function ge(e){const t=e.getDay();return 0===t?6:t-1}function we(e,t,a=new Date){if(!e)return 0;const o=ge(a);let i=0;for(let a=Math.min(o,e.length-1);a>=1;a--){const o=parseFloat(e[a]);if(!isNaN(o)&&-1!==o&&0!==o){i+=o;continue}if(!t)continue;const n=t.toString().split(","),s=parseFloat(n[a]?.replace(",","."));if(isNaN(s)||s<=0)continue;const r=[];for(let t=0;t<Math.min(e.length,n.length,7);t++){if(t===a)continue;const o=parseFloat(e[t]),i=parseFloat(n[t]?.replace(",","."));!isNaN(o)&&!isNaN(i)&&o>0&&i>0&&-1!==o&&-1!==i&&r.push(o/i)}if(0===r.length)continue;const l=r.reduce((e,t)=>e+t,0)/r.length,c=s*l;c>0&&(i+=c)}return i}function _e(e,t=new Date){if(!e)return 0;const a=ge(t),o=e.toString().split(",");let i=0;for(let e=Math.min(a,o.length-1);e>=1;e--){const t=parseFloat(o[e].replace(",","."));isNaN(t)||-1===t||(i+=t)}return i}function be(e,t,a){if(!e||!a)return 0;const o=a.toString().split(","),i=parseFloat(o[t-1]?.replace(",","."));if(isNaN(i)||i<=0)return 0;const n=[];for(let t=0;t<Math.min(e.length,o.length,7);t++){const a=parseFloat(e[t]),i=parseFloat(o[t]?.replace(",","."));!isNaN(a)&&!isNaN(i)&&a>0&&i>0&&-1!==a&&-1!==i&&n.push(a/i)}if(0===n.length)return 0;return i*(n.reduce((e,t)=>e+t,0)/n.length)}function $e(e,t){const a=[],o=e?.attributes?.forecast;if(!o)return a;for(const[e,i]of Object.entries(o)){if(void 0===e)continue;const o=e.replace("h","").replace("min","").trim();a.push([o,t.get(i),i])}return a}function ke(e){return e.showIcon?O` <div class="icon-block">
      <span
        class="linky-icon bigger"
        style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
      ></span>
    </div>`:O``}function xe(e,t,a){return t.showPrice?O` <div class="cout-block">
      <span class="cout" title="${pe(e,"card.daily_cost")}">${ve(a.daily_cost,2)}</span
      ><span class="cout-unit"> €</span>
    </div>`:O``}function Ee(e){const t=new Date;return t.setFullYear(t.getFullYear()-1),t.toLocaleDateString(ye(e),{year:"numeric"})}function Ae(e){const t=new Date;return t.setMonth(t.getMonth()-1),t.setFullYear(t.getFullYear()-1),t.toLocaleDateString(ye(e),{month:"long",year:"numeric"})}function De(e){const t=new Date;return t.setFullYear(t.getFullYear()-1),t.toLocaleDateString(ye(e),{month:"long",year:"numeric"})}function Pe(e,t,a,o){const i=fe(t);return O` <span class="variations-linky">
    <div class="percentage-line">
      <span class="ha-icon">
        <ha-icon icon="mdi:arrow-right" style="display: inline-block; transform: rotate(${t<0?"45":0===t?"0":"-45"}deg)"></ha-icon>
      </span>
      <span
        class="percentage-value ${t>0?"percentage-positive":t<0?"percentage-negative":"percentage-neutral"}"
        aria-label="${pe(e,a,{value:i})}"
        role="text"
        >${i}<span class="unit"> %</span></span
      >
    </div>
    <div class="tooltip">${o}</div>
  </span>`}function Se(e,t){if(null!=e)return e.toString().split(",")[t-1]}function Ce(e,t,a,o=new Date){if(!t.showWeekSummary&&void 0!==t.showWeekSummary)return O``;const{daily:i,unit_of_measurement:n,dailyweek_cost:s}=a,r=we(i,s,o),l=_e(s,o),c=new Date(o);c.setDate(o.getDate()-(0===o.getDay()?6:o.getDay()-1));const p=function(e=new Date){const t=e.getMonth();return t>=2&&t<=4?{primary:"#66bb6a",accent:"#81c784",icon:"mdi:flower"}:t>=5&&t<=7?{primary:"#42a5f5",accent:"#29b6f6",icon:"mdi:white-balance-sunny"}:t>=8&&t<=10?{primary:"#ff7043",accent:"#ffab40",icon:"mdi:leaf"}:{primary:"#5c6bc0",accent:"#7986cb",icon:"mdi:snowflake"}}(o);return O`
    <div class="week-summary-card">
      <div class="week-summary-header">
        <ha-icon icon="${p.icon}" class="week-summary-icon"></ha-icon>
        <span class="week-summary-title">${pe(e,"card.current_week")}</span>
        <span class="week-summary-period"
          >${pe(e,"card.since")}
          ${c.toLocaleDateString(ye(e),{day:"numeric",month:"short"})}</span
        >
      </div>
      <div class="week-summary-content">
        <div class="week-summary-main">
          <span class="week-summary-value">${ve(r,1)}</span>
          <span class="week-summary-unit">${n}</span>
        </div>
        ${l>0?O`
              <div class="week-summary-cost">
                <span class="week-summary-cost-value">${l.toFixed(2).replace(/\.00$/,"")}</span>
                <span class="week-summary-cost-unit">€</span>
              </div>
            `:O``}
      </div>
    </div>
  `}function Me(e){return O`
    <br /><span class="cons-val" title="${pe(e,"card.history.data_unavailable")}"
      ><ha-icon id="icon" icon="mdi:alert-outline"></ha-icon
    ></span>
  `}function Te(e){return O`
    <br /><span class="cons-val pending" title="${pe(e,"card.history.data_pending")}"
      ><ha-icon id="icon" icon="mdi:clock-outline"></ha-icon
    ></span>
  `}function He(e,t,a,o,i,n=new Date){if(a&&"undefined"!==a.toString()){const e=Se(a,o);if(e&&"-1"!==e)return e.toLowerCase()}const s=function(e,t){const a=["sensor.rte_tempo_today","sensor.edf_tempo_today","sensor.tempo_today","sensor.rte_tempo_tomorrow","sensor.edf_tempo_tomorrow","sensor.tempo_tomorrow"],o={};for(const t of a)if(e.states[t]){const a=e.states[t];a.state&&ue.has(a.state)&&(t.includes("today")?o.today=t:t.includes("tomorrow")&&(o.tomorrow=t))}if(t.tempoEntity&&e.states[t.tempoEntity]){const a=e.states[t.tempoEntity];a.state&&ue.has(a.state)&&(o.today=t.tempoEntity)}return o}(e,t);if(i&&Object.keys(s).length>0){const t=new Date(i),a=new Date(n),o=new Date(n);if(o.setDate(a.getDate()+1),t.toDateString()===a.toDateString()&&s.today){const t=e.states[s.today];if(t&&t.state&&ue.has(t.state))return ue.get(t.state)}if(t.toDateString()===o.toDateString()&&s.tomorrow){const t=e.states[s.tomorrow];if(t&&t.state&&ue.has(t.state))return ue.get(t.state)}}return"grey"}function Ne(e,t,a,o,i,n){if(-1===a||0===a||"0"===a||null==a){if(!n)return Te(e);{const a=Se(n,o);if(a&&"-1"!==a&&parseFloat(String(a??"").replace(",","."))>0){const a=be(e.states[t.entity].attributes.daily,o,n);if(a>0)return O`
            <br /><span class="cons-val estimated" title="${pe(e,"card.history.estimated")}"
              >${ve(a)} ${t.showInTableUnit?O` ${i}`:O``}</span
            >
          `}else if(!a||"-1"===a)return Te(e)}return Me(e)}return O`
    <br /><span class="cons-val"
      >${ve(a)} ${t.showInTableUnit?O` ${i}`:O``}</span
    >
  `}function We(e,t,a,o){if(t.showDayPriceHCHP){const t=Se(a,o);return"-1"===t?Me(e):O` <br /><span class="cons-val">${ve(t,2)} €</span> `}}function ze(e,t,a,o,i){if(t.showDayHCHP){const n=Se(a,o);return"-1"===n?Me(e):O`
      <br /><span class="cons-val"
        >${ve(n,2)} ${t.showInTableUnit?O` ${i}`:O``}</span
      >
    `}}function Fe(e,t,a){return!0===e?O`<span class="titre-desktop">${t}</span><span class="titre-mobile">${a}</span><br /> `:O``}function Re(e,t,a,o,i,n){const{unit_of_measurement:s}=i;return O`
    <div class="day">
      ${function(e,t,a,o,i,n){const s=Se(a,i);let r="grey";return t.showTempoColor&&(r=He(e,t,o,i,s,n)),O`
    <span class="tempo-day-wrapper">
      <span
        class="tempoday-${r}"
        style="display: inline-block;"
        title="${pe(e,"card.history.tempo_day",{color:r,date:s})}"
        >${new Date(s??"").toLocaleDateString(ye(e),{weekday:t.showDayName})}</span
      >
    </span>
  `}(e,t,i.dailyweek,i.dailyweek_Tempo,o,n)}
      ${Ne(e,t,a,o,s,i.dailyweek_cost)}
      ${function(e,t,a,o,i){if(t.showDayPrice){const t=Se(a,o);return"-1"===t?Me(e):O` <br /><span class="cons-val">${ve(t,2)} €</span> `}if(t.kWhPrice){const a=parseFloat(i);return isNaN(a)||a<=0?Me(e):O` <br /><span class="cons-val">${ve(a*t.kWhPrice,2)} €</span> `}}(e,t,i.dailyweek_cost,o,a)}
      ${We(e,t,i.dailyweek_costHC,o)}
      ${We(e,t,i.dailyweek_costHP,o)}
      ${ze(e,t,i.dailyweek_HC,o,s)}
      ${ze(e,t,i.dailyweek_HP,o,s)}
      ${function(e,t,a,o,i,n){if(t.showDayMaxPower){const t=Se(a,o),s=Se(i,o);if("-1"===t)return Me(e);const r=new Date(Se(n,o)??"").toLocaleTimeString(ye(e),{hour:"2-digit",minute:"2-digit"});return"true"===s?O`
        <br /><span class="cons-val" style="color: var(--error-color, red)">${ve(t,2)}</span> <br /><span
          class="cons-val"
          style="color: var(--error-color, red)"
          >${r}</span
        >
      `:O`
      <br /><span class="cons-val">${ve(t,2)}</span> <br /><span class="cons-val">${r}</span>
    `}}(e,t,i.dailyweek_MP,o,i.dailyweek_MP_over,i.dailyweek_MP_time)}
    </div>
  `}function Le(e,t,a,o=new Date){if(!0!==t.showHistory)return;const{daily:i,dailyweek:n}=a;if(void 0===n)return;if(!Array.isArray(i))return;let s=n.toString().split(",").length;return Number(t.nbJoursAffichage)<=s&&(s=Number(t.nbJoursAffichage)),O`
    ${Ce(e,t,a,o)}
    <div class="week-history">
      ${function(e,t){if(!0===t.showTitleLign){const a=t=>pe(e,`card.history.${t}`);return O`
      <div class="day">
        ${Fe(!0,"","")} ${Fe(!0,a("col_consumption"),a("col_consumption"))}
        ${Fe(t.showDayPrice,a("col_price"),a("col_price"))}
        ${Fe(t.showDayPriceHCHP,a("col_price_offpeak"),a("col_price_offpeak_mobile"))}
        ${Fe(t.showDayPriceHCHP,a("col_price_peak"),a("col_price_peak_mobile"))}
        ${Fe(t.showDayHCHP,a("col_offpeak"),a("col_offpeak"))}
        ${Fe(t.showDayHCHP,a("col_peak"),a("col_peak"))}
        ${Fe(t.showDayMaxPower,a("col_max_power"),a("col_max_power"))}
        ${Fe(t.showDayMaxPowerTime,a("col_max_power_time"),a("col_max_power_time"))}
      </div>
    `}}(e,t)}
      ${i.slice(-s).map((n,r)=>{const l=i.length-s+r+1;return Re(e,t,n,l,a,o)}).reverse()}
    </div>
  `}function Ue(e){return t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault?.(),e(t))}}function Oe(e,t){if(!0===e.showError&&t)return O`
        <div class="error-msg" style="color: var(--error-color, red)">
          <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
          ${t}
        </div>
      `}const Ye=new Map([["Pas de valeur","green"],[1,"green"],[2,"yellow"],[3,"red"]]);function Je(e,t){return O`
    <tr style="line-height:80%">
      <td style="width:5%">${e}</td>
      <td style="width:95%">
        <ul class="flow-row oneHour">
          ${$e(t,Ye).map(e=>O`<li
                class="ecowatt-${e[0]}"
                style="background: ${e[1]}"
                title="${e[1]} - ${e[0]}"
              ></li>`)}
        </ul>
      </td>
    </tr>
  `}function je(e){const t=new Date(e.attributes.date),a=e.state;return[t,ue.get(a),a]}function Ie(e,t,a){if(!e||e.length<=1||0===t)return O`<svg viewBox="0 0 100 50" class="consumption-chart"></svg>`;const o=e.map((a,o)=>`${o/(e.length-1)*100},${100-a.consumption/t*100}`).join(" ");return O`
    <svg viewBox="0 0 100 50" class="consumption-chart">
      <polyline points="${o}" fill="none" stroke="${a}" stroke-width="2" />
    </svg>
  `}function Ve(e,t,a,o,i){if(!t.showDetailedComparison)return O``;if(!t.detailedComparisonEntity)return O``;const n=e.states[t.detailedComparisonEntity];if(!n)return O`
      <div class="collapsible-section">
        <div class="collapsible-header">
          <span class="section-title">${pe(e,"card.comparison.title")}</span>
          <span class="section-summary"
            >${pe(e,"card.comparison.entity_not_found",{entity:t.detailedComparisonEntity})}</span
          >
        </div>
      </div>
    `;const s=n.attributes;let r;if(Array.isArray(s.time)&&Array.isArray(s.consumption))r=function(e,t,a=new Date){const o=new Date(a.getFullYear(),a.getMonth(),a.getDate()),i=new Date(o.getTime()-864e5),n=[],s=[];if(!Array.isArray(e)||!Array.isArray(t))return{today:n,yesterday:s,todayTotal:0,yesterdayTotal:0,evolution:0};for(let a=0;a<e.length;a++){const r=e[a];if(null==r)continue;const l="string"==typeof r?r.replace(" ","T"):r,c=new Date(l);if(isNaN(c.getTime()))continue;const p=parseFloat(t[a]);if(isNaN(p))continue;const d=new Date(c.getFullYear(),c.getMonth(),c.getDate());d.getTime()===o.getTime()?n.push({time:c,consumption:p}):d.getTime()===i.getTime()&&s.push({time:c,consumption:p})}const r=n.reduce((e,t)=>e+t.consumption,0)/1e3,l=s.reduce((e,t)=>e+t.consumption,0)/1e3;return{today:n,yesterday:s,todayTotal:r,yesterdayTotal:l,evolution:r>0&&0!==l?(r-l)/l*100:0}}(s.time,s.consumption);else{if(!s.Daily||!s.Dailyweek){const t=Object.keys(s).join(", ");return O`
      <div class="collapsible-section">
        <div class="collapsible-header">
          <span class="section-title">${pe(e,"card.comparison.title")}</span>
          <span class="section-summary"
            >${pe(e,"card.comparison.available_attrs",{attrs:t})}</span
          >
        </div>
      </div>
    `}r=function({Daily:e,Dailyweek:t},a=new Date){const o=e.split(",").map(e=>parseFloat(e.trim().replace(",","."))),i=t.split(",").map(e=>{const[t,o]=e.trim().split("/");return new Date(a.getFullYear(),parseInt(o,10)-1,parseInt(t,10))}),n=new Date(a.getFullYear(),a.getMonth(),a.getDate()),s=new Date(n.getTime()-864e5),r=[],l=[];i.forEach((e,t)=>{const a=o[t]||0,i=new Date(e.getFullYear(),e.getMonth(),e.getDate());i.getTime()===n.getTime()?r.push({time:e,consumption:a}):i.getTime()===s.getTime()&&l.push({time:e,consumption:a})});const c=r.reduce((e,t)=>e+t.consumption,0)/1e3,p=l.reduce((e,t)=>e+t.consumption,0)/1e3;return{today:r,yesterday:l,todayTotal:c,yesterdayTotal:p,evolution:c>0&&0!==p?(c-p)/p*100:0}}({Daily:s.Daily,Dailyweek:s.Dailyweek})}return O`
    <div class="collapsible-section">
      <div
        class="collapsible-header"
        role="button"
        tabindex="0"
        aria-expanded="${o}"
        @click="${i}"
        @keydown="${Ue(i)}"
      >
        <ha-icon icon="${o?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
        <span class="section-title">${pe(e,"card.comparison.title")}</span>
        <span class="section-summary">
          ${r.todayTotal.toFixed(1)} vs ${r.yesterdayTotal.toFixed(1)} kWh
        </span>
      </div>
      <div class="collapsible-content ${o?"expanded":"collapsed"}">
        <div class="detailed-comparison">
          ${function(e,t,a){const o=Math.max(...t.today.map(e=>e.consumption),...t.yesterday.map(e=>e.consumption));return O`
    <div class="comparison-charts">
      <div class="chart-day">
        <h4>${pe(e,"card.comparison.today")}</h4>
        <div class="mini-chart">${Ie(t.today,o,"#2196f3")}</div>
        <div class="day-stats">
          <span class="total">${t.todayTotal.toFixed(1)} ${a}</span>
          <span class="peak"
            >${pe(e,"card.comparison.peak",{value:Math.max(...t.today.map(e=>e.consumption))})}</span
          >
        </div>
      </div>
      <div class="chart-day">
        <h4>${pe(e,"card.comparison.yesterday")}</h4>
        <div class="mini-chart">${Ie(t.yesterday,o,"#666")}</div>
        <div class="day-stats">
          <span class="total">${t.yesterdayTotal.toFixed(1)} ${a}</span>
          <span class="peak"
            >${pe(e,"card.comparison.peak",{value:Math.max(...t.yesterday.map(e=>e.consumption))})}</span
          >
        </div>
      </div>
    </div>
  `}(e,r,a.unit_of_measurement)}
          ${function(e,t){const a=t.evolution;return O`
    <div class="comparison-stats">
      <div class="stat-item evolution ${a>0?"increase":a<0?"decrease":"stable"}">
        <ha-icon icon="${a>0?"mdi:trending-up":a<0?"mdi:trending-down":"mdi:trending-neutral"}"></ha-icon>
        <span class="label">${pe(e,"card.comparison.evolution")}</span>
        <span class="value">${Math.abs(a).toFixed(1)}%</span>
      </div>
      <div class="stat-item difference">
        <ha-icon icon="mdi:calculator"></ha-icon>
        <span class="label">${pe(e,"card.comparison.difference")}</span>
        <span class="value">${Math.abs(t.todayTotal-t.yesterdayTotal).toFixed(2)} kWh</span>
      </div>
    </div>
  `}(e,r)}
        </div>
      </div>
    </div>
  `}const qe="1.8.0";function Be(e){if(!e||!e.entity)throw new Error("You need to define an entity");if(void 0!==e.kWhPrice&&null!==e.kWhPrice&&isNaN(Number(e.kWhPrice)))throw new Error("kWhPrice should be a number")}window.customCards=window.customCards||[],window.customCards.push({type:"content-card-linky",name:"Carte Enedis",description:"Carte pour l'intégration MyElectricalData - Affichage moderne des données Linky avec évolutions colorées",preview:!0,documentationURL:"https://github.com/foXaCe/content-card-linky",version:qe,getEntitySuggestion:(e,t)=>{const a=e.states[t];if(!a)return null;const o=a.attributes||{};return/linky/i.test(t)||"consommation"===o.typeCompteur||void 0!==o.daily&&void 0!==o.dailyweek?{config:{type:"custom:content-card-linky",entity:t}}:null}}),console.info(`%c content-card-linky %c v${qe} `,"color: white; background: #4caf50; font-weight: 700;","color: white; background: #1976d2; font-weight: 700;");class Ge extends ne{static get properties(){return{config:{attribute:!1},hass:{attribute:!1},_monthlyExpanded:{state:!0},_yearlyExpanded:{state:!0},_detailedExpanded:{state:!0}}}constructor(){super(),this._monthlyExpanded=!1,this._yearlyExpanded=!1,this._detailedExpanded=!1}static async getConfigElement(){return await import("./content-card-linky-editor.js"),document.createElement("content-card-linky-editor")}static async getStubConfig(e){let t="sensor.linky_consumption";if(e&&e.states){const a=Object.keys(e.states).find(t=>{if(!t.startsWith("sensor."))return!1;const a=e.states[t].attributes||{};return/linky/i.test(t)||"consommation"===a.typeCompteur||void 0!==a.daily&&void 0!==a.dailyweek});a&&(t=a)}return{type:"custom:content-card-linky",entity:t,titleName:"LINKY",nbJoursAffichage:"7",showIcon:!0,showHistory:!0,showPrice:!0,showDayPrice:!0,showCurrentMonthRatio:!0,showWeekRatio:!0,showDayName:"long",showDayMaxPower:!0,showTitleLign:!0,showEcoWatt:!0,showTempo:!1,showMonthlyView:!0,showYearlyView:!0,showDetailedComparison:!0,detailedComparisonEntity:"sensor.linky_consumption_last5day"}}render(){if(!this.config||!this.hass)return O``;const e=this.config,t=this.hass;this.dataset.appearance=e.appearance??"premium";const a=t.states[e.entity];if(!a)return O`
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
                  >${pe(t,"card.data_unavailable",{entity:e.entity})}</span
                >
              </div>
            </div>
          </div>
        </ha-card>
      `;const o=a.attributes,i=o.typeCompteur;return"consommation"!==i&&i?"production"===i?O` <ha-card>
        <div class="card">
          <div class="main-info">
            ${e.showIcon?O` <div class="icon-block">
                  <span
                    class="linky-icon bigger"
                    style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
                  ></span>
                </div>`:O``}
            <div class="cout-block">${function(e,t,a){const o=parseFloat(t);if(isNaN(o)||-1===o||0===o||"0"===t||null==t){if(!a.dailyweek_cost||!a.daily)return O`
        <span
          class="cout pending"
          title="${pe(e,"card.production.pending")}"
          style="color: #ff9800; font-style: italic;"
        >
          <ha-icon icon="mdi:clock-outline"></ha-icon>
        </span>
        <span class="cout-unit">${a.unit_of_measurement}</span>
      `;{const t=a.dailyweek_cost.toString().split(","),o=parseFloat(t[0]?.replace(",","."));if(!isNaN(o)&&o>0){const t=be(a.daily,1,a.dailyweek_cost);if(t>0)return O`
            <span class="cout estimated" title="${pe(e,"card.production.estimate")}"
              >${ve(t)}</span
            >
            <span class="cout-unit">${a.unit_of_measurement}</span>
          `}else if(0===o||isNaN(o)||!t[0]||"-1"===t[0])return O`
          <span class="cout pending" title="${pe(e,"card.production.pending")}">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
          </span>
          <span class="cout-unit">${a.unit_of_measurement}</span>
        `}}return O`
    <span class="cout">${ve(t)}</span>
    <span class="cout-unit">${a.unit_of_measurement}</span>
  `}(t,a.state,o)}</div>
          </div>
          ${Oe(e,o.errorLastCall)}
        </div>
      </ha-card>`:O``:O` <ha-card id="card" @click="${()=>this._showDetails(e.entity)}">
        ${function(e){if(!0===e.showTitle)return O` <div class="card">
      <div class="main-title">
        <span>${e.titleName}</span>
      </div>
    </div>`}(e)}
        <div class="card">
          ${function(e,t,a,o){if(!0===t.showHeader)return t.showPeakOffPeak?O` <div class="main-info">
        ${ke(t)}
        <div class="hp-hc-block">
          <span class="conso-hc">${ve(a.yesterday_HC)}</span
          ><span class="conso-unit-hc">
            ${a.unit_of_measurement}
            <span class="more-unit">${pe(e,"card.in_off_peak")}</span></span
          ><br />
          <span class="conso-hp">${ve(a.yesterday_HP)}</span
          ><span class="conso-unit-hp">
            ${a.unit_of_measurement}
            <span class="more-unit">${pe(e,"card.in_peak")}</span></span
          >
        </div>
        ${xe(e,t,a)}
      </div>`:O` <div class="main-info">
      ${ke(t)}
      <div class="cout-block">
        <span class="cout">${ve(o.state)}</span>
        <span class="cout-unit">${a.unit_of_measurement}</span>
      </div>
      ${xe(e,t,a)}
    </div>`}(t,e,o,a)} ${function(e,t,a){return O` <div class="variations">
    ${t.showYearRatio?Pe(e,a.yearly_evolution,"card.aria.yearly_trend",O`
            <span class="year">${pe(e,"card.previous_year",{year:Ee(e)})}</span>
            <span class="tooltiptext"
              >${pe(e,"card.tooltip.year_prev",{value:a.current_year_last_year})}<br />${pe(e,"card.tooltip.year",{value:a.current_year})}</span
            >
          `):O``}
    ${t.showMonthRatio?Pe(e,a.monthly_evolution,"card.aria.monthly_trend",O`
            <span class="previous-month">${pe(e,"card.previous_month",{month:Ae(e)})}</span>
            <span class="tooltiptext"
              >${pe(e,"card.tooltip.prev_month_prev_year",{value:a.last_month_last_year})}<br />${pe(e,"card.tooltip.prev_month",{value:a.last_month})}</span
            >
          `):O``}
    ${t.showCurrentMonthRatio?Pe(e,a.current_month_evolution,"card.aria.current_month_trend",O`
            <span class="current-month">${pe(e,"card.current_month",{month:De(e)})}</span>
            <span class="tooltiptext"
              >${pe(e,"card.tooltip.month_prev_year",{value:a.current_month_last_year})}<br />${pe(e,"card.tooltip.month",{value:a.current_month})}</span
            >
          `):O``}
    ${t.showWeekRatio?Pe(e,a.current_week_evolution,"card.aria.weekly_trend",O`
            <span class="previous-month"
              >${pe(e,"card.previous_week",{week:pe(e,"card.week_noun")})}</span
            >
            <span class="tooltiptext"
              >${pe(e,"card.tooltip.last_week",{value:a.last_week})}<br />${pe(e,"card.tooltip.this_week",{value:a.current_week})}</span
            >
          `):O``}
    ${t.showYesterdayRatio?Pe(e,a.yesterday_evolution,"card.aria.daily_trend",O`
            <span class="previous-month"
              >${pe(e,"card.before_yesterday",{date:pe(e,"card.day_before_noun")})}</span
            >
            <span class="tooltiptext"
              >${pe(e,"card.tooltip.day_before_yesterday",{value:a.day_2})}<br />${pe(e,"card.tooltip.yesterday",{value:a.yesterday})}</span
            >
          `):O``}
    ${t.showPeakOffPeak?O` <span class="variations-linky">
          <span class="ha-icon">
            <ha-icon icon="mdi:flash"></ha-icon>
          </span>
          ${fe(a.peak_offpeak_percent)}<span class="unit"> ${pe(e,"card.peak_pct")}</span>
        </span>`:O``}
  </div>`}(t,e,o)}
          ${!1!==e.showSmartInsights?function(e,t,a,o=new Date){const i=we(a.daily,a.dailyweek_cost,o),n=_e(a.dailyweek_cost,o),s=parseFloat((a.current_month||0).toString().replace(",",".")),r=s>0?s/o.getDate()*new Date(o.getFullYear(),o.getMonth()+1,0).getDate():i>0?i/7*30:0,l=n>0?n/7*30:0,c=parseFloat((a.current_week_evolution||0).toString().replace(",",".")),p=parseFloat((a.monthly_evolution||0).toString().replace(",",".")),d=parseFloat((a.yearly_evolution||0).toString().replace(",",".")),u=c<0,h=p<0,m=d<0,v=u?"mdi:trending-down":"mdi:trending-up",y=u?"trend-good":"trend-bad",f=h?"mdi:trending-down":"mdi:trending-up",g=h?"trend-good":"trend-bad",w=m?"mdi:trending-down":"mdi:trending-up",_=m?"trend-good":"trend-bad";return O`
    <div class="smart-insights">
      <div class="insight-row">
        <div class="insight-item">
          <ha-icon icon="mdi:calendar-month" class="insight-icon"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${pe(e,"card.insights.monthly_prediction")}</div>
            <div class="insight-value">${r.toFixed(0)} kWh • ${l.toFixed(0)}€</div>
          </div>
        </div>

        <div class="insight-item">
          <ha-icon icon="${v}" class="insight-icon ${y}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${pe(e,"card.insights.vs_last_week")}</div>
            <div class="insight-value ${y}">${c>0?"+":""}${c}%</div>
          </div>
        </div>
      </div>

      <div class="insight-row">
        <div class="insight-item">
          <ha-icon icon="${f}" class="insight-icon ${g}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${pe(e,"card.insights.vs_last_month")}</div>
            <div class="insight-value ${g}">${p>0?"+":""}${p}%</div>
          </div>
        </div>

        <div class="insight-item">
          <ha-icon icon="${w}" class="insight-icon ${_}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">${pe(e,"card.insights.vs_last_year")}</div>
            <div class="insight-value ${_}">${d>0?"+":""}${d}%</div>
          </div>
        </div>
      </div>
    </div>
  `}(t,0,o):O``}
          ${Le(t,e,o)}
          ${function(e,t,a,o,i){if(!t.showMonthlyView)return O``;const n=a.current_month||"N/A",s=a.last_month||"N/A",r=a.current_month_last_year||"N/A",l=a.last_month_last_year||"N/A",c=[{name:pe(e,"card.temporal.current_month"),value:n,year:(new Date).getFullYear(),evolution:"N/A"!==r&&"N/A"!==n?((parseFloat(n)-parseFloat(r))/parseFloat(r)*100).toFixed(1):null},{name:pe(e,"card.temporal.previous_month"),value:s,year:(new Date).getFullYear(),evolution:"N/A"!==l&&"N/A"!==s?((parseFloat(s)-parseFloat(l))/parseFloat(l)*100).toFixed(1):null},{name:pe(e,"card.temporal.current_month_prev_year"),value:r,year:(new Date).getFullYear()-1,evolution:null},{name:pe(e,"card.temporal.previous_month_prev_year"),value:l,year:(new Date).getFullYear()-1,evolution:null}].filter(e=>"N/A"!==e.value);return O`
    <div class="collapsible-section">
      <div
        class="collapsible-header"
        role="button"
        tabindex="0"
        aria-expanded="${o}"
        @click="${i}"
        @keydown="${Ue(i)}"
      >
        <ha-icon icon="${o?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
        <span class="section-title">${pe(e,"card.temporal.monthly")}</span>
        <span class="section-summary">
          ${c.length>0?pe(e,"card.temporal.months_count",{count:c.length}):pe(e,"card.temporal.no_data")}
        </span>
      </div>
      <div class="collapsible-content ${o?"expanded":"collapsed"}">
        <div class="month-history">
          ${c.map(e=>O`
              <div class="month-item">
                <div class="month-name">${e.name} (${e.year})</div>
                <div class="month-value">${ve(e.value)} ${a.unit_of_measurement}</div>
                <div class="month-evolution">
                  ${null!==e.evolution?O`
                        <span class="evolution-percent ${parseFloat(e.evolution)>=0?"positive":"negative"}">
                          ${parseFloat(e.evolution)>=0?"+":""}${e.evolution}%
                        </span>
                      `:"-"}
                </div>
              </div>
            `)}
        </div>
      </div>
    </div>
  `}(t,e,o,this._monthlyExpanded,e=>this.toggleMonthlyView(e))}
          ${function(e,t,a,o,i){if(!t.showYearlyView)return O``;const n=a.current_year||"N/A",s=a.current_year_last_year||"N/A",r=[{name:(new Date).getFullYear(),value:n,evolution:"N/A"!==s&&"N/A"!==n?((parseFloat(n)-parseFloat(s))/parseFloat(s)*100).toFixed(1):null},{name:(new Date).getFullYear()-1,value:s,evolution:null}].filter(e=>"N/A"!==e.value);return O`
    <div class="collapsible-section">
      <div
        class="collapsible-header"
        role="button"
        tabindex="0"
        aria-expanded="${o}"
        @click="${i}"
        @keydown="${Ue(i)}"
      >
        <ha-icon icon="${o?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
        <span class="section-title">${pe(e,"card.temporal.yearly")}</span>
        <span class="section-summary">
          ${r.length>0?pe(e,"card.temporal.years_count",{count:r.length}):pe(e,"card.temporal.no_data")}
        </span>
      </div>
      <div class="collapsible-content ${o?"expanded":"collapsed"}">
        <div class="year-history">
          ${r.map(e=>O`
              <div class="year-item">
                <div class="year-name">${e.name}</div>
                <div class="year-value">${ve(e.value)} ${a.unit_of_measurement}</div>
                <div class="year-evolution">
                  ${null!==e.evolution?O`
                        <span class="evolution-percent ${parseFloat(e.evolution)>=0?"positive":"negative"}">
                          ${parseFloat(e.evolution)>=0?"+":""}${e.evolution}%
                        </span>
                      `:"-"}
                </div>
              </div>
            `)}
        </div>
      </div>
    </div>
  `}(t,e,o,this._yearlyExpanded,e=>this.toggleYearlyView(e))}
          ${Ve(t,e,o,this._detailedExpanded,e=>this.toggleDetailedComparison(e))}
          ${function(e,t,a){if(void 0===a.serviceEnedis)return O``;if("myElectricalData"!==a.serviceEnedis)return O`${pe(e,"card.ecowatt.only_med")}`;const o=t.ewEntity?e.states[t.ewEntity]:void 0,i=t.ewEntityJ1?e.states[t.ewEntityJ1]:void 0,n=t.ewEntityJ2?e.states[t.ewEntityJ2]:void 0;return t.showEcoWatt&&!o?O`<div class="error-msg">${pe(e,"card.ecowatt.missing_today")}</div>`:!t.showEcoWattJ12||i&&n?O`
    <table style="width:100%">
      ${t.showEcoWatt?Je(pe(e,"card.ecowatt.today"),o):O``}
      ${t.showEcoWattJ12?O`
            ${Je(pe(e,"card.ecowatt.tomorrow"),i)}
            ${Je(pe(e,"card.ecowatt.after_tomorrow"),n)}
            <tr style="line-height:80%">
              <td style="width:5%"></td>
              <td style="width:95%">
                <ul class="flow-row oneHourLabel">
                  ${$e(n,Ye).map(e=>O`<li title="${e[0]}">${e[0]%2==1?e[0]:""}</li>`)}
                </ul>
              </td>
            </tr>
          `:O``}
    </table>
  `:O`<div class="error-msg">${pe(e,"card.ecowatt.missing_j12")}</div>`}(t,e,o)} ${function(e,t,a){if(void 0===a.serviceEnedis)return O``;if("myElectricalData"!==a.serviceEnedis)return O`${pe(e,"card.tempo.only_med")}`;if(!1===t.showTempo)return O``;const o=e.states[t.tempoEntityInfo],i=e.states[t.tempoEntityJ0],n=e.states[t.tempoEntityJ1];if(!(i&&i.state&&n&&n.state))return O`${pe(e,"card.tempo.missing_j01")}`;if(!o||!o.state)return O`${pe(e,"card.tempo.missing_info")}`;const[s,r]=je(i),[l,c]=je(n),[p,d,u]=[(h=o).attributes.days_red,h.attributes.days_white,h.attributes.days_blue];var h;const m=t=>new Date(t).toLocaleDateString(ye(e),{weekday:"long",day:"numeric"});return O`
    <table class="tempo-color">
      <tr>
        <td class="tempo-${r}" style="width:50%">${m(s)}</td>
        <td class="tempo-${c}" style="width:50%">${m(l)}</td>
      </tr>
    </table>
    <table class="tempo-days">
      <tr>
        <td class="tempo-blue" style="width:33.33%">${u}</td>
        <td class="tempo-white" style="width:33.33%">${d}</td>
        <td class="tempo-red" style="width:33.33%">${p}</td>
      </tr>
    </table>
  `}(t,e,o)}
          ${Oe(e,o.errorLastCall)}
          ${function(e,t,a){return!0===t?O`
      <div class="information-msg" style="color: var(--error-color, red)">
        <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
        ${pe(e,"card.version_available",{version:a})}
      </div>
    `:O``}(t,o.versionUpdateAvailable,o.versionGit)}
          ${function(e,t,a){return!1===t.showInformation||void 0===a.serviceEnedis?O``:"myElectricalData"!==a.serviceEnedis?O`
      <div class="information-msg" style="color: var(--error-color, red)">
        <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
        ${pe(e,"card.migrate_med")}
      </div>
    `:void 0}(t,e,o)}
        </div>
      </ha-card>`}_showDetails(e){return((e,t,a={},o={})=>{const i=new CustomEvent(t,{bubbles:o.bubbles??!0,cancelable:Boolean(o.cancelable),composed:o.composed??!0,detail:a});return e.dispatchEvent(i),i})(this,"hass-more-info",{entityId:e})}setConfig(e){Be(e),this.config={...he,...e}}shouldUpdate(e){return function(e,t){if(t.has("config"))return!0;const a=t.get("hass");if(!a)return!0;const o=e.config||{},i=e.hass;for(const e of de){const t=o[e];if("string"==typeof t&&a.states[t]!==i?.states[t])return!0}return!1}(this,e)}updated(e){super.updated(e);const t=this.shadowRoot?.querySelector(".week-history");t&&(t.scrollLeft=t.scrollWidth-t.clientWidth)}getCardSize(){const e=this.config||{};let t=2;return e.showHistory&&(t+=2),!1!==e.showSmartInsights&&(t+=1),e.showMonthlyView&&(t+=1),e.showYearlyView&&(t+=1),e.showDetailedComparison&&(t+=1),(e.showEcoWatt||e.showEcoWattJ12)&&(t+=1),e.showTempo&&(t+=1),t}getGridOptions(){const e=this.getCardSize();return{columns:12,rows:Math.max(3,Math.min(e,12)),min_columns:6,min_rows:3}}getLayoutOptions(){const e=this.getCardSize();return{grid_columns:4,grid_rows:Math.max(3,Math.min(e,12)),grid_min_columns:2,grid_min_rows:3}}toggleMonthlyView(e){e.stopPropagation(),e.preventDefault(),this._monthlyExpanded=!this._monthlyExpanded}toggleYearlyView(e){e.stopPropagation(),e.preventDefault(),this._yearlyExpanded=!this._yearlyExpanded}toggleDetailedComparison(e){e.stopPropagation(),e.preventDefault(),this._detailedExpanded=!this._detailedExpanded}static get styles(){return me}}customElements.define("content-card-linky",Ge);export{Ge as ContentCardLinky,Be as assertConfig};
