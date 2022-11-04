import {
  AltCard,
  Button, Typography
} from "@originprotocol/origin-storybook";
import Image from "next/image";
import { useStoreState } from "pullstate";
import { formatCurrency } from "../utils/math";

export type Social = {
  id: number,
  name: string,
  subscribed_count: number,
  timestamp: string
}

const links = {
  Facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  Twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
  Youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  Medium: process.env.NEXT_PUBLIC_MEDIUM_URL,
  Telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL,
  Discord: process.env.NEXT_PUBLIC_DISCORD_URL,
  Reddit: process.env.NEXT_PUBLIC_REDDIT_URL,
  Blockfolio: process.env.NEXT_PUBLIC_BLOCKFOLIO_URL,
};

const Community = ({
  socials
}: {
  socials: Social[]
}) => {
  return (
    <section className="mb-36">
      <div className="mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col mx-auto pt-10 px-10 max-w-screen-xl md:flex-row md:flex-1 md:mt-12 md:pb-24">
            <div style={{
              maxWidth: "635px",
            }}>
              <Image
                src={"/ellipses-homepage.png"}
                className="ellipses pb-10"
                alt="Ellipses"
                width="635px"
                height="635px"
              />
            </div>
            <div className="md:flex md:flex-col md:items-start md:justify-center md:pl-16 md:flex-1">
              <Typography.H3 className='font-bold'>It&apos;s all about the community</Typography.H3>
              <div className="opacity-75 font-light mt-5 mb-7">
                Join hundreds of thousands of community members and token
                holders, hundreds of open-source developers, or our
                world-class core team.
              </div>
              <Button
                target="_blank"
                href={"/community"}
                rel="noopener noreferrer"
                className="button gradient2"
              >
                Learn more
              </Button>
            </div>
          </div>
          <div>
            <div className='max-w-screen-xl mx-auto pb-20 px-8 mt-20'>
              <Typography.H3 className='mb-16 font-bold'>Community</Typography.H3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 container-fluid mt-5 mb-5'>
                {socials && socials?.map((social) => {
                  if (social.name.indexOf(' ') < 0 && social.name !== 'Facebook') {
                    return (
                      <AltCard
                        title={social.name.toUpperCase()}
                        body={`${formatCurrency(
                          social.subscribed_count / 1000,
                          1
                        )}k followers`}
                        imgSrc={
                          `/logos/social-${social.name.toLowerCase()}.svg`
                        }
                        imgAlt={social.name}
                        linkHref={links[social.name as keyof typeof links] || ''}
                        narrow={false}
                        key={social.name}
                      />
                    );
                  }
                })}
              </div>
              <Typography.H7 className="pt-12">Region-specific channels</Typography.H7>
              {socials && (
                <div className="grid grid-cols-2 md:grid-cols-8 container-fluid mt-5">
                  {socials[5]?.name === 'Telegram (Indonesia)' &&
                    <AltCard
                      title={"INDONESIAN"}
                      body={`${formatCurrency(
                        socials[5].subscribed_count / 1000,
                        1
                      )}k followers`}
                      imgSrc="/logos/social-telegram.svg"
                      imgAlt={"Telegram"}
                      linkHref={process.env.NEXT_PUBLIC_TELEGRAM_INDONESIA_URL}
                      narrow={true}
                      thumbnailSrc="/graphics/flag-indonesia.png"
                      thumbnailAlt={"Flag"}
                    />
                  }
                  {socials[6]?.name === 'Telegram (Korean)' &&
                    <AltCard
                      title={"KOREAN"}
                      body={`${formatCurrency(
                        socials[6].subscribed_count / 1000,
                        1
                      )}k followers`}
                      imgSrc="/logos/social-telegram.svg"
                      imgAlt={"Telegram"}
                      linkHref={process.env.NEXT_PUBLIC_TELEGRAM_KOREA_URL}
                      narrow={true}
                      thumbnailSrc="/graphics/flag-korea.png"
                      thumbnailAlt={"Flag"}
                    />
                  }
                  {socials[7]?.name === 'Telegram (Russia)' &&
                    <AltCard
                      title={"RUSSIAN"}
                      body={`${formatCurrency(
                        socials[7].subscribed_count / 1000,
                        1
                      )}k followers`}
                      imgSrc={"/logos/social-telegram.svg"}
                      imgAlt={"Telegram"}
                      linkHref={process.env.NEXT_PUBLIC_TELEGRAM_RUSSIA_URL}
                      narrow={true}
                      thumbnailSrc={
                        "/graphics/flag-russia.png"
                      }
                      thumbnailAlt={"Flag"}
                    />
                  }
                  {socials[8]?.name === 'Telegram (Spanish)' &&
                    <AltCard
                      title={"SPANISH"}
                      body={`${formatCurrency(
                        socials[8].subscribed_count / 1000,
                        1
                      )}k followers`}
                      imgSrc={"/logos/social-telegram.svg"}
                      imgAlt={"Telegram"}
                      linkHref={process.env.NEXT_PUBLIC_TELEGRAM_SPAIN_URL}
                      narrow={true}
                      thumbnailSrc={
                        "/graphics/flag-spain.png"
                      }
                      thumbnailAlt={"Flag"}
                    />
                  }
                  {socials[9]?.name === 'Telegram (Turkish)' &&
                    <AltCard
                      title={"TURKISH"}
                      body={`${formatCurrency(
                        socials[9]?.subscribed_count / 1000,
                        1
                      )}k followers`}
                      imgSrc="/logos/social-telegram.svg"
                      imgAlt={"Telegram"}
                      linkHref={process.env.NEXT_PUBLIC_TELEGRAM_TURKEY_URL}
                      narrow={true}
                      thumbnailSrc="/graphics/flag-turkey.png"
                      thumbnailAlt={"Flag"}
                    />
                  }
                  {socials[10]?.name === 'Telegram (Vietnam)' &&
                    <AltCard
                      title={"VIETNAMESE"}
                      body={`${formatCurrency(
                        socials[10]?.subscribed_count / 1000,
                        1
                      )}k followers`}
                      imgSrc="/logos/social-telegram.svg"
                      imgAlt="Telegram"
                      linkHref={process.env.NEXT_PUBLIC_TELEGRAM_VIETNAM_URL}
                      narrow={true}
                      thumbnailSrc="/graphics/flag-vietnam.png"
                      thumbnailAlt={"Flag"}
                    />
                  }
                </div>
              )}
            </div>
          </div>

          <div className="team flex layout flex-col-reverse mt-10 md:flex-row max-w-screen-xl mx-auto">
            <div className="text-container px-6 mt-10 max-w-xl md:mr-12">
              <Typography.H3 className='font-bold'>A world-class team</Typography.H3>
              <div className="opacity-75 font-light mt-3 mb-9">
                Our team is led by serial entrepreneurs, early employees at
                YouTube, and engineering managers at Google, Coinbase and
                Dropbox.
              </div>
              <div className="grid grid-cols-3 gap-4 md:flex md:items-center">
                <Image
                  src={'/logos/company-paypal.svg'}
                  className="companies"
                  alt="Paypal"
                  width="80px"
                  height="17px"
                />
                <Image
                  src={'/logos/company-youtube.svg'}
                  className="companies"
                  alt="Youtube"
                  width="80px"
                  height="17px"
                />
                <Image
                  src={'/logos/company-google.svg'}
                  className="companies"
                  alt="Google"
                  width="80px"
                  height="17px"
                />
                <Image
                  src={'/logos/company-dropbox.svg'}
                  className="companies"
                  alt="Dropbox"
                  width="80px"
                  height="17px"
                />
                <Image
                  src={'/logos/company-coinbase.svg'}
                  className="companies"
                  alt="Coinbase"
                  width="80px"
                  height="17px"
                />
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 mt-8 mb-16">
                <Button
                  href="/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='md:mr-4'
                >
                  Meet our team
                </Button>
                <Button
                  href="https://angel.co/company/originprotocol/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 md:px-10 mt-2"
                  type='secondary'
                >
                  View careers
                </Button>
              </div>
            </div>
            <div className="relative my-10 md:my-0">
              <span
                className={`absolute left-10 sm:left-24 right-10 sm:right-24 md:left-0 md:-right-20 -top-12 sm:-top-20 md:-top-20 md:w-full`}
              >
                <Image
                  src="/splines-00032.png"
                  width={732}
                  height={654}
                  alt="spline32"
                />
              </span>
              <div
                className={`relative p-10 bg-black mt-10 mb-10 rounded-[1.25rem] mx-6 pb-[56.25%] md:w-[580px] h-[335px] overflow-hidden`}
              >
                <iframe
                  src="https://www.youtube.com/embed/ERh2n-vlpQ4"
                  srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/ERh2n-vlpQ4?autoplay=1><img src=https://img.youtube.com/vi/ERh2n-vlpQ4/hqdefault.jpg alt='Video Working at Origin'><span>▶</span></a>"
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full"
                  title="Working at Origin"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community;
