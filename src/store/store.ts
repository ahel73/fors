import { Module } from 'vuex-simple';
import MeModule from '@/store/me/me';

export default class {
  @Module()
  public me = new MeModule();
}
