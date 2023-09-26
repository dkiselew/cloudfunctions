<template>  
  <div class="flex flex-col h-full" style="min-height: 0;">
    <div v-if="loading" class="flex h-full justify-items-center items-center">      
      <div class="w-full text-center">
        <Spinner size="lg" />
      </div>      
    </div>
    <template v-if="!loading">
      
      <!-- Navigation -->
      <div class="mb-4">
        <FunctionToolbar :saving="saving" :functionUrl="functionUrl" @save="save">          
          <FunctionTabs @selected="(tab) => this.tab = tab" :tab="tab" class="inline-flex" />                
        </FunctionToolbar>        
      </div>              

      <!-- Code -->
      <FunctionCode 
        v-show="tab === 'code'"
        v-model:code="form.code"
      />   

      <!-- Run -->
      <FunctionPlayground 
        v-show="tab === 'run'" 
        :functionUrl="functionUrl"        
        :saving="saving" 
        @executed="$refs.logs.refresh()"       
      />

      <!-- Logs -->
      <FunctionLogs 
        ref="logs"
        v-show="tab === 'logs'" 
        :functionName="func.name"        
      />

      <!-- Dependencies -->
      <FunctionDependencies
        v-show="tab === 'dependencies'"         
        v-model:dependencies="form.dependencies"
      />

      <!-- Settings -->
      <FunctionSettings 
        v-show="tab === 'settings'" 
        v-model:path="form.path"
        :name="func.name"
      />
      
    </template>    
  </div>
</template>

<script>
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
    const toast = useToast();
    return { 
      appConfig,
      toast,
     }
  },
  components: {
    Spinner,        
    FunctionTabs,
    FunctionToolbar,
    FunctionLogs,
    FunctionPlayground,
    FunctionDependencies,
  },
  data() {
    return {      
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
        this.toast.add({ title: "Function saved", icon: 'i-heroicons-check-circle' });
      } catch (e) {        
        this.toast.add({ title: "Function hasn't been saved", icon: 'i-heroicons-x-circle', color: 'red' });
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