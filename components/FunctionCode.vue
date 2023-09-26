<template>
  <div class="grow" style="min-height: 0; overflow-y: scroll;">          
    <div class="sm:col-span-4 mb-6">                      
      <Codemirror                  
        v-model="text"        
        placeholder="Code goes here..."
        :style="{ height: 'auto' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="codemirorExtensions"          
      />        
    </div>              
  </div>    
</template>

<script>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export default {
  components: {
    Codemirror,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  emits: ['update:code'],
  created() {
    this.text = this.code;
  },
  data() {
    return {
      text: '',
      codemirorExtensions: [javascript()],
    }
  },
  watch: {
    text(value) {      
      this.$emit('update:code', value);      
    }
  },  
}
</script>