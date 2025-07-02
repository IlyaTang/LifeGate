export interface Item {
  id:string;
  name:string;
  slot:'head'|'body'|'feet'|'handL'|'handR'|'implant'|'none';
  weaponType?:'melee'|'ranged'|'energy';
  weaponDamage?:number;
  weaponAccuracy?:number;
  armor?:number;
  bonuses?:Partial<import('./Attributes').Attributes>;
  price:number;
}
