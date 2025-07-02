import {Attributes} from './Attributes';
import {Derived} from './Derived';
import {Resources} from './Resources';
import {Item} from './Item';

export interface Actor {
  id:string;
  name:string;
  gender:'male'|'female'|'other';
  lvl:number;
  xp:number;
  gold:number;
  attr:Attributes;
  derived:Derived;
  res:Resources;
  equipment:Record<Item['slot'], Item|null>;
  inventory:Item[];
}
