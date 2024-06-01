import type { NextApiResponse } from 'next';
import { NextRequest } from 'next/server'
import fetch from 'node-fetch';
import { uriToUrl } from '@/components/ipfs';

const allowedOrigin = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || 'http://localhost:3000';


export async function GET(req: NextRequest) {
  const tokenImageUri = req.nextUrl.searchParams.get('tokenImageUri')


  //const referer = req.headers.get('referer');
  // if (!referer || !referer.startsWith(allowedOrigin)) {
  //   return new Response('Forbidden', {
  //     status: 403
  //   })
  // }

  if (!tokenImageUri) {
    return new Response('Missing tokenImageUri!!!', {
      status: 400,
    })
  }

  const imageUrl = await uriToUrl(tokenImageUri as string); // Use uriToUrl to get the download URL

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Response(buffer, {
      status: 200,
      headers: { 
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400'
       },
    })
  } catch (error) {
    console.error('Error fetching image:', error);
    return new Response('Failed to fetch image', {
      status: 500,
    })
  }
}

// Exporting POST handler that returns 405 Method Not Allowed
export async function POST(req: NextRequest, res: NextApiResponse) {
  console.log('this request',req)
  res.status(405).json({ error: 'Method Not Allowed' });
}