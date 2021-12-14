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
import AccountingBusinessCard from '@/components/AccountingBusiness/AccountingBusinessCard.vue'

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
      path: '/accountingBusiness',
      children: [
        {
          path: '/accountingBusiness/:id/:type',
          name: 'accountingBusiness-card',
          component: AccountingBusinessCard,
        },
        {
          path: '/accountingBusiness/:type',
          name: 'accountingBusinessCardCreate',
          component: AccountingBusinessCard,
          meta: {
            breadcrumb: [
              { name: 'Орган государственной власти' },
            ],
          },
        },
        {
          path: '/accountingBusiness/createFamily',
          name: 'accountingBusinessFamilyCard',
          component: () => import('@/components/AccountingBusiness/AccountingBusinessFamilyCard.vue'),
        },
        {
          path: '/accountingBusiness/editFamily',
          name: 'editFamilyCard',
          component: () => import('@/components/AccountingBusiness/AccountingBusinessFamilyCard.vue'),
        },
        {
          path: '/accountingBusiness/:id/:type/createDocument',
          name: 'accountingBusinessDocumentCard',
          component: () => import('@/components/AccountingBusiness/AccountingBusinessDocumentCard.vue'),
        },
        {
          path: '/accountingBusiness/:id/:type/editDocument',
          name: 'editDocument',
          component: () => import('@/components/AccountingBusiness/AccountingBusinessDocumentCard.vue'),
        },
      ],
      meta: {
        breadcrumbs: [
          {
            label: 'Учетное дело',
          },
        ],
      },
      name: 'AccountingBusiness',
      component: () => import('@/views/AccountingBusiness/AccountingBusiness.vue'),
      props: true,
    },
    {
      path: '*',
      redirect: '/indicators',
    },
  ],
});

export default router;
