"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Users } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ArtistData {
  external_urls: {
    spotify: string
  }
  followers: {
    total: number
  }
  genres: string[]
  images: {
    url: string
    height: number
    width: number
  }[]
  name: string
  popularity: number
  type: string
}


export default function ArtistCard({ data }: { data: ArtistData }) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="relative h-80 p-0">
        <Image
          src={data.images[0].url}
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-sm text-muted-foreground">{data.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">
              {formatNumber(data.followers.total)}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Popularity</span>
            <span className="font-medium">{data.popularity}%</span>
          </div>
          <Progress value={data.popularity} className="h-2" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {data.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={data.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1DB954] px-4 py-2 font-medium text-white hover:bg-[#1ed760] transition-colors"
        >
          Open in Spotify
          <ExternalLink className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

