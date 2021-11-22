<template>
  <div
    @click="closeWindow($event)"
    class="wrapper-modal"
  >
    <div class="modal-window-people-in-neety modal-window">
      <h5>Физические лицо</h5>
      <div>
        <h5
          @click="changeTab($event)"
          class="tab1"
        >
          Общие Сведения
        </h5>
        <h5 @click="changeTab($event)">
          трудовая деятельность
        </h5>
      </div>
      <form>
        <template v-if="tab1">
          <ul>
            <li>
              <span class="required">Фамилия</span>
              <span><input></span>
            </li>
            <li>
              <span class="required">Имя</span>
              <span><input></span>
            </li>
            <li>
              <span>Отчество</span>
              <span><input></span>
            </li>
            <li>
              <span class="required">Дата рождения</span>
              <span><input type="date"></span>
            </li>
            <li>
              <span class="required">Пол</span>
              <span>
                <label for="men">
                  <input
                    id="men"
                    type="radio"
                    name="gender"
                  > <span>Мужской</span>
                </label>
                <label for="women">
                  <input
                    id="women"
                    type="radio"
                    name="gender"
                  > <span>Женский</span>
                </label>
                <input></span>
            </li>
            <li>
              <span>Место жительства:</span>
              <span><input></span>
            </li>
            <li>
              <span>Место прибывания</span>
              <span><input></span>
            </li>
            <li>
              <span>Дата регистрации</span>
              <span>
                <input type="date">
                <span class="required">Код МОЖ</span>
                <input>
              </span>
            </li>
            <li>
              <span>Документ удостоверяющий личность:</span>
              <span><input @click="openDopWindow('addDocumentWindow')"></span>
              <div
                v-if="addDocumentWindow"
                class="add-document-window"
              >
                <h6>Удостоверение личности</h6>
                <ol>
                  <li>
                    <span class="required">Вид удостоверения:</span>
                    <span><input></span>
                  </li>
                  <li>
                    <span class="required">Серия и номер:</span>
                    <span><input></span>
                  </li>
                  <li>
                    <span class="required">Дата выдачи:</span>
                    <span><input type="date"></span>
                  </li>
                  <li>
                    <span>Кем выдан:</span>
                    <span><input></span>
                  </li>
                  <li>
                    <span class="required">Действующий:</span>
                    <span><input type="checkbox"></span>
                  </li>
                </ol>
                <div class="kntr_btn kntr">
                  <button type="button">
                    Добавить
                  </button>
                  <button type="button">
                    Сохранить
                  </button>
                  <button
                    @click.stop="closeDopWindow('addDocumentWindow')"
                    type="button"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </li>
            <li>
              <span class="required">СНИЛС:</span>
              <span>
                <input>
                <span>ИНН:</span>
                <input>
              </span>
            </li>
            <li>
              <span class="required">Телефон:</span>
              <span>
                <input type="tel">
                <span>ОГРНИП:</span>
                <input>
              </span>
            </li>
            <li>
              <span>Эл почта:</span>
              <span><input></span>
            </li>
            <li>
              <span>Статус</span>
              <span><input></span>
            </li>
          </ul>
          <div class="kntr_btn kntr">
            <button type="button">
              Зарегистрировать
            </button>
            <button type="button">
              Отменить <br> регистрацию
            </button>
            <button type="button">
              Восстановить
            </button>
            <button type="button">
              Сохранить
            </button>
            <button type="button">
              Отменить
            </button>
          </div>
        </template>
        <template v-else>
          <icon-button
            @click="addWork =!addWork"
            type="text"
            text="Добавить трудовую деятельность"
            class="ml-4"
            icon="mdi-plus-circle-outline"
          />
          <list-table
            :headers="headers"
            :entity="entity"
            :actions-table="actionsTable"
          />
          <div v-if="addWork">
            <ul>
              <li>
                <span class="required">Место работы:</span>
                <span><input @click="openDopWindow('addWorkWindow')"></span>
                <div
                  v-if="addWorkWindow"
                  class="add-document-window"
                >
                  <h6>Выбор работодателя</h6>
                  <div>
                    <p>выберете работодателя <span @click.stop="closeDopWindow('addWorkWindow')">x</span></p>
                    <div>
                      <input placeholder="укажите тип">
                      <input placeholder="укажите наименование">
                    </div>
                    <div class="kntr_btn kntr">
                      <button type="button">
                        Ок
                      </button>
                      <button type="button">
                        Отмена
                      </button>
                    </div>
                  </div>
                  <div class="kntr_btn kntr">
                    <button type="button">
                      Добавить
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <span class="required">Трудовая функция:</span>
                <span><input></span>
              </li>
              <li>
                <span class="required">Дата приёма:</span>
                <span>
                  <input type="date">
                  <span>Дата увольнения:</span>
                  <input type="date">
                </span>
              </li>
              <li>
                <span>Причина увольнения:</span>
                <span><input></span>
              </li>
              <li>
                <span>Документ-основание:</span>
                <span><input></span>
              </li>
              <li>
                <span>Признак ПФР:</span>
                <span><input type="checkbox"></span>
              </li>
            </ul>
          </div>
        </template>
        <div class="kntr_btn kntr">
          <button type="button">
            Сохранить
          </button>
          <button type="button">
            Отменить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import IconButton from '@/components/shared/buttons/IconButton.vue';
import ListTable from '@/components/ListTable/ListTable.vue';
export default {
  components: {
    IconButton,
    ListTable,
  },
  data() {
    return {
      tab1: true,
      addWork: false,
      addDocumentWindow: false,
      addWorkWindow: false,
      headers: [
        { text: 'Место работы', value: 'placeOfWork', stopIteraror: false },
        { text: 'Трудовая функция', value: 'position', stopIteraror: false },
        { text: 'Дата приёма', value: 'reception', stopIteraror: false },
        { text: 'Действия', value: 'actions', stopIteraror: true },
      ],
      entity: [
        {
          id: 1,
          placeOfWork: 'ООО Рога и копыта',
          position: 'Сторож',
          reception: '05-10-2021',
        },
      ],
      actionsTable: [
        {
          name: 'редактировать',
          icon: 'mdi-file-edit-outline',
          title: '',
          action(id) { alert(this.name + ' ' + id); },
        },
        {
          name: 'удалить',
          icon: 'mdi-trash-can-outline',
          title: '',
          action(id) { alert(this.name + ' ' + id); },
        },
      ],
    };
  },
  methods: {
    changeTab(event) {
      if (event.target.closest('.tab1')) {
        this.tab1 = true;
      } else {
        this.tab1 = false;
      }
    },
    closeWindow(event) {
      if (event.target.closest('.modal-window')) return;
      this.$emit('close-modal-window');
    },
    closeDopWindow(property) {
      this[property] = false;
    },
    openDopWindow(property) {
      this[property] = true;
    },
  },
};
</script>
<style>
  .wrapper-modal {
    align-items: center;
    background: rgba(207, 216, 220, .7);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  .modal-window {
    background: rgb(238, 238, 238)
  }

  .relative {
    position: relative;
  }

  .add-document-window {
    background: white;
    padding: 20px;
    position: absolute;
  }
</style>
