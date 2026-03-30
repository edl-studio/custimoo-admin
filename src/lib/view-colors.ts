export type ViewColor = 'none' | 'red' | 'pink' | 'orange' | 'yellow' | 'green' | 'teal' | 'indigo'

export const VIEW_COLOR_BG: Record<ViewColor, string> = {
  none: '',
  red: 'bg-view-red',
  pink: 'bg-view-pink',
  orange: 'bg-view-orange',
  yellow: 'bg-view-yellow',
  green: 'bg-view-green',
  teal: 'bg-view-teal',
  indigo: 'bg-view-indigo'
}

export const VIEW_COLOR_BORDER: Record<ViewColor, string> = {
  none: 'border-border-strong',
  red: 'border-view-red',
  pink: 'border-view-pink',
  orange: 'border-view-orange',
  yellow: 'border-view-yellow',
  green: 'border-view-green',
  teal: 'border-view-teal',
  indigo: 'border-view-indigo'
}
