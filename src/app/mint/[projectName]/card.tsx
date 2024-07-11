'use client'
import { FC } from 'react'
import { Disclosure, Tab } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import projects from '@/data/projects'
import { useWriteContract, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { useState, useEffect } from 'react'
import { smol } from '@/Lib/bignumbers'

function classNames(...classes:Array<string>) {
  return classes.filter(Boolean).join(' ')
}

interface CardProps {
  projectName: string;
  proof: string[];
  contract: { address: `0x${string}` | undefined, abi: any, chainId: number | undefined};
  address: `0x${string}` | undefined;
  supply: BigInt | undefined;
}

const Card: FC<CardProps> = ({ projectName, proof, contract, address, supply }) => {
  'use client'
  const project = projects.find(p => p.name.toLowerCase() === projectName.toLowerCase());
  const [amount, setAmount] = useState(1);

  const { data: freeMinted} = useReadContract({
    ...contract,
    functionName: 'freeMinted',
    args: [address as `0x${string}`]
  })
  const { data:hash, isPending, isSuccess, error, isError, writeContract } = useWriteContract();
  useEffect(()=>{
    
  },[isPending, isError, error])
  const mint = (amount:number) => {
    'use client'
    if(project && project.ethereumPrice){
      writeContract(
        {
          address: contract.address as `0x${string}`,
          abi: contract.abi,
          chainId: contract.chainId,
          functionName: 'mint',
          args: [
              BigInt(amount)
          ],
          value: parseEther(JSON.stringify(project?.ethereumPrice * amount))
        })
    }
  }
  const freeMint = (proof:string[]) => {
    'use client'
    writeContract(
      {
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        chainId: contract.chainId,
        args: [proof],
        functionName: 'freeMint'
      })
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    'use client'
    e.preventDefault() 
    if(proof.length > 0 && !freeMinted){
      freeMint(proof);
    } else {
      mint(amount);
    }
  }

  function mintButton(
    //{projectName, proof, contract, address}:CardProps, freeMinted:any
  ) {
    'use client'
    const free = ( typeof freeMinted == 'boolean' && proof.length > 0 && !freeMinted)
    const amountSelector = 
        <>
        <label className={`block mb-2 text-sm font-medium ${project?.colors.disclosureButtonTextColor} dark:text-white`}>Choose quantity:</label>
            <div className="relative flex items-center max-w-[11rem]">
                <button onClick={() => {setAmount(amount - 1)}} disabled={amount==0}
                type="button" id="decrement-button" data-input-counter-decrement="bottles-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                    </svg>
                </button>
                <input type="text" id="bottles-input" data-input-counter data-input-counter-min="1" data-input-counter-max="5" aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="" 
                    value={amount}
                    required
                    readOnly
                    />
                <button 
                onClick={() => {setAmount(amount + 1);}}
                disabled={smol('totalSupply',supply) + amount == 365}

                type="button" id="increment-button" data-input-counter-increment="bottles-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className={`w-3 h-3 ${project?.colors.secondaryTextColor} dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
            <p id="helper-text-explanation" className={`mt-2 text-sm ${project?.colors.secondaryTextColor} dark:text-gray-400`}>Please select amount</p>
            </>
      return (
        <>
        { free ? <></> : amountSelector}
        <div className="mt-10 flex">
          <button
            type="submit"
            className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white ${project?.colors.buttonHoverBackgroundColor} focus:outline-none focus:ring-2 ${project?.colors.buttonFocusRingColor} focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full 
            ${isPending ? 'opacity-50 cursor-not-allowed': 
            isSuccess ? project?.colors.buttonSuccessBackgroundColor : project?.colors.buttonBackgroundColor}`}
          >
            {free ? 'Free Mint' : 'Mint'}
          </button>
        </div>
        <p>{isError ? `${error}` : ''}</p>
        </>
      )
  }

  if (!project) {
    return <div><h1>Project not found</h1></div>;
  }

  const styles = {
    backgroundColor: project.colors.backgroundColor,//'#1e3a8a',
    minHeight: '100vh',
    //backgroundImage: "url('/path/to/your/image.jpg') !important",
    //backgroundSize: 'cover !important',
    //backgroundPosition: 'center !important',
    //backgroundRepeat: 'no-repeat !important',
    //backgroundAttachment: 'fixed !important',
  };

  return (
    // <div className="bg-white">
    <div style={styles}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {project.images.map((image) => (
                  <Tab
                    key={image.id}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{image.name}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <Image
                            src={image.src} 
                            alt="" 
                            width={512}
                            height={512}
                            className="h-full w-full object-cover object-center" 
                            />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-indigo-500' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {project.images.map((image) => (
                <Tab.Panel key={image.id}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={512}
                    height={512}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* project info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className={`text-3xl font-bold tracking-tight ${project.colors.primaryTextColor}`}>{project.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Project Description</h2>
              <p className={`text-3xl tracking-tight ${project.colors.primaryTextColor}`}>{project.ethereumPrice}E</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className={`space-y-6 text-base ${project.colors.descriptionTextColor}`}
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
            <form 
              className="mt-6"
              onSubmit={submit}
              >
              {mintButton()}
            </form>
            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {project.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(open ? project.colors.disclosureButtonOpenTextColor : project.colors.primaryTextColor, 'text-sm font-medium')}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className={`block h-6 w-6 ${project.colors.disclosureButtonOpenIconColor}`}
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className={`block h-6 w-6 ${project.colors.disclosureButtonIconColor}`}
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                            <li key='contract'><a href={`https://etherscan.io/address/${project.ca}#code`}>{project.ca.slice(0,10)}...</a></li>
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Card;