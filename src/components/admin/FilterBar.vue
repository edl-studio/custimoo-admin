<script setup lang="ts">
  import { ref, computed, onMounted, nextTick, watch } from 'vue'
  import { useResizeObserver } from '@vueuse/core'
  import { ChevronRight, SlidersHorizontal } from 'lucide-vue-next'
  import type { Component } from 'vue'
  import FilterChip from './FilterChip.vue'
  import PopoverMenuItem from './PopoverMenuItem.vue'
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

  export interface FilterDef {
    key: string
    label: string
    icon: Component
  }

  const props = defineProps<{
    /** Filter definitions to render */
    filters: FilterDef[]
    /** Currently active filters (key → selected value or null) */
    activeFilters: Record<string, string | null>
  }>()

  const emit = defineEmits<{
    'filter-click': [key: string]
    'filter-clear': [key: string]
  }>()

  const containerRef = ref<HTMLElement>()
  const measureRef = ref<HTMLElement>()
  const visibleCount = ref(props.filters.length)
  const overflowOpen = ref(false)

  function isSelected(key: string): boolean {
    return key in props.activeFilters
  }

  function getValue(key: string): string | undefined {
    return props.activeFilters[key] ?? undefined
  }

  const visibleFilters = computed(() => props.filters.slice(0, visibleCount.value))
  const overflowFilters = computed(() => props.filters.slice(visibleCount.value))
  const overflowActiveCount = computed(
    () => overflowFilters.value.filter(f => isSelected(f.key)).length
  )

  function recalculate() {
    const container = containerRef.value
    const measure = measureRef.value
    if (!container || !measure) return

    const availableWidth = container.clientWidth
    const gap = 8 // gap-2

    // Measure individual filter widths from the hidden row
    const items = measure.querySelectorAll('[data-filter-measure]')
    const overflowBtn = measure.querySelector('[data-overflow-measure]')
    const widths: number[] = Array.from(items).map(el => (el as HTMLElement).offsetWidth)
    const overflowBtnWidth = overflowBtn ? (overflowBtn as HTMLElement).offsetWidth : 110

    // Check if all filters fit without the overflow button
    let total = 0
    let allFit = true
    for (let i = 0; i < widths.length; i++) {
      total += (widths[i] ?? 0) + (i > 0 ? gap : 0)
      if (total > availableWidth) {
        allFit = false
        break
      }
    }

    if (allFit) {
      visibleCount.value = props.filters.length
      return
    }

    // Not all fit — reserve space for the overflow button
    total = overflowBtnWidth
    let count = 0
    for (let i = 0; i < widths.length; i++) {
      const needed = (widths[i] ?? 0) + gap
      if (total + needed <= availableWidth) {
        total += needed
        count++
      } else {
        break
      }
    }

    visibleCount.value = Math.max(0, count)
  }

  useResizeObserver(containerRef, () => recalculate())

  onMounted(async () => {
    await nextTick()
    recalculate()
  })

  // Recalculate when active filters change (selected state may affect chip width)
  watch(
    () => props.activeFilters,
    async () => {
      await nextTick()
      recalculate()
    },
    { deep: true }
  )
</script>

<template>
  <div ref="containerRef" class="relative flex min-w-0 flex-1 items-center gap-2">
    <!-- Hidden measurement row (always renders all filters to get accurate widths) -->
    <div
      ref="measureRef"
      class="pointer-events-none invisible absolute left-0 top-0 flex items-center gap-2"
      aria-hidden="true"
    >
      <FilterChip
        v-for="filter in filters"
        :key="filter.key"
        :label="filter.label"
        :icon="filter.icon"
        :selected="isSelected(filter.key)"
        :value="getValue(filter.key)"
        :type="isSelected(filter.key) ? 'chip' : 'dropdown'"
        data-filter-measure
      />
      <FilterChip label="Filters" :icon="SlidersHorizontal" type="dropdown" data-overflow-measure />
    </div>

    <!-- Visible inline filters -->
    <FilterChip
      v-for="filter in visibleFilters"
      :key="filter.key"
      :label="filter.label"
      :icon="filter.icon"
      :selected="isSelected(filter.key)"
      :value="getValue(filter.key)"
      :type="isSelected(filter.key) ? 'chip' : 'dropdown'"
      @click="emit('filter-click', filter.key)"
      @clear="emit('filter-clear', filter.key)"
    />

    <!-- Overflow "Filters" button + nested popover -->
    <Popover v-if="overflowFilters.length > 0" v-model:open="overflowOpen">
      <PopoverTrigger as-child>
        <FilterChip
          label="Filters"
          :icon="SlidersHorizontal"
          :count="overflowActiveCount || undefined"
          type="dropdown"
        />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        :side-offset="4"
        :collision-padding="8"
        class="flex w-52 flex-col rounded-lg border border-border bg-card p-0 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        <div class="max-h-72 overflow-y-auto px-1 py-1">
          <!-- Each overflow filter opens a nested sub-popover -->
          <Popover v-for="filter in overflowFilters" :key="filter.key">
            <PopoverTrigger as-child>
              <PopoverMenuItem
                :label="filter.label"
                :icon="filter.icon"
                :class="isSelected(filter.key) && '[&>svg:first-child]:text-primary'"
              >
                <template #trailing>
                  <ChevronRight class="size-3.5 shrink-0 text-foreground-tertiary" />
                </template>
              </PopoverMenuItem>
            </PopoverTrigger>

            <!-- Nested sub-popover (opens to the side) -->
            <PopoverContent
              side="right"
              align="start"
              :side-offset="2"
              :collision-padding="8"
              class="w-52 rounded-lg border border-border bg-card p-1 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            >
              <!-- Placeholder — per-filter options will go here -->
              <div class="px-3 py-6 text-center text-sm text-foreground-tertiary">
                {{ filter.label }} options
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
