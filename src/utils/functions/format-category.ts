import { Category } from 'models/feedback'

export function formatCategory(category: Category) {
  const formatedCategory: Record<Category, string> = {
    FEATURE: 'Feature',
    UI: 'UI',
    UX: 'UX',
    ENHANCEMENT: 'Enhancement',
    BUG: 'Bug'
  }

  return formatedCategory[category]
}
