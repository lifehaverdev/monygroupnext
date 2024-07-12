'use client'

import Card from './card'
import { usePathname } from 'next/navigation';
import Recents from './recentMints'
//import {verifyAddressInMerkleTree} from '@/components/merkle';
import { useState, useEffect } from 'react';
import { useAccount, useReadContract, type BaseError } from 'wagmi';
import projects from '@/data/projects'
   
export default function Page() {
  const [proof, setProof] = useState<string[]>([]);
  const [proven, setProven] = useState<boolean>(false);
  const [totalSupply, setTotalSupply] = useState<bigint | undefined>(undefined);
  const { address } = useAccount();
  const pathName = usePathname();
  const projectName = pathName.slice(6);  // `id` is now extracted from the URL
  const project:any = projects.find(proj => proj.name.toLowerCase() === projectName.toLowerCase());
  const contractAddress = project ? project.ca as `0x${string}`: undefined;
  const abi = project ? project.abi : [];
  const chainId = project ? project.chainId : -1;
  
  const contract = {
    address: contractAddress,
    abi: abi,
    chainId: chainId
  } as const
  const { data: supply, error, isLoading } = useReadContract({
    ...contract,
    functionName: 'totalSupply',
  });

  

  useEffect(() => {
    if (supply) {
      setTotalSupply(supply as bigint);
    }
  }, [supply]);
  
  useEffect(() => {
    interface MintPageProps {
      address: string;
      projectName: string;
    }
    const verifyAddressInMerkleTree = async ({ projectName, address }:MintPageProps) => {
      try {
        const response = await fetch(`/api/whitelist?projectName=${projectName}&address=${address}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //body: JSON.stringify({ projectName, address }),
        });
  
        const data = await response.json();
        //console.log(data);
        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
  
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    if (address && projectName) {
      verifyAddressInMerkleTree({projectName, address}).then(proof => {
        //console.log(proof.proof)
        if (proof.proof && proof.proof.length > 0) {

          setProof(proof.proof);
        }
        setProven(true);
      });
    }
  }, [address, projectName]);  // Re-run the effect if either the address or projectName changes
 
  

  if (isLoading) {
    return (
      <div>
        <h1>hold on</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>
        Error: {(error as any).shortMessage || error.message}
        </h1>
      </div>
    )
  }

  
  return (
    <>
    
    <Card proven={proven} projectName={projectName as string} proof={proof} contract={contract} address={address} supply={supply as bigint}/>
    {
      isLoading ? 
      <p>Loading...</p> :
       <Recents projectName={projectName as string} supply={supply as bigint} contract={contract}/>
    }
    
    </>
  )
}
