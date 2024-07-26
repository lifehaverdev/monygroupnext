// pages/api/verifyAddress.js
import connectToDatabase from '@/Lib/mongodb'
import { keccak256 } from 'viem'
import { MerkleTree } from 'merkletreejs';
import projects from '@/data/projects'
import type { NextApiResponse } from 'next';
import { NextRequest } from 'next/server'
import Web3 from 'web3';

const web3 = new Web3();


async function fetchMerkleLeaves(projectName:string) {
  const dbName = 'Merkles';
  const collectionName = projectName;
  try {
    console.log('connecting to database');
    const client = await connectToDatabase();
    //console.log('client',client)
    const collection = client.db(dbName).collection(collectionName);
    //console.log('collection',collection)
    const documents = await collection.find({}).toArray();
    const document = documents[0];

    if (!document) {
      return null;
    }

    const leaves = document.leaves;
    console.log('leaves',leaves[0],leaves[1],leaves[2])
    return leaves;
  } catch (error) {
    return null;
  }
}

async function verifyAddressInMerkleTree(projectName: string, address:string) {
  try {
    const project = projects.find((p) => p.name.toLowerCase() === projectName);
    if (!project) {
      return false;
    }

    const leaves = await fetchMerkleLeaves(projectName);
    if (!leaves) {
        console.log('could not get the leaves')
      return false;
    }
    // const hashedLeaves = leaves.map((addr: string )=>keccak256(addr.slice(2) as `0x${string}`))
    // const merkleTree = new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
    // console.log('root',merkleTree.getHexRoot())
    // const leaf = keccak256(address.slice(2) as `0x${string}`);
    // const proof = merkleTree.getHexProof(leaf);
    const hashedLeaves = leaves.map((addr: string) => web3.utils.soliditySha3(addr));
    const merkleTree = new MerkleTree(hashedLeaves, web3.utils.soliditySha3, { sort: true });
    console.log('root', merkleTree.getHexRoot());

    const leaf = web3.utils.soliditySha3(address);
    let proof: Array<string> = [];
    leaf ? proof = merkleTree.getHexProof(leaf) : null
    
    //console.log('Proof:', proof); // Log the proof
    if(proof.length == 0){
        console.log('not on the list');
    } else {
        console.log('successfully got proof');
    }
    return proof;
  } catch (error) {
    console.error('Failed to verify address:', error);
    return false;
  }
}

//working proof
//["0x2483963fe6a9e95a4a267dc661f5d5caba2decbfab5052dd1fb9653c72d20398","0xe7b82b6f3e23f076746dd54a5166ed5ffcb0842ce7f3676d5a09120d90aa22d7","0xf97359da9bd3a2c026a02d60a4456c51e2bbc1d0509b6010b704fcfa0e4da85d","0x47ecaedc954872de9ce865bf474c79e9f6fcf0e751f404f9fede60ca7037695f","0x923075f4e54b11dfd26dfd45c8a0e42e85ac051c5702e9106f485269d54f8d14","0xec70ba032bbf1d570d42e1dce01df39643537112f2cce2705195939dad9bc537","0xadaed1913d920a5bf63fad7eaf54fd6e93803833a87dbe34da7d0419731b0a34","0x5dc04e884fd4d091079af9567768ea4adafe2da77a4d1110aac2da51deafa11b","0xc76453456f80769d4e2e0809be597f4200994cf4c327f50eaf1b5079466dea53","0xb98f4365f874753516f3c190ef801b3a4e69caad95f03fbd15a5dd7c70521288","0xfcb87715212dfb118b04b577278a5c3faa62c8757e895b029567f6ac00402a00","0xc72498cf5df769634e402ab392b7942ecaa281fdd3609a57708123e60f578b4b","0xa7fc000bae01ba949d7c623c1e80002802e89b62d75e30287291079be2d8f647","0xecc7ce272fa7e1a6e8ff462d868b252c2a6ac1c5fa1f60d1621752788f4f7916"]
//ExportingGEThandler that returns 405 Method Not Allowed
export async function GET(req: NextRequest, res: NextApiResponse) {
  console.log("this request",req)
  res.status(405).json({ error: 'Method Not Allowed' });
}

export async function POST(req: NextRequest) {
  //const { projectName, address } = req.body;
  const projectName = req.nextUrl.searchParams.get('projectName')
  const address = req.nextUrl.searchParams.get('address')?.toLowerCase()

  if (!projectName || !address) {
    return new Response('projectName and address required', {
        status: 400,
      })
  }

  const proof = await verifyAddressInMerkleTree(projectName, address);
  console.log('proof',proof)
  if (proof && proof.length > 0) {
    //return res.status(200).json({ proof });
    return new Response(JSON.stringify({proof}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400',
        },
      });
  } else {
    return new Response('Verification failed', {
        status: 400,
      })
  }
}
