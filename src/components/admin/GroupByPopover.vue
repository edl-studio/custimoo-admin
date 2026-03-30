<script setup lang="ts">
  import type { Component } from 'vue'
  import { X } from 'lucide-vue-next'
  import { Separator } from '@/components/ui/separator'
  import PopoverMenuItem from './PopoverMenuItem.vue'

  export interface GroupByOption {
    key: string
    label: string
    icon?: Component
  }

  defineProps<{
    /** Available grouping options */
    options: GroupByOption[]
    /** Currently selected group key, or null for no grouping */
    modelValue: string | null
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: string | null]
  }>()
</script>

<template>
  <div class="flex flex-col">
    <!-- Header -->
    <div class="px-4 pb-1 pt-3 text-xs font-medium text-foreground-tertiary">Group by</div>

    <!-- Options -->
    <div class="px-1 py-1">
      <PopoverMenuItem
        v-for="option in options"
        :key="option.key"
        :label="option.label"
        :icon="option.icon"
        :selected="modelValue === option.key"
        @click="emit('update:modelValue', option.key)"
      />
    </div>

    <!-- Remove grouping -->
    <Separator class="bg-border" />
    <div class="px-1 py-1">
      <PopoverMenuItem
        label="Remove grouping"
        :icon="X"
        :disabled="modelValue == null"
        @click="emit('update:modelValue', null)"
      />
    </div>
  </div>
</template>
