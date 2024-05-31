import { Items } from "../components/cards"
import Image from 'next/image'

export const projects: Items = [
    {
        id: 1,
        element: stationthisbot()
        
    },
    {
        id: 2,
        element: miladystation2()
    },
    {
        id: 3,
        element: miladystation()
    },
    {
        id: 4,
        element: tubbystation()
        
    },
    {
        id: 5,
        element: cigstation()
    },
    {
        id: 6,
        element: missingno()
    }
]

function miladystation() {
    return (
        <>
        <Exhibit 
            title='miladystation' 
            headline='Flagship release from mony group' 
            imageUrl='/miladystation.png'
            secondary={[
                {
                    name: 'website',
                    link: 'https://miladystation.net'
                },
                {
                    name: 'nftx',
                    link: 'https://nftx.io/vault/0x855882cc65ba66cdbc7a8c512143f10169891307/buy/'
                },
                {
                    name: 'blur',
                    link: 'https://blur.io/collection/miladystation'
                },
                {
                    name: 'opensea',
                    link: 'https://opensea.io/collection/miladystation'
                }
            ]}
        />
        </>
    )
}

function stationthisbot() {
    return (
        <>
        <Exhibit
            title='$MS2 Station This'
            headline='Powerful Stable Diffusion Telegram Bot developed by Mony Group. Powered by MS2 coin on solana'
            imageUrl='/stationthisbot.jpg'
            secondary={[
                {
                    name: 'telegram',
                    link: 'https://t.me/+If9pEMYViUNiZWIx'
                },
                {
                    name: 'website',
                    link: 'https://miladystation2.net'
                },
                {
                    name: 'chart',
                    link: 'https://www.dextools.io/app/en/solana/pair-explorer/3gwq3YqeBqgtSu1b3pAwdEsWc4jiLT8VpMEbBNY5cqkp?t=1715644569055'
                },
                {
                    name: 'buy',
                    link: 'https://jup.ag/swap/SOL-AbktLHcNzEoZc9qfVgNaQhJbqDTEmLwsARY7JcTndsPg'
                }
            ]}
        />
        </>
    )
}

function miladystation2() {
    return (
        <>
        <Exhibit
            title='Miladystation2 COMING SOON'
            headline='Dual Nature Token Second Generation Release on ETH. GIF NFT with upgradeable, downloadable VRM Models'
            imageUrl='/miladystation2.png'
            secondary={[
                {
                    name: 'website',
                    link: '/ms2'
                }
            ]}
        />
        </>
    )
}

function cigstation() {
    return (
        <>
        <Exhibit
            title='Cigstation'
            headline='First Cigawrettes NFT Derivative, Second MONY Franchise release'
            imageUrl='/cigstation.png'
            secondary={[
                {
                    name: 'opensea',
                    link: 'https://opensea.io/collection/cigstation'
                },
                {
                    name: 'Power Packs Onchained Coin Flip Battle Game',
                    link: 'https://miladystation.net/PPO'
                }
            ]}
        />
        </>
    )
}

function tubbystation() {
    return (
        <>
        <Exhibit
            title='TubbyStation MINTING NOW'
            headline='Final MONY First Gen release'
            imageUrl='/images/collections/tubbystation/1.png'
            secondary={[
                {
                    name: 'website',
                    link: '/tubby'
                },
                {
                    name: 'opensea',
                    link: 'https://opensea.io/collection/tubbystation'
                }
            ]}
        />
        </>
    )
}

function missingno() {
    return (
        <>
        <Exhibit
            title='Mony MissingNo.'
            headline='The community asked to mint their favorite MiladyStation Rejects from a thread arthurt shared. Surprise free mint release ERC1155'
            imageUrl='/missingno.png'
            secondary={[
                {
                    name: 'website',
                    link: 'https://miladystation.net/classic/missingno'
                },
                {
                    name: 'opensea',
                    link: 'https://opensea.io/collection/mony-missingno'
                }
            ]}
        />
        </>
    )
}

function Exhibit({ title, headline, imageUrl, secondary }: { title: string; headline: string; imageUrl: string; secondary: { name: string; link: string; }[]}) {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <Image
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
              width={100}
              height={100}
              src={imageUrl}
              alt=""
            />
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {headline}
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
              >
                {secondary.map((benefit) => (
                  <li key={benefit.name} className="flex gap-x-3">
                    {/* <CheckCircleIcon className="h-7 w-5 flex-none" aria-hidden="true" /> */}
                    <div className="mt-10 flex">
                        <a href={benefit.link} className="text-sm font-semibold leading-6 text-indigo-400">
                        {benefit.name} <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                  </li>
                ))}
              </ul>
              
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
