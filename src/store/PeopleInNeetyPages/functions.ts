export const methods = {
  updateProps(name: string | number, object: string) :void {
    const value: string = event.target.value;
    this.store.peopleInNeety.update({ name, value, object });
  },

  updatePropsSpech(value: unknown, name: string, object: string) :void {
    this.store.peopleInNeety.update({ name, value, object });
  },

  push(namePath: string) {
    console.log(namePath);
    this.$router.push({ name: namePath });
  },

  // Записываем созданный объект в массив для вывода,  проверяеи оббязательные поля
  saveObj(
    requiredFields = [], // имена полей объекта которые должны быть заполнены
    verifyObj: any, // Объект который добавляем в массив
    nameList: string, // Имя массива в который добавляем
    nameView = 'FormAddNewPeopleInNeety' // Имя страницы на которую необходимо перейти после добавления
  ) {
    const newDoc = verifyObj;
    for (const a in newDoc) {
      if (requiredFields.includes(a) && !newDoc[a]) {
        alert('Заполните обязательные поля');
        return;
      }
    }
    console.log(nameList);
    this.store.peopleInNeety.saveObj({
      objDoc: JSON.parse(JSON.stringify(newDoc)),
      nameList: nameList,
    });
    this.push(nameView);
  },

  clearObj(
    objType: any, // Объект свойства которого идентичны свойствам проеверяемого объекта а их значения типам которые должны иметь данные свойства
    verifyObj: any, // ссылка на очищаемый объект
    nameObjState = 'newIdentityDoc', // строка с именем объекта которому надо присвоить в качестве значения очищенный объект
    nameView = 'FormAddNewPeopleInNeety' // Имя страницы на которую необходимо перейти после добавления объекта
    // (Значения по умолчанию используется что бы не испортить старый код)

  ) {
    verifyObj = JSON.parse(JSON.stringify(verifyObj));
    for (const a in verifyObj) {
      if (a in objType) {
        verifyObj[a] = objType[a];
      } else {
        verifyObj[a] = '';
      }
    }
    console.log('очищенный объект', verifyObj);
    console.log('куда переходим', nameObjState);
    this.store.peopleInNeety.clearObj({ verifyObj, nameObjState });
    this.push(nameView);
  },

  // Уходим со страницы на нужную страницу при необходимости очищаем обьект первого уровня
  exitReview(nameViews = '', name = '', value = null) {
    console.log(nameViews + ' ' + name);
    console.log(this.$router);
    if (name) {
      this.store.peopleInNeety.updateProp({ name, value });
    }
    if (nameViews) {
      this.push(nameViews);
    }
  },
};
