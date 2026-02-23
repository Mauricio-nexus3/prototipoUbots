<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4 md:inset-0 h-modal md:h-full">
    <div class="relative w-full max-w-lg h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow flex flex-col max-h-[90vh]">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">
            Detalhes do Horário Especial
          </h3>
          <button @click="$emit('close')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L10 8.586 5.707 4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-6 space-y-4 overflow-y-auto">
             <div class="bg-blue-50 p-6 rounded-md border border-blue-100 shadow-sm">
                 <div class="flex gap-4">
                     <div class="text-blue-500 flex-shrink-0 mt-1">
                         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                     </div>
                     <div class="flex-1 space-y-3">
                         <div>
                             <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Definição</h5>
                             <p class="text-blue-900 font-medium text-lg">{{ item.name }}</p>
                             <p class="text-blue-800 text-sm">{{ item.date }}</p>
                         </div>
                         
                         <div class="grid grid-cols-2 gap-4 pt-2 border-t border-blue-200/50">
                             <div>
                                 <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Expediente</h5>
                                 <template v-if="item.hasWork">
                                    <p class="text-blue-900 text-sm">Das {{ item.start }} às {{ item.end }}</p>
                                 </template>
                                 <template v-else>
                                     <p class="text-blue-900 text-sm">Sem expediente</p>
                                 </template>
                             </div>
                              <div>
                                 <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Alvo</h5>
                                 <div class="text-blue-900 text-xs space-y-0.5">
                                     <p><span class="font-bold">Contas:</span> {{ formatList(item.accounts) }}</p>
                                     <p><span class="font-bold">Subcontas:</span> {{ formatList(item.subaccounts) }}</p>
                                     <p><span class="font-bold">Times:</span> {{ formatList(item.teams) }}</p>
                                 </div>
                             </div>
                         </div>

                         <!-- Se tivermos dados de mensagem no objeto item, exibimos aqui -->
                         <!-- Assumindo estrutura provável para item -->
                         <div class="pt-2 border-t border-blue-200/50" v-if="item.message">
                            <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Mensagem</h5>
                            <p class="text-blue-800 text-xs italic">"{{ item.message }}"</p>
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        <!-- Modal footer -->
        <div class="flex items-center p-6 border-t border-gray-200 rounded-b justify-end bg-gray-50">
           <button @click="$emit('close')" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 transition-all">
               Fechar
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  item: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['close'])

function formatList(list) {
    if (!list || list.length === 0) return 'Nenhum'
    return list.join(', ')
}
</script>
