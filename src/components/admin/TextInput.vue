<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { useId } from 'reka-ui'
  import { cn } from '@/lib/utils'
  import { Label } from '@/components/ui/label'
  import { CircleAlert } from 'lucide-vue-next'

  const props = withDefaults(
    defineProps<{
      class?: HTMLAttributes['class']
      label?: string
      placeholder?: string
      modelValue?: string | number
      defaultValue?: string | number
      size?: 'compact' | 'default' | 'lg'
      error?: string
      disabled?: boolean
      type?: string
    }>(),
    {
      size: 'default',
      type: 'text'
    }
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
  }>()

  const id = useId()

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }
</script>

<template>
  <div :class="cn('flex flex-col gap-1.5', props.class)">
    <Label v-if="label" :for="id" class="text-sm font-medium text-foreground">
      {{ label }}
    </Label>
    <div class="relative">
      <div
        v-if="$slots.icon"
        :class="
          cn(
            'pointer-events-none absolute inset-y-0 left-0 flex items-center',
            size === 'lg' ? 'pl-3.5' : size === 'compact' ? 'pl-2.5' : 'pl-3'
          )
        "
      >
        <slot name="icon" />
      </div>
      <input
        :id="id"
        data-slot="input"
        :type="type"
        :value="modelValue ?? defaultValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="!!error || undefined"
        :aria-describedby="error ? `${id}-error` : undefined"
        :class="
          cn(
            'flex w-full min-w-0 rounded-md border bg-background text-foreground shadow-xs transition-[color,box-shadow] outline-none',
            'placeholder:text-muted-foreground',
            'focus-visible:ring-ring focus-visible:ring-2',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/50',
            'aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/50',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-disabled disabled:text-foreground/40 disabled:border-transparent disabled:shadow-none',
            size === 'lg'
              ? 'h-11 px-3.5 text-base'
              : size === 'compact'
                ? 'h-8 px-2.5 text-sm'
                : 'h-9 px-3 text-sm',
            $slots.icon && (size === 'lg' ? 'pl-10' : size === 'compact' ? 'pl-8' : 'pl-9')
          )
        "
        @input="onInput"
      />
    </div>
    <p
      v-if="error"
      :id="`${id}-error`"
      class="flex items-center gap-1 text-xs font-medium text-destructive"
    >
      <CircleAlert class="size-3.5 shrink-0" />
      {{ error }}
    </p>
  </div>
</template>
