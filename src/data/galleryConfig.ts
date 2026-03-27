export interface GalleryCategory {
  slug: string
  title: string
  description: string
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    slug: 'newborn',
    title: 'Newborn',
    description: 'Первые дни жизни — самые нежные кадры',
  },
  {
    slug: 'less-than-one-year',
    title: 'Детки до года',
    description: 'Маленькие открытия и большие улыбки',
  },
  {
    slug: 'one-year',
    title: 'Годики',
    description: 'Первый день рождения — особенный праздник',
  },
  {
    slug: 'familys',
    title: 'Семьи',
    description: 'Тёплые моменты всей семьёй',
  },
]

export function getCategoryBySlug(slug: string): GalleryCategory | undefined {
  return GALLERY_CATEGORIES.find((cat) => cat.slug === slug)
}
