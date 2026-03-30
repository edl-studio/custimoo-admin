<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import { computed, ref } from 'vue'
  import { Search } from 'lucide-vue-next'
  import { Separator } from '@/components/ui/separator'
  import PopoverMenuItem from './PopoverMenuItem.vue'

  export interface ChecklistOption {
    key: string
    label: string
    count?: number
    icon?: Component
    iconClass?: HTMLAttributes['class']
  }

  const props = withDefaults(
    defineProps<{
      /** Available options */
      options: ChecklistOption[]
      /** Currently selected keys */
      modelValue: string[]
      /** Show search input */
      searchable?: boolean
    }>(),
    {
      searchable: false
    }
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string[]]
  }>()

  const query = ref('')

  const allSelected = computed(() => props.modelValue.length === 0)

  const filteredOptions = computed(() => {
    if (!query.value) return props.options
    const q = query.value.toLowerCase()
    return props.options.filter(o => o.label.toLowerCase().includes(q))
  })

  function isChecked(key: string) {
    return props.modelValue.includes(key)
  }

  function toggle(key: string) {
    if (isChecked(key)) {
      emit(
        'update:modelValue',
        props.modelValue.filter(k => k !== key)
      )
    } else {
      emit('update:modelValue', [...props.modelValue, key])
    }
  }

  function showAll() {
    emit('update:modelValue', [])
  }
</script>

<template>
  <div class="flex flex-col">
    <!-- Search -->
    <div v-if="searchable" class="p-1">
      <div class="flex h-9 items-center gap-2 rounded-md px-3">
        <Search class="size-3.5 shrink-0 text-foreground-tertiary" />
        <input
          v-model="query"
          type="text"
          placeholder="Search"
          class="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-content-placeholder focus:outline-none"
        />
      </div>
    </div>

    <Separator v-if="searchable" class="bg-border" />

    <!-- Show all -->
    <div class="px-1 py-1">
      <PopoverMenuItem label="Show all" :selected="allSelected" @click="showAll" />
    </div>

    <Separator class="bg-border" />

    <!-- Options -->
    <div class="max-h-72 overflow-y-auto px-1 py-1">
      <PopoverMenuItem
        v-for="option in filteredOptions"
        :key="option.key"
        :label="option.label"
        :icon="option.icon"
        :icon-class="option.iconClass"
        :count="option.count"
        :checked="isChecked(option.key)"
        @click="toggle(option.key)"
        @update:checked="toggle(option.key)"
      >
        <template v-if="$slots.leading" #leading>
          <slot name="leading" :option="option" />
        </template>
      </PopoverMenuItem>
    </div>
  </div>
</template>
