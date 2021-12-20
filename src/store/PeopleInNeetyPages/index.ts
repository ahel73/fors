import { Action, Getter, Mutation, State } from 'vuex-simple';

import { DataPeopleInNeety, UpdatePropsObject, SaveObj, IdentityDoc, PersonNeedy } from './types';

export default class PeopleInNeetyModule {
  @State()
  state: DataPeopleInNeety = {
    // заголовки таблицы вывода нуждающихся лиц
    headerTablePeopleInNeety: [
      { text: 'Фамилия', value: 'surname' },
      { text: 'Имя', value: 'name' },
      { text: 'Отчество', value: 'patronymic' },
      { text: 'Дата рождения', value: 'birthDate' },
      { text: 'ИНН', value: 'inn' },
      { text: 'Место жительства/пребывания', value: 'residence' },
      { text: 'Действия', value: 'actions' },
    ],

    // массив с нуждающимися лицами
    listPeopleInNeety: [],
    newPersonNeedy: {
      surname: null,
      name: null,
      patronymic: null,
      birthDate: null,
      sex: null,
      residence: null,
      location: null,
      registrationDate: null,
      areaCode: null,
      identityDoc: null,
      snils: null,
      inn: null,
      ogrnip: null,
      phoneNumber: null,
      email: null,
      status: { id: 1, name: 'Черновик', active: true },
      works: [],
    },
    updatePersonNeedy: null,
    newIdentityDoc: {
      seriesNumber: null,
      issueDate: null,
      authority: '',
      type: null,
      active: true,
    },
    newEmployer: {
      name: null,
      shortName: null,
      type: null,
      inn: null,
      pfrRegistrationNumber: null,
      active: true,
    },
    newWorkerAction: {
      workFunction: null,
      employmentDate: null,
      dismissalDate: null,
      dismissalReason: null,
      employer: null,
      pfr: true,
      baseDoc: null,
    },
    flagTabWorker: 0, // Кастыль для переключения на таб трудовой деятельности при создании трудовой деятельности новой
    flagUpdateItem: false, // Ставится в истину при редактировании сущности
    flagViewing: false, // В истину при просмотре
  }

  // Обновляем свойства вложенного объекта
  @Mutation()
  update({ name, value, object }: UpdatePropsObject) {
    this.state[object][name] = value;
  }

  // Обновляем свойства первого уровня стейта
  @Mutation()
  updateProp({ name, value } : UpdatePropsObject) {
    this.state[name] = value;
  }

  // Добавляем граждан в массив для вывода в табличном виде
  @Mutation()
  updatelistPeopleInNeety(array: PersonNeedy[] | []) {
    this.state.listPeopleInNeety = array;
  }

  // Добавляем и удаляем гражданина для просмотра в карточном виде
  @Mutation()
  viewing(item) {
    this.state.updatePersonNeedy = item;
    this.state.flagViewing = true;
  }

  @Mutation()
  exitViewing() {
    this.state.updatePersonNeedy = null;
    this.state.flagViewing = false;
  }

  // Добавляем какие либо объекты в массивы или в свойства, например трудовая деятельность
  @Mutation()
  saveObj({ objDoc, nameList } : SaveObj) {
    const targetObject = this.state.flagUpdateItem ? this.state.updatePersonNeedy : this.state.newPersonNeedy;
    if (nameList === 'identityDocs') {
      targetObject.identityDoc = objDoc;
    } else if (nameList === 'work') {
      targetObject.works.push(objDoc);
    } else {
      this.state[nameList].push(objDoc);
    }
  }

  @Mutation()
  clearObj({ verifyObj, nameObjState }: any) {
    this.state[nameObjState] = verifyObj;
  }

  @Mutation()
  activeTabWorker() {
    this.state.flagTabWorker = 1;
  }

  @Mutation()
  noActiveTabWorker() {
    this.state.flagTabWorker = 0;
  }

  // активируем и деактивируем режим редактирования
  @Mutation()
  activeUpdateItem(item) {
    this.state.flagUpdateItem = true;
    this.state.updatePersonNeedy = item;
  }

  offUpdateItem() {
    this.state.flagUpdateItem = false;
    this.state.updatePersonNeedy = null;
  }
}
