// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IconFormatted, LinkFormatted, MappedLink } from 'origin-storybook'
import qs from 'qs'

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

  return { links }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { links } = await getData()

  res.status(200).json({ links })
}