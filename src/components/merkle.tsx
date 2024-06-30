'use server'

import { keccak256 } from 'viem'
import { MerkleTree } from 'merkletreejs'
import projects from '@/data/projects'
import { Project } from '../types'
import connectToDatabase from '@/Lib/mongodb'

export interface MerkleProps {
    projectName: string;
    address: string;
}

async function fetchMerkleLeaves(projectName:string) {
  'use server'

  const dbName = 'Merkles';
  const collectionName = projectName;
  try {
    console.log('connecting to atlas...')
    const client = await connectToDatabase();
    console.log('we are in?')
    const collection = client.db(dbName).collection(collectionName);
    const documents = await collection.find({}).toArray();
    //console.log(documents)
    // Find the document with the matching projectName
    const document = documents[0]

    if (!document) {
      console.error('Project not found');
      return null;
    }

    const leaves = document.leaves;

    if (!leaves) {
      console.error('Leaves not found in the document');
      return null;
    }

    console.log('Leaves:', leaves.length);
    return leaves;
  } catch (error) {
    return null;
  }
}

export async function verifyAddressInMerkleTree({projectName, address}:MerkleProps) {
    console.log('verifying merkle')
    try {
      const project = projects.find((p:Project) => p.name.toLowerCase() === projectName);
      // Dynamically import the Merkle leaves based on the project name
      
      let leaves;
      if(project && project.merkleLeavesPath.length > 0 && project.merkleLeavesPath[0]){
        leaves = await fetchMerkleLeaves(projectName);
      }
      if(leaves){
      leaves = leaves.map((addr: string )=>keccak256(addr.slice(2) as `0x${string}`))
      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const leaf = keccak256(address.slice(2) as `0x${string}`);
      const proof = merkleTree.getHexProof(leaf);
      console.log(merkleTree.getHexRoot())
      return proof;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Failed to verify address:', error);
      return false;
    }
  }