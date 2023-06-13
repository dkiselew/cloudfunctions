<template>  
  <div class="flex flex-col h-full" style="min-height: 0;">
    <div v-if="loading" class="flex h-full justify-items-center items-center">      
      <div class="w-full text-center">
        <Spinner size="lg" />
      </div>      
    </div>
    <template v-if="!loading">
      

      <!-- Navigation -->
      <div>
        <FunctionToolbar :saving="saving" :functionUrl="functionUrl" @save="save">
          
            <FunctionTabs @selected="(tab) => this.tab = tab" :tab="tab" class="inline-flex" />      
          
        </FunctionToolbar>        
      </div>        

      

      <!-- Code -->
      <div v-show="tab === 'code'" class="grow" style="min-height: 0; overflow-y: scroll;">      
        <div class="sm:col-span-4 mb-6">                
          <Codemirror          
            v-model="form.code"
            placeholder="Code goes here..."
            :style="{ height: 'auto' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="codemirorExtensions"          
          />        
        </div>              
      </div>    

      <FunctionPlayground 
        v-show="tab === 'run'" 
        :functionUrl="functionUrl"        
        :saving="saving"        
      />

      <FunctionLogs 
        v-show="tab === 'logs'" 
        :functionName="func.name"        
      />

      <FunctionDependencies
        v-show="tab === 'dependencies'"         
      />

      <FunctionSettings 
        v-show="tab === 'settings'" 
        v-model:path="form.path"
      />

    </template>    
  </div>
</template>

<script>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import Spinner from '~/components/Spinner.vue';
import FunctionTabs from '~/components/FunctionTabs.vue';
import FunctionToolbar from '~/components/FunctionToolbar.vue';
import FunctionLogs from '~/components/FunctionLogs.vue';
import FunctionPlayground from '~/components/FunctionPlayground.vue';
import FunctionDependencies from '~/components/FunctionDependencies.vue';

/**
 * Deploy info and logs:
 * 
 * fission package list 
 * fission package info --name myproject-cats-b0422ee9-7522-4e22-86c5-c83f23554e57
 */
export default {
  setup() {
    const appConfig = useAppConfig();
    return { 
      appConfig
     }
  },
  components: {
    Spinner,    
    Codemirror,
    FunctionTabs,
    FunctionToolbar,
    FunctionLogs,
    FunctionPlayground,
    FunctionDependencies,
  },
  data() {
    return {
      codemirorExtensions: [javascript()],
      form: {
        path: '',
        code: '',
        dependencies: '',
      },
      loading: true,
      saving: false,
      func: null,
      logs: '',
      response: null,
      tab: 'code',
    }
  },
  mounted() {    
     this.getFunction();
  },
  computed: {
    functionUrl() {
      return `${this.appConfig.functionsDomain}${this.func.path}`;
    },
  },
  methods: {
    async getFunction() {
      this.loading = true;
      try {
        this.func = await $fetch(`/api/functions/${this.$route.params.name}`);       
        const { path, code, dependencies } = this.func;
        this.form = { path, code, dependencies };
      } catch (e) {
        console.log(e);
        throw createError({ statusCode: 404, statusMessage: 'Function Not Found', fatal: true })
      } finally {
        this.loading = false;
      }                  
    },    
    autosave() {
      // save code to file after 3 seconds user stops typing
    },
    async save() {
      this.saving = true;            
      try {
        await $fetch(`/api/functions/${this.$route.params.name}`, {
          method: 'post',
          body: this.form,
        });
        this.updateFunctionFromForm();

        this.$notify({
          group: "success",
          title: "Done",
          text: "Function saved"
        }, 5000);                        
      } catch (e) {
        this.$notify({
          group: "error",
          title: "Error",
          text: "Function hasn't been saved."
        }, 5000);
        console.log(e);
      } finally {
        this.saving = false;  
      }           
    },
    updateFunctionFromForm() {
      this.func.path = this.form.path;
    },        
  },  
}
</script>

<style>
.ͼ2 .cm-gutters {
  background-color: transparent; /* Replace with your desired color */
}
.ͼ1.cm-focused {
  outline: none; /* Remove the focus border */
}
</style>