import React from 'react';
import { Item, Actor } from '../models';

interface Props{open:boolean;onClose:()=>void;items:Item[];player:Actor;buy:(item:Item)=>void;}

export default function ShopModal({open,onClose,items,player,buy}:Props){
  if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-lg mb-2">Shop - Gold: {player.gold}</h2>
        <ul>
          {items.map(it=> (
            <li key={it.id} className="flex justify-between py-1">
              <span>{it.name} - {it.price}g</span>
              <button className="ml-2 px-2 bg-blue-600" onClick={()=>buy(it)}>Buy</button>
            </li>
          ))}
        </ul>
        <button className="mt-3 px-2 bg-red-600" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
