// types.ts
export interface Project {
    id: number;
    name: string;
    title: string;
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
    secondaryMarket: string,
    colors: {
      backgroundColor: string 
      primaryTextColor: string
      secondaryTextColor: string 
      buttonBackgroundColor: string 
      buttonHoverBackgroundColor: string 
      buttonSuccessBackgroundColor: string 
      buttonFocusRingColor: string 
      descriptionTextColor: string 
      disclosureButtonTextColor: string 
      disclosureButtonOpenTextColor: string 
      disclosureButtonIconColor: string 
      disclosureButtonOpenIconColor: string 
    },
    backgroundImage: string
  }
  