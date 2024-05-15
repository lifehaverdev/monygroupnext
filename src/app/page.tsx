"use client"

// import Image from "next/image";
import Header from '../components/header'
import Socials from '../components/socials'
import { Cards } from '../components/cards'
import {projects} from '../Lib/homeItems';
import Image from 'next/image';

import { BeakerIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/20/solid'

const cards = [
  {
    name: '1000x',
    description: 'Responsible for billions of dollars of value capture in the milady derivative sector.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Unbounded Creative Talent',
    description: 'Army of final boss cyborg fiver artists ready to commit rugcore kamikaze at the click of a button.',
    icon: BeakerIcon,
  },
  {
    name: 'PED',
    description: 'Not on drugs. Natty programmer. No cigarettes lately either. Lots of good food cooked by wife and exercise.',
    icon: ChartBarIcon,
  },
]

export default function Home() {
  return (
    <>
    <Header navigation={
      [
        {name: 'Lore', href: '/lore'},
        {name: 'Merch', href: '/merch'},
        {name: 'Mint', href: '/mint'}
      ]
      }
      rightElement={<></>}/>
      <br/>
      <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          We have some mints available rn.
          <br />
          Get yours.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">

          <a href="/mint" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <Image
        src="/images/dexbanner.png"
        width={1500}
        height={500}
        alt=""
        className="absolute blur inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Millions...</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
          Welcome to Mony Group, the vanguard of Web3 innovation. Spearheaded by a single visionary, we don’t just participate in the crypto revolution—we define it. From milady derivative to a burgeoning empire of NFT collections, our mastery spans from intricate Solidity contracts to the art that captivates your digital persona. Feeling left behind? Step up, harness our exclusive stable diffusion tech via our Telegram bot, and stake your claim in our unique marketplace. Mony Group isn’t just ahead of the game; we’re rewriting the rules. Are you in, or are you yesterday’s news?
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div key={card.name} className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
              <card.icon className="h-7 w-5 flex-none text-indigo-400" aria-hidden="true" />
              <div className="text-base leading-7">
                <h3 className="font-semibold text-white">{card.name}</h3>
                <p className="mt-2 text-gray-300">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Cards items={projects}/>
    <Socials/>
    </>
  );
}
