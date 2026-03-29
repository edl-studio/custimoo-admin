import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@ljcl/storybook-addon-cssprops'
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.app.json'
      }
    }
  },
  viteFinal: async config => {
    config.resolve ??= {}
    config.resolve.alias ??= {}

    Object.assign(config.resolve.alias, {
      '@': new URL('../src', import.meta.url).pathname
    })

    return config
  }
}

export default config
