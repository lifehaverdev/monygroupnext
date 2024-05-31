// types.ts
export interface Project {
    id: number;
    name: string;
    ca: string;
    abi: any;
    merkRoot: string[];
    merkleLeavesPath: string[];
    chainId: number;
    ethereumPrice: number;
    href: React.ReactNode;  // You might need to adjust this type based on what <ContractLink /> returns
    imageSrc: string;
    imageAlt: string;
    images: Array<{
      id: number;
      name: string;
      src: string;
      alt: string;
    }>;
    description: string;
    details: Array<{
      name: string;
      items: string[];
    }>;
    secondaryMarket: string
  }
  