<script setup lang="ts">
  import type { Component } from 'vue'
  import { X, Ellipsis } from 'lucide-vue-next'
  import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
  import { Button } from '@/components/ui/button'

  export interface BulkActionMenuItem {
    label: string
    icon?: Component
    variant?: 'default' | 'destructive'
    onClick: () => void
  }

  defineProps<{
    /** Number of selected items */
    count: number
    /** Label for the selected items (e.g. "orders", "products") */
    itemLabel: string
    /** Menu items for the three-dot overflow popover */
    menuItems?: BulkActionMenuItem[]
  }>()

  const emit = defineEmits<{
    close: []
  }>()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="count > 0"
      class="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit items-center gap-[7.75rem] rounded-lg border border-border bg-container px-4 py-3 text-sm text-foreground shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <!-- Counter -->
      <span class="whitespace-nowrap font-semibold"> {{ count }} {{ itemLabel }} selected </span>

      <!-- Trailing: actions + overflow + close -->
      <div class="flex items-center gap-3">
        <!-- Action slot + overflow menu -->
        <div class="flex items-center gap-1.5">
          <slot />

          <!-- Overflow menu -->
          <Popover v-if="menuItems?.length">
            <PopoverTrigger as-child>
              <Button variant="default" size="icon">
                <Ellipsis class="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" :side-offset="8" align="end" class="w-auto min-w-48 p-1">
              <button
                v-for="item in menuItems"
                :key="item.label"
                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
                :class="
                  item.variant === 'destructive'
                    ? 'text-destructive hover:bg-secondary'
                    : 'text-foreground hover:bg-secondary'
                "
                @click="item.onClick"
              >
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="size-3.5 shrink-0"
                  :class="
                    item.variant === 'destructive' ? 'text-destructive' : 'text-foreground-tertiary'
                  "
                />
                {{ item.label }}
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <!-- Close -->
        <Button variant="ghost" size="icon" @click="emit('close')">
          <X class="size-4" />
        </Button>
      </div>
    </div>
  </Transition>
</template>
