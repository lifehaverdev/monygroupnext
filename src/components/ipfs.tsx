'use server'

export const uriToUrl = (tokenUri:string): string => {
    const appendage = process.env.PINATA_APPEND;
    // Check if tokenUri starts with 'https://'


    // Function to ensure the URL ends with .jpg, .png, or .json
    const ensureCorrectEnding = (url: string): string => {
      if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.json')) {
          return url;
      } else {
          return `${url}.json`;
      }
  };

  if (tokenUri.startsWith('https://')) {
    return ensureCorrectEnding(tokenUri);
  }

  // If it starts with 'ipfs://', proceed with the existing logic
  if (tokenUri.startsWith('ipfs://')) {
      tokenUri = tokenUri.slice(7);
      const metaIPFS = `https://mony.mypinata.cloud/ipfs/${tokenUri}`;
      const result = `${metaIPFS}/${appendage}`;
      return result;
  }

  // Optionally, handle cases where the tokenUri does not start with either 'ipfs://' or 'https://'
  throw new Error("Invalid tokenUri format. Must start with 'ipfs://' or 'https://'");
}

export async function getMeta(tokenUriResult:string) {
    if (!tokenUriResult.endsWith('.json') && !tokenUriResult.startsWith('ipfs://')){
      return tokenUriResult
    }
    //console.log(tokenUriResult)
    const url = await uriToUrl(tokenUriResult as string)
    //console.log(url)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}