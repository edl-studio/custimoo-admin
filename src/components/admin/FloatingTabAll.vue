<script setup lang="ts">
  import { ref, computed, nextTick, watch } from 'vue'
  import type { HTMLAttributes } from 'vue'
  import { ChevronUp, ChevronDown, Copy, Hash, Search, X } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'
  import type { SheetState } from '@/composables/useSheet'

  const props = defineProps<{
    sheets: SheetState[]
    getLabel: (sheet: SheetState) => string
    getId: (sheet: SheetState) => string
    getFlagColor?: (sheet: SheetState) => string | undefined
    class?: HTMLAttributes['class']
  }>()

  const emit = defineEmits<{
    restore: [id: string]
    close: [id: string]
  }>()

  const expanded = ref(false)
  const searchQuery = ref('')
  const searchInput = ref<HTMLInputElement>()

  const filteredSheets = computed(() => {
    if (!searchQuery.value) return props.sheets
    const q = searchQuery.value.toLowerCase()
    return props.sheets.filter(s => {
      const label = props.getLabel(s).toLowerCase()
      const id = props.getId(s).toLowerCase()
      return label.includes(q) || id.includes(q)
    })
  })

  function toggle() {
    expanded.value = !expanded.value
    if (expanded.value) {
      nextTick(() => searchInput.value?.focus())
    } else {
      searchQuery.value = ''
    }
  }

  watch(expanded, val => {
    if (!val) searchQuery.value = ''
  })
</script>

<template>
  <div
    :class="
      cn(
        'relative flex flex-col shrink-0',
        'rounded-t-lg border border-b-0 border-border bg-muted',
        'shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.06),0_0_6px_rgba(0,0,0,0.02)]',
        'transition-all duration-200 ease-out',
        expanded ? 'w-80 bg-card' : 'w-auto',
        props.class
      )
    "
  >
    <!-- Collapsed: trigger button -->
    <button
      type="button"
      :class="
        cn(
          'flex h-11 shrink-0 cursor-pointer items-center gap-1',
          'pl-3 pr-1 py-1',
          'transition-colors duration-150',
          !expanded && 'hover:bg-controls-hover rounded-t-lg'
        )
      "
      @click="toggle"
    >
      <div class="flex items-center gap-1.5">
        <Copy class="size-4 text-foreground-tertiary" />
        <span class="text-sm font-medium text-foreground">All tabs</span>
      </div>
      <div class="flex size-8 items-center justify-center rounded-lg">
        <ChevronDown v-if="expanded" class="size-4 text-foreground-tertiary" />
        <ChevronUp v-else class="size-4 text-foreground-tertiary" />
      </div>
    </button>

    <!-- Expanded: drawer content -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[480px] opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="max-h-[480px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="expanded" class="overflow-hidden">
        <!-- Search -->
        <div class="border-t border-border px-3 py-2">
          <div class="flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5">
            <Search class="size-4 shrink-0 text-foreground-tertiary" />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-content-placeholder"
            />
          </div>
        </div>

        <!-- Tab list -->
        <div class="max-h-[360px] overflow-y-auto px-1 py-1">
          <button
            v-for="sheet in filteredSheets"
            :key="sheet.id"
            type="button"
            class="group flex w-full cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 hover:bg-accent"
            @click="emit('restore', sheet.id)"
          >
            <!-- Icon slot -->
            <div class="flex size-6 shrink-0 items-center justify-center">
              <slot name="icon" :sheet="sheet" />
            </div>

            <!-- Content -->
            <div class="flex min-w-0 flex-1 items-center gap-1">
              <div
                v-if="getFlagColor?.(sheet)"
                class="size-2 shrink-0 rounded-full"
                :style="{ backgroundColor: getFlagColor!(sheet) }"
              />
              <Hash class="size-3 shrink-0 text-foreground-tertiary" />
              <span class="shrink-0 text-sm text-foreground-tertiary">{{ getId(sheet) }}</span>
              <span class="truncate text-sm font-medium text-foreground">
                {{ getLabel(sheet) }}
              </span>
            </div>

            <!-- Close -->
            <div
              class="flex size-6 shrink-0 items-center justify-center rounded opacity-0 hover:bg-controls-hover group-hover:opacity-100"
              @click.stop="emit('close', sheet.id)"
            >
              <X class="size-3.5 text-foreground-tertiary" />
            </div>
          </button>

          <div
            v-if="filteredSheets.length === 0"
            class="px-3 py-6 text-center text-sm text-foreground-tertiary"
          >
            No tabs found
          </div>
        </div>

        <!-- Footer hint -->
        <div class="border-t border-border px-3 py-2">
          <p class="text-xs text-foreground-tertiary">
            Use <kbd class="rounded border border-border px-1 font-mono text-[10px]">&uarr;</kbd>
            <kbd class="rounded border border-border px-1 font-mono text-[10px]">&darr;</kbd>
            and
            <kbd class="rounded border border-border px-1 font-mono text-[10px]">Enter</kbd>
            to navigate in tabs
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
