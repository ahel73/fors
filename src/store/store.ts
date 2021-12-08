import { Module } from 'vuex-simple';
import DeedControllerModule from './accountingBusiness';
import DeedControllerItemModule from './accountingBusiness/accountBusinessItem';
import CreateDeedControllerModule from './accountingBusiness/createAccountingBusiness';
import DeleteDeedControllerModule from './accountingBusiness/deteteAccountingBusiness';
import RecordAccountingModule from './accountingBusiness/recordAccounting';
import UndoRecordAccountingModule from './accountingBusiness/undoRecordAccounting';
import UpdateDeedControllerModule from './accountingBusiness/updateAccountingBusiness';
import DeedStatusControllerModule from './deedStatusController';
import DocGroupControllerModule from './docGroupController';
import EmploymentControllerModule from './employmentController';
import FileRepositoryModule from './fileRepository';
import ImprovingWayControllerModule from './improvingWayController';
import IndividualPersonInfoControllerModule from './individualPersonInfoController';
import OktmoControllerModule from './oktmoController';
import QueuePriorityControllerModule from './queuePriorityController';
import SpendingDirectionControllerModule from './spendingDirectionController';

// import MeasureModule from '@/store/modules/measure';
// import MeasuresModule from '@/store/modules/measures';

export default class {
  // @Module()
  // public measure = new MeasureModule(this);

  // @Module()
  // public measures = new MeasuresModule();

  @Module()
  public deed = new DeedControllerModule();

  @Module()
  public deedItem = new DeedControllerItemModule();

  @Module()
  public updateItem = new UpdateDeedControllerModule();

  @Module()
  public createItem = new CreateDeedControllerModule();

  @Module()
  public deleteItem = new DeleteDeedControllerModule();

  @Module()
  public docController = new DocGroupControllerModule();

  @Module()
  public employment = new EmploymentControllerModule();

  @Module()
  public status = new DeedStatusControllerModule();

  @Module()
  public improvingWay = new ImprovingWayControllerModule();

  @Module()
  public oktmo = new OktmoControllerModule();

  @Module()
  public priority = new QueuePriorityControllerModule();

  @Module()
  public spendingDirection = new SpendingDirectionControllerModule();

  @Module()
  public personInfo = new IndividualPersonInfoControllerModule();

  @Module()
  public undoRecord = new UndoRecordAccountingModule();

  @Module()
  public record = new RecordAccountingModule();

  @Module()
  public fileRepository = new FileRepositoryModule()
}
