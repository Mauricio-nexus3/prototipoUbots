<template>
  <div class="min-h-screen bg-[#F5F7F9] flex font-sans text-gray-800">
    <!-- Sidebar -->
    <aside class="w-16 bg-ubots-blue flex flex-col items-center py-4 gap-6 flex-shrink-0">
      <div class="mb-4 flex items-center justify-center">
        <img src="/logo-ubots.png" alt="Ubots Logo" class="w-6 h-8 object-contain" />
      </div>
      <nav class="flex flex-col gap-6">
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconDashboard /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconAnalytic /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconDocument /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconChat /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconMail /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconMegaphone /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconBot /></div>
        <div class="p-2 bg-white/10 rounded-lg cursor-pointer"><IconSettings /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconLayers /></div>
        <div class="p-2 opacity-60 hover:opacity-100 cursor-pointer"><IconInfo /></div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <header class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div class="flex items-center gap-2 text-sm">
          <span class="text-gray-500">Gerencial</span>
          <span class="text-gray-400">></span>
          <span class="font-medium">Horários de atendimento</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-4 border-r pr-4 mr-4">
            <button class="text-gray-500 hover:text-gray-700"><IconPuzzle /></button>
            <button class="text-gray-500 hover:text-gray-700"><IconCamera /></button>
            <button class="relative text-gray-500 hover:text-gray-700">
              <IconBell />
              <span class="absolute -top-1 -right-1 bg-ubots-blue text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
            <button class="text-gray-500 hover:text-gray-700"><IconHelp /></button>
            <button class="text-gray-500 hover:text-gray-700"><IconUser /></button>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            <span class="text-xs text-gray-600">suporte~mauricio.ramos@ubots.com.br</span>
          </div>
          <button class="ml-4 text-gray-500 hover:text-gray-700"><IconLogout /></button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto p-6 flex flex-col gap-8">
        <!-- Normal Hours Section -->
        <section>
          <div class="flex items-center gap-4 mb-4">
            <h2 class="text-sm font-medium text-gray-600 whitespace-nowrap">Horários normais de funcionamento</h2>
            <div class="h-[1px] bg-ubots-yellow flex-1"></div>
            <div class="flex items-center gap-2">
              <button class="text-gray-600 flex items-center gap-2 text-sm font-medium mr-2">
                <IconHelpCircle class="w-4 h-4" /> Ajuda
              </button>
              <button class="text-ubots-yellow text-xs font-bold uppercase py-2 px-4 flex items-center gap-2 hover:bg-yellow-50 rounded">
                Adicionar Expediente <IconPlus class="w-4 h-4" />
              </button>
              <button class="bg-ubots-yellow text-ubots-blue px-8 py-2 rounded shadow-sm text-xs font-bold uppercase tracking-wider hover:bg-yellow-500">
                Salvar
              </button>
              <button class="bg-ubots-yellow text-ubots-blue px-6 py-2 rounded shadow-sm text-xs font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors">
                Filtrar
              </button>
            </div>
          </div>

          <div class="bg-white rounded shadow-sm overflow-hidden">
            <table class="w-full text-xs">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr class="text-left text-gray-400 font-medium">
                  <th class="px-6 py-3 font-normal">Dias de expediente</th>
                  <th class="px-6 py-3 font-normal">Horário inicial</th>
                  <th class="px-6 py-3 font-normal">Horário final</th>
                  <th class="px-6 py-3 font-normal">Times</th>
                  <th class="px-6 py-3 font-normal text-center w-24">Editar times</th>
                  <th class="px-6 py-3 font-normal text-center w-24">Remover expediente</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="(row, idx) in normalHours" :key="idx" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <div v-for="d in ['D','S','T','Q','Q','S','S']" :key="d" 
                           class="w-6 h-6 border rounded flex items-center justify-center text-[10px] cursor-pointer transition-colors"
                           :class="row.days.includes(d) ? 'bg-ubots-yellow border-ubots-yellow text-ubots-blue' : 'border-gray-300 text-gray-400'">
                        {{ d }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2 border-b border-gray-200 pb-1 w-24">
                      {{ row.start }} <IconClock class="w-3 h-3 text-gray-400" />
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2 border-b border-gray-200 pb-1 w-24">
                      {{ row.end }} <IconClock class="w-3 h-3 text-gray-400" />
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-2">
                      <span v-for="team in row.teams" :key="team" 
                            class="bg-ubots-yellow/20 text-ubots-blue px-3 py-1 rounded-full text-[10px] font-medium border border-ubots-yellow/30">
                        {{ team }}
                      </span>
                      <span v-if="row.moreTeams" class="bg-ubots-yellow/80 text-ubots-blue px-2 py-1 rounded-full text-[10px] font-bold">...</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button class="text-gray-400 hover:text-gray-600"><IconPencil class="w-4 h-4 mx-auto" /></button>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button class="text-ubots-yellow hover:text-yellow-600"><IconTrash class="w-4 h-4 mx-auto" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Special Hours Section -->
        <section class="mt-4">
          <div class="flex items-center gap-4 mb-4">
            <h2 class="text-sm font-medium text-gray-600 whitespace-nowrap">Horários especiais de funcionamento</h2>
            <div class="h-[1px] bg-ubots-yellow flex-1"></div>
            <div class="flex items-center gap-2">
              <button 
                @click="isHistoryModalOpen = true"
                class="bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded shadow-sm text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center gap-2 h-10"
              >
                Histórico <IconHistory class="w-4 h-4" />
              </button>
              <button 
                @click="openAddModal"
                class="bg-ubots-yellow text-ubots-blue px-6 py-2 rounded shadow-sm text-xs font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors flex items-center gap-2 h-10"
              >
                Adicionar Horário Especial <IconPlus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <SpecialHoursList 
            :items="activeSpecialHours" 
            @delete="handleDeleteSpecialHour" 
            @view="handleViewSpecialHour" 
            @edit="handleEditSpecialHour"
          />
          
          <div v-if="activeSpecialHours.length === 0" class="bg-white rounded shadow-sm p-8 text-center text-gray-500 text-sm">
            Nenhum horário especial ativo configurado.
          </div>
        </section>
      </main>

      <!-- History Side Drawer Modal -->
      <div v-if="isHistoryModalOpen" class="fixed inset-0 z-[60] flex justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isHistoryModalOpen = false"></div>
        
        <!-- Drawer Container -->
        <div class="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-gray-100 rounded-lg text-gray-600">
                 <IconHistory class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold text-gray-800">Histórico de Horários</h3>
            </div>
            <button @click="isHistoryModalOpen = false" class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <IconClose class="w-6 h-6" />
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-auto p-0">
            <div v-if="pastSpecialHours.length === 0" class="flex flex-col items-center justify-center h-64 text-gray-400">
               <IconHistory class="w-12 h-12 mb-4 opacity-20" />
               <p>Nenhum registro no histórico.</p>
            </div>
            <div v-else class="overflow-hidden">
               <table class="w-full text-left text-xs">
                 <thead class="bg-gray-50 text-gray-500 uppercase font-bold sticky top-0">
                   <tr>
                     <th class="px-6 py-4">Data Especial</th>
                     <th class="px-6 py-4 whitespace-nowrap">Data</th>
                     <th class="px-6 py-4">Horário</th>
                     <th class="px-6 py-4 text-center">Ações</th>
                   </tr>
                 </thead>
                 <tbody class="divide-y divide-gray-100">
                   <tr v-for="(item, idx) in pastSpecialHours" :key="idx" class="hover:bg-gray-50 transition-colors group">
                     <td class="px-6 py-4">
                        <div class="font-bold text-gray-800">{{ item.name }}</div>
                        <div class="flex gap-1 mt-1" v-if="item.repeatAnnualy">
                           <span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1 rounded uppercase font-bold">Anual</span>
                        </div>
                     </td>
                     <td class="px-6 py-4 text-gray-600 font-medium">
                        {{ item.date }}
                     </td>
                     <td class="px-6 py-4 text-gray-600">
                        <div v-if="item.hasWork" class="flex items-center gap-1">
                           <span class="w-1.5 h-1.5 bg-ubots-yellow rounded-full"></span>
                           {{ item.start }} - {{ item.end }}
                        </div>
                        <div v-else class="italic text-gray-400">Sem expediente</div>
                     </td>
                     <td class="px-6 py-4 text-center">
                        <button @click="handleViewSpecialHour(item)" class="text-gray-400 hover:text-ubots-blue transition-colors p-2 rounded-lg hover:bg-blue-50">
                           <IconEye class="w-5 h-5" />
                        </button>
                     </td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t bg-gray-50 flex justify-end">
            <button @click="isHistoryModalOpen = false" class="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors shadow-sm text-sm">
               Fechar Histórico
            </button>
          </div>
        </div>
      </div>


      <!-- Simulation Button -->
      <!-- Discreet Simulation Button -->
      <button 
        @click="simulateStatusChange"
        class="fixed bottom-3 right-3 bg-gray-100 text-gray-400 opacity-60 hover:opacity-100 hover:bg-gray-200 hover:text-gray-600 p-2 rounded-full transition-all z-50 flex items-center justify-center w-8 h-8"
        title="Simular Ciclo (Próximo Status do Item)"
      >
        <IconPlay class="w-4 h-4 ml-0.5" />
      </button>

      <SpecialHoursModal 
        :is-open="isModalOpen" 
        :initial-data="editingItem"
        @close="closeModal"
        @save="handleSaveSpecialHour"
      />

      <SpecialHoursDetailsModal
        :is-open="isDetailsModalOpen"
        :item="selectedSpecialHour"
        @close="isDetailsModalOpen = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SpecialHoursList from '@/components/SpecialHoursList.vue'
import SpecialHoursModal from '@/components/SpecialHoursModal.vue'
import SpecialHoursDetailsModal from '@/components/SpecialHoursDetailsModal.vue'

const isModalOpen = ref(false)
const isDetailsModalOpen = ref(false)
const isHistoryModalOpen = ref(false)
const selectedSpecialHour = ref({})
const editingIndex = ref(null)
const editingItem = ref(null)

const normalHours = [
  { days: ['D', 'S'], start: '00:00', end: '00:00', teams: ['suporte_n1:Suporte:suporte_n1:isa'], moreTeams: false },
  { days: ['S', 'T'], start: '08:00', end: '10:00', teams: ['suporte_n1:Suporte:suporte_n1:isa'], moreTeams: false },
  { days: ['S', 'T', 'Q', 'Q', 'S'], start: '07:30', end: '20:00', teams: ['teste_giovane:time_1', 'teste_giovane:time_4'], moreTeams: true },
  { days: ['S', 'T', 'Q', 'Q', 'S'], start: '08:00', end: '16:00', teams: ['suporte_n1:isa:duda', 'daniela_teste:dani_teste'], moreTeams: true },
  { days: ['S', 'T', 'Q', 'Q', 'S'], start: '11:00', end: '18:00', teams: ['deni_teste_2:time_do_deni_teste_2'], moreTeams: false },
  { days: ['S', 'T', 'Q', 'Q', 'S'], start: '08:00', end: '23:59', teams: ['Auditoria', 'Especialistas'], moreTeams: true },
  { days: ['S', 'T', 'Q', 'Q', 'S'], start: '14:00', end: '19:00', teams: ['gabriel_pacheco_teste:atendimento'], moreTeams: false },
]

// Start empty as requested
const specialHours = ref([])


// Helper to get raw date value for sorting
function getRawDate(dateStr) {
    if (!dateStr) return 0;
    const parts = dateStr.split(' - ');
    const d = parseDate(parts[0]);
    return d ? d.getTime() : 0;
}

// Filter logic for active items
const activeSpecialHours = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return specialHours.value
        .filter(item => {
            const dateStr = item.date;
            if (!dateStr) return true;

            const parts = dateStr.split(' - ');
            
            let endDate;
            if (parts.length > 1) {
                endDate = parseDate(parts[1]);
            } else {
                endDate = parseDate(parts[0]);
            }
            
            return endDate >= today;
        })
        .sort((a, b) => getRawDate(a.date) - getRawDate(b.date));
})

