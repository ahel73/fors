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
import AccountingBusinessCard from '@/components/AccountingBusiness/AccountingBusinessCard.vue';

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
      path: '/list-people-in-neety',
      meta: {
        breadcrumbs: [
          {
            label: 'Список нуждающихся лиц.',
          },
        ],
      },
      name: 'ListPeoplePage',
      component: () => import('@/views/PeopleInNeetyPages/ListPeopleInNeetyPage.vue'),
      props: true,
    },
    {
      path: '/create-people-in-neety',
      meta: {
        breadcrumbs: [
          {
            label: 'Создание нуждающегося лица',
          },
        ],
      },
      name: 'FormAddNewPeopleInNeety',
      component: () => import('@/views/PeopleInNeetyPages/FormAddNewPeopleInNeety.vue'),
      props: true,
    },
    {
      path: '/add-new-worker-activity',
      meta: {
        breadcrumbs: [
          {
            label: 'Добавление новой трудовой деятельности',
          },
        ],
      },
      name: 'FormAddNewWorkerActivity',
      component: () => import('@/views/PeopleInNeetyPages/FormAddNewWorkerActivity.vue'),
      props: true,
    },
    {
      path: '/add-document',
      meta: {
        breadcrumbs: [
          {
            label: 'Добавление удостоверяющего документа',
          },
        ],
      },
      name: 'FormAddDocument',
      component: () => import('@/views/PeopleInNeetyPages/FormAddDocument.vue'),
      props: true,
    },
    {
      path: '/add-employer',
      meta: {
        breadcrumbs: [
          {
            label: 'Добавление нового работодателя',
          },
        ],
      },
      name: 'FormAddNewEmployer',
      component: () => import('@/views/PeopleInNeetyPages/FormAddNewEmployer.vue'),
      props: true,
    },
    // Мои конец FormAddNewEmployer.vue
    {
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
