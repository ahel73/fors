<template>
  <v-dialog
    v-model="showModal"
    persistent
    :max-width="width"
  >
    <template #activator="{ on, attrs }">
      <button-component
        :variant="primary ? 'primary' : 'default'"
        :title="buttonText"
        size="micro"
        :disabled="disabled"
        :attrs="attrs"
        :on="on"
      />
    </template>
    <v-card>
      <v-card-title>
        {{ modalText }}
      </v-card-title>
      <v-card-actions class="px-6 py-4">
        <v-row>
          <v-col class="text-right">
            <button-component
              @click="handleClose()"
              :title="cancelButtonText"
              size="micro"
              style="margin-right: 15px"
            />
            <button-component
              @click="onResumeClick()"
              variant="primary"
              :title="resumeButtonText"
              size="micro"
            />
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ButtonComponent from '@/components/shared/buttons/DefaultButton.vue';

@Component({
  name: 'modal-button',
  components: {
    ButtonComponent,
  },
})
export default class ModalButton extends Vue {
  @Prop({ type: String, default: '' }) buttonText!: string;
  @Prop({ type: String, default: '' }) modalText!: string;
  @Prop({ type: String, default: 'Отменить' }) cancelButtonText!: string;
  @Prop({ type: String, default: 'Продолжить' }) resumeButtonText!: string;
  @Prop({ type: String, default: '510' }) width!: string;
  @Prop({ type: Boolean, default: false }) primary!: string;
  @Prop(Boolean) disabled!: boolean;

  showModal = false;

  handleClose(): void {
    this.showModal = false;
  }

  onResumeClick(): void {
    this.$emit('onResumeClick', this.handleClose);
  }
}
</script>