// Filter logic for past items (History)
const pastSpecialHours = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return specialHours.value
        .filter(item => {
            const dateStr = item.date;
            if (!dateStr) return false;

            const parts = dateStr.split(' - ');
            
            let endDate;
            if (parts.length > 1) {
                endDate = parseDate(parts[1]);
            } else {
                endDate = parseDate(parts[0]);
            }
            
            return endDate < today;
        })
        .sort((a, b) => getRawDate(b.date) - getRawDate(a.date)); // Most recent first for history
})

function parseDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function openAddModal() {
  editingIndex.value = null
  editingItem.value = null
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingIndex.value = null
  editingItem.value = null
}

function handleSaveSpecialHour(newHour) {
  if (editingIndex.value !== null) {
    specialHours.value[editingIndex.value] = newHour
  } else {
    specialHours.value.push(newHour)
  }
  closeModal()
}

function handleEditSpecialHour(item, idx) {
    const itemToEdit = activeSpecialHours.value[idx];
    const originalIndex = specialHours.value.findIndex(i => i === itemToEdit);
    
    if (originalIndex !== -1) {
        editingIndex.value = originalIndex;
        editingItem.value = itemToEdit;
        isModalOpen.value = true;
    }
}

function handleDeleteSpecialHour(idx) {
    const itemToDelete = activeSpecialHours.value[idx];
    const originalIndex = specialHours.value.findIndex(i => i === itemToDelete);
    if (originalIndex !== -1) {
        specialHours.value.splice(originalIndex, 1);
    }
}

