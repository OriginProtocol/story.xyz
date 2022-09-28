// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api'

const getNavLinks = async () => {
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

  return links
}

const getCollections = async () => {
  const query = qs.stringify({
    populate: {
      details: {
        populate: '*'
      }
    }
  }, {
    encodeValuesOnly: true,
  })

  const data = await fetch(
    `${apiUrl}/story-collections?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }
  )

  const dataParsed = await data.json()
  const collections = dataParsed.data

  return collections
}

const getDrops = async () => {
  const query = qs.stringify({
    populate: {
      details: {
        populate: '*'
      }
    }
  }, {
    encodeValuesOnly: true,
  })

  const data = await fetch(
    `${apiUrl}/story-drops?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }
  )

  const dataParsed = await data.json()
  const drops = dataParsed.data

  return drops
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [links, collections, drops] = await Promise.all([getNavLinks(), getCollections(), getDrops()])

  res.status(200).json({ links, collections, drops })
}