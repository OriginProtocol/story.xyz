import { Button, Card, CardProps, Footer, GradientText, Header, IconFormatted, LinkFormatted, MappedLink, Typography } from '@originprotocol/origin-storybook'
import Head from 'next/head'
import Image from 'next/future/image'
import Dashboard from '../src/components/Dashboard'
import requestCmsData from '../src/requestCmsData'
import requestOgnData from '../src/requestOgnData'
import styles from '../src/styles/Home.module.css'
import Community, { Social } from '../src/components/Community'
import LatestStories from '../src/components/LatestStories'
import { Article, SeoFormatted } from '../src/components/types'
import { fetchAPI } from '../src/helpers/fetchApi'
import transformSeo from '../src/helpers/transformSeo'
import Seo from '../src/components/Seo'

interface CollectionProps extends CardProps {
  img: string
  imgAlt: string
  thumbnail: string
  thumbnailAlt?: string
}

const Home = ({
  links,
  collections,
  drops,
  ognInfo,
  socials,
  articles,
  seo,
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
  seo: SeoFormatted,
}) => {
  return (
    <div className='relative overflow-hidden'>
      <Head>
        <title>Story.xyz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Seo seo={seo} />
      <Header webProperty='story' mappedLinks={links} />
      <span className={`${styles.spline34} absolute z-0 left-64 md:left-[calc(65%)]`}>
        <Image src='/splines-00034.png' width={1341} height={1363} alt="spline" priority />
      </span>
      <main>
        <div className='max-w-screen-xl mx-auto px-9'>
          <section className='mb-24 relative'>
            <Typography.H2 className='mt-6' as='h1'>
              We build tools that {' '}
              <br className='hidden md:block' />
              <GradientText webProperty='story' text='power communities' />
            </Typography.H2>
            <Typography.Body className='text-2xl mt-6' style={{color: '#475569'}}>
              NFT Collections, Community Drops, Artist {' '}
              <br className='hidden md:block' />
              Collabs. Made easy.
            </Typography.Body>
            <div className='pb-1 mb-14' />
            <Button type='primary' webProperty='story' label='Talk to us' size='large' className='px-20' href='mailto: partnerships@story.xyz' target='_blank' rel='noreferrer' />
          </section>
          <section className='relative z-10'>
            <div className='flex items-end'>
              <Typography.H5 as='h3'>
                Marketplaces
              </Typography.H5>
              <Typography.Link className='ml-6 hidden md:flex items-center relative' style={{
                bottom: '0.4rem',
              }}>
              </Typography.Link>
            </div>
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
              {
                collections.map((collection) => (
                    <Card
                      {...collection}
                      img={
                        <Image src={collection.img} alt={collection.imgAlt} width='640' height='427' priority />
                      }
                      thumbnail={
                        <Image src={collection.thumbnail} alt={collection.thumbnailAlt || ''} width='100' height='100' priority />
                      }
                      key={collection.title}
                    />
                  )
                )
              }
            </div>
          </section>
          <section className='text-center my-20 md:my-36'>
            <div>
              <Typography.H2>
                We can help you
                <br />
                <GradientText webProperty='story' text=' launch your own marketplace' />
              </Typography.H2>
            </div>
            <div className='space-y-4 md:space-y-0 md:space-x-5 mt-10 md:mt-20'>
              <Button type='primary' webProperty='story' label="Let's get started" size='large' className='px-20' href='mailto: partnerships@story.xyz' target='_blank' rel='noreferrer' />
              {/* <Button webProperty='story' type='secondary' label="Browse Collections" size='large' /> */}
            </div>
          </section>
          <section>
            <Typography.H5 as='h3'>
              Drops
            </Typography.H5>
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
              {
                drops.map((collection) => (
                  <Card
                    {...collection}
                    img={
                      <Image src={collection.img} alt={collection.imgAlt} width='640' height='427' priority />
                    }
                    thumbnail={
                      <Image src={collection.thumbnail} alt={collection.thumbnailAlt || ''} width='100' height='100' priority />
                    }
                    key={collection.title}
                  />
                ))
              }
            </div>
          </section>
          <section className='text-center mt-20 mb-36 md:my-36 relative'>
            <div>
              <Typography.H2>
                We can help you
                <br />
                <GradientText webProperty='story'>
                  execute a&nbsp;
                  <br className='md:hidden' />
                  flawless drop
                </GradientText>
              </Typography.H2>
              <span className={`${styles.spline32} absolute z-0`}>
                <Image src='/splines-00032.png' width={732} height={654}  alt="spline" priority />
              </span>
            </div>
            <div className='mt-10 md:mt-20'>
              <Button type='primary' webProperty='story' label='Talk to us' size='large' className='px-20 relative z-20' href='mailto: partnerships@story.xyz' target='_blank' rel='noreferrer' />
            </div>
          </section>
        </div>
        <Dashboard {...ognInfo} />
        <Community socials={socials} />
        <LatestStories articles={articles} />
      </main>
      <div className='relative z-10'>
        <Footer webProperty='story' />
      </div>
    </div>
  )
}

export async function getStaticProps () {
  const { links, collections, drops, articles } = await requestCmsData();
  const ognInfo = await requestOgnData();
  const socialRes = await fetch(`${process.env.NEXT_LEGACY_WEBSITE_HOST}/social-stats`);
  const socials = await socialRes.json();
  const seoRes = await fetchAPI("/story/page/en/%2F");

  return {
    props: {
      links,
      collections,
      drops,
      ognInfo,
      socials: socials.stats,
      articles,
      seo: transformSeo(seoRes.data)
    },
    revalidate: 5 * 60, // revalidate every 5 minutes
  }
}

export default Home
