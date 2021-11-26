import { Module } from 'vuex-simple';
import DeedControllerModule from './accountingBisiness';
// import MeasureModule from '@/store/modules/measure';
// import MeasuresModule from '@/store/modules/measures';

export default class {
  // @Module()
  // public measure = new MeasureModule(this);

  // @Module()
  // public measures = new MeasuresModule();

  @Module()
  public deed = new DeedControllerModule();
}
