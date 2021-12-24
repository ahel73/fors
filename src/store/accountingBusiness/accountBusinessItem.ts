import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { getDeedControllerByID } from '@/data/services/accountingBusiness/accountingBusiness';
import { DeedControllerItemStore } from './typesItem';
import eventBus from '@/utils/bus/event-bus';
import { DeedItemCard, DocumentItem, FamilyMembers, Person } from '@/types/DeedType';

export default class DeedControllerItemModule {
  @State()
  state: DeedControllerItemStore = {
    data: {} as DeedItemCard,
    error: null,
    isLoading: false,
    documentEdit: {},
    peopleEdit: {},
    tab: 0,
  }

  @Mutation()
  setDeedItemControllerIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setBudgetsError(error: AxiosError | null, fallbackMessage = 'Ошибка'): void {
    this.state.error = error;

    if (error?.isAxiosError) {
      const { response } = error as AxiosError;
      eventBus.$emit(
        'notification:message',
        {
          text: response?.data.message ?? fallbackMessage,
          title: 'Ошибка',
          type: 'error',
        }
      );
    }
  }

  @Mutation()
  setDeedItemController(response?: any): void {
    const data = response;
    this.state.data = data;
  }

  @Mutation()
  setNewDeedItemController(item: DocumentItem): void {
    if (this.state.data.documents) {
      this.state.data.documents.push(item);
    } else {
      const newItems = [];
      newItems.push(item);
      this.state.data.documents = newItems;
    }
  }

  @Mutation()
  setNewFamilyPeople(item: FamilyMembers): void {
    if (this.state.data.familyMembers) {
      this.state.data.familyMembers.push(item);
    } else {
      const newItems = [];
      newItems.push(item);
      this.state.data.familyMembers = newItems;
    }
  }

  @Mutation()
  editDocument(item: DocumentItem): void {
    if (item.id) {
      this.state.data.documents.filter(value => {
        if (value.id === item.id) {
          if (item.fileName) {
            if (item.fileName.length !== 1) {
              const fileName: any[] = [];
              fileName.push({ name: item.fileName });
              item.fileName = fileName;
              this.state.documentEdit = item;
            } else {
              this.state.documentEdit = item;
            }
          } else {
            this.state.documentEdit = item;
          }
        }
      });
    } else {
      this.state.data.documents.filter(value => {
        if (value.index === item.index) {
          if (item.fileName) {
            if (item.fileName.length !== 1) {
              const fileName: any[] = [];
              fileName.push({ name: item.fileName });
              item.fileName = fileName;
              this.state.documentEdit = item;
            } else {
              this.state.documentEdit = item;
            }
          } else {
            this.state.documentEdit = item;
          }
        }
      });
    }
  }

  @Mutation()
  editFamilyPeople(item: FamilyMembers): void {
    if (item.id) {
      this.state.data.familyMembers.filter(value => {
        if (value.id === item.id) {
          this.state.peopleEdit = item;
        }
      });
    } else {
      this.state.data.familyMembers.filter(value => {
        if (value.index === item.index) {
          this.state.peopleEdit = item;
        }
      });
    }
  }

  @Mutation()
  updateDoc(item: DocumentItem): void {
    if (item.id) {
      this.state.data.documents.find((value, i) => {
        if (value.id === item.id) {
          if (item.fileName) {
            if (item.fileName.length !== 1) {
              this.state.data.documents[i] = item;
            } else {
              item.fileName = item.fileName[0].name;
              this.state.data.documents[i] = item;
            }
          } else {
            this.state.data.documents[i] = item;
          }
        }
      });
    } else {
      this.state.data.documents.find((value, i) => {
        if (value.index === item.index) {
          if (item.fileName) {
            if (item.fileName.length !== 1) {
              this.state.data.documents[i] = item;
            } else {
              item.fileName = item.fileName[0].name;
              this.state.data.documents[i] = item;
            }
          } else {
            this.state.data.documents[i] = item;
          }
        }
      });
    }
  }

  @Mutation()
  updatePeople(item: FamilyMembers): void {
    if (item.id) {
      this.state.data.familyMembers.find((value, i) => {
        if (value.id === item.id) {
          this.state.data.familyMembers[i] = item;
        }
      });
    } else {
      this.state.data.familyMembers.find((value, i) => {
        if (value.index === item.index) {
          this.state.data.familyMembers[i] = item;
        }
      });
    }
  }

  @Mutation()
  delDocument(item: DocumentItem) {
    if (item.id) {
      const index = this.state.data.documents.findIndex(n => n.id === item.id);
      if (index !== -1) {
        this.state.data.documents.splice(index, 1);
      }
    } else {
      const index = this.state.data.documents.findIndex(n => n.index === item.index);
      if (index !== -1) {
        this.state.data.documents.splice(index, 1);
      }
    }
  }

  @Mutation()
  delFamilyPeople(item: FamilyMembers) {
    if (item.id) {
      const index = this.state.data.familyMembers.findIndex(n => n.id === item.id);
      if (index !== -1) {
        this.state.data.familyMembers.splice(index, 1);
      }
    } else {
      const index = this.state.data.familyMembers.findIndex(n => n.index === item.index);
      if (index !== -1) {
        this.state.data.familyMembers.splice(index, 1);
      }
    }
  }

  @Mutation()
  clearDeedItem() {
    this.state.data = {} as DeedItemCard;
  }

  @Mutation()
  saveState(item: any) {
    this.state.data = item;
  }

  @Mutation()
  changeStateValue(item: number) {
    this.state.tab = item;
  }

  @Action()
  async fetchDeedControllerItem(params?: any): Promise<void> {
    this.setDeedItemControllerIsLoading(true);
    this.setBudgetsError(null);
    try {
      const data: any = await getDeedControllerByID(params);
      this.setDeedItemController(data);
    } catch (error) {
      this.setBudgetsError(error as AxiosError);
    } finally {
      this.setDeedItemControllerIsLoading(false);
    }
  }

  @Action()
  addDocument(item: DocumentItem) {
    this.setNewDeedItemController(item);
  }

  @Action()
  changeDocument(item: DocumentItem) {
    this.editDocument(item);
  }

  @Action()
  updateDocument(item: DocumentItem) {
    this.updateDoc(item);
  }

  @Action()
  deleteDocument(item: DocumentItem) {
    this.delDocument(item);
  }

  @Action()
  addFamilyPeople(item: FamilyMembers) {
    this.setNewFamilyPeople(item);
  }

  @Action()
  changeFamilyPeople(item: FamilyMembers) {
    this.editFamilyPeople(item);
  }

  @Action()
  updateFamilyPeople(item: FamilyMembers) {
    this.updatePeople(item);
  }

  @Action()
  deleteFamilyPeople(item: FamilyMembers) {
    this.delFamilyPeople(item);
  }

  @Action()
  clearItem() {
    this.clearDeedItem();
  }

  @Action()
  saveStateItem(item: any) {
    this.saveState(item);
  }

  @Action()
  changeTabValue(item: number) {
    this.changeStateValue(item);
  }
}
