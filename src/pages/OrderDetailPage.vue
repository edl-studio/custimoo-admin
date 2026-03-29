<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import {
    CalendarDays,
    Factory,
    Hash,
    Package,
    Truck,
    User
  } from 'lucide-vue-next'
  import { PageHeader } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { Avatar, AvatarFallback } from '@/components/ui/avatar'
  import { useOrders } from '@/composables/useOrders'
  import type { OrderStage } from '@/data/mock-orders'
  import { cn } from '@/lib/utils'

  const route = useRoute()
  const router = useRouter()
  const { getOrderById } = useOrders()

  const orderId = computed(() => route.params.id as string)
  const order = computed(() => getOrderById(orderId.value))


  const stages: OrderStage[] = [
    'Order approval',
    'Sample file',
    'Sample production',
    'Production files',
    'In production',
    'Quality control',
    'Shipping',
    'Completed'
  ]

  function getStageIndex(stage: OrderStage): number {
    return stages.indexOf(stage)
  }

  function getStageBadgeClass(stage: OrderStage): string {
    switch (stage) {
      case 'Order approval':
        return 'bg-teal-50 text-teal-700 border-teal-200'
      case 'Sample file':
        return 'bg-teal-50 text-teal-700 border-teal-200'
      case 'Sample production':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Production files':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'In production':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'Quality control':
        return 'bg-teal-50 text-teal-700 border-teal-200'
      case 'Shipping':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return ''
    }
  }

  function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateStr))
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      :title="order ? `Order ${order.orderId}` : 'Order Not Found'"
      class="border-0 px-0"
    >
      <template #actions>
        <Button variant="outline" @click="router.push('/orders')">Back to Orders</Button>
      </template>
    </PageHeader>

    <template v-if="order">
      <!-- Stage timeline -->
      <Card class="border-[#ECE5DA] shadow-none">
        <CardHeader>
          <CardTitle class="text-[#1D1816]">Order Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-1">
            <template v-for="(stage, index) in stages" :key="stage">
              <div class="flex flex-col items-center gap-1.5">
                <div
                  :class="
                    cn(
                      'flex size-8 items-center justify-center rounded-full border-2 text-xs font-semibold',
                      index <= getStageIndex(order.stage)
                        ? 'border-[#1D1816] bg-[#1D1816] text-white'
                        : 'border-[#ECE5DA] bg-white text-[#726159]'
                    )
                  "
                >
                  {{ index + 1 }}
                </div>
                <span
                  :class="
                    cn(
                      'max-w-20 text-center text-[10px] leading-tight',
                      index <= getStageIndex(order.stage)
                        ? 'font-medium text-[#1D1816]'
                        : 'text-[#726159]'
                    )
                  "
                >
                  {{ stage }}
                </span>
              </div>
              <div
                v-if="index < stages.length - 1"
                :class="
                  cn(
                    'mb-5 h-0.5 flex-1',
                    index < getStageIndex(order.stage) ? 'bg-[#1D1816]' : 'bg-[#ECE5DA]'
                  )
                "
              />
            </template>
          </div>
        </CardContent>
      </Card>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Order details -->
        <Card class="border-[#ECE5DA] shadow-none">
          <CardHeader>
            <CardTitle class="text-[#1D1816]">Order Details</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center gap-3">
              <Hash class="size-4 text-[#726159]" />
              <div>
                <p class="text-xs text-[#726159]">Order ID</p>
                <p class="text-sm font-medium text-[#1D1816]">{{ order.orderId }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Package class="size-4 text-[#726159]" />
              <div>
                <p class="text-xs text-[#726159]">Stage</p>
                <span
                  :class="
                    cn(
                      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                      getStageBadgeClass(order.stage)
                    )
                  "
                >
                  {{ order.stage }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <User class="size-4 text-[#726159]" />
              <div>
                <p class="text-xs text-[#726159]">Customer</p>
                <p class="text-sm text-[#1D1816]">{{ order.customer }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Factory class="size-4 text-[#726159]" />
              <div>
                <p class="text-xs text-[#726159]">Factory</p>
                <p class="text-sm text-[#1D1816]">{{ order.factory }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <CalendarDays class="size-4 text-[#726159]" />
              <div>
                <p class="text-xs text-[#726159]">Order Date</p>
                <p class="text-sm text-[#1D1816]">{{ formatDate(order.orderDate) }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <CalendarDays class="size-4 text-[#726159]" />
              <div>
                <p class="text-xs text-[#726159]">Due Date</p>
                <p class="text-sm text-[#1D1816]">{{ formatDate(order.dueDate) }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Truck class="size-4 text-[#726159]" />
              <div>
                <p class="text-xs text-[#726159]">Est. Shipping</p>
                <p class="text-sm text-[#1D1816]">{{ formatDate(order.estShipping) }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Merchant & admin info -->
        <Card class="border-[#ECE5DA] shadow-none">
          <CardHeader>
            <CardTitle class="text-[#1D1816]">Additional Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <p class="text-xs text-[#726159]">Merchant</p>
              <p class="text-sm font-medium text-[#1D1816]">{{ order.merchant }}</p>
            </div>

            <div>
              <p class="text-xs text-[#726159]">Reference</p>
              <p class="font-mono text-sm text-[#1D1816]">{{ order.reference }}</p>
            </div>

            <div>
              <p class="text-xs text-[#726159]">Quantity</p>
              <p class="text-sm text-[#1D1816]">{{ order.qty }} items</p>
            </div>

            <div>
              <p class="text-xs text-[#726159]">Invoice Status</p>
              <p class="text-sm text-[#1D1816]">{{ order.invoiceStatus }}</p>
            </div>

            <div>
              <p class="text-xs text-[#726159]">Current Step</p>
              <p class="text-sm text-[#1D1816]">{{ order.currentStep }}</p>
            </div>

            <div>
              <p class="text-xs text-[#726159]">Administrator</p>
              <div class="mt-1 flex items-center gap-2">
                <Avatar class="size-7">
                  <AvatarFallback class="text-xs">
                    {{ getInitials(order.administrator.name) }}
                  </AvatarFallback>
                </Avatar>
                <span class="text-sm text-[#1D1816]">{{ order.administrator.name }}</span>
              </div>
            </div>

            <div>
              <p class="text-xs text-[#726159]">Comments</p>
              <p class="text-sm text-[#1D1816]">{{ order.comments }} comment(s)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

    <template v-else>
      <Card class="border-[#ECE5DA] shadow-none">
        <CardContent class="flex flex-col items-center justify-center py-12">
          <p class="text-lg text-[#726159]">Order not found</p>
          <Button variant="primary" class="mt-4" @click="router.push('/orders')">
            Back to Orders
          </Button>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
