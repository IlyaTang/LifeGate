import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actor, Item } from '../models';
import { attack } from '../utils/combat';

const enemy:Actor={
  id:'enemy', name:'Raider', gender:'male', lvl:1, xp:0, gold:0,
  attr:{S:8,A:8,V:8,C:8,Psy:5,Ch:5,T:5},
  derived:{
    might:0,finesse:0,endurance:0,technical:0,psiPower:0,
    insight:0,expression:0,manipulation:0,mobility:0,shielding:0,
    leadership:0,craftsmanship:0,survival:0,animal:0,creativity:0,
    vehicle:0,psiDef:0,commerce:0,resourcefulness:0,initiative:0,
    scholarship:0,grit:0
  },
  res:{hp:50,sp:20,psi:10},
  equipment:{head:null,body:null,feet:null,handL:null,handR:null,implant:null,none:null},
  inventory:[]
};

export default function BattlePage(){
  const navigate = useNavigate();
  const stored = localStorage.getItem('actor');
  const [actor,setActor] = useState<Actor>(stored?JSON.parse(stored):null);
  const [log,setLog] = useState<string[]>([]);
  if(!actor) return <div>No actor</div>;

  function doAttack(){
    const weapon = actor.inventory[0] as Item || {id:'fist',name:'Fist',slot:'none',weaponType:'melee',weaponDamage:5,price:0};
    attack(actor, enemy, weapon.weaponType||'melee', weapon, (m)=>setLog(l=>[m,...l]));
    setActor({...actor});
    if(enemy.res.hp<=0) setLog(l=>['Enemy defeated!',...l]);
  }

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl">Battle</h1>
      <div className="flex space-x-4">
        <div>
          <div>Enemy HP:{enemy.res.hp.toFixed(1)}</div>
        </div>
        <div>
          <div>Your HP:{actor.res.hp.toFixed(1)}</div>
        </div>
      </div>
      <button className="px-2 bg-red-600" onClick={doAttack}>Attack</button>
      <button className="px-2 bg-gray-600" onClick={()=>navigate('/game')}>Back</button>
      <div className="bg-gray-800 p-2 h-40 overflow-auto">
        {log.map((l,i)=>(<div key={i}>{l}</div>))}
      </div>
    </div>
  );
}
