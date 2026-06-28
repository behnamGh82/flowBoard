export const PROJECT_STATUSES = [
  'planning',
  'active',
  'on_hold',
  'completed',
  'archived',
] as const

export const PROJECT_VISIBILITIES = ['private', 'team', 'public'] as const

export const PROJECT_PRIORITIES = ['low', 'medium', 'high'] as const

export const PROJECT_SORT_FIELDS = ['createdAt', 'updatedAt', 'deadline', 'name'] as const

export const PROJECT_ICON_PRESETS = ['📋', '🚀', '💡', '🎯', '⚡', '🔧', '📱', '🌐', '🎨', '📊'] as const

export const DEFAULT_PROJECT_ICON = PROJECT_ICON_PRESETS[0]
