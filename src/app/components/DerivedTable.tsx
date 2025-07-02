import React from 'react';
import { Derived } from '../models';

interface Props { derived: Derived; }

export default function DerivedTable({derived}:Props){
  return (
    <table className="table-auto border-collapse">
      <tbody>
        {Object.entries(derived).map(([k,v])=> (
          <tr key={k}>
            <td className="px-2 capitalize">{k}</td>
            <td className="px-2">{v.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
