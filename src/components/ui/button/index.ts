import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

/*
 * Button variants — pixel-matched to Figma Admin Components
 *
 * Shared across all variants:
 *   Height: 32px, Corner radius: 8px, Font: Geist Medium 14px/100%
 *   Padding: 8px 12px (label), 8px all (icon-only)
 *   Gap: 8px between icon and label
 *   Icon size: 16x16
 *   Focus ring: 2px ring token (--ring = teal at 50%)
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium',
    'transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    'disabled:pointer-events-none'
  ].join(' '),
  {
    variants: {
      variant: {
        /* button-default: secondary surface, border, subtle shadows */
        default: [
          'bg-secondary border border-border text-foreground',
          'shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.05)]',
          'hover:bg-accent',
          'disabled:bg-disabled disabled:text-content-disabled disabled:shadow-[inset_0_2px_2px_rgba(255,255,255,0.25)]'
        ].join(' '),

        /* button-primary: teal fill, white text, inner highlight */
        primary: [
          'bg-primary border border-primary text-primary-foreground',
          'shadow-[inset_0_2px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.05)]',
          'hover:bg-primary-hover hover:border-primary-hover',
          'disabled:bg-disabled disabled:border-border disabled:text-content-disabled disabled:shadow-[inset_0_2px_2px_rgba(255,255,255,0.25)]'
        ].join(' '),

        /* button-destructive: red fill, white text */
        destructive: [
          'bg-destructive border border-destructive text-destructive-foreground',
          'shadow-[inset_0_2px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.05)]',
          'hover:bg-destructive/90 hover:border-destructive/90',
          'disabled:bg-disabled disabled:border-border disabled:text-content-disabled disabled:shadow-[inset_0_2px_2px_rgba(255,255,255,0.25)]'
        ].join(' '),

        /* button-ghost: transparent, no border, no shadow */
        ghost: ['text-foreground', 'hover:bg-secondary', 'disabled:text-content-disabled'].join(
          ' '
        ),

        /* ghost-destructive: transparent with red icon/text */
        'ghost-destructive': [
          'text-destructive',
          'hover:bg-secondary',
          'disabled:text-content-disabled'
        ].join(' '),

        /* outline: alias for default — used by inherited ui-kit components */
        outline: [
          'bg-secondary border border-border text-foreground',
          'shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.05)]',
          'hover:bg-accent',
          'disabled:bg-disabled disabled:text-content-disabled disabled:shadow-[inset_0_2px_2px_rgba(255,255,255,0.25)]'
        ].join(' '),

        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-8 px-3 py-2',
        sm: 'h-7 rounded-md px-2.5 text-xs',
        lg: 'h-9 px-4',
        icon: 'size-8',
        'icon-sm': 'size-7'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
