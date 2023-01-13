<template>
    <div id="acensform">
        <div>
            <component :is="layout" />
        </div>
    </div>
</template>

<script>
import BasicLayout from './views/layouts/main/BasicLayout.vue';

export default {
  name: 'App',

  components: {
    BasicLayout
  },

  data: () => ({
    layout: 'BasicLayout',
    defaultLayout: 'BasicLayout',
  }),

  watch: {
      $route(to) {
            if(to.meta.layout !== undefined && this.layout !== to.meta.layout) {
                this.layout = to.meta.layout;
            } else {
                this.layout = this.defaultLayout;
            }
        }
  }
};
</script>

<style>
    html { overflow-y: auto !important; }
</style>
