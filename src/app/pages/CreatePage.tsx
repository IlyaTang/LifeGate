import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Attributes, Actor } from '../models';
import { calcDerived } from '../utils/calcDerived';
import { calcResources } from '../utils/calcResources';
import StatsTable from '../components/StatsTable';
import DerivedTable from '../components/DerivedTable';
import { useLocalState } from '../hooks/useLocalState';

const defaultAttr:Attributes={S:10,A:10,V:10,C:10,Psy:10,Ch:10,T:10};

export default function CreatePage(){
  const [attr,setAttr] = useLocalState<Attributes>('attr', defaultAttr);
  const navigate = useNavigate();
  const derived = calcDerived(attr);
  const res = calcResources(derived);

  function create(){
    const actor:Actor={
      id:'player', name:'Hero', gender:'other', lvl:1, xp:0, gold:100,
      attr, derived, res,
      equipment:{head:null,body:null,feet:null,handL:null,handR:null,implant:null,none:null},
      inventory:[]
    };
    localStorage.setItem('actor', JSON.stringify(actor));
    navigate('/game');
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl">Create Character</h1>
      <StatsTable attr={attr} onChange={setAttr} />
      <DerivedTable derived={derived} />
      <button className="px-3 py-1 bg-green-600" onClick={create}>Start Game</button>
    </div>
  );
}
