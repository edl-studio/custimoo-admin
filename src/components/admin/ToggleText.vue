<script setup lang="ts">
  import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
  import type { HTMLAttributes } from 'vue'
  import { reactiveOmit } from '@vueuse/core'
  import { useForwardPropsEmits } from 'reka-ui'
  import { cn } from '@/lib/utils'
  import { Switch } from '@/components/ui/switch'
  import { Label } from '@/components/ui/label'

  const props = defineProps<
    SwitchRootProps & {
      class?: HTMLAttributes['class']
      label?: string
    }
  >()

  const emits = defineEmits<SwitchRootEmits>()

  const delegatedProps = reactiveOmit(props, 'class', 'label')

  const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Label
    data-slot="toggle-text"
    :class="cn('flex items-center gap-2', props.class)"
  >
    <Switch v-bind="forwarded" />
    <span class="text-xs leading-4 font-medium text-foreground">
      <slot>{{ label }}</slot>
    </span>
  </Label>
</template>
