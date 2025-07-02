import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actor } from '../models';
import StatsTable from '../components/StatsTable';
import DerivedTable from '../components/DerivedTable';
import ShopModal from '../components/ShopModal';

const shopItems = [
  {id:'sword',name:'Sword',slot:'handR',weaponType:'melee',weaponDamage:8,price:30},
  {id:'pistol',name:'Pistol',slot:'handR',weaponType:'ranged',weaponDamage:6,weaponAccuracy:5,price:40}
];

export default function GamePage(){
  const navigate = useNavigate();
  const stored = localStorage.getItem('actor');
  const [actor,setActor] = useState<Actor>(stored?JSON.parse(stored):null);
  const [shopOpen,setShopOpen] = useState(false);
  if(!actor) return <div className="p-4">No actor</div>;

  function buy(item:any){
    if(actor.gold>=item.price){
      setActor({...actor, gold:actor.gold-item.price, inventory:[...actor.inventory,item]});
    }
  }

  function save(){
    localStorage.setItem('actor', JSON.stringify(actor));
  }

  function exportFile(){
    const blob = new Blob([JSON.stringify(actor)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download='actor.json'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl">Character</h1>
      <StatsTable attr={actor.attr} />
      <DerivedTable derived={actor.derived} />
      <div>HP:{actor.res.hp.toFixed(1)} SP:{actor.res.sp.toFixed(1)} PSI:{actor.res.psi.toFixed(1)}</div>
      <button className="px-2 bg-blue-600" onClick={()=>navigate('/battle')}>Battle</button>
      <button className="px-2 bg-yellow-600" onClick={()=>setShopOpen(true)}>Shop</button>
      <button className="px-2 bg-green-600" onClick={save}>Save</button>
      <button className="px-2 bg-gray-600" onClick={exportFile}>Export</button>
      <ShopModal open={shopOpen} onClose={()=>setShopOpen(false)} items={shopItems as any} player={actor} buy={buy} />
    </div>
  );
}
