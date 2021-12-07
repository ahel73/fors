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
    listPeopleInNeety: [
      {
        id: 1,
        surname: 'Нагаев',
        name: 'Алексей',
        patronymic: 'Николаевич',
        birthDate: '05.10.1973',
        inn: '8668688686886',
        residence: 'Орловская область, Орёл',
      },
      {
        id: 2,
        surname: 'Иванов',
        name: 'Пётр',
        patronymic: 'Сергеевич',
        birthDate: '25.05.1986',
        inn: '46677999075',
        residence: 'Тверская область, Тверь',
      },
    ],
    listEmployers: [],
    newPersonNeedy: {
      surname: '',
      name: '',
      patronymic: '',
      birthDate: '',
      sex: '',
      residence: '',
      location: '',
      regDate: '',
      codMO: '',
      identityDocs: [],
      snils: '',
      inn: '',
      ogrnip: '',
      phoneNumber: '',
      email: '',
      status: { id: 1, name: 'Черновик', active: true },
    },
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
  }

  @Mutation()
  update({ name, value, object }: UpdatePropsObject) {
    console.log('name: ' + name + ' | value: ' + value);
    this.state[object][name] = value;
    console.log(this.state.newPersonNeedy);
  }

  @Mutation()
  updatelistPeopleInNeety(array: PersonNeedy[] | []) {
    this.state.listPeopleInNeety = array;
  }

  @Mutation()
  saveObj({ objDoc, nameList } : SaveObj) {
    console.log(nameList);
    if (nameList === 'identityDocs') {
      this.state.newPersonNeedy.identityDocs[0] = objDoc;
    } else {
      this.state[nameList].push(objDoc);
    }
  }

  @Mutation()
  clearObj(objDoc: any) {
    this.state.newIdentityDoc = objDoc;
  }

  getQueryApi(queryString: string): any {
    const ajax = new XMLHttpRequest();
    ajax.open('post', queryString, false);
    ajax.send();
    console.log(JSON.parse(ajax.responseText));
    return JSON.parse(ajax.responseText);
  }
}
