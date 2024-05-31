'use server'

export const uriToUrl = (tokenUri:string): string => {
    const appendage = process.env.PINATA_APPEND;
    tokenUri = tokenUri.slice(7)
    const metaIPFS= `https://mony.mypinata.cloud/ipfs/${tokenUri}`
    const result = `${metaIPFS}/${appendage}`;
    return result;
}

export async function getMeta(tokenUriResult:string) {
    const url = await uriToUrl(tokenUriResult as string)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}