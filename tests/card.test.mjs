import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const defs=new Map();
class FakeElement {attachShadow(){this.shadowRoot={innerHTML:'',addEventListener(){}};return this.shadowRoot;}dispatchEvent(){return true;}}
const window={location:{href:'https://ha.example/test-dashboard/overview?foo=bar',pathname:'/test-dashboard/overview'},history:{pushState(_,__,url){window.location.href='https://ha.example'+url;}},addEventListener(){},removeEventListener(){},customCards:[]};
const context={window,HTMLElement:FakeElement,customElements:{get:x=>defs.get(x),define:(k,v)=>defs.set(k,v)},CustomEvent:class{constructor(t,v){this.type=t;this.detail=v?.detail;}},setTimeout:()=>42,clearTimeout(){},console,Intl,URL};
const simpleCore=`function rhiUxEscape(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function rhiUxDomainShell({domain,modules}){return '<div class="rhiUxDomainShell">'+domain+' '+modules.map(m=>m.label).join(' ')+'</div>';}
function rhiUxPageHero({title,description}){return '<div class="rhiUxPageHero"><h2>'+title+'</h2><p>'+description+'</p></div>';}
function rhiUxStatusGrid(items){return items.map(i=>'<span>'+i.label+': '+i.value+'</span>').join('');}
function rhiUxQuickActionBar({actions}){return actions.map(a=>'<button data-nav="'+a.target+'">'+a.label+'</button>').join('');}
function rhiUxPageTemplate({hero,status='',actions='',content=''}){return hero+status+actions+content;}
function rhiUxTechnicalFooter({backendVersion}){return '<footer>Backend '+backendVersion+'</footer>';}
function rhiUxWriteFeedback({message}){return '<p>'+message+'</p>';}
function rhiUxState({title,detail}){return '<b>'+title+'</b><p>'+detail+'</p>';}`;
vm.runInNewContext(simpleCore+'\nconst RHI_MM_CORE_CSS="";const RHI_MM_DOMAIN_CSS="";\n'+
readFileSync(new URL('../src/runtime/multimedia-gateway.js',import.meta.url),'utf8')+'\n'+
readFileSync(new URL('../src/domain/multimedia-view-model.js',import.meta.url),'utf8')+'\n'+
readFileSync(new URL('../src/ui/multimedia-card.js',import.meta.url),'utf8'),context);
const Card=defs.get('homebrain-multimedia-card');assert.ok(Card);
const card=new Card();card.setConfig({});card.hass={states:{},callService(){}};
assert.match(card.shadowRoot.innerHTML,/Multimedia backend not ready/);assert.doesNotMatch(card.shadowRoot.innerHTML,/Rooms: 0/);
const room={id:'salon',name:'Salon',phase:'active',activity_id:'watch_tv',activity_name:'Watch TV',progress:'Ready',active:true,playing:true,attention:false,foundation_approved:true,
now_playing:{title:'&lt;unsafe&gt;',artist:'Artist',album:'A',picture:null},audio:{name:'Denon Salon',volume_level:.24},
activities:[{id:'watch_tv',name:'Watch TV',available:true,routes:[{type:'source',selected:'TV',device_key:'amplifier'}],active:true}],
devices:[{key:'screen',name:'LG OLED',role:'display',available:true,foundation_approved:true,entity_id:'media_player.tv',state:'on',source:'HDMI 1',physical_id:'tv:salon'}],commands:{stop:{enabled:true},recover:{enabled:false}}};
const attrs={contract:'RHI_MULTIMEDIA_EXPERIENCE_V1',schema_version:1,revision:1,backend_version:'0.1.3',rooms:[room],summary:{room_count:1,active_rooms:1,playing_rooms:1,attention_rooms:0}};
let called=[];card.hass={states:{'sensor.rhi_multimedia_experience':{state:'ready',attributes:attrs}},async callService(...args){called.push(args);}};
assert.match(card.shadowRoot.innerHTML,/Rooms: 1/);assert.match(card.shadowRoot.innerHTML,/Salon/);assert.match(card.shadowRoot.innerHTML,/Watch TV/);assert.match(card.shadowRoot.innerHTML,/Backend 0.1.3/);
await card.execute('salon','start_activity','watch_tv');assert.equal(called.length,1);assert.equal(called[0][0],'rhi_multimedia');assert.equal(called[0][1],'start_activity');
attrs.revision++;card.hass={states:{'sensor.rhi_multimedia_experience':{state:'ready',attributes:attrs}},async callService(...args){called.push(args);}};
assert.match(card.shadowRoot.innerHTML,/backend confirmed/);
card.navigate('devices');assert.match(window.location.href,/foo=bar/);assert.match(window.location.href,/multimedia_view=devices/);
assert.match(card.shadowRoot.innerHTML,/Devices/);
console.log('Runtime card, commands, readback, URL routing and missing-backend UX PASS');
