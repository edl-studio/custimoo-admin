<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import { TrendingDown, TrendingUp } from 'lucide-vue-next'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    title: string
    value: string | number
    trend?: {
      value: number
      direction: 'up' | 'down'
    }
    icon?: Component
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <Card :class="cn('border-[#ECE5DA] shadow-none', props.class)">
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-0 md:pb-0">
      <CardTitle class="text-sm font-medium text-[#726159]">
        {{ title }}
      </CardTitle>
      <component
        :is="icon"
        v-if="icon"
        class="size-4 text-[#726159]"
      />
    </CardHeader>
    <CardContent>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold text-[#1D1816]">
          {{ value }}
        </span>
        <span
          v-if="trend"
          :class="
            cn(
              'inline-flex items-center gap-0.5 text-xs font-medium',
              trend.direction === 'up' ? 'text-emerald-600' : 'text-red-600'
            )
          "
        >
          <TrendingUp
            v-if="trend.direction === 'up'"
            class="size-3.5"
          />
          <TrendingDown
            v-else
            class="size-3.5"
          />
          {{ trend.value }}%
        </span>
      </div>
    </CardContent>
  </Card>
</template>
