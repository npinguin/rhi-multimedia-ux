import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const root=new URL('../',import.meta.url);
const json=p=>JSON.parse(readFileSync(new URL(p,root)));
const pkg=json('package.json'), prod=json('release/product.json'),gate=json('release/COORDINATED_PUBLICATION_GATE.json'),qual=json('release/QUALIFICATION.json'),core=json('src/vendor/RHI_UX_CORE.json');
function need(x,msg){if(!x)throw Error(msg)}
need(prod.version===pkg.version && prod.ux_core.version===core.version,'Release / UX Core version drift');
need(gate.test_request.expected_tag==='v'+pkg.version && gate.test_request.authorized,'Explicit TEST authorization missing');
need(qual.candidate_tag==='v'+pkg.version && qual.stable_promotion==='NOT_APPROVED','Qualification/status drift');
need(prod.release_asset_policy==='none' && prod.hacs_delivery_mode==='immutable_tag_dist_tree','HACS plugin install asset policy drift');
need(!existsSync(new URL('src/assets/branding/company-logo.png',root)),'Second branding authority');
const workflows=readdirSync(new URL('.github/workflows',root)).sort();
need(JSON.stringify(workflows)===JSON.stringify(['publish-hacs.yml','release.yml','validate.yml']),'Must have exactly three standard workflows');
const publish=readFileSync(new URL('.github/workflows/publish-hacs.yml',root),'utf8');
need(publish.includes('gh release create') && !publish.includes('npm run build') && !publish.includes('--prerelease'),'Publisher must tag committed exact dist, zero rebuild/assets');
const stable=readFileSync(new URL('release/STABLE_APPROVAL.json',root),'utf8');
need(stable.includes('NOT_APPROVED'),'Stable mistakenly approved');
console.log('HACS release governance PASS');
