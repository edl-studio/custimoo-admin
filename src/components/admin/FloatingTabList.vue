<script setup lang="ts">
  import { ref, computed, nextTick, watch } from 'vue'
  import type { HTMLAttributes } from 'vue'
  import { ChevronUp, ChevronDown, Copy, Ellipsis, Search, X } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'
  import TextInput from './TextInput.vue'
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
  const wide = ref(false)
  const searchQuery = ref('')
  const searchInput = ref<InstanceType<typeof TextInput>>()

  const filteredSheets = computed(() => {
    if (!searchQuery.value) return props.sheets
    const q = searchQuery.value.toLowerCase()
    return props.sheets.filter(s => {
      const label = props.getLabel(s).toLowerCase()
      const id = props.getId(s).toLowerCase()
      return label.includes(q) || id.includes(q)
    })
  })

  const hasSheets = computed(() => props.sheets.length > 0)

  const WIDTH_DURATION = 300

  function toggle() {
    if (!expanded.value) {
      wide.value = true
      setTimeout(() => {
        expanded.value = true
        nextTick(() => {
          const input = searchInput.value?.$el?.querySelector('input') as HTMLInputElement | null
          input?.focus()
        })
      }, WIDTH_DURATION)
    } else {
      expanded.value = false
      searchQuery.value = ''
    }
  }

  function onAfterLeave() {
    wide.value = false
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
        'rounded-t-lg border border-b-0 border-border overflow-hidden',
        'shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.06),0_0_6px_rgba(0,0,0,0.02)]',
        'transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        wide ? 'w-80' : 'w-40',
        'bg-muted',
        props.class
      )
    "
  >
    <!-- Header: pt-3 pb-2 pl-4 pr-2 (Figma: 12/8/16/8) -->
    <div
      :class="
        cn(
          'flex shrink-0 items-center justify-between',
          expanded
            ? 'cursor-pointer border-b border-border pt-3 pb-2 pl-4 pr-2'
            : 'h-11 pl-3 pr-1 py-1 cursor-pointer rounded-t-lg'
        )
      "
      @click="toggle()"
    >
      <div class="flex items-center gap-1.5">
        <Copy class="size-4 text-foreground-tertiary" />
        <span class="text-sm font-medium text-foreground">All tabs</span>
      </div>
      <div class="flex items-center">
        <button
          v-if="expanded"
          type="button"
          class="flex size-8 cursor-pointer items-center justify-center rounded-lg hover:bg-controls-hover"
          @click.stop
        >
          <Ellipsis class="size-4 text-foreground-tertiary" />
        </button>
        <div class="flex size-8 items-center justify-center rounded-lg">
          <ChevronDown v-if="expanded" class="size-4 text-foreground-tertiary" />
          <ChevronUp v-else class="size-4 text-foreground-tertiary" />
        </div>
      </div>
    </div>

    <!-- Expanded: drawer content (grid-rows trick for smooth height animation) -->
    <Transition
      enter-active-class="tab-drawer-enter-active"
      enter-from-class="tab-drawer-enter-from"
      enter-to-class="tab-drawer-enter-to"
      leave-active-class="tab-drawer-leave-active"
      leave-from-class="tab-drawer-enter-to"
      leave-to-class="tab-drawer-enter-from"
      @after-leave="onAfterLeave"
    >
      <div v-if="expanded" class="grid">
        <div class="overflow-hidden">
          <!-- Empty state -->
          <div v-if="!hasSheets" class="flex flex-col items-center px-4 pt-8 pb-8 gap-5">
            <!-- Info section -->
            <div class="flex flex-col items-center gap-2">
              <img src="/illustrations/drawer.png" alt="" class="size-14" />
              <p class="text-sm font-medium text-foreground text-center">
                Organize your tabs in this space
              </p>
              <p class="text-xs text-foreground-tertiary text-center">
                Any drawer you minimize will create a tab here, making it easy to keep things tidy.
              </p>
            </div>

            <!-- Skeleton tabs -->
            <div class="flex w-full flex-col gap-2">
              <div class="h-11 w-full rounded-lg border border-border bg-card px-3 py-3">
                <div class="h-5 w-full rounded-full bg-muted" />
              </div>
              <div class="h-11 w-full rounded-lg border border-border bg-card px-3 py-3">
                <div class="h-5 w-full rounded-full bg-muted" />
              </div>
            </div>
          </div>

          <!-- Populated state -->
          <template v-else>
            <!-- Search + tab list group -->
            <div class="flex flex-col gap-3 px-4 pt-3 pb-4">
              <!-- Search -->
              <TextInput
                ref="searchInput"
                v-model="searchQuery"
                placeholder="Search..."
                size="compact"
              >
                <template #icon>
                  <Search class="size-4 text-muted-foreground" />
                </template>
              </TextInput>

              <!-- Tab cards -->
              <div class="max-h-[304px] overflow-y-auto">
                <div class="flex flex-col gap-1.5">
                  <button
                    v-for="sheet in filteredSheets"
                    :key="sheet.id"
                    type="button"
                    class="group relative flex h-11 w-full cursor-pointer items-center gap-1 overflow-hidden rounded-lg border border-border bg-card px-3"
                    @click="emit('restore', sheet.id)"
                  >
                    <!-- Flag bar -->
                    <div
                      v-if="getFlagColor?.(sheet)"
                      class="absolute left-0 top-0 h-full w-1"
                      :style="{ backgroundColor: getFlagColor!(sheet) }"
                    />

                    <!-- Icon slot -->
                    <div class="flex size-6 shrink-0 items-center justify-center">
                      <slot name="icon" :sheet="sheet" />
                    </div>

                    <!-- Content -->
                    <div class="flex min-w-0 flex-1 items-center gap-1">
                      <span class="shrink-0 text-sm text-foreground-tertiary">{{
                        getId(sheet)
                      }}</span>
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
                </div>

                <div
                  v-if="filteredSheets.length === 0"
                  class="px-3 py-6 text-center text-sm text-foreground-tertiary"
                >
                  No tabs found
                </div>
              </div>
            </div>

            <!-- Footer hint -->
            <div class="px-4 pb-3">
              <p class="flex items-center gap-1 text-xs text-foreground-tertiary">
                Use
                <kbd
                  class="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1 text-[11px]"
                  >&uarr;</kbd
                >
                <kbd
                  class="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1 text-[11px]"
                  >&darr;</kbd
                >
                and
                <kbd
                  class="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1.5 text-[11px] leading-none"
                  >Enter</kbd
                >
                to navigate in tabs
              </p>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  /* Grid-rows trick: animate 0fr → 1fr for smooth height transitions */
  .tab-drawer-enter-from,
  .tab-drawer-leave-to {
    grid-template-rows: 0fr;
    opacity: 0;
  }

  .tab-drawer-enter-to {
    grid-template-rows: 1fr;
    opacity: 1;
  }

  .tab-drawer-enter-active {
    transition:
      grid-template-rows 350ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 300ms ease 50ms;
  }

  .tab-drawer-leave-active {
    transition:
      grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 200ms ease;
  }
</style>
