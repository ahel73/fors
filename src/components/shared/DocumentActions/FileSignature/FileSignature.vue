<template>
  <div class="wrapper">
    <select-component
      v-if="certificatesList.length"
      v-model="selectedCertificate"
      :items="certificatesList"
      item-text="title"
      item-value="thumbprint"
      class="list"
      no-data-text="У вас нет валидных сертификатов"
      label="Выберите сертификат"
      variant="micro"
      hide-details
    />
    <default-button
      @click="signFile"
      :disabled="!certificatesList.length"
      class="ml-2"
      size="micro"
      title="Подписать документ"
      variant="primary"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SignData } from './FileSignature.types';
import { Certificate, enlistCertificates, isPluginInstalled, signData } from '@/libs/cadesplugin';
import { Notification } from '@/components/shared/Notification/Notification.types';
import Select from '@/components/shared/inputs/SelectComponent.vue';
import DefaultButton from '@/components/shared/buttons/DefaultButton.vue';

interface CertificatesList extends Pick<Certificate, 'thumbprint'> {
  title: string;
}

@Component({
  name: 'file-signature',
  components: {
    DefaultButton,
    'select-component': Select,
  },
})
export default class FileSignature extends Vue {
  @Prop(String) fileUid!: string;
  @Prop(String) fileData!: string;
  @Prop(String) userId!: string;
  @Prop({ type: Object, default: () => ({}) }) signData!: SignData;

  certificatesList: CertificatesList[] = [];
  selectedCertificate = '';

  errors = {
    objid: 'Вы не выбрали сертификат',
  }

  selectCertificate(certificate: Certificate): void {
    this.selectedCertificate = certificate.thumbprint;
  }

  async signFile(): Promise<void> {
    try {
      const signature = await signData(this.selectedCertificate, this.fileData);
      const fileData = {
        ...this.signData,
        userId: this.userId,
        documentId: this.fileUid,
        certThumbprint: this.selectedCertificate,
        signature,
      };

      this.$emit('onSign', fileData);
    } catch (error) {
      const { message } = error as Error;

      this.showNotification({
        title: 'Ошибка',
        text: message.includes('objid') ? this.errors.objid : message,
      });
    }
  }

  showNotification(notification: Notification): void {
    this.$emit('notification', notification);
  }

  init(): void {
    isPluginInstalled(
      async () => {
        try {
          const certificates = await enlistCertificates();

          this.certificatesList = certificates.map((certificateItem) => {
            const { subjectName, validFrom, thumbprint } = certificateItem;

            return {
              title: `${subjectName} ${validFrom}`,
              thumbprint,
            };
          });
        } catch (error) {
          this.showNotification({
            title: 'Ошибка',
            text: (error as Error).message,
          });
        }
      },
      () => undefined
    );
  }

  created(): void {
    this.init();
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    align-items: flex-end;
    display: flex;
    width: 600px;
  }

  .list {
    width: 300px !important;
  }
</style>
