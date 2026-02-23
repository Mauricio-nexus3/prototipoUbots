<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4 md:inset-0 h-modal md:h-full">
    <div class="relative w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow flex flex-col max-h-[90vh]">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ initialData ? 'Editar Horário Especial' : 'Adicionar Horário Especial' }}
          </h3>
          <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L10 8.586 5.707 4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        
        <!-- Step Progress -->
        <div class="px-6 pt-6 pb-2">
            <div class="relative mb-2">
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div :style="{ width: `${(step / 7) * 100}%` }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-ubots-yellow transition-all duration-500 ease-out"></div>
                </div>
                <div class="text-xs text-gray-500 text-right font-medium">Passo {{ step }} de 7</div>
            </div>
        </div>

        <!-- Modal body -->
        <div class="p-6 space-y-6 overflow-y-auto flex-1 min-h-[300px]" @click="activeDropdown = null">
            
            <!-- Step 1: Nome -->
            <div v-if="step === 1" class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900">Definição do Nome</h4>
                <p class="text-sm text-gray-500">Dê um nome para identificar este horário especial.</p>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome da data especial</label>
                    <input v-model="form.name" type="text" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-base" placeholder="Ex: Natal, Confraternização Universal">
                </div>
            </div>

            <!-- Step 2: Datas -->
            <div v-if="step === 2" class="space-y-4">
                 <h4 class="text-lg font-medium text-gray-900">Configuração de Datas</h4>
                 <p class="text-sm text-gray-500">Defina se o horário especial se aplica a um ou mais dias.</p>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de período</label>
                    <select v-model="form.dateType" class="w-full h-12 p-1 px-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-base bg-white">
                        <option value="single">Apenas um dia</option>
                        <option value="multi">Mais de um dia</option>
                    </select>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
                        <input v-model="form.mainDate" type="date" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-base">
                    </div>
                     <div v-if="form.dateType === 'multi'">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
                         <input v-model="form.endDate" type="date" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-base" :min="form.mainDate">
                    </div>
                </div>
                
                 <div class="flex items-center gap-2 mt-2">
                    <input v-model="form.repeatAnnualy" id="repeat" type="checkbox" class="w-5 h-5 rounded border-[#D9D9D9] text-ubots-yellow focus:ring-ubots-yellow">
                    <label for="repeat" class="text-sm text-gray-700">Repetir anualmente</label>
                </div>
            </div>

            <!-- Step 3: Expediente -->
            <div v-if="step === 3" class="space-y-6">
                <h4 class="text-lg font-medium text-gray-900">Horário de Expediente</h4>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-base font-medium text-gray-700">Haverá expediente nesta data?</span>
                        <button @click="form.hasWork = !form.hasWork" 
                            class="relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ubots-yellow focus:ring-offset-2"
                            :class="form.hasWork ? 'bg-ubots-blue' : 'bg-gray-200'">
                            <span class="pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                :class="form.hasWork ? 'translate-x-6' : 'translate-x-0'"></span>
                        </button>
                    </div>

                    <div v-if="form.hasWork" class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Horário Inicial do expediente</label>
                            <input v-model="form.startTime" type="time" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-base">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Horário Final do expediente</label>
                             <input v-model="form.endTime" type="time" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-base">
                        </div>
                    </div>
                     <div v-else class="text-sm text-gray-500 italic p-2 bg-white rounded border border-gray-100">
                        Nenhum atendimento será realizado neste dia.
                    </div>
                </div>
            </div>

            <!-- Step 4: Direcionamento (Multi-seleção em Dropdowns) -->
            <div v-if="step === 4" class="space-y-6">
                 <h4 class="text-lg font-medium text-gray-900">Direcionamento</h4>
                 <p class="text-sm text-gray-500">Selecione quem será afetado por este horário especial.</p>
                
                <div class="space-y-4">
                    <!-- Contas Dropdown -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Contas</label>
                        <button @click.stop="toggleDropdown('accounts')" type="button" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-ubots-yellow/50">
                            <span class="text-base" :class="form.accountIds.length ? 'text-gray-900' : 'text-gray-400'">
                                {{ form.accountIds.length ? `${form.accountIds.length} selecionada(s)` : 'Selecione uma ou mais contas' }}
                            </span>
                            <svg class="w-5 h-5 text-gray-400 transition-transform" :class="activeDropdown === 'accounts' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div v-if="activeDropdown === 'accounts'" class="absolute z-20 w-full mt-1 bg-white border border-[#D9D9D9] rounded-md shadow-lg p-2 max-h-48 overflow-y-auto">
                            <div v-for="acc in accounts" :key="acc.id" class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer" @click.stop="toggleSelection(form.accountIds, acc.id)">
                                <input type="checkbox" :checked="form.accountIds.includes(acc.id)" class="w-4 h-4 rounded border-[#D9D9D9] text-ubots-yellow focus:ring-ubots-yellow" @click.stop>
                                <span class="ml-2 text-sm text-gray-700">{{ acc.name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Subcontas Dropdown -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Subcontas</label>
                        <button @click.stop="toggleDropdown('subaccounts')" type="button" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-ubots-yellow/50">
                            <span class="text-base" :class="form.subaccountIds.length ? 'text-gray-900' : 'text-gray-400'">
                                {{ form.subaccountIds.length ? `${form.subaccountIds.length} selecionada(s)` : 'Selecione uma ou mais subcontas' }}
                            </span>
                            <svg class="w-5 h-5 text-gray-400 transition-transform" :class="activeDropdown === 'subaccounts' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div v-if="activeDropdown === 'subaccounts'" class="absolute z-20 w-full mt-1 bg-white border border-[#D9D9D9] rounded-md shadow-lg p-2 max-h-48 overflow-y-auto">
                            <div v-for="sub in subaccounts" :key="sub.id" class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer" @click.stop="toggleSelection(form.subaccountIds, sub.id)">
                                <input type="checkbox" :checked="form.subaccountIds.includes(sub.id)" class="w-4 h-4 rounded border-[#D9D9D9] text-ubots-yellow focus:ring-ubots-yellow" @click.stop>
                                <span class="ml-2 text-sm text-gray-700">{{ sub.name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Times Dropdown -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Times</label>
                        <button @click.stop="toggleDropdown('teams')" type="button" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-ubots-yellow/50">
                            <span class="text-base" :class="form.teamIds.length ? 'text-gray-900' : 'text-gray-400'">
                                {{ form.teamIds.length ? `${form.teamIds.length} selecionado(s)` : 'Selecione um ou mais times' }}
                            </span>
                            <svg class="w-5 h-5 text-gray-400 transition-transform" :class="activeDropdown === 'teams' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div v-if="activeDropdown === 'teams'" class="absolute z-20 w-full mt-1 bg-white border border-[#D9D9D9] rounded-md shadow-lg p-2 max-h-48 overflow-y-auto">
                             <div class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer border-b mb-1 font-bold" @click.stop="toggleAllTeams">
                                <input type="checkbox" :checked="form.teamIds.length === availableTeams.length" class="w-4 h-4 rounded border-[#D9D9D9] text-ubots-yellow focus:ring-ubots-yellow" @click.stop>
                                <span class="ml-2 text-sm text-ubots-blue">Todos os times</span>
                            </div>
                            <div v-for="team in availableTeams" :key="team.id" class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer" @click.stop="toggleSelection(form.teamIds, team.id)">
                                <input type="checkbox" :checked="form.teamIds.includes(team.id)" class="w-4 h-4 rounded border-[#D9D9D9] text-ubots-yellow focus:ring-ubots-yellow" @click.stop>
                                <span class="ml-2 text-sm text-gray-700">{{ team.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 5: Mensagem -->
            <div v-if="step === 5" class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900">Mensagem de Atendimento</h4>
                <p class="text-sm text-gray-500">Configure a mensagem enviada aos clientes durante este período.</p>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Escolha uma mensagem padrão</label>
                    <select v-model="form.messageTemplate" @change="updateMessageFromTemplate" class="w-full h-12 px-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-base bg-white">
                        <option value="" disabled>Selecione um modelo</option>
                        <option v-for="msg in messageTemplates" :key="msg.id" :value="msg.id">{{ msg.name }}</option>
                        <option value="custom">Personalizada</option>
                    </select>
                </div>

                 <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Conteúdo da mensagem</label>
                    <textarea v-model="form.message" rows="4" class="w-full p-4 border border-[#D9D9D9] rounded-md shadow-sm focus:border-ubots-yellow focus:ring focus:ring-ubots-yellow/50 text-sm" placeholder="Digite a mensagem que será exibida..."></textarea>
                </div>
            </div>

            <!-- Step 6: Decisão Final -->
            <div v-if="step === 6" class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900">Ação do Fluxo</h4>
                <p class="text-sm text-gray-500">O que deve acontecer ao receber uma mensagem neste período?</p>

                <div class="grid grid-cols-1 gap-4">
                    <label class="relative flex items-center p-4 cursor-pointer rounded-lg border hover:bg-gray-50 transition-colors" :class="form.actionType === 'end' ? 'border-ubots-yellow bg-yellow-50 ring-1 ring-ubots-yellow' : 'border-[#D9D9D9]'" @click="form.actionType = 'end'">
                        <input type="radio" value="end" :checked="form.actionType === 'end'" class="h-5 w-5 text-ubots-yellow border-[#D9D9D9] focus:ring-ubots-yellow">
                        <span class="ml-3 flex flex-col">
                            <span class="block text-sm font-medium text-gray-900">Encerrar protocolo</span>
                            <span class="block text-sm text-gray-500">O atendimento será finalizado após a mensagem.</span>
                        </span>
                    </label>

                    <label class="relative flex items-center p-4 cursor-pointer rounded-lg border hover:bg-gray-50 transition-colors" :class="form.actionType === 'continue' ? 'border-ubots-yellow bg-yellow-50 ring-1 ring-ubots-yellow' : 'border-[#D9D9D9]'" @click="form.actionType = 'continue'">
                        <input type="radio" value="continue" :checked="form.actionType === 'continue'" class="h-5 w-5 text-ubots-yellow border-[#D9D9D9] focus:ring-ubots-yellow">
                        <span class="ml-3 flex flex-col">
                            <span class="block text-sm font-medium text-gray-900">Continuar fluxo normal do Bot</span>
                            <span class="block text-sm text-gray-500">O cliente seguirá para o atendimento conforme a estrutura do time.</span>
                        </span>
                    </label>
                </div>
            </div>

            <!-- Step 7: Revisão Final (Mantendo o estilo aprovado) -->
             <div v-if="step === 7" class="space-y-4">
                 <h4 class="text-lg font-medium text-gray-900">Revisão Final</h4>
                 
                <div class="bg-blue-50 p-6 rounded-md border border-blue-100 shadow-sm">
                     <div class="flex gap-4">
                         <div class="text-blue-500 flex-shrink-0 mt-1">
                             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                         </div>
                         <div class="flex-1 space-y-3">
                             <div>
                                 <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Definição</h5>
                                 <p class="text-blue-900 font-medium text-lg">{{ form.name }}</p>
                                 <p class="text-blue-800 text-sm">{{ formatDate(form.mainDate) }} <span v-if="form.dateType === 'multi'">até {{ formatDate(form.endDate) }}</span> <span v-if="form.repeatAnnualy" class="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Anual</span></p>
                             </div>
                             
                             <div class="grid grid-cols-2 gap-4 pt-2 border-t border-blue-200/50">
                                 <div>
                                     <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Expediente</h5>
                                     <p class="text-blue-900 text-sm" v-if="form.hasWork">Das {{ form.startTime }} às {{ form.endTime }}</p>
                                     <p class="text-blue-900 text-sm" v-else>Sem expediente</p>
                                 </div>
                                  <div>
                                     <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Alvo</h5>
                                     <div class="text-blue-900 text-xs">
                                         <p><span class="font-bold">Contas:</span> {{ getSummaryList(form.accountIds, accounts) }}</p>
                                         <p><span class="font-bold">Subcontas:</span> {{ getSummaryList(form.subaccountIds, subaccounts) }}</p>
                                         <p><span class="font-bold">Times:</span> {{ getSummaryList(form.teamIds, availableTeams) }}</p>
                                     </div>
                                 </div>
                             </div>

                             <div class="pt-2 border-t border-blue-200/50">
                                <h5 class="text-xs uppercase tracking-wide text-blue-500 font-bold mb-1">Ação & Mensagem</h5>
                                <p class="text-blue-900 text-sm font-medium">{{ form.actionType === 'end' ? 'Encerrar protocolo' : 'Continuar fluxo' }}</p>
                                <p class="text-blue-800 text-xs italic mt-1">"{{ form.message || 'Sem mensagem configurada' }}"</p>
                             </div>
                         </div>
                     </div>
                </div>
            </div>

        </div>

        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b justify-between bg-gray-50">
           <button v-if="step > 1" @click="step--" type="button" class="text-gray-600 bg-white hover:bg-gray-100 border border-[#D9D9D9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center transition-all h-12">
                Voltar
           </button>
           <div v-else></div> <!-- Spacer -->

           <div class="flex gap-3">
               <button @click="closeModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-6 py-3 hover:text-gray-900 focus:z-10 transition-all h-12">
                   Cancelar
               </button>
               <button v-if="step < 7" @click="nextStep" type="button" class="text-ubots-blue bg-ubots-yellow hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center font-bold transition-all h-12">
                   Próximo
               </button>
                <button v-if="step === 7" @click="saveAndClose" type="button" class="text-ubots-blue bg-ubots-yellow hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center font-bold transition-all h-12">
                   Salvar Configuração
               </button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  initialData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const step = ref(1)
const activeDropdown = ref(null)

const form = reactive({
    name: '',
    dateType: 'single',
    mainDate: '',
    endDate: '',
    repeatAnnualy: false,
    hasWork: false,
    startTime: '08:00',
    endTime: '18:00',
    accountIds: [],
    subaccountIds: [],
    teamIds: [],
    messageTemplate: '',
    message: '',
    actionType: 'continue'
})

// Watch for modal open to pre-fill data
watch(() => props.isOpen, (newVal) => {
    if (newVal && props.initialData) {
        // Clone initialData to form
        Object.assign(form, {
            name: props.initialData.name || '',
            dateType: props.initialData.dateType || (props.initialData.date && props.initialData.date.includes(' - ') ? 'multi' : 'single'),
            mainDate: props.initialData.mainDate || parseInternalDate(props.initialData.date, 0),
            endDate: props.initialData.endDate || parseInternalDate(props.initialData.date, 1),
            repeatAnnualy: props.initialData.repeatAnnualy || false,
            hasWork: props.initialData.hasWork || false,
            startTime: props.initialData.start || '08:00',
            endTime: props.initialData.end || '18:00',
            accountIds: props.initialData.accountIds || [],
            subaccountIds: props.initialData.subaccountIds || [],
            teamIds: props.initialData.teamIds || [],
            messageTemplate: props.initialData.messageTemplate || '',
            message: props.initialData.message || '',
            actionType: props.initialData.actionType || 'continue'
        })
    } else if (newVal) {
        resetForm()
    }
})

function parseInternalDate(dateStr, partIndex) {
    if (!dateStr) return ''
    const parts = dateStr.split(' - ')
    const part = parts[partIndex === 1 && parts.length > 1 ? 1 : 0]
    if (!part) return ''
    const [d, m, y] = part.split('/')
    return `${y}-${m}-${d}`
}

// === Mock Data ===

const accounts = [
    { id: 'acc_1', name: 'Ubots' },
    { id: 'acc_2', name: 'Cliente A' }
]

const subaccounts = [
    { id: 'sub_1', accountId: 'acc_1', name: 'Desenvolvimento' },
    { id: 'sub_2', accountId: 'acc_1', name: 'Comercial' },
    { id: 'sub_3', accountId: 'acc_2', name: 'Matriz' },
    { id: 'sub_4', accountId: 'acc_2', name: 'Filial SP' }
]

const availableTeams = [
    { id: 'suporte_n1', name: 'Suporte N1' },
    { id: 'vendas', name: 'Time de Vendas' },
    { id: 'financeiro', name: 'Financeiro' },
    { id: 'time_mauricio', name: 'Time Mauricio' }
]

const messageTemplates = [
    { id: 'natal', name: 'Feriado de Natal', content: 'Em razão do feriado de Natal, nossa unidade estará fechada. Retornaremos em breve.' },
    { id: 'anonovo', name: 'Ano Novo', content: 'Desejamos um Feliz Ano Novo! Nosso atendimento retornará no próximo dia útil.' },
    { id: 'feriado', name: 'Feriado Nacional', content: 'Hoje é feriado! Nosso time está descansando, mas voltaremos com tudo amanhã.' }
]

// === Computed Properties ===

const filteredSubaccounts = computed(() => {
    return subaccounts.filter(sub => sub.accountId === form.accountId)
})

// === Methods ===

function updateMessageFromTemplate() {
    if (form.messageTemplate && form.messageTemplate !== 'custom') {
        const template = messageTemplates.find(t => t.id === form.messageTemplate)
        if (template) {
            form.message = template.content
        }
    } else if (form.messageTemplate === 'custom') {
        form.message = ''
    }
}

function toggleDropdown(name) {
    activeDropdown.value = activeDropdown.value === name ? null : name
}

function toggleSelection(array, id) {
    const index = array.indexOf(id)
    if (index === -1) {
        array.push(id)
    } else {
        array.splice(index, 1)
    }
}

function toggleAllTeams() {
    if (form.teamIds.length === availableTeams.length) {
        form.teamIds = []
    } else {
        form.teamIds = availableTeams.map(t => t.id)
    }
}

function getSummaryList(ids, source) {
    if (!ids || ids.length === 0) return 'Nenhum'
    return ids.map(id => {
        const item = source.find(i => i.id === id)
        return item ? item.name : id
    }).join(', ')
}

function resetForm() {
    activeDropdown.value = null
    form.name = ''
    form.dateType = 'single'
    form.mainDate = ''
    form.endDate = ''
    form.repeatAnnualy = false
    form.hasWork = false
    form.startTime = '08:00'
    form.endTime = '18:00'
    form.accountIds = []
    form.subaccountIds = []
    form.teamIds = []
    form.messageTemplate = ''
    form.message = ''
    form.actionType = 'continue'
    step.value = 1
}

function closeModal() {
    resetForm()
    emit('close')
}

function nextStep() {
    // Validation Logic
    if (step.value === 1) {
        if (!form.name.trim()) return alert('Por favor, digite um nome.')
    }
    if (step.value === 2) {
        if (!form.mainDate) return alert('Por favor, selecione a data de início.')
        if (form.dateType === 'multi' && !form.endDate) return alert('Por favor, selecione a data de fim.')
    }
    
    step.value++
}

function saveAndClose() {
  const selectedTeamNames = form.teamIds.map(id => {
      const team = availableTeams.find(t => t.id === id)
      return team ? team.name : id
  })

  const selectedAccountNames = form.accountIds.map(id => {
      const acc = accounts.find(a => a.id === id)
      return acc ? acc.name : id
  })

  const selectedSubaccountNames = form.subaccountIds.map(id => {
      const sub = subaccounts.find(s => s.id === id)
      return sub ? sub.name : id
  })
  
  emit('save', { 
    ...form,
    // Compatibility fields for SpecialHoursList.vue
    date: formatDate(form.mainDate) + (form.dateType === 'multi' ? ` - ${formatDate(form.endDate)}` : ''),
    start: form.startTime,
    end: form.endTime,
    teams: selectedTeamNames,
    accounts: selectedAccountNames,
    subaccounts: selectedSubaccountNames,
    moreTeams: selectedTeamNames.length > 2
  })
  closeModal()
}

function formatDate(dateString) {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}
</script>
