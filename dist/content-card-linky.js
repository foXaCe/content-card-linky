const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const o=this.t;if(t&&void 0===e){const t=void 0!==o&&1===o.length;t&&(e=i.get(o)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(o,e))}return e}toString(){return this.cssText}};const n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:s,defineProperty:r,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,h=globalThis,u=h.trustedTypes,m=u?u.emptyScript:"",y=h.reactiveElementPolyfillSupport,g=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},v=(e,t)=>!s(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),h.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&r(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:a}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);a?.call(this,t),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const e=this.properties,t=[...c(e),...d(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,i)=>{if(t)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of i){const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=t.cssText,o.appendChild(i)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const a=(void 0!==o.converter?.toAttribute?o.converter:f).toAttribute(t,o.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=i;const n=a.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,o,i=!1,a){if(void 0!==e){const n=this.constructor;if(!1===i&&(a=this[e]),o??=n.getPropertyOptions(e),!((o.hasChanged??v)(a,t)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:a},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,y?.({ReactiveElement:b}),(h.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,_=e=>e,x=$.trustedTypes,k=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+A,S=`<${D}>`,P=document,C=()=>P.createComment(""),H=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,F=/>/g,W=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,U=/^(?:script|style|textarea|title)$/i,O=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),I=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),j=new WeakMap,Y=P.createTreeWalker(P,129);function V(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const q=(e,t)=>{const o=e.length-1,i=[];let a,n=2===t?"<svg>":3===t?"<math>":"",s=N;for(let t=0;t<o;t++){const o=e[t];let r,l,c=-1,d=0;for(;d<o.length&&(s.lastIndex=d,l=s.exec(o),null!==l);)d=s.lastIndex,s===N?"!--"===l[1]?s=z:void 0!==l[1]?s=F:void 0!==l[2]?(U.test(l[2])&&(a=RegExp("</"+l[2],"g")),s=W):void 0!==l[3]&&(s=W):s===W?">"===l[0]?(s=a??N,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,r=l[1],s=void 0===l[3]?W:'"'===l[3]?L:R):s===L||s===R?s=W:s===z||s===F?s=N:(s=W,a=void 0);const p=s===W&&e[t+1].startsWith("/>")?" ":"";n+=s===N?o+S:c>=0?(i.push(r),o.slice(0,c)+E+o.slice(c)+A+p):o+A+(-2===c?t:p)}return[V(e,n+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class B{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let a=0,n=0;const s=e.length-1,r=this.parts,[l,c]=q(e,t);if(this.el=B.createElement(l,o),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Y.nextNode())&&r.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=c[n++],o=i.getAttribute(e).split(A),s=/([.?@])?(.*)/.exec(t);r.push({type:1,index:a,name:s[2],strings:o,ctor:"."===s[1]?X:"?"===s[1]?ee:"@"===s[1]?te:Q}),i.removeAttribute(e)}else e.startsWith(A)&&(r.push({type:6,index:a}),i.removeAttribute(e));if(U.test(i.tagName)){const e=i.textContent.split(A),t=e.length-1;if(t>0){i.textContent=x?x.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],C()),Y.nextNode(),r.push({type:2,index:++a});i.append(e[t],C())}}}else if(8===i.nodeType)if(i.data===D)r.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(A,e+1));)r.push({type:7,index:a}),e+=A.length-1}a++}}static createElement(e,t){const o=P.createElement("template");return o.innerHTML=e,o}}function G(e,t,o=e,i){if(t===I)return t;let a=void 0!==i?o._$Co?.[i]:o._$Cl;const n=H(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=a:o._$Cl=a),void 0!==a&&(t=G(e,a._$AS(e,t.values),a,i)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??P).importNode(t,!0);Y.currentNode=i;let a=Y.nextNode(),n=0,s=0,r=o[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new Z(a,a.nextSibling,this,e):1===r.type?t=new r.ctor(a,r.name,r.strings,this,e):6===r.type&&(t=new oe(a,this,e)),this._$AV.push(t),r=o[++s]}n!==r?.index&&(a=Y.nextNode(),n++)}return Y.currentNode=P,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),H(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==I&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=B.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new K(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=j.get(e.strings);return void 0===t&&j.set(e.strings,t=new B(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const a of e)i===t.length?t.push(o=new Z(this.O(C()),this.O(C()),this,this.options)):o=t[i],o._$AI(a),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=_(e).nextSibling;_(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,a){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=J}_$AI(e,t=this,o,i){const a=this.strings;let n=!1;if(void 0===a)e=G(this,e,t,0),n=!H(e)||e!==this._$AH&&e!==I,n&&(this._$AH=e);else{const i=e;let s,r;for(e=a[0],s=0;s<a.length-1;s++)r=G(this,i[o+s],t,s),r===I&&(r=this._$AH[s]),n||=!H(r)||r!==this._$AH[s],r===J?e=J:e!==J&&(e+=(r??"")+a[s+1]),this._$AH[s]=r}n&&!i&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class ee extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class te extends Q{constructor(e,t,o,i,a){super(e,t,o,i,a),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??J)===I)return;const o=this._$AH,i=e===J&&o!==J||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==J&&(o===J||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const ie=$.litHtmlPolyfillSupport;ie?.(B,Z),($.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;class ne extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let a=i._$litPart$;if(void 0===a){const e=o?.renderBefore??null;i._$litPart$=a=new Z(t.insertBefore(C(),e),e,void 0,o??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}ne._$litElement$=!0,ne.finalized=!0,ae.litElementHydrateSupport?.({LitElement:ne});const se=ae.litElementPolyfillSupport;se?.({LitElement:ne}),(ae.litElementVersions??=[]).push("4.2.2");const re={en:{card:{name:"Linky Card",description:"Card for the MyElectricalData integration — modern Linky data display with coloured trends",data_unavailable:"Linky: data unavailable for {entity}",current_week:"Current week",since:"since",previous_year:"vs {year}",previous_month:"vs {month}",current_month:"vs {month}",previous_week:"vs {week}",before_yesterday:"vs {date}",in_off_peak:"(off-peak)",in_peak:"(peak)",daily_cost:"Daily cost",version_available:"New version available {version}",migrate_med:"Please migrate to MyElectricalData. EnedisGateway is no longer supported.",monthly_view:"Monthly view",yearly_view:"Yearly view",detailed_comparison:"Detailed comparison",ecowatt:"EcoWatt",tempo:"Tempo",remaining_blue_days:"Remaining blue days",remaining_white_days:"Remaining white days",remaining_red_days:"Remaining red days"},editor:{section:{general:"General",linky:"Linky entity",ecowatt:"EcoWatt (RTE)",tempo:"Tempo (EDF)",display:"Display",history:"History & data",price:"Price & costs",peak_offpeak:"Peak / off-peak",max_power:"Max power",insights:"Smart insights & trends",ecowatt_tempo:"EcoWatt & Tempo",temporal:"Temporal views"},field:{entity:"Linky entity (required)",titleName:"Card title",kWhPrice:"kWh price (€)",nbJoursAffichage:"Days to display",showDayName:"Day name format",ewEntity:"EcoWatt today",ewEntityJ1:"EcoWatt D+1",ewEntityJ2:"EcoWatt D+2",tempoEntityInfo:"Tempo information",tempoEntityJ0:"Tempo today",tempoEntityJ1:"Tempo tomorrow",detailedComparisonEntity:"Detailed comparison entity",showIcon:"Show icon",showTitle:"Show title",showHeader:"Show header",showError:"Show errors",showInformation:"Show information",showHistory:"Show history",showInTableUnit:"Show units in table",showTitleLign:"Show row titles",showPrice:"Show prices",showDayPrice:"Show daily price",showDayPriceHCHP:"Show off-peak / peak prices",showPeakOffPeak:"Show off-peak / peak ratio",showDayHCHP:"Show off-peak / peak per day",showDayMaxPower:"Show daily max power",showSmartInsights:"Show smart insights",showYearRatio:"Yearly trend",showCurrentMonthRatio:"Current-month trend",showMonthRatio:"Previous-month trend",showWeekRatio:"Weekly trend",showYesterdayRatio:"Daily trend",showEcoWatt:"Show EcoWatt today",showEcoWattJ12:"Show EcoWatt D+1 / D+2",showTempo:"Show Tempo",showTempoColor:"Tempo colours per day",showMonthlyView:"Monthly view (collapsible)",showYearlyView:"Yearly view (collapsible)",showDetailedComparison:"Today vs yesterday comparison"},day_name:{long:"Full (Monday)",short:"Short (Mon)",narrow:"Minimal (M)"}}},fr:{card:{name:"Carte Enedis",description:"Carte pour l'intégration MyElectricalData — affichage moderne des données Linky avec évolutions colorées",data_unavailable:"Linky : données inaccessibles pour {entity}",current_week:"Semaine en cours",since:"depuis",previous_year:"vs {year}",previous_month:"vs {month}",current_month:"vs {month}",previous_week:"vs {week}",before_yesterday:"vs {date}",in_off_peak:"(en HC)",in_peak:"(en HP)",daily_cost:"Coût journalier",version_available:"Nouvelle version disponible {version}",migrate_med:"Merci de migrer sur MyElectricalData. EnedisGateway n'est plus supporté.",monthly_view:"Vue mensuelle",yearly_view:"Vue annuelle",detailed_comparison:"Comparaison détaillée",ecowatt:"EcoWatt",tempo:"Tempo",remaining_blue_days:"Jours bleus restants",remaining_white_days:"Jours blancs restants",remaining_red_days:"Jours rouges restants"},editor:{section:{general:"Configuration générale",linky:"Entité Linky",ecowatt:"EcoWatt (RTE)",tempo:"Tempo (EDF)",display:"Affichage général",history:"Historique & données",price:"Prix & coûts",peak_offpeak:"Heures creuses / pleines",max_power:"Puissance maximale",insights:"Smart Insights & évolutions",ecowatt_tempo:"EcoWatt & Tempo",temporal:"Vues temporelles"},field:{entity:"Entité Linky (requis)",titleName:"Titre de la carte",kWhPrice:"Prix du kWh (€)",nbJoursAffichage:"Nombre de jours à afficher",showDayName:"Format des jours",ewEntity:"EcoWatt aujourd'hui",ewEntityJ1:"EcoWatt J+1",ewEntityJ2:"EcoWatt J+2",tempoEntityInfo:"Tempo informations",tempoEntityJ0:"Tempo aujourd'hui",tempoEntityJ1:"Tempo demain",detailedComparisonEntity:"Entité données détaillées",showIcon:"Afficher l'icône",showTitle:"Afficher le titre",showHeader:"Afficher l'en-tête",showError:"Afficher les erreurs",showInformation:"Afficher les informations",showHistory:"Afficher l'historique",showInTableUnit:"Afficher les unités",showTitleLign:"Afficher les titres de ligne",showPrice:"Afficher les prix",showDayPrice:"Afficher le prix par jour",showDayPriceHCHP:"Afficher les prix HC/HP",showPeakOffPeak:"Afficher le ratio HC/HP",showDayHCHP:"Afficher les jours HC/HP",showDayMaxPower:"Afficher la puissance max quotidienne",showSmartInsights:"Afficher les insights intelligents",showYearRatio:"Évolution annuelle",showCurrentMonthRatio:"Évolution mois courant",showMonthRatio:"Évolution mois précédent",showWeekRatio:"Évolution hebdomadaire",showYesterdayRatio:"Évolution quotidienne",showEcoWatt:"Afficher EcoWatt du jour",showEcoWattJ12:"Afficher EcoWatt J+1/J+2",showTempo:"Afficher Tempo",showTempoColor:"Couleurs Tempo du jour",showMonthlyView:"Vue mensuelle (repliable)",showYearlyView:"Vue annuelle (repliable)",showDetailedComparison:"Comparaison Aujourd'hui vs Hier"},day_name:{long:"Complet (Lundi)",short:"Abrégé (Lun)",narrow:"Minimal (L)"}}}},le="en";function ce(e,t){return t.split(".").reduce((e,t)=>e&&null!=e[t]?e[t]:void 0,e)}function de(e,t,o={}){const i=function(e){const t=String(e?.locale?.language||e?.language||le).toLowerCase().split("-")[0];return re[t]?t:le}(e),a=ce(re[i],t)??ce(re[le],t)??t;return"string"!=typeof a?t:a.replace(/\{(\w+)\}/g,(e,t)=>null!=o[t]?String(o[t]):`{${t}}`)}const pe=["entity","ewEntity","ewEntityJ1","ewEntityJ2","tempoEntity","tempoEntityInfo","tempoEntityJ0","tempoEntityJ1","detailedComparisonEntity"],he=new Map([["unknown","grey"],["Inconnu","grey"],["BLUE","blue"],["WHITE","white"],["RED","red"]]),ue={showHistory:!0,showHeader:!0,showPeakOffPeak:!0,showIcon:!1,showInTableUnit:!1,showDayPrice:!1,showDayPriceHCHP:!1,showDayMaxPower:!1,showDayHCHP:!1,showDayName:"long",showError:!0,showInformation:!0,showPrice:!0,showTitle:!1,showCurrentMonthRatio:!0,showMonthRatio:!0,showWeekRatio:!1,showYesterdayRatio:!1,showTitleLign:!1,showEcoWatt:!1,showEcoWattJ12:!1,showTempo:!1,showTempoColor:!0,showWeekSummary:!0,showMonthlyView:!0,showYearlyView:!0,showDetailedComparison:!0,detailedComparisonEntity:"sensor.linky_consumption_last5day",tempoEntity:"sensor.rte_tempo_today",titleName:"LINKY",nbJoursAffichage:"7",kWhPrice:void 0},me=((e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new a(i,e,o)})`
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
    background-size: 28.28px 28.28px;
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
`;function ye(e,t=1){const o=Number.parseFloat(e);return isNaN(o)?"–":o.toFixed(t)}function ge(e){const t=Number(e);return isNaN(t)?0:Math.round(t)}function fe(e){const t=e.getDay();return 0===t?6:t-1}function ve(e,t,o){if(!e||!o)return 0;const i=o.toString().split(","),a=parseFloat(i[t-1]?.replace(",","."));if(isNaN(a)||a<=0)return 0;const n=[];for(let t=0;t<Math.min(e.length,i.length,7);t++){const o=parseFloat(e[t]),a=parseFloat(i[t]?.replace(",","."));!isNaN(o)&&!isNaN(a)&&o>0&&a>0&&-1!==o&&-1!==a&&n.push(o/a)}if(0===n.length)return 0;return a*(n.reduce((e,t)=>e+t,0)/n.length)}function we(e,t){const o=[],i=e?.attributes?.forecast;if(!i)return o;for(const[e,a]of Object.entries(i)){if(void 0===e)continue;const i=e.replace("h","").replace("min","").trim();o.push([i,t.get(a),a])}return o}function be(e){return e.showIcon?O` <div class="icon-block">
      <span
        class="linky-icon bigger"
        style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
      ></span>
    </div>`:O``}function $e(e,t,o){return t.showPrice?O` <div class="cout-block">
      <span class="cout" title="${de(e,"card.daily_cost")}">${ye(o.daily_cost,2)}</span
      ><span class="cout-unit"> €</span>
    </div>`:O``}function _e(e,t){return O` <div class="variations">
    ${e.showYearRatio?O` <span class="variations-linky">
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
              aria-label="Évolution annuelle: ${ge(t.yearly_evolution)}%"
              role="text"
              >${ge(t.yearly_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="year">vs ${function(){const e=new Date;return e.setFullYear(e.getFullYear()-1),e.toLocaleDateString("fr-FR",{year:"numeric"})}()}</span>
            <span class="tooltiptext"
              >A-1 : ${t.current_year_last_year}<br />A : ${t.current_year}</span
            >
          </div>
        </span>`:O``}
    ${e.showMonthRatio?O` <span class="variations-linky">
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
              aria-label="Évolution mensuelle: ${ge(t.monthly_evolution)}%"
              role="text"
              >${ge(t.monthly_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="previous-month">vs ${function(){const e=new Date;return e.setMonth(e.getMonth()-1),e.setFullYear(e.getFullYear()-1),e.toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}()}</span>
            <span class="tooltiptext"
              >Mois Precedent A-1 : ${t.last_month_last_year}<br />Mois Precedent :
              ${t.last_month}</span
            >
          </div>
        </span>`:O``}
    ${e.showCurrentMonthRatio?O` <span class="variations-linky">
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
              aria-label="Évolution du mois courant: ${ge(t.current_month_evolution)}%"
              role="text"
              >${ge(t.current_month_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="current-month">vs ${function(){const e=new Date;return e.setFullYear(e.getFullYear()-1),e.toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}()}</span>
            <span class="tooltiptext"
              >Mois A-1 : ${t.current_month_last_year}<br />Mois : ${t.current_month}</span
            >
          </div>
        </span>`:O``}
    ${e.showWeekRatio?O` <span class="variations-linky">
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
              aria-label="Évolution hebdomadaire: ${ge(t.current_week_evolution)}%"
              role="text"
              >${ge(t.current_week_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="previous-month">vs ${"semaine"}</span>
            <span class="tooltiptext"
              >Semaine dernière : ${t.last_week}<br />Semaine courante : ${t.current_week}</span
            >
          </div>
        </span>`:O``}
    ${e.showYesterdayRatio?O` <span class="variations-linky">
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
              aria-label="Évolution quotidienne: ${ge(t.yesterday_evolution)}%"
              role="text"
              >${ge(t.yesterday_evolution)}<span class="unit"> %</span></span
            >
          </div>
          <div class="tooltip">
            <span class="previous-month">vs ${"avant-hier"}</span>
            <span class="tooltiptext">Avant-hier : ${t.day_2}<br />Hier : ${t.yesterday}</span>
          </div>
        </span>`:O``}
    ${e.showPeakOffPeak?O` <span class="variations-linky">
          <span class="ha-icon">
            <ha-icon icon="mdi:flash"></ha-icon>
          </span>
          ${ge(t.peak_offpeak_percent)}<span class="unit"> % HP</span>
        </span>`:O``}
  </div>`}function xe(e,t,o){if(!t.showWeekSummary&&void 0!==t.showWeekSummary)return O``;const{daily:i,unit_of_measurement:a,dailyweek_cost:n}=o,s=function(e,t,o=new Date){if(!e)return 0;const i=fe(o);let a=0;for(let o=Math.min(i,e.length-1);o>=1;o--){const i=parseFloat(e[o]);if(!isNaN(i)&&-1!==i&&0!==i){a+=i;continue}if(!t)continue;const n=t.toString().split(","),s=parseFloat(n[o]?.replace(",","."));if(isNaN(s)||s<=0)continue;const r=[];for(let t=0;t<Math.min(e.length,n.length,7);t++){if(t===o)continue;const i=parseFloat(e[t]),a=parseFloat(n[t]?.replace(",","."));!isNaN(i)&&!isNaN(a)&&i>0&&a>0&&-1!==i&&-1!==a&&r.push(i/a)}if(0===r.length)continue;const l=r.reduce((e,t)=>e+t,0)/r.length,c=s*l;c>0&&(a+=c)}return a}(i,n),r=function(e,t=new Date){if(!e)return 0;const o=fe(t),i=e.toString().split(",");let a=0;for(let e=Math.min(o,i.length-1);e>=1;e--){const t=parseFloat(i[e].replace(",","."));isNaN(t)||-1===t||(a+=t)}return a}(n),l=new Date,c=new Date(l);c.setDate(l.getDate()-(0===l.getDay()?6:l.getDay()-1));const d=function(e,t=50){const o=e/t;return o<=.7?"linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)":o<=1?"linear-gradient(135deg, #2196f3 0%, #03dac6 100%)":o<=1.3?"linear-gradient(135deg, #ff9800 0%, #ffc107 100%)":"linear-gradient(135deg, #f44336 0%, #e91e63 100%)"}(s,i.slice(0,7).reduce((e,t)=>e+parseFloat(t||0),0)/7*5),p=function(e=new Date){const t=e.getMonth();return t>=2&&t<=4?{primary:"#66bb6a",accent:"#81c784",icon:"mdi:flower"}:t>=5&&t<=7?{primary:"#42a5f5",accent:"#29b6f6",icon:"mdi:white-balance-sunny"}:t>=8&&t<=10?{primary:"#ff7043",accent:"#ffab40",icon:"mdi:leaf"}:{primary:"#5c6bc0",accent:"#7986cb",icon:"mdi:snowflake"}}();return O`
    <div class="week-summary-card" style="background: ${d}">
      <div class="week-summary-header">
        <ha-icon icon="${p.icon}" class="week-summary-icon"></ha-icon>
        <span class="week-summary-title">${de(e,"card.current_week")}</span>
        <span class="week-summary-period"
          >${de(e,"card.since")}
          ${c.toLocaleDateString(e?.locale?.language||"fr-FR",{day:"numeric",month:"short"})}</span
        >
      </div>
      <div class="week-summary-content">
        <div class="week-summary-main">
          <span class="week-summary-value">${ye(s,1)}</span>
          <span class="week-summary-unit">${a}</span>
        </div>
        ${r>0?O`
              <div class="week-summary-cost">
                <span class="week-summary-cost-value">${r.toFixed(2).replace(/\.00$/,"")}</span>
                <span class="week-summary-cost-unit">€</span>
              </div>
            `:O``}
      </div>
    </div>
  `}function ke(){return O`
    <br /><span class="cons-val" title="Donnée indisponible"
      ><ha-icon id="icon" icon="mdi:alert-outline"></ha-icon
    ></span>
  `}function Ee(){return O`
    <br /><span class="cons-val pending" title="Données en attente de remontée"
      ><ha-icon id="icon" icon="mdi:clock-outline" style="color: #ff9800;"></ha-icon
    ></span>
  `}function Ae(e,t,o,i,a){if(o&&"undefined"!==o.toString()){const e=o.toString().split(",")[i-1];if(e&&"-1"!==e)return e.toLowerCase()}const n=function(e,t){const o=["sensor.rte_tempo_today","sensor.edf_tempo_today","sensor.tempo_today","sensor.rte_tempo_tomorrow","sensor.edf_tempo_tomorrow","sensor.tempo_tomorrow"],i={};for(const t of o)if(e.states[t]){const o=e.states[t];o.state&&he.has(o.state)&&(t.includes("today")?i.today=t:t.includes("tomorrow")&&(i.tomorrow=t))}if(t.tempoEntity&&e.states[t.tempoEntity]){const o=e.states[t.tempoEntity];o.state&&he.has(o.state)&&(i.today=t.tempoEntity)}return i}(e,t);if(a&&Object.keys(n).length>0){const t=new Date(a),o=new Date,i=new Date;if(i.setDate(o.getDate()+1),t.toDateString()===o.toDateString()&&n.today){const t=e.states[n.today];if(t&&t.state&&he.has(t.state))return he.get(t.state)}if(t.toDateString()===i.toDateString()&&n.tomorrow){const t=e.states[n.tomorrow];if(t&&t.state&&he.has(t.state))return he.get(t.state)}}return"grey"}function De(e,t,o){if(e.showDayPriceHCHP){const e=t.toString().split(",")[o-1];return"-1"===e?ke():O` <br /><span class="cons-val">${ye(e,2)} €</span> `}}function Se(e,t,o,i){if(e.showDayHCHP){const a=t.toString().split(",")[o-1];return"-1"===a?ke():O`
      <br /><span class="cons-val"
        >${ye(a,2)} ${e.showInTableUnit?O` ${i}`:O``}</span
      >
    `}}function Pe(e,t){if(!0===e){return O`<span class="titre-desktop">${t}</span><span class="titre-mobile">${{"Prix HC":"€ HC","Prix HP":"€ HP"}[t]||t}</span><br /> `}return O``}function Ce(e,t,o,i,a){const{unit_of_measurement:n}=a;return O`
    <div class="day">
      ${function(e,t,o,i,a){const n=o.toString().split(",")[a-1];let s="grey";return t.showTempoColor&&(s=Ae(e,t,i,a,n)),O`
    <span class="tempo-day-wrapper">
      <span
        class="tempoday-${s}"
        style="display: inline-block;"
        title="Tempo: ${s} - Date: ${n}"
        >${new Date(n).toLocaleDateString("fr-FR",{weekday:t.showDayName})}</span
      >
    </span>
  `}(e,t,a.dailyweek,a.dailyweek_Tempo,i)}
      ${function(e,t,o,i,a,n){if(-1===o||0===o||"0"===o||null==o){if(!n)return Ee();{const o=n.toString().split(",")[i-1];if(o&&"-1"!==o&&parseFloat(o.replace(",","."))>0){const o=ve(e.states[t.entity].attributes.daily,i,n);if(o>0)return O`
            <br /><span
              class="cons-val estimated"
              title="Estimation basée sur les jours précédents - Données kWh non disponibles"
              >${ye(o)} ${t.showInTableUnit?O` ${a}`:O``}</span
            >
          `}else if(!o||"-1"===o)return Ee()}return ke()}return O`
    <br /><span class="cons-val"
      >${ye(o)} ${t.showInTableUnit?O` ${a}`:O``}</span
    >
  `}(e,t,o,i,n,a.dailyweek_cost)}
      ${function(e,t,o){if(e.showDayPrice){const e=t.toString().split(",")[o-1];return"-1"===e?ke():O` <br /><span class="cons-val">${ye(e,2)} €</span> `}if(e.kWhPrice)return O` <br /><span class="cons-val">${ye(t*e.kWhPrice,2)} €</span> `}(t,a.dailyweek_cost,i)}
      ${De(t,a.dailyweek_costHC,i)}
      ${De(t,a.dailyweek_costHP,i)}
      ${Se(t,a.dailyweek_HC,i,n)}
      ${Se(t,a.dailyweek_HP,i,n)}
      ${function(e,t,o,i,a){if(e.showDayMaxPower){const e=t.toString().split(",")[o-1],n=i.toString().split(",")[o-1];return"-1"===e?ke():"true"===n?O`
        <br /><span class="cons-val" style="color:red">${ye(e,2)}</span> <br /><span
          class="cons-val"
          style="color:red"
          >${new Date(a.toString().split(",")[o-1]).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</span
        >
      `:O`
      <br /><span class="cons-val">${ye(e,2)}</span> <br /><span class="cons-val"
        >${new Date(a.toString().split(",")[o-1]).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</span
      >
    `}}(t,a.dailyweek_MP,i,a.dailyweek_MP_over,a.dailyweek_MP_time)}
    </div>
  `}function He(e,t,o){if(!0!==t.showHistory)return;const{daily:i,dailyweek:a}=o;if(void 0===a)return;let n=a.toString().split(",").length;return t.nbJoursAffichage<=n&&(n=t.nbJoursAffichage),O`
    ${xe(e,t,o)}
    <div class="week-history">
      ${function(e){if(!0===e.showTitleLign)return O`
      <div class="day">
        ${Pe(!0,"")} ${Pe(!0,"Conso")}
        ${Pe(e.showDayPrice,"Prix")} ${Pe(e.showDayPriceHCHP,"Prix HC")}
        ${Pe(e.showDayPriceHCHP,"Prix HP")} ${Pe(e.showDayHCHP,"HC")}
        ${Pe(e.showDayHCHP,"HP")} ${Pe(e.showDayMaxPower,"MP")}
        ${Pe(e.showDayMaxPowerTime,"MPtime")}
      </div>
    `}(t)}
      ${i.slice(-n).map((a,s)=>{const r=i.length-n+s+1;return Ce(e,t,a,r,o)}).reverse()}
    </div>
  `}function Te(e,t){if(!0===e.showError&&""!==t)return O`
        <div class="error-msg" style="color: var(--error-color, red)">
          <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
          ${t}
        </div>
      `}const Me=new Map([["Pas de valeur","green"],[1,"green"],[2,"yellow"],[3,"red"]]);function Ne(e,t){return O`
    <tr style="line-height:80%">
      <td style="width:5%">${e}</td>
      <td style="width:95%">
        <ul class="flow-row oneHour">
          ${we(t,Me).map(e=>O`<li
                class="ecowatt-${e[0]}"
                style="background: ${e[1]}"
                title="${e[1]} - ${e[0]}"
              ></li>`)}
        </ul>
      </td>
    </tr>
  `}const ze=new Map([["unknown","grey"],["Inconnu","grey"],["BLUE","blue"],["WHITE","white"],["RED","red"]]);function Fe(e){const t=new Date(e.attributes.date),o=e.state;return[t,ze.get(o),o]}function We(e,t,o){if(!e||e.length<=1||0===t)return O`<svg viewBox="0 0 100 50" class="consumption-chart"></svg>`;const i=e.map((o,i)=>`${i/(e.length-1)*100},${100-o.consumption/t*100}`).join(" ");return O`
    <svg viewBox="0 0 100 50" class="consumption-chart">
      <polyline points="${i}" fill="none" stroke="${o}" stroke-width="2" />
    </svg>
  `}function Re(e,t,o,i,a){if(!t.showDetailedComparison)return O``;if(!t.detailedComparisonEntity)return O``;const n=e.states[t.detailedComparisonEntity];if(!n)return O`
      <div class="collapsible-section">
        <div class="collapsible-header">
          <span class="section-title">Aujourd'hui vs Hier</span>
          <span class="section-summary">Entité ${t.detailedComparisonEntity} introuvable</span>
        </div>
      </div>
    `;const s=n.attributes;let r;if(Array.isArray(s.time)&&Array.isArray(s.consumption))r=function(e,t,o=new Date){const i=new Date(o.getFullYear(),o.getMonth(),o.getDate()),a=new Date(i.getTime()-864e5),n=[],s=[];if(!Array.isArray(e)||!Array.isArray(t))return{today:n,yesterday:s,todayTotal:0,yesterdayTotal:0,evolution:0};for(let o=0;o<e.length;o++){const r=e[o];if(null==r)continue;const l="string"==typeof r?r.replace(" ","T"):r,c=new Date(l);if(isNaN(c.getTime()))continue;const d=parseFloat(t[o]);if(isNaN(d))continue;const p=new Date(c.getFullYear(),c.getMonth(),c.getDate());p.getTime()===i.getTime()?n.push({time:c,consumption:d}):p.getTime()===a.getTime()&&s.push({time:c,consumption:d})}const r=n.reduce((e,t)=>e+t.consumption,0)/1e3,l=s.reduce((e,t)=>e+t.consumption,0)/1e3;return{today:n,yesterday:s,todayTotal:r,yesterdayTotal:l,evolution:r>0&&0!==l?(r-l)/l*100:0}}(s.time,s.consumption);else{if(!s.Daily||!s.Dailyweek){const e=Object.keys(s).join(", ");return O`
      <div class="collapsible-section">
        <div class="collapsible-header">
          <span class="section-title">Aujourd'hui vs Hier</span>
          <span class="section-summary">Attributs disponibles: ${e}</span>
        </div>
      </div>
    `}r=function({Daily:e,Dailyweek:t},o=new Date){const i=e.split(",").map(e=>parseFloat(e.trim().replace(",","."))),a=t.split(",").map(e=>{const[t,i]=e.trim().split("/");return new Date(o.getFullYear(),parseInt(i,10)-1,parseInt(t,10))}),n=new Date(o.getFullYear(),o.getMonth(),o.getDate()),s=new Date(n.getTime()-864e5),r=[],l=[];a.forEach((e,t)=>{const o=i[t]||0,a=new Date(e.getFullYear(),e.getMonth(),e.getDate());a.getTime()===n.getTime()?r.push({time:e,consumption:o}):a.getTime()===s.getTime()&&l.push({time:e,consumption:o})});const c=r.reduce((e,t)=>e+t.consumption,0)/1e3,d=l.reduce((e,t)=>e+t.consumption,0)/1e3;return{today:r,yesterday:l,todayTotal:c,yesterdayTotal:d,evolution:c>0&&0!==d?(c-d)/d*100:0}}({Daily:s.Daily,Dailyweek:s.Dailyweek})}return r.today&&r.yesterday?O`
    <div class="collapsible-section">
      <div class="collapsible-header" @click="${a}">
        <ha-icon icon="${i?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
        <span class="section-title">Aujourd'hui vs Hier</span>
        <span class="section-summary">
          ${r.todayTotal.toFixed(1)} vs ${r.yesterdayTotal.toFixed(1)} kWh
        </span>
      </div>
      <div class="collapsible-content ${i?"expanded":"collapsed"}">
        <div class="detailed-comparison">
          ${function(e,t){const o=Math.max(...e.today.map(e=>e.consumption),...e.yesterday.map(e=>e.consumption));return O`
    <div class="comparison-charts">
      <div class="chart-day">
        <h4>Aujourd'hui</h4>
        <div class="mini-chart">${We(e.today,o,"#2196f3")}</div>
        <div class="day-stats">
          <span class="total">${e.todayTotal.toFixed(1)} ${t}</span>
          <span class="peak">Pic: ${Math.max(...e.today.map(e=>e.consumption))}W</span>
        </div>
      </div>
      <div class="chart-day">
        <h4>Hier</h4>
        <div class="mini-chart">${We(e.yesterday,o,"#666")}</div>
        <div class="day-stats">
          <span class="total">${e.yesterdayTotal.toFixed(1)} ${t}</span>
          <span class="peak">Pic: ${Math.max(...e.yesterday.map(e=>e.consumption))}W</span>
        </div>
      </div>
    </div>
  `}(r,o.unit_of_measurement)}
          ${function(e){const t=e.evolution;return O`
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
  `}(r)}
        </div>
      </div>
    </div>
  `:O`
      <div class="collapsible-section">
        <div class="collapsible-header">
          <span class="section-title">Aujourd'hui vs Hier</span>
          <span class="section-summary"
            >Données aujourd'hui/hier manquantes (${r.today?.length||0} /
            ${r.yesterday?.length||0})</span
          >
        </div>
      </div>
    `}const Le="1.7.1";window.customCards=window.customCards||[],window.customCards.push({type:"content-card-linky",name:"Carte Enedis",description:"Carte pour l'intégration MyElectricalData - Affichage moderne des données Linky avec évolutions colorées",preview:!0,documentationURL:"https://github.com/MyElectricalData/content-card-linky",version:Le}),console.info(`%c content-card-linky %c v${Le} `,"color: white; background: #4caf50; font-weight: 700;","color: white; background: #1976d2; font-weight: 700;");customElements.define("content-card-linky",class extends ne{static get properties(){return{config:{attribute:!1},hass:{attribute:!1},_monthlyExpanded:{state:!0},_yearlyExpanded:{state:!0},_detailedExpanded:{state:!0}}}constructor(){super(),this._monthlyExpanded=!1,this._yearlyExpanded=!1,this._detailedExpanded=!1}static async getConfigElement(){return await import("./content-card-linky-editor.js"),document.createElement("content-card-linky-editor")}static async getStubConfig(e){let t="sensor.linky_consumption";if(e&&e.states){const o=Object.keys(e.states).find(t=>{if(!t.startsWith("sensor."))return!1;const o=e.states[t].attributes||{};return/linky/i.test(t)||"consommation"===o.typeCompteur||void 0!==o.daily&&void 0!==o.dailyweek});o&&(t=o)}return{type:"custom:content-card-linky",entity:t,titleName:"LINKY",nbJoursAffichage:"7",showIcon:!0,showHistory:!0,showPrice:!0,showDayPrice:!0,showCurrentMonthRatio:!0,showWeekRatio:!0,showDayName:"long",showDayMaxPower:!0,showTitleLine:!0,showEcoWatt:!0,showTempo:!1,showMonthlyView:!0,showYearlyView:!0,showDetailedComparison:!0,detailedComparisonEntity:"sensor.linky_consumption_last5day"}}render(){if(!this.config||!this.hass)return O``;const e=this.hass.states[this.config.entity];if(!e)return O`
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
                  >${de(this.hass,"card.data_unavailable",{entity:this.config.entity})}</span
                >
              </div>
            </div>
          </div>
        </ha-card>
      `;const t=e.attributes,o=t.typeCompteur;return"consommation"!==o&&o?"production"===o?O` <ha-card>
        <div class="card">
          <div class="main-info">
            ${this.config.showIcon?O` <div class="icon-block">
                  <span
                    class="linky-icon bigger"
                    style="background: none, url('/local/community/content-card-linky/icons/linky.svg') no-repeat; background-size: contain;"
                  ></span>
                </div>`:O``}
            <div class="cout-block">${function(e,t){const o=parseFloat(e);if(isNaN(o)||-1===o||0===o||"0"===e||null==e){if(!t.dailyweek_cost||!t.daily)return O`
        <span class="cout pending" title="Données de production en attente" style="color: #ff9800; font-style: italic;">
          <ha-icon icon="mdi:clock-outline"></ha-icon>
        </span>
        <span class="cout-unit">${t.unit_of_measurement}</span>
      `;{const e=t.dailyweek_cost.toString().split(","),o=parseFloat(e[0]?.replace(",","."));if(!isNaN(o)&&o>0){const e=ve(t.daily,1,t.dailyweek_cost);if(e>0)return O`
            <span class="cout estimated" title="Estimation production basée sur les données précédentes"
              >${ye(e)}</span
            >
            <span class="cout-unit">${t.unit_of_measurement}</span>
          `}else if(0===o||isNaN(o)||!e[0]||"-1"===e[0])return O`
          <span
            class="cout pending"
            title="Données de production en attente"
            style="color: #ff9800; font-style: italic;"
          >
            <ha-icon icon="mdi:clock-outline"></ha-icon>
          </span>
          <span class="cout-unit">${t.unit_of_measurement}</span>
        `}}return O`
    <span class="cout">${ye(e)}</span>
    <span class="cout-unit">${t.unit_of_measurement}</span>
  `}(e.state,t)}</div>
          </div>
          ${Te(this.config,t.errorLastCall)}
        </div>
      </ha-card>`:void 0:O` <ha-card id="card" @click="${()=>this._showDetails(this.config.entity)}">
        ${function(e){if(!0===e.showTitle)return O` <div class="card">
      <div class="main-title">
        <span>${e.titleName}</span>
      </div>
    </div>`}(this.config)}
        <div class="card">
          ${function(e,t,o,i){if(!0===t.showHeader)return t.showPeakOffPeak?O` <div class="main-info">
        ${be(t)}
        <div class="hp-hc-block">
          <span class="conso-hc">${ye(o.yesterday_HC)}</span
          ><span class="conso-unit-hc">
            ${o.unit_of_measurement}
            <span class="more-unit">${de(e,"card.in_off_peak")}</span></span
          ><br />
          <span class="conso-hp">${ye(o.yesterday_HP)}</span
          ><span class="conso-unit-hp">
            ${o.unit_of_measurement}
            <span class="more-unit">${de(e,"card.in_peak")}</span></span
          >
        </div>
        ${$e(e,t,o)}
      </div>`:O` <div class="main-info">
      ${be(t)}
      <div class="cout-block">
        <span class="cout">${ye(i.state)}</span>
        <span class="cout-unit">${o.unit_of_measurement}</span>
      </div>
      ${$e(e,t,o)}
    </div>`}(this.hass,this.config,t,e)} ${_e(this.config,t)}
          ${!1!==this.config.showSmartInsights?function(e,t,o,i){const a=e.states[t.entity],n=a?a.attributes:{},s=o&&Array.isArray(o)?o.reduce((e,t)=>e+parseFloat(t||0),0):0,r=i&&Array.isArray(i)?i.reduce((e,t)=>e+parseFloat(t||0),0):0,l=parseFloat((n.current_month||0).toString().replace(",",".")),c=l>0?l/(new Date).getDate()*new Date((new Date).getFullYear(),(new Date).getMonth()+1,0).getDate():s>0?s/7*30:0,d=r>0?r/7*30:0,p=parseFloat((n.current_week_evolution||0).toString().replace(",",".")),h=parseFloat((n.monthly_evolution||0).toString().replace(",",".")),u=parseFloat((n.yearly_evolution||0).toString().replace(",",".")),m=p<0,y=h<0,g=u<0,f=m?"mdi:trending-down":"mdi:trending-up",v=m?"#4caf50":"#f44336",w=y?"mdi:trending-down":"mdi:trending-up",b=y?"#4caf50":"#f44336",$=g?"mdi:trending-down":"mdi:trending-up",_=g?"#4caf50":"#f44336";return O`
    <div class="smart-insights">
      <div class="insight-row">
        <div class="insight-item">
          <ha-icon icon="mdi:calendar-month" class="insight-icon"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">Prédiction mensuelle</div>
            <div class="insight-value">${c.toFixed(0)} kWh • ${d.toFixed(0)}€</div>
          </div>
        </div>

        <div class="insight-item">
          <ha-icon icon="${f}" class="insight-icon" style="color: ${v}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">vs semaine dernière</div>
            <div class="insight-value" style="color: ${v}">
              ${p>0?"+":""}${p}%
            </div>
          </div>
        </div>
      </div>

      <div class="insight-row">
        <div class="insight-item">
          <ha-icon icon="${w}" class="insight-icon" style="color: ${b}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">vs mois dernier</div>
            <div class="insight-value" style="color: ${b}">
              ${h>0?"+":""}${h}%
            </div>
          </div>
        </div>

        <div class="insight-item">
          <ha-icon icon="${$}" class="insight-icon" style="color: ${_}"></ha-icon>
          <div class="insight-content">
            <div class="insight-label">vs année dernière</div>
            <div class="insight-value" style="color: ${_}">
              ${u>0?"+":""}${u}%
            </div>
          </div>
        </div>
      </div>
    </div>
  `}(this.hass,this.config,t.dailyweek,t.dailyweek_cost):O``}
          ${He(this.hass,this.config,t)}
          ${function(e,t,o,i){if(!e.showMonthlyView)return O``;const a=t.current_month||"N/A",n=t.last_month||"N/A",s=t.current_month_last_year||"N/A",r=t.last_month_last_year||"N/A",l=[{name:"Mois actuel",value:a,year:(new Date).getFullYear(),evolution:"N/A"!==s&&"N/A"!==a?((parseFloat(a)-parseFloat(s))/parseFloat(s)*100).toFixed(1):null},{name:"Mois précédent",value:n,year:(new Date).getFullYear(),evolution:"N/A"!==r&&"N/A"!==n?((parseFloat(n)-parseFloat(r))/parseFloat(r)*100).toFixed(1):null},{name:"Mois actuel A-1",value:s,year:(new Date).getFullYear()-1,evolution:null},{name:"Mois préc. A-1",value:r,year:(new Date).getFullYear()-1,evolution:null}].filter(e=>"N/A"!==e.value);return O`
    <div class="collapsible-section">
      <div class="collapsible-header" @click="${i}">
        <ha-icon icon="${o?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
        <span class="section-title">Mensuel</span>
        <span class="section-summary"> ${l.length>0?`${l.length} mois`:"Aucune donnée"} </span>
      </div>
      <div class="collapsible-content ${o?"expanded":"collapsed"}">
        <div class="month-history">
          ${l.map(e=>O`
              <div class="month-item">
                <div class="month-name">${e.name} (${e.year})</div>
                <div class="month-value">${ye(e.value)} ${t.unit_of_measurement}</div>
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
  `}(this.config,t,this._monthlyExpanded,e=>this.toggleMonthlyView(e))}
          ${function(e,t,o,i){if(!e.showYearlyView)return O``;const a=t.current_year||"N/A",n=t.current_year_last_year||"N/A",s=[{name:(new Date).getFullYear(),value:a,evolution:"N/A"!==n&&"N/A"!==a?((parseFloat(a)-parseFloat(n))/parseFloat(n)*100).toFixed(1):null},{name:(new Date).getFullYear()-1,value:n,evolution:null}].filter(e=>"N/A"!==e.value);return O`
    <div class="collapsible-section">
      <div class="collapsible-header" @click="${i}">
        <ha-icon icon="${o?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
        <span class="section-title">Annuel</span>
        <span class="section-summary"> ${s.length>0?`${s.length} ans`:"Aucune donnée"} </span>
      </div>
      <div class="collapsible-content ${o?"expanded":"collapsed"}">
        <div class="year-history">
          ${s.map(e=>O`
              <div class="year-item">
                <div class="year-name">${e.name}</div>
                <div class="year-value">${ye(e.value)} ${t.unit_of_measurement}</div>
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
  `}(this.config,t,this._yearlyExpanded,e=>this.toggleYearlyView(e))}
          ${Re(this.hass,this.config,t,this._detailedExpanded,e=>this.toggleDetailedComparison(e))}
          ${function(e,t,o){if(void 0===o.serviceEnedis)return O``;if("myElectricalData"!==o.serviceEnedis)return O`EcoWatt : uniquement disponible avec myElectricData`;const i=t.ewEntity?e.states[t.ewEntity]:void 0,a=t.ewEntityJ1?e.states[t.ewEntityJ1]:void 0,n=t.ewEntityJ2?e.states[t.ewEntityJ2]:void 0;return t.showEcoWatt&&!i?O`<div class="error-msg">EcoWatt : entité J+0 non configurée ou introuvable</div>`:!t.showEcoWattJ12||a&&n?O`
    <table style="width:100%">
      ${t.showEcoWatt?Ne("J+0",i):O``}
      ${t.showEcoWattJ12?O`
            ${Ne("J+1",a)} ${Ne("J+2",n)}
            <tr style="line-height:80%">
              <td style="width:5%"></td>
              <td style="width:95%">
                <ul class="flow-row oneHourLabel">
                  ${we(n,Me).map(e=>O`<li title="${e[0]}">${e[0]%2==1?e[0]:""}</li>`)}
                </ul>
              </td>
            </tr>
          `:O``}
    </table>
  `:O`<div class="error-msg">EcoWatt : entité(s) J+1/J+2 non configurée(s) ou introuvable(s)</div>`}(this.hass,this.config,t)} ${function(e,t,o){if(void 0===o.serviceEnedis)return O``;if("myElectricalData"!==o.serviceEnedis)return O`Tempo : uniquement disponible avec myElectricData`;if(!1===t.showTempo)return O``;const i=e.states[t.tempoEntityInfo],a=e.states[t.tempoEntityJ0],n=e.states[t.tempoEntityJ1];if(!(a&&a.state&&n&&n.state))return O`Tempo: sensor(s) J0 et/ou J1 indisponible ou incorrecte`;if(!i||!i.state)return O`Tempo: sensor 'info' indisponible ou incorrecte`;const[s,r]=Fe(a),[l,c]=Fe(n),[d,p,h]=[(u=i).attributes.days_red,u.attributes.days_white,u.attributes.days_blue];var u;const m=e?.locale?.language||"fr-FR",y=e=>new Date(e).toLocaleDateString(m,{weekday:"long",day:"numeric"});return O`
    <table class="tempo-color">
      <tr>
        <td class="tempo-${r}" style="width:50%">${y(s)}</td>
        <td class="tempo-${c}" style="width:50%">${y(l)}</td>
      </tr>
    </table>
    <table class="tempo-days">
      <tr>
        <td class="tempo-blue" style="width:33.33%">${h}</td>
        <td class="tempo-white" style="width:33.33%">${p}</td>
        <td class="tempo-red" style="width:33.33%">${d}</td>
      </tr>
    </table>
  `}(this.hass,this.config,t)}
          ${Te(this.config,t.errorLastCall)}
          ${i=this.hass,a=t.versionUpdateAvailable,n=t.versionGit,!0===a?O`
      <div class="information-msg" style="color: var(--error-color, red)">
        <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
        ${de(i,"card.version_available",{version:n})}
      </div>
    `:O``}
          ${function(e,t,o){return!1===t.showInformation||void 0===o.serviceEnedis?O``:"myElectricalData"!==o.serviceEnedis?O`
      <div class="information-msg" style="color: var(--error-color, red)">
        <ha-icon id="icon" icon="mdi:alert-outline"></ha-icon>
        ${de(e,"card.migrate_med")}
      </div>
    `:void 0}(this.hass,this.config,t)}
        </div>
      </ha-card>`;var i,a,n}_showDetails(e){return((e,t,o={},i={})=>{const a=new Event(t,{bubbles:i.bubbles??!0,cancelable:Boolean(i.cancelable),composed:i.composed??!0});return a.detail=o,e.dispatchEvent(a),a})(this,"hass-more-info",{entityId:e})}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");if(e.kWhPrice&&isNaN(e.kWhPrice))throw new Error("kWhPrice should be a number");this.config={...ue,...e}}shouldUpdate(e){return function(e,t){if(t.has("config"))return!0;const o=t.get("hass");if(!o)return!0;const i=e.config||{};for(const t of pe){const a=i[t];if(a&&o.states[a]!==e.hass.states[a])return!0}return!1}(this,e)}updated(e){super.updated(e);const t=this.shadowRoot.querySelector(".week-history");t&&(t.scrollLeft=t.scrollWidth-t.clientWidth)}getCardSize(){const e=this.config||{};let t=2;return e.showHistory&&(t+=2),!1!==e.showSmartInsights&&(t+=1),e.showMonthlyView&&(t+=1),e.showYearlyView&&(t+=1),e.showDetailedComparison&&(t+=1),(e.showEcoWatt||e.showEcoWattJ12)&&(t+=1),e.showTempo&&(t+=1),t}getGridOptions(){const e=this.getCardSize();return{columns:12,rows:Math.max(3,Math.min(e,12)),min_columns:6,min_rows:3}}getLayoutOptions(){const e=this.getCardSize();return{grid_columns:4,grid_rows:Math.max(3,Math.min(e,12)),grid_min_columns:2,grid_min_rows:3}}toggleMonthlyView(e){e.stopPropagation(),e.preventDefault(),this._monthlyExpanded=!this._monthlyExpanded}toggleYearlyView(e){e.stopPropagation(),e.preventDefault(),this._yearlyExpanded=!this._yearlyExpanded}toggleDetailedComparison(e){e.stopPropagation(),e.preventDefault(),this._detailedExpanded=!this._detailedExpanded}static get styles(){return me}});
