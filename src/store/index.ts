/*
 * Copyright (c) 2020 FORS Development Center
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
import Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';
import { createVuexStore } from 'vuex-simple';

import { configurator } from './modules/configurator';
import Store from './store';

Vue.use(Vuex);

const vuexSmart = new Module({
  modules: {
    configurator,
  },
});

export default {
  ...createVuexStore(new Store(), {
    strict: process.env.NODE_ENV !== 'production',
  }),

  ...createStore(vuexSmart, {
    strict: process.env.NODE_ENV !== 'production',
  }),
};
