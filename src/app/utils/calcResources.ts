import {Derived, Resources} from '../models';

export const calcResources = (d:Derived):Resources => ({
  hp:  8*d.endurance,
  sp:  4*d.shielding,
  psi: 3*d.psiPower
});
