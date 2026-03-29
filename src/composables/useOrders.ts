import { ref } from 'vue'
import { mockOrders, type Order } from '@/data/mock-orders'

export function useOrders() {
  const orders = ref<Order[]>([...mockOrders])

  function getOrderById(id: string): Order | undefined {
    return orders.value.find((o) => o.id === id)
  }

  async function updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const index = orders.value.findIndex((o) => o.id === id)
    if (index === -1) throw new Error('Order not found')
    const updated: Order = { ...orders.value[index], ...data } as Order
    orders.value[index] = updated
    return updated
  }

  async function deleteOrder(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    orders.value = orders.value.filter((o) => o.id !== id)
  }

  return { orders, getOrderById, updateOrder, deleteOrder }
}
