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

  saveObj(requiredFields: [], verifyObj: any, nameList: string) {
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
    this.push('FormAddNewPeopleInNeety');
  },

  clearObj(objType: any, verifyObj: any) {
    verifyObj = JSON.parse(JSON.stringify(verifyObj));
    for (const a in verifyObj) {
      if (a in objType) {
        verifyObj[a] = objType[a];
      } else {
        verifyObj[a] = '';
      }
    }
    this.store.peopleInNeety.clearObj(verifyObj);
    this.push('FormAddNewPeopleInNeety');
  },
};
