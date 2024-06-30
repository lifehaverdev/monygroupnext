import Image from 'next/image'
import projects from '@/data/projects'
import { FC } from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useReadContracts } from 'wagmi'
import { smol } from '@/Lib/bignumbers';
import { getMeta, uriToUrl } from '@/components/ipfs'

  interface RecentsProps {
    projectName: string;
    supply: BigInt | undefined;
    contract: { address: `0x${string}` | undefined, abi: any, chainId: number | undefined}
  }

  const Recents: FC<RecentsProps> = ({ projectName, supply, contract }) => {
    //console.log('where are the recent mints')
  const [products, setProducts] = useState<any[]>([]);
  const total = smol('totalSupply',supply);
  let contracts = []
      for (let i = 0; i < 4; i++) {
        contracts.push({
          ...contract,
          functionName: 'tokenURI',
          args: [BigInt(total - i)],
        });
        contracts.push({
          ...contract,
          functionName: 'ownerOf',
          args: [BigInt(total - i)],
        });
      }

  const { data: result } = useReadContracts({
    contracts: contracts,
  });

  useEffect(() => {
    const fetchMintedTokens = async () => {
      if (!contract || !supply) return;

      const last6Tokens:any = [];
      const end = Number(supply);

      if (result) {
        for (let i = 0; i < result.length; i += 2) {
          let tokenUri = result[i];
          const owner = result[i + 1];
          if (tokenUri.status == 'success' && typeof tokenUri.result == 'string') {
            const metadata = await getMeta(tokenUri.result);
            //console.log('metadata',metadata)
            last6Tokens.push({
              id: end - i / 2,
              name: metadata.name,
              number: metadata.number,
              imageSrc: `/api/image/${projectName}/${metadata.number}?tokenImageUri=${metadata.image}`,
              imageAlt: metadata.description,
              owner: owner.result,
            });
          }
        }
        setProducts(last6Tokens);
      }
    };
    fetchMintedTokens();
  }, [contract, supply, result,projectName]);

  const project = projects.find(proj => proj.name.toLowerCase() === projectName.toLowerCase());
  
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recently Minted</h2>
            <a href={project?.secondaryMarket} className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
              See who minted
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    width={512}
                    height={512}
                    className="h-full w-full object-cover object-center"
                    unoptimized
                  />
                </div>
                <h3>{product.number}</h3>
                <h3>{product.owner.slice(0,10)}...</h3>
              </div>
            ))}
          </div>
  
          <div className="mt-8 text-sm md:hidden">
            <a href={project?.secondaryMarket} className="font-medium text-indigo-600 hover:text-indigo-500">
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  export default Recents