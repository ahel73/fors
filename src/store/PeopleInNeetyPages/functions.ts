import httpClient from '@/data/http';
import { cloneDeep } from 'lodash';
import { query } from '@/utils';

export const methods = {
  updateProps(name: string | number, object: string) :void {
    const value: string = event.target.value;
    this.store.peopleInNeety.update({ name, value, object });
  },

  updatePropsSpech(value: unknown, name: string, object: string) :void {
    this.store.peopleInNeety.update({ name, value, object });
  },

  push(namePath: string) {
    this.$router.push({ name: namePath });
  },

  // Записываем созданный объект в массив для вывода
  saveObj(
    verifyObj: any, // Объект который добавляем в массив
    nameList: string, // Имя массива в который добавляем
    nameView: string // Имя страницы на которую необходимо перейти после добавления
  ) {
    this.store.peopleInNeety.saveObj({
      objDoc: cloneDeep(verifyObj),
      nameList: nameList,
    });

    if (nameView) {
      this.push(nameView);
    }
  },

  clearObj(
    objType: any, // Объект свойства которого идентичны свойствам проеверяемого объекта а их значения типам которые должны иметь данные свойства
    verifyObj: any, // ссылка на очищаемый объект
    nameObjState: string, // строка с именем объекта которому надо присвоить в качестве значения очищенный объект
    nameView = 'FormAddNewPeopleInNeety' // Имя страницы на которую необходимо перейти после добавления объекта
  ) {
    verifyObj = JSON.parse(JSON.stringify(verifyObj));
    for (const a in verifyObj) {
      if (a in objType) {
        verifyObj[a] = objType[a];
      } else {
        verifyObj[a] = null;
      }
    }
    this.store.peopleInNeety.clearObj({ verifyObj, nameObjState });
    if (nameView) {
      this.push(nameView);
    }
  },

  // Уходим со страницы на нужную страницу при необходимости очищаем обьект первого уровня
  exitReview(nameViews = '', name = '', value = null) {
    // console.log(nameViews + ' ' + name);
    // console.log(this.$router);
    if (name) {
      this.store.peopleInNeety.updateProp({ name, value });
    }
    if (nameViews) {
      this.push(nameViews);
    }
  },

  // Отправляет объект на добавление
  dispatchObject: async (dataObj = {}, endPoint: string): any => {
    const { data } = await httpClient.post(endPoint, dataObj);
    return false;
  },

  // Отправляет объект на обновление
  dispatchUpdateObject: async (dataObj = {}, endPoint: string) : any => {
    const response = await httpClient.put(endPoint + '' + dataObj.id, dataObj);
    return response;
  },

  // Проверка на заполненость обязательных полей
  verificationObject(dataObj = {}, requiredFields = {}) {
    let flagError = false;
    for (const a in requiredFields) {
      if (dataObj[a] === null) {
        requiredFields[a] = true;
        flagError = true;
      }
    }
    return flagError;
  },

  /**
   * Запрашиваем с сервера какие либо сущности, без возможности сортировки фильтрации и пагинации
   */
  async getGroupList(queryString: string): Promise<any> {
    const { data } = await httpClient.get(queryString);
    return data;
  },

  /**
   * Запрашиваем с сервера какие либо сущности, с возможностью сортировки фильтрации и пагинации
   */
  async getGroupFind(queryString: string, params: object | null = null, objBody?: object | undefined) {
    if (params) {
      queryString += '?' + query({ ...params });
    }
    const { data } = await httpClient.post(queryString, objBody);
    return data;
  },

  /**
   * Запрашиваем с сервера сущность по идентификатору
   */
  async getOne(queryString: string, id: string) {
    const { data } = await httpClient.get(`${queryString}${id}`);
    return data;
  },
};
