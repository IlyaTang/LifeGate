import {Actor} from '../models';
import {calcCR} from './calcCR';

export function grantXP(winner:Actor, foe:Actor, turns:number, meta:{perfect:boolean;drain:boolean;tier:'normal'|'elite'|'hero'|'mythic'}){
  const S = Math.min(foe?calcCR(foe.derived):1 / calcCR(winner.derived), 2);
  if(S<0.5) return 0;
  let xp = 50*Math.pow(S,1.3);
  if(meta.perfect) xp*=1.2;
  if(meta.drain) xp*=0.9;
  if(turns<=2) xp*=1.1;
  if(turns>=8) xp*=0.85;
  if(meta.tier==='elite') xp*=1.5;
  if(meta.tier==='hero') xp*=2;
  if(meta.tier==='mythic') xp*=3;
  return Math.max(5, Math.min(150, Math.round(xp)));
}
