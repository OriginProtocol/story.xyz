import React from "react"
import Link from 'next/link'
import Head from "next/head"
import { Typography, Button, Header, Footer, MappedLink, LinkFormatted, IconFormatted } from '@originprotocol/origin-storybook'
import requestCmsData from '../src/requestCmsData'

const Error404 = ({ links }: {
  links: MappedLink<LinkFormatted<IconFormatted>>[],
}) => { 
  return (
    <>
      <Head>
        <title>404 | Origin Story</title>
      </Head>
      <section className='error grey'>
        <Header mappedLinks={links} webProperty="originprotocol" />
        <div className='max-w-screen-xl mx-auto px-8 pb-[8.5rem] md:pb-[18.375rem]'>
          <div className=''>
            <div className='mt-5 md:mt-16'>
              <Typography.H2 as='h1' className='inline-block text-[2.25rem] leading-[2.5rem] md:text-[4.5rem] md:leading-[5.25rem] gradient-404' style={{ fontWeight: 700 }}>
                {'Ooops...'}
              </Typography.H2>
            </div>
            <div className='max-w-[33.81rem] mt-5 md:mt-9'>
              <Typography.H3 className='text-[2rem] leading-[3.5rem] md:text-[3.5rem] md:leading-[4rem]' style={{ fontWeight: 400 }}>
                {'Sorry, we can’t seem to find that page'}
              </Typography.H3>
            </div>
            <div className="mt-10 md:mt-20">
              <Button type='primary' webProperty='story' label="Go back home" size='medium' className='px-20' href='/' />
            </div>
          </div>
        </div>
      </section>
      <Footer webProperty={'story'} />
      <style jsx>{`
        section.error {
          background-image: url(/images/graphics/splines-404.png);
          background-repeat: no-repeat;
          background-position: right bottom;
        }

        @media (max-width: 1280px) {
          section.error {
            background-size: 40vw;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps () {
  const { links } = await requestCmsData()

  return {
    props: {
      links,
    },
    revalidate: 5 * 60, // revalidate every 5 minutes
  }
}

export default Error404