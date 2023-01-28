import { FourFourFour } from './sites/444';
import { Telex } from './sites/Telex';

if (window.location.href.includes('444.hu')) {
  new FourFourFour();
} else if (window.location.href.includes('telex.hu')) {
  new Telex();
}
