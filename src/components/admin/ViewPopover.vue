<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Columns2, ListFilter, Check, Globe, Link, Trash2, CircleHelp } from 'lucide-vue-next'
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
  import { Checkbox } from '@/components/ui/checkbox'
  import { Switch } from '@/components/ui/switch'
  import { Separator } from '@/components/ui/separator'
  import { Button } from '@/components/ui/button'
  import { cn } from '@/lib/utils'
  import { type ViewColor, VIEW_COLOR_BG, VIEW_COLOR_BORDER } from '@/lib/view-colors'

  const props = defineProps<{
    viewName?: string
    color?: ViewColor
    includeColumns?: boolean
    includeFilters?: boolean
    editing?: boolean
  }>()

  const emit = defineEmits<{
    save: [
      payload: { name: string; color: ViewColor; includeColumns: boolean; includeFilters: boolean }
    ]
    delete: []
    copyLink: []
  }>()

  const isEditing = computed(
    () => props.editing === true || (props.editing == null && !!props.viewName)
  )

  const open = ref(false)
  const viewName = ref(props.viewName ?? '')
  const selectedColor = ref<ViewColor>(props.color ?? 'indigo')
  const columns = ref(props.includeColumns ?? true)
  const filters = ref(props.includeFilters ?? true)
  const isGlobal = ref(false)

  const colors: ViewColor[] = ['none', 'red', 'pink', 'orange', 'yellow', 'green', 'teal', 'indigo']

  watch(open, isOpen => {
    if (isOpen) {
      viewName.value = props.viewName ?? ''
      selectedColor.value = props.color ?? 'indigo'
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
            :class="
              cn(
                'size-2 shrink-0 rounded-full border',
                VIEW_COLOR_BG[selectedColor],
                VIEW_COLOR_BORDER[selectedColor]
              )
            "
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
          :key="c"
          :class="
            cn(
              'relative flex size-4 items-center justify-center rounded-full border',
              VIEW_COLOR_BG[c],
              VIEW_COLOR_BORDER[c]
            )
          "
          @click="selectedColor = c"
        >
          <Check
            v-if="selectedColor === c"
            class="size-2.5"
            :class="c === 'none' ? 'text-foreground-tertiary' : 'text-content-primary-inverse'"
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
