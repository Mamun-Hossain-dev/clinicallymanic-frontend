// components/content/contentCard.tsx
'use client'

import { ContentItem } from '@/../types/content'
import ArticleCard from './articleCard'
import YouTubeCard from './youtubeCard'
import SpotifyCard from './spotifyCard'

interface ContentCardProps {
  item: ContentItem
  variant?: 'default' | 'compact' | 'featured'
}

export default function ContentCard({
  item,
  variant = 'default',
}: ContentCardProps) {
  // Render based on content type
  switch (item.contentType) {
    case 'article':
      return <ArticleCard item={item} variant={variant} />

    case 'youtube':
    case 'Youtube-videos':
      return <YouTubeCard item={item} />

    case 'spotify':
    case 'Spotify-audios':
      return <SpotifyCard item={item} />

    default:
      // Fallback to article card for unknown types
      return <ArticleCard item={item} variant={variant} />
  }
}