function handleViewSpecialHour(item) {
    selectedSpecialHour.value = item;
    isDetailsModalOpen.value = true;
}

function simulateStatusChange() {
    // 1. If list is empty, refill.
    if (specialHours.value.length === 0) {
        const futureDate = '01/01/2027'; 
        specialHours.value = [
            {
                name: 'Evento Simulado 1 (Agendado)',
                date: futureDate,
                hasWork: true,
                start: '08:00',
                end: '18:00',
                teams: ['Simulação'],
                accounts: [],
                subaccounts: []
            },
             {
                name: 'Evento Simulado 2 (Agendado)',
                date: futureDate,
                hasWork: false,
                start: '',
                end: '',
                teams: ['Todos'],
                accounts: [],
                subaccounts: []
            }
        ];
        return;
    }

    // 2. Target the first item in the active list (which is now sorted)
    const targetItem = activeSpecialHours.value[0]; 
    
    if (!targetItem) {
        // refill with dummy data for simulation if empty
        const nextYear = new Date().getFullYear() + 1;
        specialHours.value = [
            {
                name: 'Evento Simulado 1 (Agendado)',
                date: `01/01/${nextYear}`,
                hasWork: true,
                start: '08:00',
                end: '18:00',
                teams: ['Simulação'],
                accounts: [],
                subaccounts: [],
                repeatAnnualy: true
            }
        ];
        return;
    }

    const originalIndex = specialHours.value.findIndex(i => i === targetItem);
    if (originalIndex === -1) return;

    const item = specialHours.value[originalIndex];

    // Determine current status based on date
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const parts = item.date.split(' - ');
    const startDate = parseDate(parts[0]);

    if (startDate > today) {
        // It is Future (Agendado) -> Move to Present (Em Execução)
        if (item.date.includes(' - ')) {
             item.date = `${todayStr} - ${todayStr}`; 
        } else {
            item.date = todayStr;
        }
        item.name = item.name.replace('(Agendado)', '(Em Execução)');
    } else {
        // It is Present (Em Execução) or Past
        if (item.repeatAnnualy) {
            // Annual Logic: Increment year and go back to "Agendado"
            const currentParts = item.date.split(' - ');
            
            const incrementYear = (dStr) => {
                const parts = dStr.split('/');
                return `${parts[0]}/${parts[1]}/${parseInt(parts[2]) + 1}`;
            };

            if (currentParts.length > 1) {
                item.date = `${incrementYear(currentParts[0])} - ${incrementYear(currentParts[1])}`;
            } else {
                item.date = incrementYear(currentParts[0]);
            }
            item.name = item.name.replace('(Em Execução)', '(Agendado)');
            // Note: Computed properties will re-sort this automatically
        } else {
            // Non-annual items simply remain in history (already handled by filter)
            // But if we want to "complete" them in simulation, they just stay past.
            // Actually, simulateStatusChange should probably move the date to yesterday for non-annual
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = `${String(yesterday.getDate()).padStart(2, '0')}/${String(yesterday.getMonth() + 1).padStart(2, '0')}/${yesterday.getFullYear()}`;
            
            if (item.date.includes(' - ')) {
                item.date = `${yesterdayStr} - ${yesterdayStr}`;
            } else {
                item.date = yesterdayStr;
            }
            item.name = item.name.replace('(Em Execução)', '(Concluído)');
        }
    }
}

