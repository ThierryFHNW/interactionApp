import { MessageLevel } from '../app/models/messagelevel';

export const environment = {
  production: true,
  envName: 'production',
  logLevel: MessageLevel.INFO,
  alertLevel: MessageLevel.WARN,
  sdpConstraints: { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } },
};



// OLD CODE
/*export const environment = {
  production: true
};*/
