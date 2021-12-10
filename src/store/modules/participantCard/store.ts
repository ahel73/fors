import { Action, Mutation, State } from 'vuex-simple';
import {
  fetchParticipantCard,
  putParticipantCard,
} from '@/data';
import { ParticipantsCardState } from './types';
import eventBus from '@/utils/bus/event-bus';

export default class ParticipantsCardModule {
  @State()
  state: ParticipantsCardState = {
    isLoading: false,
    card: {
      queueNum: 0,
      deed: {
        applicant: {
          fullName: '',
        },
        employment: {
          name: '',
        },
        oktmo: {
          name: '',
        },
        spendingDirection: {
          name: '',
        },
        queuePriority: {
          name: '',
        },
        work: {
          employer: {
            shortName: '',
          },
          workFunction: '',
          registrationDate: '',
        },
      },
    },
  }

  @Mutation()
  setCard(card: any) {
    this.state.card = card;
  }

  @Mutation()
  setCardValue({ field, value } : {field: string, value: any}) {
    console.log(value);
    this.state.card[field] = value;
  }

  @Action()
  async fetchData({ id, type }: {id: string, type: string}) {
    try {
      if (type === 'payout' || type === 'hiring') {
        const result = await fetchParticipantCard(id, type);
        this.setCard(result);
      }
    } catch (error) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Произошла ошибка при получении данных карточки участника',
          title: 'Ошибка',
          type: 'error',
        }
      );
    }
  }

  @Action()
  async updateData({ id, type }: {id: string, type: string}) {
    try {
      if (type === 'payout' || type === 'hiring') {
        const result = await putParticipantCard(this.state.card, id, type);
        this.setCard(result);
        eventBus.$emit(
          'notification:message',
          {
            text: 'Сохранение карточки участника списка прошло успешно',
            title: 'Сохранено',
            type: 'success',
          }
        );
      }
    } catch (error) {
      eventBus.$emit(
        'notification:message',
        {
          text: 'Произошла ошибка при получении данных карточки участника',
          title: 'Ошибка',
          type: 'error',
        }
      );
    }
  }

  @Action()
  async changeCardValue({ field, value } : {field: string, value: any}) {
    console.log(value);
    this.setCardValue({ field: field, value: value });
  }
}
