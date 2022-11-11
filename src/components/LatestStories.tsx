import { Card, Typography } from '@originprotocol/origin-storybook'
import Image from 'next/future/image'
import Link from 'next/link'
import React from 'react'
import { Article } from './types'

const LatestStories = ({
  articles,
}: {
  articles: Article[]
}) => {
  return (
    <section className="bg-[#f6f8fe] md:mt-32">
      <div className="mx-auto">
        <div className="flex flex-col px-10 lg:px-7 py-12 max-w-screen-xl mx-auto md:py-32">
          <div className="flex flex-col mt-1 md:mt-10 md:flex-row md:items-center md:justify-between">
            <Typography.H3 className='font-bold'>Latest stories</Typography.H3>
            <Link href="/blog">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link text-blue-500 font-bold"
              >
                View all stories
              </a>
            </Link>
          </div>
          {articles && (
            <div className="article-container mt-9 md:mb-4 space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.slice(0, 3).map((article, i) => (
                <Card
                  key={i}
                  webProperty={"originprotocol"}
                  title={article.title}
                  img={
                    <Image
                      src={article.cardCover?.url || article.cover?.url || '/images/logos/origin-press.svg'}
                      alt='Origin Protocol'
                      width='640' height='312'
                    />
                  }
                  body={article.description}
                  linkText={"Read more"}
                  linkHref={`/${article.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LatestStories