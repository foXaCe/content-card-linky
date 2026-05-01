const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:a,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,f=_?_.emptyScript:"",g=p.reactiveElementPolyfillSupport,$=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},m=(t,e)=>!h(t,e),y={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:m};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=a(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??m)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[$("elementProperties")]=new Map,v[$("finalized")]=new Map,g?.({ReactiveElement:v}),(p.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,E=t=>t,b=A.trustedTypes,S=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+C,H=`<${x}>`,O=document,T=()=>O.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,R="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,j=/"/g,J=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),B=new WeakMap,F=O.createTreeWalker(O,129);function Y(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let h,c,a=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===U?"!--"===c[1]?r=N:void 0!==c[1]?r=D:void 0!==c[2]?(J.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=I):void 0!==c[3]&&(r=I):r===I?">"===c[0]?(r=o??U,a=-1):void 0===c[1]?a=-2:(a=r.lastIndex-c[2].length,h=c[1],r=void 0===c[3]?I:'"'===c[3]?j:W):r===j||r===W?r=I:r===N||r===D?r=U:(r=I,o=void 0);const d=r===I&&t[e+1].startsWith("/>")?" ":"";n+=r===U?i+H:a>=0?(s.push(h),i.slice(0,a)+P+i.slice(a)+C+d):i+C+(-2===a?e:d)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,h=this.parts,[c,a]=q(t,e);if(this.el=K.createElement(c,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&h.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(P)){const e=a[n++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);h.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(h.push({type:6,index:o}),s.removeAttribute(t));if(J.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),F.nextNode(),h.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===x)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)h.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===L)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=k(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);F.currentNode=s;let o=F.nextNode(),n=0,r=0,h=i[0];for(;void 0!==h;){if(n===h.index){let e;2===h.type?e=new Q(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new st(o,this,t)),this._$AV.push(e),h=i[++r]}n!==h?.index&&(o=F.nextNode(),n++)}return F.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),k(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==z&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Q(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{const s=t;let r,h;for(t=o[0],r=0;r<o.length-1;r++)h=Z(this,s[i+r],e,r),h===L&&(h=this._$AH[r]),n||=!k(h)||h!==this._$AH[r],h===z?t=z:t!==z&&(t+=(h??"")+o[r+1]),this._$AH[r]=h}n&&!s&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==z)}}class it extends X{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??z)===L)return;const i=this._$AH,s=t===z&&i!==z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==z&&(i===z||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(K,Q),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class rt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Q(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const ht=nt.litElementPolyfillSupport;ht?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");!customElements.get("ha-switch")&&customElements.get("paper-toggle-button")&&customElements.define("ha-switch",customElements.get("paper-toggle-button"));try{customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement()}catch(t){}const ct="function"==typeof window.loadCardHelpers?window.loadCardHelpers():Promise.resolve(null);class at extends rt{setConfig(t){this._config={...t}}static get properties(){return{hass:{},_config:{}}}get _entity(){return this._config&&this._config.entity||""}get _ewEntity(){return this._config&&this._config.ewEntity||""}get _ewEntityJ1(){return this._config&&this._config.ewEntityJ1||""}get _ewEntityJ2(){return this._config&&this._config.ewEntityJ2||""}get _tempoEntity(){return this._config&&this._config.tempoEntity||""}get _tempoEntityInfo(){return this._config&&this._config.tempoEntityInfo||""}get _tempoEntityJ0(){return this._config&&this._config.tempoEntityJ0||""}get _tempoEntityJ1(){return this._config&&this._config.tempoEntityJ1||""}get _name(){return this._config&&this._config.name||""}get _showIcon(){return!1!==(this._config&&this._config.showIcon)}get _showHeader(){return!1!==(this._config&&this._config.showHeader)}get _showHistory(){return!1!==(this._config&&this._config.showHistory)}get _showPeakOffPeak(){return!1!==(this._config&&this._config.showPeakOffPeak)}get _showInTableUnit(){return!1!==(this._config&&this._config.showInTableUnit)}get _showDayPrice(){return!1!==(this._config&&this._config.showDayPrice)}get _showDayPriceHCHP(){return!1!==(this._config&&this._config.showDayPriceHCHP)}get _showDayMaxPower(){return!1!==(this._config&&this._config.showDayMaxPower)}get _showPrice(){return!1!==(this._config&&this._config.showPrice)}get _showTitle(){return!1!==(this._config&&this._config.showTitle)}get _showDayHCHP(){return!1!==(this._config&&this._config.showDayHCHP)}get _showCurrentMonthRatio(){return!1!==(this._config&&this._config.showCurrentMonthRatio)}get _showMonthRatio(){return!1!==(this._config&&this._config.showMonthRatio)}get _showYearRatio(){return!1!==(this._config&&this._config.showYearRatio)}get _showWeekRatio(){return!1!==(this._config&&this._config.showWeekRatio)}get _showYesterdayRatio(){return!1!==(this._config&&this._config.showYesterdayRatio)}get _showError(){return!1!==(this._config&&this._config.showError)}get _showInformation(){return!1!==(this._config&&this._config.showInformation)}get _showTitleLign(){return!1!==(this._config&&this._config.showTitleLign)}get _showEcoWatt(){return!1!==(this._config&&this._config.showEcoWatt)}get _showEcoWattJ12(){return!1!==(this._config&&this._config.showEcoWattJ12)}get _showTempo(){return!1!==(this._config&&this._config.showTempo)}get _showTempoColor(){return!1!==(this._config&&this._config.showTempoColor)}get _showSmartInsights(){return!1!==(this._config&&this._config.showSmartInsights)}get _showMonthlyView(){return!1!==(this._config&&this._config.showMonthlyView)}get _showYearlyView(){return!1!==(this._config&&this._config.showYearlyView)}get _showDetailedComparison(){return!1!==(this._config&&this._config.showDetailedComparison)}get _detailedComparisonEntity(){return this._config&&this._config.detailedComparisonEntity||"sensor.linky_consumption_last5day"}get _title(){return!1!==(this._config&&this._config.showTitle)}get _current(){return!1!==(this._config&&this._config.current)}get _details(){return!1!==(this._config&&this._config.details)}get _nbJoursAffichage(){return this._config&&this._config.nbJoursAffichage||"7"}get _showDayName(){return this._config&&this._config.showDayName||"long"}get _titleName(){return this._config&&this._config.titleName||"LINKY"}get _kWhPrice(){return this._config&&this._config.kWhPrice||""}firstUpdated(){ct.then(t=>{t.importMoreInfoControl&&t.importMoreInfoControl("fan")})}render(){return this.hass&&this._config?V`
      <div class="card-config">
        <div class="config-section">
          <h3 class="section-title">Configuration générale</h3>
          ${this.renderTextField("Titre de la carte",this._titleName,"titleName")}
          ${this.renderNumberField("Prix du kWh (€)",this._kWhPrice,"kWhPrice")}
          ${this.renderSelectField("Nombre de jours à afficher","nbJoursAffichage",[{value:"1",label:"1 jour"},{value:"2",label:"2 jours"},{value:"3",label:"3 jours"},{value:"4",label:"4 jours"},{value:"5",label:"5 jours"},{value:"6",label:"6 jours"},{value:"7",label:"7 jours"}],this._nbJoursAffichage)}
          ${this.renderSelectField("Format des jours","showDayName",[{value:"long",label:"Complet (Lundi)"},{value:"short",label:"Abrégé (Lun)"},{value:"narrow",label:"Minimal (L)"}],this._showDayName)}
        </div>

        <div class="config-section">
          <h3 class="section-title">Entités Linky</h3>
          ${this.renderSensorPicker("Entité principale Linky",this._entity,"entity")}
        </div>

        <div class="config-section">
          <h3 class="section-title">EcoWatt (RTE)</h3>
          ${this.renderSensorPicker("EcoWatt aujourd'hui",this._ewEntity,"ewEntity")}
          ${this.renderSensorPicker("EcoWatt J+1",this._ewEntityJ1,"ewEntityJ1")}
          ${this.renderSensorPicker("EcoWatt J+2",this._ewEntityJ2,"ewEntityJ2")}
        </div>

        <div class="config-section">
          <h3 class="section-title">Tempo (EDF)</h3>
          ${this.renderSensorPicker("Tempo informations",this._tempoEntityInfo,"tempoEntityInfo")}
          ${this.renderSensorPicker("Tempo aujourd'hui",this._tempoEntityJ0,"tempoEntityJ0")}
          ${this.renderSensorPicker("Tempo demain",this._tempoEntityJ1,"tempoEntityJ1")}
        </div>

        <div class="config-section">
          <h3 class="section-title">Affichage général</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher l'icône",this._showIcon,"showIcon")}
            ${this.renderSwitchOption("Afficher le titre",this._showTitle,"showTitle")}
            ${this.renderSwitchOption("Afficher l'en-tête",this._showHeader,"showHeader")}
            ${this.renderSwitchOption("Afficher les erreurs",this._showError,"showError")}
            ${this.renderSwitchOption("Afficher les informations",this._showInformation,"showInformation")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Historique & Données</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher l'historique",this._showHistory,"showHistory")}
            ${this.renderSwitchOption("Afficher les unités",this._showInTableUnit,"showInTableUnit")}
            ${this.renderSwitchOption("Afficher les titres de ligne",this._showTitleLign,"showTitleLign")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Prix & Coûts</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher les prix",this._showPrice,"showPrice")}
            ${this.renderSwitchOption("Afficher le prix par jour",this._showDayPrice,"showDayPrice")}
            ${this.renderSwitchOption("Afficher les prix HC/HP",this._showDayPriceHCHP,"showDayPriceHCHP")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Heures Creuses/Pleines</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher le ratio HC/HP",this._showPeakOffPeak,"showPeakOffPeak")}
            ${this.renderSwitchOption("Afficher les jours HC/HP",this._showDayHCHP,"showDayHCHP")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Puissance maximale</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher la puissance max quotidienne",this._showDayMaxPower,"showDayMaxPower")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">📊 Smart Insights & Évolutions</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher les insights intelligents",this._showSmartInsights,"showSmartInsights")}
            ${this.renderSwitchOption("Évolution annuelle",this._showYearRatio,"showYearRatio")}
            ${this.renderSwitchOption("Évolution mois courant",this._showCurrentMonthRatio,"showCurrentMonthRatio")}
            ${this.renderSwitchOption("Évolution mois précédent",this._showMonthRatio,"showMonthRatio")}
            ${this.renderSwitchOption("Évolution hebdomadaire",this._showWeekRatio,"showWeekRatio")}
            ${this.renderSwitchOption("Évolution quotidienne",this._showYesterdayRatio,"showYesterdayRatio")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">EcoWatt & Tempo</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Afficher EcoWatt du jour",this._showEcoWatt,"showEcoWatt")}
            ${this.renderSwitchOption("Afficher EcoWatt J+1/J+2",this._showEcoWattJ12,"showEcoWattJ12")}
            ${this.renderSwitchOption("Afficher Tempo",this._showTempo,"showTempo")}
            ${this.renderSwitchOption("Couleurs Tempo du jour",this._showTempoColor,"showTempoColor")}
          </ul>
        </div>

        <div class="config-section">
          <h3 class="section-title">Vues temporelles</h3>
          <ul class="switches">
            ${this.renderSwitchOption("Vue mensuelle (repliable)",this._showMonthlyView,"showMonthlyView")}
            ${this.renderSwitchOption("Vue annuelle (repliable)",this._showYearlyView,"showYearlyView")}
            ${this.renderSwitchOption("Comparaison Aujourd'hui vs Hier",this._showDetailedComparison,"showDetailedComparison")}
          </ul>
          ${this.renderSensorPicker("Entité données détaillées",this._detailedComparisonEntity,"detailedComparisonEntity")}
        </div>
      </div>
    `:V``}renderSensorPicker(t,e,i){return this.renderPicker(t,e,i,"sensor")}renderPicker(t,e,i,s){return V`
      <ha-entity-picker
        label="${t}"
        .hass="${this.hass}"
        .value="${e}"
        .configValue="${i}"
        .includeDomains="${s}"
        @change="${this._valueChanged}"
        allow-custom-entity
      ></ha-entity-picker>
    `}renderTextField(t,e,i){return this.renderField(t,e,i,"text")}renderNumberField(t,e,i){return this.renderField(t,e,i,"number")}renderField(t,e,i,s){return V`
      <ha-textfield
        label="${t}"
        .value="${e}"
        type="${s}"
        .configValue=${i}
        @input=${this._valueChanged}
      ></ha-textfield>
    `}renderSwitchOption(t,e,i){return V`
      <li class="switch">
        <ha-switch .checked=${e} .configValue="${i}" @change="${this._valueChanged}"> </ha-switch>
        <span>${t}</span>
      </li>
    `}renderSelectField(t,e,i,s,o){const n=[];for(let t=0;t<i.length;t++){const e=i[t];n.push(V`<ha-list-item .value="${e.value}">${e.label}</ha-list-item>`)}return V`
      <ha-select
        label="${t}"
        .value=${s||o}
        .configValue=${e}
        @change=${this._valueChanged}
        @closed=${t=>t.stopPropagation()}
      >
        ${n}
      </ha-select>
    `}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;this[`_${e.configValue}`]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config={...this._config,[e.configValue]:void 0!==e.checked?e.checked:e.value}),((t,e,i={},s={})=>{const o=new Event(e,{bubbles:s.bubbles??!0,cancelable:Boolean(s.cancelable),composed:s.composed??!0});o.detail=i,t.dispatchEvent(o)})(this,"config-changed",{config:this._config}))}static get styles(){return n`
      .card-config {
        padding: 16px;
      }

      .config-section {
        margin-bottom: 24px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        padding-bottom: 16px;
      }

      .config-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }

      .section-title {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      ha-textfield,
      ha-select,
      ha-entity-picker {
        display: block;
        margin-bottom: 16px;
        width: 100%;
      }

      .switches {
        margin: 8px 0 0 0;
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        padding: 0;
        gap: 8px;
      }

      .switch {
        display: flex;
        align-items: center;
        width: calc(50% - 4px);
        min-height: 40px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        padding: 8px 12px;
        transition: border-color 0.2s ease;
      }

      .switch:hover {
        border-color: var(--primary-color);
      }

      .switches span {
        padding: 0 12px;
        font-size: 13px;
        color: var(--primary-text-color);
        line-height: 1.4;
        flex: 1;
      }

      ha-switch {
        flex-shrink: 0;
      }

      @media (max-width: 600px) {
        .switch {
          width: 100%;
        }

        .switches {
          flex-direction: column;
        }
      }
    `}}customElements.get("content-card-linky-editor")||customElements.define("content-card-linky-editor",at);export{at as contentCardLinkyEditor};
