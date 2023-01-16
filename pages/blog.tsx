import { CardProps, Footer, Header, IconFormatted, LinkFormatted, MappedLink, Typography } from '@originprotocol/origin-storybook'
import Head from 'next/head'
import Articles from '../src/components/Articles'
import { Social } from '../src/components/Community'
import Seo from '../src/components/Seo'
import { Article, Meta, SeoFormatted } from '../src/components/types'
import { fetchAPI } from '../src/helpers/fetchApi'
import transformSeo from '../src/helpers/transformSeo'
import requestCmsData from '../src/requestCmsData'
import requestOgnData from '../src/requestOgnData'

interface CollectionProps extends CardProps {
  img: string
  imgAlt: string
  thumbnail: string
  thumbnailAlt?: string
}

const Blog = ({
  links,
  articles,
  categories,
  meta,
  seo
}: {
  links: MappedLink<LinkFormatted<IconFormatted>>[],
  collections: CollectionProps[],
  drops: CollectionProps[],
  ognInfo: {
    circulatingOgn: number,
    totalOgn: number,
    ognPrice: number,
  },
  socials: Social[],
  articles: Article[],
  categories: {
    name: string,
    slug: string
  }[],
  meta: Meta,
  seo: SeoFormatted,
}) => {
  return (
    <div className='relative overflow-hidden'>
      <Head>
        <title>Story.xyz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header webProperty='story' mappedLinks={links} />
      <Seo seo={seo} />
      <main>
      <section className="">
      <div className="mx-auto">
        <div className="flex flex-col px-7 py-12 max-w-screen-xl mx-auto">
          <div className="flex flex-col mt-1 md:mt-10 md:flex-row md:items-center md:justify-between px-3">
            <Typography.H3 className='font-bold'>Latest stories</Typography.H3>
          </div>
          <Articles articles={articles} categories={categories} meta={meta} />
        </div>
      </div>
    </section>
      </main>
      <div className='relative z-10'>
        <Footer webProperty="story" />
      </div>
    </div>
  )
}

export async function getStaticProps () {
  const { links, collections, drops, articles, meta } = await requestCmsData()
  const ognInfo = await requestOgnData()
  const socialRes = await fetch(`${process.env.NEXT_LEGACY_WEBSITE_HOST}/social-stats`);
  const socials = await socialRes.json();
  const seoRes = await fetchAPI("/story/page/en/%2Fblog");

  const categories: {
    [key: string]: { name: string, slug: string }
  } = {};

  articles.forEach((article) => {
    if (article && article.category) {
      categories[article.category.slug] = article.category;
    }
  });

  const sortedArticles = articles.sort((a: Article, b: Article) => (b.publishBackdate || b.publishedAt).localeCompare(a.publishBackdate || a.publishedAt));

  const categoryList = Object.values(categories)

  return {
    props: {
      links,
      collections,
      drops,
      ognInfo,
      socials: socials.stats,
      articles: sortedArticles,
      categories: categoryList,
      meta,
      seo: transformSeo(seoRes.data),
    },
    revalidate: 5 * 60, // revalidate every 5 minutes
  }
}

export default Blog;
