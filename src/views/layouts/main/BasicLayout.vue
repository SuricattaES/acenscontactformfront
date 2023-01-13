<template>
    <div class="bg-gradient h-auto">
        <div class="bg-login h-auto">
            <FormAcens />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import FormAcens from '@/components/formAcens.vue';

export default defineComponent({
  name: 'BasicLayout',

  components: {
    FormAcens
  },

  setup() {
    return {

    };
  },
});
</script>

<style scoped>
.bg-login {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.bg-gradient {
    background: rgb(#f3f3f3);
}
</style>