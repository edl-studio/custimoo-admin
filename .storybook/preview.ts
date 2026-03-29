import type { Preview } from '@storybook/vue3-vite'

import '../src/index.css'

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
