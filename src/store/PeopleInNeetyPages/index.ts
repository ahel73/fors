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
    listEmployers: [],
    newPersonNeedy: {
      surname: '',
      name: '',
      patronymic: '',
      birthDate: '',
      sex: '',
      residence: '',
      location: '',
      registrationDate: '',
      areaCode: '',
      identityDoc: null,
      snils: '',
      inn: '',
      ogrnip: '',
      phoneNumber: '',
      email: '',
      status: { id: 1, name: 'Черновик', active: true },
      works: [],
    },
    updatePersonNeedy: null,
    newIdentityDoc: {
      seriesNum: '',
      issueDate: '',
      authority: '',
      type: null,
      active: true,
    },
    newEmployer: {
      name: '',
      type: '',
      pfrRegNum: '',
      active: true,
    },
    newWorkerAction: {
      workFunction: '',
      employmentDate: '',
      dismissalDate: '',
      dismissalReason: '',
      employer: null,
      pfr: true,
      baseDoc: '',
    },
  }

  // Обновляем свойства вложенного объекта
  @Mutation()
  update({ name, value, object }: UpdatePropsObject) {
  // .console.log('name: ' + name + ' | value: ' + value);
    this.state[object][name] = value;
    // console.log(this.state.newPersonNeedy);
  }

  // Обновляем свойства первого уровня стейта
  @Mutation()
  updateProp({ name, value } : UpdatePropsObject) {
    console.log('name: ' + name + ' | value: ' + value);
    this.state[name] = value;
  }

  // Добавляем граждан в массив для вывода в табличном виде
  @Mutation()
  updatelistPeopleInNeety(array: PersonNeedy[] | []) {
    this.state.listPeopleInNeety = array;
  }

  // Добавляем гражданина для просмотра в карточном виде
  @Mutation()
  viewing(item) {
    this.state.updatePersonNeedy = item;
  }

  // Добавляем какие либо объекты в массивы, например трудовая деятельность
  @Mutation()
  saveObj({ objDoc, nameList } : SaveObj) {
    console.log(nameList);
    if (nameList === 'identityDocs') {
      this.state.newPersonNeedy.identityDoc = objDoc;
    } else if (nameList === 'work') {
      this.state.newPersonNeedy.works?.push(objDoc);
    } else {
      this.state[nameList].push(objDoc);
    }
  }

  @Mutation()
  clearObj({ verifyObj, nameObjState }: any) {
    this.state[nameObjState] = verifyObj;
  }
}
