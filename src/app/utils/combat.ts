import {Actor, Item} from '../models';
import {roll} from './roll';

export function attack(
  attacker:Actor, defender:Actor, 
  type:'melee'|'ranged'|'energy'|'psi'|'hack', 
  weapon:Item, log:(msg:string)=>void
){
  let attackStat=0, defenseStat=0, cost=0;
  switch(type){
    case 'melee': attackStat = attacker.derived.might; defenseStat = defender.derived.mobility; break;
    case 'ranged': attackStat = attacker.derived.finesse; defenseStat = defender.derived.mobility; break;
    case 'energy': attackStat = attacker.derived.technical; defenseStat = defender.derived.shielding; cost=5; break;
    case 'psi': attackStat = attacker.derived.psiPower; defenseStat = defender.derived.psiDef; cost=6; break;
    case 'hack': attackStat = attacker.derived.technical; defenseStat = defender.derived.technical; cost=4; break;
  }

  if(type==='psi') attacker.res.psi -= cost;
  if(type==='hack') attacker.res.psi -= cost; 
  if(type==='energy') attacker.res.sp -= cost;

  if(defender.derived.mobility >= attackStat+30){
    log(`${defender.name} ловко уклоняется`);
    return;
  }

  const hitRoll = roll(100)+attackStat+(weapon.weaponAccuracy||0);
  const dodgeRoll=50+defenseStat;
  if(hitRoll<dodgeRoll){
    log(`${attacker.name} промахивается`);
    return;
  }

  const crit = (hitRoll-dodgeRoll>=30);
  let baseDmg = (weapon.weaponDamage||10)*Math.pow(attackStat/50,0.8);
  if(crit) baseDmg*=1.5;

  const absorbed = Math.min(baseDmg, defender.res.sp);
  defender.res.sp -= absorbed;
  if(defender.res.sp<=0 && absorbed>=0.4*defender.res.sp) defender.derived.initiative -=2;

  const dmgToHP = (baseDmg-absorbed)*(1-((weapon.armor||0)/200));
  defender.res.hp -= dmgToHP;

  log(`${attacker.name} наносит ${dmgToHP.toFixed(1)} урона ${defender.name}`);
}
