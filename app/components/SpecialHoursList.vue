<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div 
      v-for="(item, idx) in items" 
      :key="idx" 
      @click="$emit('view', item)"
      class="group relative rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
      :class="[
        item.repeatAnnualy ? 'border-amber-200 bg-amber-50/30' : 'bg-white border-gray-100'
      ]"
    >
      <!-- Status Strip -->
      <div 
        class="absolute left-0 top-0 bottom-0 w-1"
        :class="getStatusColor(item)"
      ></div>

      <div class="p-3 pl-4 flex flex-col h-full relative">
        <!-- Header Row: Date & Status -->
        <div class="flex justify-between items-center mb-2">
           <div class="flex items-center gap-2">
             <div class="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                <IconCalendar class="w-3 h-3" />
                {{ item.date }}
             </div>
              <!-- Status Badge -->
              <div 
                 v-if="getStatusLabel(item)"
                 class="text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide"
                 :class="getStatusBadgeClass(item)"
              >
                 {{ getStatusLabel(item) }}
              </div>
              <!-- Annual Badge -->
              <div 
                v-if="item.repeatAnnualy"
                class="text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-200 bg-amber-50 text-amber-700 uppercase tracking-wide flex items-center gap-1"
                title="Repete anualmente"
              >
                <IconRepeat class="w-2.5 h-2.5" />
                Anual
              </div>
            </div>

          <div class="flex items-center gap-1">
            <button 
              @click.stop="$emit('edit', item, idx)"
              class="text-gray-300 hover:text-ubots-blue transition-colors p-1"
              title="Editar horário especial"
            >
              <IconEdit class="w-4 h-4" />
            </button>
            <button 
              @click.stop="$emit('delete', idx)"
              class="text-gray-300 hover:text-red-500 transition-colors p-1 -mr-1"
              title="Remover horário especial"
            >
              <IconTrash class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Title -->
        <h3 class="font-bold text-gray-800 text-[11px] mb-1 line-clamp-1" :title="item.name">
          {{ item.name }}
        </h3>

        <!-- Time Info -->
        <div class="text-[10px] text-gray-600 mb-2 flex items-center gap-1.5">
           <template v-if="item.hasWork">
             <IconClock class="w-3 h-3 text-ubots-yellow" />
             <span>{{ item.start }} às {{ item.end }}</span>
           </template>
           <template v-else>
             <IconCoffee class="w-3 h-3 text-gray-400" />
             <span class="text-gray-500 italic">Sem expediente</span>
           </template>
        </div>

        <!-- Tags / Footer (Counters) -->
        <div class="mt-auto pt-2 border-t border-gray-50 flex items-center gap-2">
             <span v-if="item.accounts && item.accounts.length" class="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-100">
               {{ item.accounts.length }} Conta{{ item.accounts.length > 1 ? 's' : '' }}
             </span>
             <span v-if="item.subaccounts && item.subaccounts.length" class="inline-flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium border border-indigo-100">
               {{ item.subaccounts.length }} Subconta{{ item.subaccounts.length > 1 ? 's' : '' }}
             </span>
              <span v-if="item.teams && item.teams.length" class="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium border border-amber-100">
               {{ item.teams.length }} Time{{ item.teams.length > 1 ? 's' : '' }}
             </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

defineEmits(['delete', 'view', 'edit'])

function parseDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split(' - ');
    const firstDateParts = parts[0].split('/');
    if (firstDateParts.length !== 3) return null;
    return new Date(firstDateParts[2], firstDateParts[1] - 1, firstDateParts[0]);
}

function getStatusLabel(item) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateStr = item.date;
    if (!dateStr) return '';

    const parts = dateStr.split(' - ');
    const startDate = parseDate(parts[0]);
    let endDate = startDate;

    if (parts.length > 1) {
        endDate = parseDate(parts[1]);
    }
    
    if (!startDate) return '';

    if (today >= startDate && today <= endDate) {
        return 'Em execução';
    } else if (today < startDate) {
        return 'Agendado';
    }
    return ''; 
}

function getStatusBadgeClass(item) {
    const status = getStatusLabel(item);
    if (status === 'Em execução') {
        return 'bg-green-100 text-green-700 border-green-200';
    }
    if (status === 'Agendado') {
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
    if (status === 'Concluído') {
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
    return '';
}

function getStatusColor(item) {
    const status = getStatusLabel(item);
    if (status === 'Em execução') return 'bg-green-500';
    if (status === 'Agendado') return 'bg-blue-500';
    if (status === 'Concluído') return 'bg-gray-400';
    return item.hasWork ? 'bg-ubots-yellow' : 'bg-gray-300';
}

// Icons
const IconCalendar = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }), h('path', { d: 'M16 2v4M8 2v4M3 10h18' })])
const IconClock = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('path', { d: 'M12 6v6l4 2' })])
const IconTrash = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6' })])
const IconEdit = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z' })])
const IconCoffee = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', ...props }, [h('path', { d: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z' }), h('line', { x1: '6', y1: '1', x2: '6', y2: '4' }), h('line', { x1: '10', y1: '1', x2: '10', y2: '4' }), h('line', { x1: '14', y1: '1', x2: '14', y2: '4' })])
const IconRepeat = (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '3', ...props }, [h('path', { d: 'M17 1l4 4-4 4' }), h('path', { d: 'M3 11V9a4 4 0 014-4h14' }), h('path', { d: 'M7 23l-4-4 4-4' }), h('path', { d: 'M21 13v2a4 4 0 01-4 4H3' })])
</script>
