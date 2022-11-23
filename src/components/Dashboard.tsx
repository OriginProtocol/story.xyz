import { Button, GradientText, Typography } from '@originprotocol/origin-storybook'
import Image from 'next/future/image'
import styles from '../styles/Home.module.css'
import { formatCurrency } from '../helpers/math'

type Props = {
  circulatingOgn: number
  ognPrice: number
}

type infoMapType = [
  string, string, number, number,
]

export default function Dashboard ({
  circulatingOgn,
  ognPrice
}: Props) {
  const infoMap: infoMapType[] = [
    ['Ogn price', '$', ognPrice, 4],
    ['Market cap', '$', ognPrice * circulatingOgn, 0],
    ['Circulating supply', '', circulatingOgn, 0],
    ['Total supply', '', 1000000000, 0],
  ]

  return (
    <div className='z-10 relative py-9 sm:py-28 bg-[#0074F0] overflow-hidden'>
      <section className='max-w-screen-xl mx-auto px-9 sm:py-16'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='flex flex-col text-white w-full'>
            <div className='flex items-start justify-between'>
              <h3 className={`text-[1.5rem] leading-[1.85rem] w-[75%] sm:w-[100%] sm:text-[3rem] md:leading-[4rem] font-bold ${styles.header}`}>
                Origin Story Governance&nbsp;
                <br className='hidden md:block' />
                is
                <br className='sm:hidden' />
                &nbsp;powered by Origin&apos;s&nbsp;
                <br />
                Native Token: OGN
              </h3>
              <Image src='/origin-logo.svg' width='80' height='80' alt='Origin logo' className='sm:hidden w-[30%]'/>
            </div>
            <div className='grid grid-cols-2 gap-2 my-12'>
              {
                infoMap.map(([label, unit, value, decimals]) => (
                  <div
                    key={label}
                  >
                    <Typography.Label>
                      {label}
                    </Typography.Label>
                    <p className='text-[1.5rem] sm:text-[2rem] font-bold mb-2'>
                      {unit}{value ? formatCurrency(value.toString(), decimals) : ''}
                    </p>
                  </div>
                ))
              }
            </div>
            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
              <Button label='Buy OGN' webProperty='story' type='secondary' className='text-center' href="https://api.originprotocol.com/dashboard" target='_blank' rel='noreferrer' />
              <Button label='View Dashboard' webProperty='story' type='secondary' className='text-center' href="https://api.originprotocol.com/dashboard" target='_blank' rel='noreferrer' />
            </div>
          </div>
          <div className='flex flex-col justify-between items-center md:w-1/3 w-full'>
            <Image src='/origin-logo.svg' width='300' height='300' alt='Origin logo' className='hidden md:block'/>
            <div className='w-full'>
              <Typography.Body2 className='opacity-75 text-white md:text-center mt-10 mb-6'>
                OGN is listed on all major exchanges
              </Typography.Body2>
              <div className='flex space-x-4 sm:space-x-12 items-center mt-2 justify-between sm:w-[20rem] mx-auto'>
                <Image src='/binance-logo.svg' width={148} height={30} alt='Binance logo' />
                <Image src='/coinbase-logo.svg' width={134} height={24} alt='Coinbase logo' className='relative bottom-1'/>
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
          <Typography.Body className='mt-6 text-center'>
            Earn 100% of all marketplace fees when you stake your OGN
          </Typography.Body>
          <a href='https://app.story.xyz/stake' className='cursor-pointer w-full sm:hidden text-center px-10 py-4 mb-16 mt-6 shadow rounded-full bg-gradient-to-r from-[#FA00FF] to-[#FED3AB] relative z-20' target='_blank' rel='noreferrer'>
            Earn Rewards
          </a>
          <a href='https://app.story.xyz/stake' className='cursor-pointer hidden md:block w-64 text-center px-10 py-4 mt-6 shadow rounded-full bg-gradient-to-r from-[#FA00FF] to-[#FED3AB] relative z-20' target='_blank' rel='noreferrer'>
            Earn Rewards
          </a>
          <div className='absolute' style={{right: 'calc(50% - 62rem)', top: '24rem'}}>
            <Image src='/splines-00021.png' width='1156' height='1140' alt='Spline 21' className='hidden sm:block'/>
          </div>
          <div className='absolute' style={{right: '-9rem', bottom: '-12rem'}}>
            <Image src='/splines-00021.png' width='300' height='300' alt='Spline 21' className='sm:hidden'/>
          </div>
        </div>
      </section>
    </div>
  )
}