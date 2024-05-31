import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest } from 'next/server'
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { uriToUrl, getMeta } from '@/components/ipfs';

const IMAGE_DIRECTORY = path.join(process.cwd(), 'images', 'collections');
const IMPORTANT_IMAGES = ['1.png', '2.png', '3.png', '4.png']; // Define the important images

//export default async function handler(req: NextApiRequest, res: NextApiResponse) {
export async function GET(req: NextRequest,{ params }: { params: { projectName: string, tokenId: number } }, res: NextApiResponse) {
console.log('we handling an image rn')
  const { projectName, tokenId } = params;
  console.log(projectName, tokenId)
  const searchParams = req.nextUrl.searchParams
  console.log(searchParams)
  const query = searchParams.get('tokenImageUri')
  const tokenImageUri = query;
  console.log(tokenImageUri)
  const projectPath = path.join(IMAGE_DIRECTORY, projectName as string);
  const imagePath = path.join(projectPath, `${tokenId}.png`);
  
  // Ensure project directory exists
  if (!fs.existsSync(projectPath)) {
    console.log('making directory???',projectPath)
    fs.mkdirSync(projectPath, { recursive: true });
  } else {
    console.log('collection directory found')
  }

  // Check if the image already exists
  // if (fs.existsSync(imagePath)) {
  //   console.log('the image is there',imagePath);
  //   res.status(200).json({ path: `/images/collections/${projectName}/${tokenId}.png` });
  //   return;
  // }

  //console.log('put up tha loading image')
  // Placeholder image while downloading
  //res.status(200).json({ path: `/images/loading.jpeg` });
  //console.log('loading')

  try {
  // Download the image
  console.log('lets download');
  const imageUrl = await uriToUrl(tokenImageUri as string); // Use uriToUrl to get the download URL
  console.log('api fetching this',imageUrl)
  const response = await fetch(imageUrl);
  console.log('status',response.status)
  console.log(response,'response')
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save the image
  fs.writeFile(imagePath, buffer, () => {
    console.log(`Image saved: ${imagePath}`);
  });

  // Manage the number of images stored
  const files = fs.readdirSync(projectPath).filter(file => !IMPORTANT_IMAGES.includes(file));
    if (files.length > 4) {
        console.log('see some extras here');
        const oldestFile = files.reduce((oldest, file) => {
        const currentFile = path.join(projectPath, file);
        return fs.statSync(currentFile).mtime < fs.statSync(oldest).mtime ? currentFile : oldest;
        }, path.join(projectPath, files[0]));
        fs.unlinkSync(oldestFile);
    }
    } catch (error) {
        console.error('Error fetching metadata or image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
        return;
    }

  res.status(200).json({ path: `/images/collections/${projectName}/${tokenId}.png` });
}

// Exporting POST handler that returns 405 Method Not Allowed
export async function POST(req: NextRequest, res: NextApiResponse) {
  res.status(400).json({ error: 'Method Not Allowed' });
}