// Inline SVGs for icons
const IconDashboard = () => h('svg', { viewBox: '0 0 24 24', fill: 'white', class: 'w-5 h-5' }, [h('path', { d: 'M13 3v6h8V3h-8zM3 21h8v-6H3v6zM3 13h8V3H3v10zm10 8h8v-10h-8v10z' })])
const IconAnalytic = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': '2' }, [h('path', { d: 'M3 3v18h18M7 16l4-4 4 4 5-8' })])
const IconDocument = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': '2' }, [h('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }), h('path', { d: 'M14 2v6h6' })])
const IconChat = () => h('svg', { viewBox: '0 0 24 24', fill: 'white' }, [h('path', { d: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' })])
const IconMail = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': '2' }, [h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), h('path', { d: 'M22 6l-10 7L2 6' })])
const IconMegaphone = () => h('svg', { viewBox: '0 0 24 24', fill: 'white' }, [h('path', { d: 'M12 8L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 8z' })]) // Simplified
const IconBot = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'white' }, [h('path', { d: 'M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a2 2 0 012 2v3a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z' })])
const IconSettings = () => h('svg', { viewBox: '0 0 24 24', fill: 'white' }, [h('path', { d: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0 .59-.22L2.74 8.87a.49.49 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z' })])
const IconLayers = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': '2' }, [h('path', { d: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' })])
const IconInfo = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'white', 'stroke-width': '2' }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('path', { d: 'M12 16v-4M12 8h.01' })])

