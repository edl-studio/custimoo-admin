import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import { createMemoryHistory, createRouter } from 'vue-router'

import '../src/index.css'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/:catchAll(.*)', component: { template: '<div />' } }]
})

setup(app => {
  app.use(router)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      },
      expanded: true
    },
    layout: 'centered'
  },
  decorators: [
    story => ({
      components: { Story: story() },
      template: `
        <div class="bg-background text-foreground p-6">
          <Story />
        </div>
      `
    })
  ]
}

export default preview
