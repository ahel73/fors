import { Module } from 'vuex-simple';
import MeModule from '@/store/me/me';
import ParticipantsModule from '@/store/modules/participants/store';
import ParticipantsConsolidatedModule from '@/store/modules/participantsConsolidated/store';
import ParticipantCardModule from '@/store/modules/participantCard/store';

export default class {
  @Module()
  public me = new MeModule();

  @Module()
  public participants = new ParticipantsModule();

  @Module()
  public participantsConsolidated = new ParticipantsConsolidatedModule();

  @Module()
  public participantCard = new ParticipantCardModule();
}
