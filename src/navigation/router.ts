/*
 * Copyright (c) 2019 FORS Development Center
 * Trifonovskiy tup. 3, Moscow, 129272, Russian Federation
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * FORS Development Center ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with FORS.
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      meta: {
        breadcrumbs: [
          {
            label: 'Главная страница',
          },
        ],
      },
      name: 'MainPage',
      component: () => import('@/views/MainPage.vue'),
      props: true,
    },
    {
      path: '/participants-consolidated',
      meta: {
        breadcrumbs: [
          {
            label: 'Сводный список участников',
          },
        ],
      },
      name: 'ParticipantsConsolidatedListPage',
      component: () => import('@/views/ParticipantsConsolidatedListPage.vue'),
      props: true,
    },
    {
      path: '/participants',
      meta: {
        breadcrumbs: [
          {
            label: 'Список участников',
          },
        ],
      },
      name: 'ParticipantsListPage',
      component: () => import('@/views/ParticipantsListPage.vue'),
      props: true,
    },
    {
      path: '/hiring-participant-card/:id',
      meta: {
        breadcrumbs: [
          {
            label: 'Карточка участника договора найма',
          },
        ],
      },
      name: 'HiringParticipantFormPage',
      component: () => import('@/views/HiringParticipantFormPage.vue'),
      props: true,
    },
    {
      path: '/payout-participant-card/:id',
      meta: {
        breadcrumbs: [
          {
            label: 'Карточка участника социальной выплаты',
          },
        ],
      },
      name: 'PayoutParticipantFormPage',
      component: () => import('@/views/PayoutParticipantFormPage.vue'),
      props: true,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
