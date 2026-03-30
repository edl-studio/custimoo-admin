<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import { computed, inject, ref, type Ref } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
  import { Separator } from '@/components/ui/separator'
  import { cn } from '@/lib/utils'
  import AdminAvatar from './AdminAvatar.vue'
  import CustimooLogo from './CustimooLogo.vue'
  import CustimooLogoMark from './CustimooLogoMark.vue'
  import SidebarButton from './SidebarButton.vue'

  export interface NavItem {
    label: string
    icon: Component
    to: string
    badge?: number
    dot?: string
  }

  export interface NavSection {
    label?: string
    items: NavItem[]
  }

  const props = defineProps<{
    sections: NavSection[]
    userName?: string
    userEmail?: string
    userAvatar?: string
    class?: HTMLAttributes['class']
  }>()

  const route = useRoute()
  const collapsed = inject<Ref<boolean>>(
    'sidebar-collapsed',
    computed(() => false)
  )
  const toggleCollapsed = inject<() => void>('toggle-collapsed', () => {})
  const profileOpen = ref(false)

  function isActive(item: NavItem): boolean {
    if (route.path === item.to) return true
    if (route.path.startsWith(item.to + '/')) return true
    if (route.meta?.parent === item.to?.replace('/', '')) return true
    return false
  }
</script>

<template>
  <nav :class="cn('group/sidebar flex h-full flex-col', props.class)">
    <!-- Header / Logo -->
    <div class="shrink-0 px-3 pb-5 pt-6">
      <div :class="cn('relative flex items-center px-2', collapsed ? 'justify-center' : '')">
        <template v-if="!collapsed">
          <CustimooLogo class="text-foreground" />
          <SidebarButton
            class="absolute right-2 top-1/2 hidden -translate-y-1/2 group-hover/sidebar:inline-flex"
            @click="toggleCollapsed"
          />
        </template>
        <template v-else>
          <CustimooLogoMark class="text-foreground group-hover/sidebar:invisible" />
          <SidebarButton
            class="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 group-hover/sidebar:inline-flex"
            @click="toggleCollapsed"
          />
        </template>
      </div>
    </div>

    <!-- Nav sections -->
    <div :class="cn('flex-1 overflow-y-auto pt-2', collapsed ? 'space-y-3' : 'space-y-2')">
      <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="px-3">
        <!-- Section label (expanded only) -->
        <div v-if="section.label && !collapsed" class="flex h-8 items-center px-2">
          <span class="text-xs font-medium text-foreground-tertiary">
            {{ section.label }}
          </span>
        </div>

        <!-- Menu items -->
        <ul :class="cn('flex flex-col', collapsed ? 'items-center gap-0' : 'gap-1')">
          <li v-for="item in section.items" :key="item.to">
            <RouterLink
              :to="item.to"
              :class="
                cn(
                  'flex items-center transition-colors',
                  collapsed ? 'size-9 justify-center rounded-lg' : 'h-8 gap-2 rounded-lg px-2',
                  isActive(item)
                    ? 'border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                    : 'border border-transparent hover:bg-accent'
                )
              "
            >
              <component
                :is="item.icon"
                :class="
                  cn(
                    'shrink-0',
                    collapsed ? 'size-[18px]' : 'size-4',
                    isActive(item) ? 'text-primary' : 'text-foreground-tertiary'
                  )
                "
              />
              <span v-if="!collapsed" class="truncate text-sm font-medium text-foreground">
                {{ item.label }}
              </span>
              <span
                v-if="!collapsed && item.badge != null && item.badge > 0"
                class="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground"
              >
                {{ item.badge }}
              </span>
              <span
                v-if="!collapsed && item.dot"
                class="ml-auto inline-block size-2 rounded-full bg-red-500"
              />
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Profile section -->
    <div class="shrink-0 px-3 pb-4">
      <Popover v-model:open="profileOpen">
        <PopoverTrigger as-child>
          <button
            :class="
              cn(
                'flex w-full items-center rounded-lg p-2 transition-colors hover:bg-accent',
                collapsed ? 'justify-center' : 'gap-2'
              )
            "
          >
            <AdminAvatar :name="userName ?? 'User'" size="md" />
            <!-- Name (expanded only) -->
            <span v-if="!collapsed" class="truncate text-sm font-medium text-foreground">
              {{ userName ?? 'User' }}
            </span>
          </button>
        </PopoverTrigger>

        <!-- Account dropdown -->
        <PopoverContent
          side="top"
          align="start"
          :side-offset="8"
          class="w-56 rounded-lg border border-border bg-card p-1 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
        >
          <!-- Profile header -->
          <div class="flex items-center gap-2 p-1.5">
            <AdminAvatar :name="userName ?? 'User'" size="lg" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-foreground">
                {{ userName ?? 'User' }}
              </p>
              <p v-if="userEmail" class="truncate text-xs text-foreground-secondary">
                {{ userEmail }}
              </p>
            </div>
          </div>

          <Separator class="my-1 bg-border" />

          <!-- Menu items -->
          <div class="p-1">
            <button
              v-for="menuItem in ['Account', 'Billing', 'Notifications']"
              :key="menuItem"
              class="flex w-full items-center rounded-md px-1.5 py-1.5 text-sm text-foreground hover:bg-secondary"
              @click="profileOpen = false"
            >
              {{ menuItem }}
            </button>
          </div>

          <Separator class="my-1 bg-border" />

          <!-- Log out -->
          <div class="p-1">
            <button
              class="flex w-full items-center rounded-md px-1.5 py-1.5 text-sm text-foreground hover:bg-secondary"
              @click="profileOpen = false"
            >
              Log out
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </nav>
</template>
