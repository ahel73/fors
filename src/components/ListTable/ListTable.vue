<!-- Вывод сущностей по странице на которую добавляется компонент -->
<template>
  <div class="list-table">
    <table>
      <thead>
        <tr>
          <th
            v-for="item in headers"
            :data-sort="item.value"
            :key="item.name"
          >
            {{ item.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="entity.length">
          <tr
            v-for="item in entity"
            :data-sort="item.id"
            :key="item.name"
          >
            <template v-for="(value, name) in item">
              <td
                v-if="name!=='id'"
                :key="value"
              >
                {{ value }}
              </td>
            </template>
            <td v-if="actionsTable">
              <span
                v-for="act in actionsTable"
                @click="act.action(item.id)"
                :key="act.icon"
              >
                <v-icon>{{ act.icon }}</v-icon>
                {{ act.title }}
              </span>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td>
            Не чего не найдено
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    entity: {
      type: Array,
      required: true,
    },
    actionsTable: {
      type: [Array, Boolean],
      default: false,
    },
  },
  data() {
    return {
      indexHeaders: 0,
    };
  },
};
</script>
