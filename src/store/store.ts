import { Module } from 'vuex-simple';
import MeModule from '@/store/me/me';
import PeopleInNeetyModule from '@/store/PeopleInNeetyPages';

export default class {
  @Module()
  public me = new MeModule();

  @Module()
  public PeopleInNeetyM = new PeopleInNeetyModule();
}
