import {assemble} from './build.mjs';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dist=resolve(root,'dist');
function files(path){return existsSync(path)?readdirSync(path,{withFileTypes:true}).flatMap(d=>d.isDirectory()?files(join(path,d.name)):[relative(dist,join(path,d.name)).replaceAll('\\','/')]):[];}
const expected=assemble();
const actual=files(dist).sort();
if(JSON.stringify(actual)!==JSON.stringify([...expected.keys()].sort()))throw Error('Missing/extra HACS files in committed dist: '+JSON.stringify({actual,expected:[...expected.keys()]}));
for(const [path,bytes] of expected){
  if(!readFileSync(resolve(dist,path)).equals(bytes))throw Error('Source/committed-dist mismatch: '+path);
}
console.log(`Exact committed source/dist parity PASS — ${actual.length} files`);
