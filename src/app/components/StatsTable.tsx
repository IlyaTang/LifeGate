import React from 'react';
import { Attributes } from '../models';

interface Props { attr: Attributes; onChange?: (a:Attributes)=>void; }

const statNames:Record<keyof Attributes,string>={
  S:'Strength',A:'Agility',V:'Vitality',C:'Cognition',Psy:'Psionics',Ch:'Charisma',T:'Tech'
};

export default function StatsTable({attr,onChange}:Props){
  return (
    <table className="table-auto border-collapse">
      <tbody>
        {Object.keys(statNames).map(k=>{
          const key = k as keyof Attributes;
          return (
            <tr key={key}>
              <td className="px-2 capitalize">{statNames[key]}</td>
              <td className="px-2">
                {onChange?
                  <input className="bg-gray-800 w-16" type="number" value={attr[key]} onChange={e=>onChange({...attr,[key]:Number(e.target.value)})}/>
                  : attr[key]}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
