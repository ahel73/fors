import { Module } from 'vuex-simple';
import MeModule from '@/store/me/me';
import ParticipantsModule from '@/store/modules/participants/store';
import ParticipantsConsolidatedModule from '@/store/modules/participantsConsolidated/store';
import ParticipantCardModule from '@/store/modules/participantCard/store';
import DeedControllerModule from './accountingBusiness';
import DeedControllerItemModule from './accountingBusiness/accountBusinessItem';
import CreateDeedControllerModule from './accountingBusiness/createAccountingBusiness';
import DeleteDeedControllerModule from './accountingBusiness/deteteAccountingBusiness';
import RecordAccountingModule from './accountingBusiness/recordAccounting';
import UndoRecordAccountingModule from './accountingBusiness/undoRecordAccounting';
import UpdateDeedControllerModule from './accountingBusiness/updateAccountingBusiness';
import DirectoryControllerModule from './directoryController/directoryController';
import FileRepositoryModule from './fileRepository';

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
}
