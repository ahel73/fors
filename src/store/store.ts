import { Module } from 'vuex-simple';
import MeModule from '@/store/me/me';
import ParticipantsModule from '@/store/modules/participants/store';
import ParticipantsConsolidatedModule from '@/store/modules/participantsConsolidated/store';
import ParticipantCardModule from '@/store/modules/participantCard/store';
import DeedControllerModule from './Deed';
import DeedControllerItemModule from './DeedItem/accountingBusinessItem';
import CreateDeedControllerModule from './DeedItem/createAccountingBusiness';
import DeleteDeedControllerModule from './DeedItem/deteteAccountingBusiness';
import RecordAccountingModule from './DeedItem/recordAccounting';
import UndoRecordAccountingModule from './DeedItem/undoRecordAccounting';
import UpdateDeedControllerModule from './DeedItem/updateAccountingBusiness';
import DirectoryControllerModule from './directoryController/directoryController';
import FileRepositoryModule from './fileRepository';
import ElectronicQueueModule from './electronicQueue/store';

export default class {
  @Module()
  public me = new MeModule();

  @Module()
  public participants = new ParticipantsModule();

  @Module()
  public participantsConsolidated = new ParticipantsConsolidatedModule();

  @Module()
  public participantCard = new ParticipantCardModule();

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
  public undoRecord = new UndoRecordAccountingModule();

  @Module()
  public record = new RecordAccountingModule();

  @Module()
  public fileRepository = new FileRepositoryModule();

  @Module()
  public directory = new DirectoryControllerModule();

  @Module()
  public electronicQueue = new ElectronicQueueModule();
}
