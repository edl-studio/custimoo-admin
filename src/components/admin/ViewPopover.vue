<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Columns2, ListFilter, Check, Globe, Link, Trash2, CircleHelp } from 'lucide-vue-next'
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
  import { Checkbox } from '@/components/ui/checkbox'
  import { Switch } from '@/components/ui/switch'
  import { Separator } from '@/components/ui/separator'
  import { Button } from '@/components/ui/button'

  const props = defineProps<{
    viewName?: string
    color?: string
    includeColumns?: boolean
    includeFilters?: boolean
    editing?: boolean
  }>()

  const emit = defineEmits<{
    save: [
      payload: { name: string; color: string; includeColumns: boolean; includeFilters: boolean }
    ]
    delete: []
    copyLink: []
  }>()

  const isEditing = computed(
    () => props.editing === true || (props.editing == null && !!props.viewName)
  )

  const open = ref(false)
  const viewName = ref(props.viewName ?? '')
  const selectedColor = ref(props.color ?? '#6366f1')
  const columns = ref(props.includeColumns ?? true)
  const filters = ref(props.includeFilters ?? true)
  const isGlobal = ref(false)

  const colors = [
    { value: 'none', bg: 'transparent', border: '#DCD1C6' },
    { value: '#ef4444', bg: '#ef4444', border: '#ef4444' },
    { value: '#ec4899', bg: '#ec4899', border: '#ec4899' },
    { value: '#f97316', bg: '#f97316', border: '#f97316' },
    { value: '#eab308', bg: '#eab308', border: '#eab308' },
    { value: '#22c55e', bg: '#22c55e', border: '#22c55e' },
    { value: '#14b8a6', bg: '#14b8a6', border: '#14b8a6' },
    { value: '#6366f1', bg: '#6366f1', border: '#6366f1' }
  ]

  watch(open, isOpen => {
    if (isOpen) {
      viewName.value = props.viewName ?? ''
      selectedColor.value = props.color ?? '#6366f1'
      columns.value = props.includeColumns ?? true
      filters.value = props.includeFilters ?? true
      isGlobal.value = false
    }
  })

  function handleSave() {
    emit('save', {
      name: viewName.value,
      color: selectedColor.value,
      includeColumns: columns.value,
      includeFilters: filters.value
    })
    open.value = false
  }

  function handleDelete() {
    emit('delete')
    open.value = false
  }

  function handleCopyLink() {
    emit('copyLink')
  }
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>

    <PopoverContent
      align="start"
      :side-offset="4"
      class="w-52 rounded-lg border border-border bg-card p-0 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <!-- Name input -->
      <div class="p-1">
        <div class="flex h-9 items-center gap-2 rounded-md px-3 hover:bg-secondary">
          <span
            class="size-2 shrink-0 rounded-full border"
            :style="{
              backgroundColor: selectedColor === 'none' ? 'transparent' : selectedColor,
              borderColor: selectedColor === 'none' ? '#DCD1C6' : selectedColor
            }"
          />
          <input
            v-model="viewName"
            type="text"
            placeholder="Name your view"
            class="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-content-placeholder focus:outline-none"
          />
        </div>
      </div>

      <Separator class="bg-border" />

      <!-- Color selector -->
      <div class="flex items-center gap-2 px-3 py-3">
        <button
          v-for="c in colors"
          :key="c.value"
          class="relative flex size-4 items-center justify-center rounded-full border"
          :style="{
            backgroundColor: c.bg,
            borderColor: c.border
          }"
          @click="selectedColor = c.value"
        >
          <Check
            v-if="selectedColor === c.value"
            class="size-2.5"
            :class="
              c.value === 'none' ? 'text-foreground-tertiary' : 'text-content-primary-inverse'
            "
          />
        </button>
      </div>

      <Separator class="bg-border" />

      <!-- Included in this view -->
      <div class="px-1 pb-1">
        <div class="px-3 py-1">
          <span class="text-xs font-medium text-foreground-tertiary"> Included in this view </span>
        </div>

        <label
          class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 hover:bg-secondary"
        >
          <Columns2 class="size-3.5 text-foreground-tertiary" />
          <span class="flex-1 text-sm text-foreground">Columns</span>
          <Checkbox v-model:checked="columns" />
        </label>

        <label
          class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 hover:bg-secondary"
        >
          <ListFilter class="size-3.5 text-foreground-tertiary" />
          <span class="flex-1 text-sm text-foreground">Filters</span>
          <Checkbox v-model:checked="filters" />
        </label>
      </div>

      <template v-if="isEditing">
        <Separator class="bg-border" />

        <!-- Share view -->
        <div class="px-1 pb-1">
          <div class="px-3 py-1">
            <span class="text-xs font-medium text-foreground-tertiary"> Share view </span>
          </div>

          <label
            class="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 hover:bg-secondary"
          >
            <Globe class="size-3.5 text-foreground-tertiary" />
            <span class="flex-1 text-sm text-foreground">Global</span>
            <CircleHelp class="size-3.5 text-foreground-tertiary" />
            <Switch :checked="isGlobal" @update:checked="isGlobal = !!$event" />
          </label>

          <button
            class="flex w-full items-center gap-2 rounded-md px-3 py-1.5 hover:bg-secondary"
            @click="handleCopyLink"
          >
            <Link class="size-3.5 text-foreground-tertiary" />
            <span class="text-sm text-foreground">Copy link</span>
          </button>
        </div>

        <Separator class="bg-border" />

        <!-- Delete -->
        <div class="px-1 py-1">
          <button
            class="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-destructive hover:bg-secondary"
            @click="handleDelete"
          >
            <Trash2 class="size-3.5" />
            <span class="text-sm">Delete view</span>
          </button>
        </div>
      </template>

      <template v-else>
        <Separator class="bg-border" />

        <!-- Footer -->
        <div class="p-3">
          <Button variant="primary" size="default" @click="handleSave"> Save </Button>
        </div>
      </template>
    </PopoverContent>
  </Popover>
</template>
