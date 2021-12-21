<template>
  <main-layout title="Член семьи">
    <v-row>
      <v-col cols="12">
        <autocomplete-component
          v-model="itemPeople.individualPerson"
          :items="peoplesNotInFamily"
          label="Фамилия Имя Отчество"
          item-text="fullName"
          return-object
          variant="micro"
          :select-menu-props="{ offsetY: true }"
          required
          :rules="[
            rules.required
          ]"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <Datepicker
          v-model="itemPeople.birthDate"
          label="Дата рождения"
          :readonly="isEditable"
        />
      </v-col>
      <v-col cols="6">
        <input-component
          v-model="itemPeople.relationship"
          label="Родственные отношения"
          required
          :rules="[
            rules.required
          ]"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <input-component
          v-model="itemPeople.identityDoc"
          label="Документ, удостоверяющий личность"
          :disabled="isEditable"
        />
      </v-col>
    </v-row>
    <v-row class="tab-card__button-end">
      <v-col cols="auto">
        <button-component
          @click="saveDataFamilyPeople"
          size="micro"
          title="Ок"
        />
      </v-col>
      <v-col cols="auto">
        <modal-button
          @onResumeClick="onCancelClick"
          button-text="Отменить"
          modal-text="Все изменения будут потеряны?"
          cancel-button-text="Нет"
          resume-button-text="Да"
          width="450"
        />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MainLayout from '@/layouts/MainLayout.vue';
import AutocompleteComponent from '../shared/inputs/AutocompleteComponent.vue';
import Datepicker from '../shared/Datepicker/Datepicker.vue';
import InputComponent from '../shared/inputs/InputComponent.vue';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';
import { useStore } from 'vuex-simple';
import Store from '@/store/store';
import ModalButton from '../shared/buttons/ModalButton.vue';
import eventBus from '@/utils/bus/event-bus';

const mapForm = (data: any) => ({
  ...data,
  changeUser: data.changeUser ? data.changeUser : null,
  createUser: data.createUser ? data.createUser : null,
  id: data.id ? data.id : null,
  identityDoc: {
    typeName: data.identityDoc ? data.identityDoc : null,
  },
  personInfo: data.individualPerson ? data.individualPerson : null,
  relationship: data.relationship ? data.relationship : null,
  index: data.index ? data.index : Math.floor(Math.random() * 10000).toString(),
});

const mapInnerForm = (data: any) => (
  {
    ...data,
    changeUser: data.changeUser ? data.changeUser : null,
    createUser: data.createUser ? data.createUser : null,
    deedId: data.deedId,
    id: data.id ? data.id : null,
    identityDoc: data.personInfo.identityDoc ? data.personInfo.identityDoc.typeName : null,
    individualPerson: data.personInfo ? data.personInfo : null,
    birthDate: data.personInfo ? data.personInfo.birthDate : null,
    relationship: data.relationship ? data.relationship : null,
    index: data.index ? data.index : null,
  });

@Component({
  name: 'accountingBusinessFamilyCard',
  components: {
    MainLayout,
    AutocompleteComponent,
    Datepicker,
    InputComponent,
    ButtonComponent,
    ModalButton,
  },
})
export default class AccountingBusinessFamilyCard extends Vue {
  store: Store = useStore(this.$store);

  isEditable = true;
  itemPeople: any | object = {
  };

  rules = {
    required: (value: any) => !!value || 'Обязательное поле',
  };

  created() {
    if (this.$route.name === 'editFamilyCard') {
      this.getPeopleData();
    } else {
      const params = {
        familyMember: false,
      };
      this.getControllerData(params);
    }
  }

  get familyPeopleItem() {
    return this.store.deedItem.state.peopleEdit;
  }

  getPeopleData() {
    this.itemPeople = mapInnerForm(this.familyPeopleItem);
    const params = {
      familyMember: false,
      listForUpdating: true,
      id: this.itemPeople.individualPerson?.id,
    };
    this.getControllerData(params);
  }

  get individualPersonInfoController() {
    return this.store.directory.state.personInfo;
  }

  get peoplesInFamily() {
    return this.store.directory.state.familyPeopleInFamily;
  }

  get familyIds() {
    if (this.peoplesInFamily) {
      return this.peoplesInFamily.map((item: any) => item.personInfo.id);
    } else {
      return [];
    }
  }

  get peoplesNotInFamily() {
    if (this.familyIds) {
      return this.store.directory.state.personInfo.filter((item: any) => !this.familyIds.includes(item.id));
    } else {
      return this.store.directory.state.personInfo;
    }
  }

  getControllerData(params: any) {
    this.store.directory.fetchIndividualPersonInfoController(params);
  }

  saveDataFamilyPeople() {
    if (this.itemPeople.individualPerson === undefined) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Обязательное поле "Фамилия Имя Отчество" не заполненно',
          type: 'error',
        }
      );
    } else if (this.itemPeople.relationship === undefined) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Обязательное поле "Родственные отношения" не заполненно',
          type: 'error',
        }
      );
    } else {
      if (this.$route.name === 'editFamilyCard') {
        this.store.deedItem.updateFamilyPeople(mapForm(this.itemPeople));
      } else {
        this.store.deedItem.addFamilyPeople(mapForm(this.itemPeople));
      }
      this.store.deedItem.changeTabValue(1);
      this.$router.go(-1);
    }
  }

  onCancelClick() {
    this.store.deedItem.changeTabValue(1);
    this.$router.go(-1);
  }

  @Watch('itemPeople.individualPerson')
  onSaveField(individualPerson: any) {
    this.itemPeople.birthDate = individualPerson.birthDate;
    this.itemPeople.identityDoc = individualPerson.identityDoc ? individualPerson.identityDoc.typeName : null;
  }
}
</script>
<style scoped lang="scss">

.tab-card__button-end {
  display: flex;
  justify-content: flex-end;
}
</style>
