import { MessageLevel } from '../app/models/messagelevel';

export const environment = {
  production: false,
  envName: 'local',
  logLevel: MessageLevel.INFO,
  alertLevel: MessageLevel.INFO,
  sdpConstraints: { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } },
};
