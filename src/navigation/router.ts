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
import { RouteNames } from '@/navigation/types';

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
      path: '/nuzhdayushchiyesya-grazhdane',
      meta: {
        breadcrumbs: [
          {
            label: 'Список нуждающихся лиц.',
          },
        ],
      },
      name: 'ListPeoplePage',
      component: () => import('@/views/ListPeopleInNeetyPage/ListPeopleInNeetyPage.vue'),
      props: true,
    },
    {
      path: '*',
      redirect: '/indicators',
    },
  ],
});

export default router;
