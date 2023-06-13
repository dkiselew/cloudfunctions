<template>
  <!-- Bottom panel -->
  <div v-if="!loading" class="h-64 py-4">    
      <!-- Response -->      
      <div v-if="bottomTab === 'response'" class="h-full p-4 rounded-md bg-slate-50">
        <div class="flex items-center mb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mr-4">Response</h3>
          <button @click="exec" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
            Run  
          </button>    
        </div>        
        <div class="text-xs font-mono mb-6" style="white-space: pre;">
          {{ response ? response : 'Nothing to show yet...' }}
        </div>              
      </div>
      <!-- Logs -->
      <div v-if="bottomTab === 'logs'" class="h-full p-4 rounded-md bg-slate-50">
        <div class="flex items-center mb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mr-4">Logs</h3>
          <button @click="loadLogs" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
            Refresh  
          </button>    
        </div>        
        <div class="text-xs font-mono mb-6" style="white-space: pre; overflow: scroll; max-height: 100%; width: 100%;">
          {{ logs.length ? logs : 'Nothing to show yet...' }}
        </div>              
      </div>
    </div>

    <div class="flex gap-4">
      <button class="bg-white rounded-lg hover:bg-slate-200 text-sm font-semibold px-4 py-2 shadow-sm ring-1 ring-inset ring-gray-300" :class="{ 'bg-slate-200': bottomTab === 'response' }" @click="selectBottomTab('response')">Response</button>
      <button class="bg-white rounded-lg hover:bg-slate-200 text-sm font-semibold px-4 py-2 shadow-sm ring-1 ring-inset ring-gray-300" :class="{ 'bg-slate-200': bottomTab === 'logs' }" @click="selectBottomTab('logs')">Logs</button>      
    </div>
</template>