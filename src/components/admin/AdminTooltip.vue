<script setup lang="ts">
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

  defineProps<{
    label: string
  }>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent class="bg-black text-white">
        {{ label }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
