// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IconFormatted, LinkFormatted, MappedLink } from 'origin-storybook'
import qs from 'qs'

type LinkSet<Link> = {
  attributes: {
    href?: string
    label: string
    order: number
    isButton: boolean
    highlightText?: string
    links: Link[]
  }
}

type Link<Icon> = {
  href: string
  iconPosition: 'top' | 'left'
  label: string
  order: number
  isHighlight: boolean
  icon?: Icon
}

type Icon = {
  data?: {
    attributes: {
      alternativeText: string
      caption: string
      url: string
    }
  }
}

const getData = async () => {
  const query = qs.stringify({
    populate: {
      details: {
        populate: '*',
      },
      links: {
        populate: '*',
      }
    },
  }, {
    encodeValuesOnly: true,
  })

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api'

  const data = await fetch(
    `${apiUrl}/story-nav-links?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }
  )

  const dataParsed = await data.json()
  const links = dataParsed.data

  const sortOrder = (a: any, b: any) => {
    return a.order - b.order
  }

  const linkedMapSet: MappedLink<LinkFormatted<IconFormatted>>[] = links.map((linkSet: LinkSet<Link<Icon>>) => {
    return {
      href: linkSet.attributes.href,
      label: linkSet.attributes.label,
      isButton: linkSet.attributes.isButton,
      highlightText: linkSet.attributes.highlightText,
      order: linkSet.attributes.order,
      links: linkSet.attributes.links.map((link: Link<Icon>) => {
        return {
          label: link.label,
          href: link.href,
          highlight: link.isHighlight,
          icon: link.icon?.data?.attributes || null
        }
      }).sort(sortOrder)
    }
  }).sort(sortOrder)

  return { links: linkedMapSet }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { links } = await getData()

  res.status(200).json(links)
}
