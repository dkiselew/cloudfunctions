<template>  
  <div class="mb-4 -ml-4 flex justify-between">
    <button @click="$router.push('/functions')" type="button" class="inline-flex rounded-md items-center px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">              
      <ArrowLeftIcon class="h-5 w-5" aria-hidden="true" />
    </button>    
    <div v-if="func" class="flex justify-end gap-x-4">
      <a :href="`${appConfig.functionsDomain}${func.url}`" target="_blank" class="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
        Preview
      </a>
      <button v-if="!saving" @click="save" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
          Save      
      </button>    
      <button v-if="saving" disabled type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <Spinner class="mr-3" />
        Saving...
      </button>
    </div>
  </div>
  <div v-if="loading">
    <Spinner size="lg" />
  </div>
  <div v-if="!loading">
    <form >
      <div class="sm:col-span-4 mb-6">
        <label for="path" class="block text-sm font-medium leading-6 text-gray-900">Endpoint URL path</label>
        <div class="mt-2">
          <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">            
            <input v-model="form.path" required type="text" name="path" id="path" autocomplete="path" class="font-mono block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-0  sm:text-sm sm:leading-6" >
          </div>
        </div>
      </div>   
      
      <div class="sm:col-span-4 mb-6">        
        <div class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
        <Codemirror          
          v-model="form.code"
          placeholder="Code goes here..."
          :style="{ height: '400px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="codemirorExtensions"          
        />
        </div>
      </div>              
    </form>    
  </div>
</template>

<script>
import { Codemirror } from 'vue-codemirror'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import Spinner from '~/components/Spinner.vue';
import { javascript } from '@codemirror/lang-javascript'

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
    ArrowLeftIcon,
    Codemirror,
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
    }
  },
  mounted() {    
     this.getFunction();
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
    exec() {
      // execute function and print response
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