# desktop-ui-vue

This module is the most important of [webVdesk](/# "view webVdesk") to help developer resolve some complex ui programming problems like draggable, resizable and selectable. Vue technology is the base of it. Someone wants to contribute this package must understand how vue work deeply.

In the past, there are five methods draggable, droppable, resizable, sortable and selectable in ``jQuery-ui-core`` library. It is unnecessary to define droppable and sortable because of vue MVVM. So there should be only the three other methods.

# Installation

```
$ npm install vd-ui
```

## As vue plugin

```js
import Vue from 'vue';
import vdUi from 'vd-ui';

Vue.use(vdUi);
```

## Basic example

example.vue

```vue
<template>

<!-- it is draggable -->
<vd-ui draggable>
  <your-component />
</vd-ui>

</template>
```

# Reference

## Component props

## Component events

## v-model

## Plugin options

# Use cases

