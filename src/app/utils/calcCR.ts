import {Derived} from '../models';
export const calcCR = (d:Derived)=>(d.might+d.finesse+d.technical+d.psiPower+d.mobility+d.shielding+d.endurance)/7;
