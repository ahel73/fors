import { Module } from 'vuex-simple';
import MeModule from '@/store/me/me';
import ParticipantsModule from '@/store/modules/participants';

export default class {
  @Module()
  public me = new MeModule();

  @Module()
  public participants = new ParticipantsModule();
}
