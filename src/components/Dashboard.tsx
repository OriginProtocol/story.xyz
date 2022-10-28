import { Button, GradientText, Typography } from '@originprotocol/origin-storybook'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { formatCurrency } from '../utils/math'

type Props = {
  circulatingOgn: number
  totalOgn: number
  ognPrice: number
}

type infoMapType = [
  string, string, number, number,
]

export default function Dashboard ({
  circulatingOgn,
  totalOgn,
  ognPrice
}: Props) {
  const infoMap: infoMapType[] = [
    ['Ogn price', '$', ognPrice, 4],
    ['Market cap', '$', ognPrice * circulatingOgn, 0],
    ['Circulating supply', '', circulatingOgn, 0],
    ['Total supply', '', 1000000000, 0],
  ]

  return (
    <div className='z-10 relative py-9 md:py-28 bg-[#0074F0]'>
      <section className='max-w-screen-xl mx-auto px-9'>
        <div className='flex justify-between'>
          <div className='flex flex-col text-white'>
            <Typography.H2 className={styles.header}>
              Origin Story Governance&nbsp;
              <br className='hidden md:block' />
              is powered by Origin&apos;s&nbsp;
              <br className='hidden md:block' />
              Native Token: OGN
            </Typography.H2>
            <div className='grid grid-cols-2 gap-2 my-12'>
              {
                infoMap.map(([label, unit, value, decimals]) => (
                  <div
                    className=''
                    key={label}
                  >
                      <Typography.Label>
                        {label}
                      </Typography.Label>
                      <p className='text-[2.5rem] font-bold'>
                        {unit}{formatCurrency(value.toString(), decimals)}
                      </p>
                  </div>
                ))
              }
            </div>
            <div className='flex space-x-4'>
              <Button label='Buy OGN' webProperty='story' type='secondary' href='/stake' />
              <Button label='View Dashboard' webProperty='story' type='secondary' />
            </div>
          </div>
          <div className='flex flex-col justify-between items-center w-1/3'>
            <Image src='/origin-logo.svg' width='300' height='300' alt='Origin logo' />
            <div>
              <Typography.Body2 className='opacity-75 text-white text-center mt-10 mb-4'>
                OGN is listed on all major exchanges
              </Typography.Body2>
              <div className='flex space-x-12 items-center mt-2 justify-between w-[30rem]'>
                <Image src='/binance-logo.svg' width={148} height={30} alt='Binance logo' />
                <Image src='/ftx-logo.svg' width={107} height={33} alt='FTX logo' />
                <Image src='/coinbase-logo.svg' width={134} height={24} alt='Coinbase logo' />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full text-white flex flex-col items-center pt-48 pb-20 relative'>
          <Typography.H1 as='h3' className='text-center' style={{fontWeight: 500}}>
            Stake OGN
            <br />
            <div className='-mt-4'>
              <GradientText webProperty='story' gradients={['#AFA1FF', '#F68BFF', '#FD9AC2']}>
                earn rewards
              </GradientText>
            </div>
          </Typography.H1>
          <Typography.Body className='my-6'>
            Earn 100% of all marketplace fees when you stake your OGN
          </Typography.Body>
          <a href='' className='px-10 py-4 mt-6 shadow rounded-full bg-gradient-to-r from-[#FA00FF] to-[#FED3AB]'>
            Earn Rewards
          </a>
          <div className='absolute' style={{right: 'calc(50% - 62rem)', top: '24rem'}}>
            <Image src='/splines-00021.png' width='1156' height='1140' alt='Spline 21' />
          </div>
        </div>
      </section>
    </div>
  )
}