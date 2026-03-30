<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import { ChevronRight } from 'lucide-vue-next'
  import { Separator } from '@/components/ui/separator'
  import PopoverMenuItem from './PopoverMenuItem.vue'

  export interface DatePresetOption {
    key: string
    label: string
    icon?: Component
    iconClass?: HTMLAttributes['class']
  }

  defineProps<{
    /** Available date presets */
    options: DatePresetOption[]
    /** Currently selected preset key, or null for "Show all" */
    modelValue: string | null
    /** Show "Date range" drill-down option */
    showDateRange?: boolean
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: string | null]
    dateRange: []
  }>()
</script>

<template>
  <div class="flex flex-col">
    <!-- Show all -->
    <div class="px-1 py-1">
      <PopoverMenuItem
        label="Show all"
        :selected="modelValue == null"
        @click="emit('update:modelValue', null)"
      />
    </div>

    <Separator class="bg-border" />

    <!-- Presets -->
    <div class="px-1 py-1">
      <PopoverMenuItem
        v-for="option in options"
        :key="option.key"
        :label="option.label"
        :icon="option.icon"
        :icon-class="option.iconClass"
        :selected="modelValue === option.key"
        @click="emit('update:modelValue', option.key)"
      />
    </div>

    <!-- Date range -->
    <template v-if="showDateRange">
      <Separator class="bg-border" />
      <div class="px-1 py-1">
        <PopoverMenuItem label="Date range" @click="emit('dateRange')">
          <template #trailing>
            <ChevronRight class="size-3.5 shrink-0 text-foreground-tertiary" />
          </template>
        </PopoverMenuItem>
      </div>
    </template>
  </div>
</template>