const IconPuzzle = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [h('path', { d: 'M12 1a4 4 0 014 4 4 4 0 014 4h2v7h-2a4 4 0 01-4 4 4 4 0 01-4 4H5v-4a4 4 0 01-4-4 4 4 0 014-4V5H12M12 3H7v4h2a2 2 0 002 2 2 2 0 002-2H11a4 4 0 014 4z' })]) // Abstracted
const IconCamera = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [h('path', { d: 'M12 8a3 3 0 100 6 3 3 0 000-6zm7.23-2.14l-1.46-3.14A1 1 0 0016.9 2H7.1a1 1 0 00-.87.72L4.77 5.86A2 2 0 013 7v12a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 01-1.77-1.14zM12 16a5 5 0 110-10 5 5 0 010 10z' })])
const IconBell = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [h('path', { d: 'M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V10a6 6 0 00-5-5.91V3a1 1 0 00-2 0v1.09A6 6 0 006 10v6l-2 2v1h16v-1l-2-2z' })])
const IconHelp = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [h('path', { d: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2c0-3.33 3-3.33 3-5a2 2 0 00-4 0h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.5-3 5z' })])
const IconUser = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', class: 'w-5 h-5' }, [h('path', { d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' })])
const IconLogout = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', class: 'w-5 h-5' }, [h('path', { d: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9' })])

const IconClock = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('path', { d: 'M12 6v6l4 2' })])
const IconPencil = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z' })])
const IconTrash = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6' })])
const IconPlus = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '3', ...props }, [h('path', { d: 'M12 5v14M5 12h14' })])
const IconPlay = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', ...props }, [h('path', { d: 'M8 5v14l11-7z' })])
const IconHelpCircle = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', ...props }, [h('path', { d: 'M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-2h2zm0-3.13V13a1 1 0 01-2 0v-1.23a1 1 0 01.65-.94A2 2 0 1011 9a1 1 0 01-2 0 4 4 0 115.17 3.84 1 1 0 01-.17.03z' })])

const IconHistory = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })])
const IconClose = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M6 18L18 6M6 6l12 12' })])
const IconEye = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }), h('circle', { cx: '12', cy: '12', r: '3' })])
</script>

<style>
/* Custom thin scrollbar for a cleaner look */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #CBD5E0;
}
</style>
