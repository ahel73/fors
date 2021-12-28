<template>
  <v-app>
    <v-container
      class="pa-0"
      fluid
    >
      <router-view />
    </v-container>
    <notification-component :notifications.sync="notifications" />
  </v-app>
</template>

<script lang="ts">
import eventBus from './utils/bus/event-bus';
import { Component, Vue } from 'vue-property-decorator';
import Notification from '@/components/shared/Notification/NotificationComponent.vue';

@Component({
  name: 'app',
  components: {
    'notification-component': Notification,
  },
})
export default class App extends Vue {
  keepAliveComponents = [];

  notifications: Notification[] = [];

  beforeDestroy(): void {
    eventBus.$off('notification:message');
  }

  created(): void {
    eventBus.$on('notification:message', (notification: Notification) => {
      this.notifications = [...this.notifications, notification];
    });
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/global.scss";
</style>
