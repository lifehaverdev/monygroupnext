// /data/projects.js
import Link from 'next/link'
import { Project } from '../types'

interface Contract {
    id: string;
    name: string;
  }
  
interface ContractLinkProps {
    contract: Contract;
  }
  
interface ContractsListProps {
    contracts: Contract[];
  }

const ContractLink: React.FC<ContractLinkProps> = ({ contract }) => (
    <Link href={`/mint/${contract.name}`}>
      {contract.name}
    </Link>
  );

  
const projects: Project[] = [
    {
      id: 1,
      name: 'Tubbystation',
      ca: "0x8Dddc7710A40e138d0b6b637e84114494280d69f",
      abi: [
        //totalSupply
        {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        //tokenURI
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        //freeMint
        {"inputs":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"freeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},
        //freeMinted
        {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"freeMinted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        //saleOn
        {"inputs":[],"name":"saleOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        //mint
        {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},
        //ownerOf
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        //error NoDice
        {"inputs":[{"internalType":"string","name":"err","type":"string"}],"name":"NoDice","type":"error"},
        //error TooMany
        {"inputs":[{"internalType":"string","name":"err","type":"string"}],"name":"TooMany","type":"error"},
        //error NotEnough
        {"inputs":[],"name":"NoHandoverRequest","type":"error"},{"inputs":[{"internalType":"string","name":"err","type":"string"}],"name":"NotEnough","type":"error"},

      ] as const,
      merkRoot: ["0xa82fd3dc7e08baff1e045376cb6d6fd5d2ff1918f916de6c053c9deeb93b1840"],
      merkleLeavesPath: ['tubbystation.json'],
      chainId: 1,
      ethereumPrice: 0.01,
      href: <ContractLink contract={{id: "0x8Dddc7710A40e138d0b6b637e84114494280d69f", name: "tubbystation"}}/>,
      imageSrc: '/images/collections/tubbystation/1.png',
      imageAlt: 'Hand stitched, orange leather long wallet.',
      images: [
        {
          id: 1,
          name: 'First Tubby',
          src: '/images/collections/tubbystation/1.png',
          alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
          id: 2,
          name: 'Second Tubby',
          src: '/images/collections/tubbystation/2.png',
          alt: 'alt tubby'
        },
        {
          id: 3,
          name: 'Third tubby',
          src: '/images/collections/tubbystation/3.png',
          alt: 'alt tubby'
        },
        {
          id: 4,
          name: 'Fourth tubby',
          src: '/images/collections/tubbystation/4.png',
          alt: 'alt tubby'
        }
        // More images...
      ],
      description: `
        <p>Tubbystation is tubbycats on miladystation</p>
      `,
      details: [
        {
          name: 'More Info',
          items: [
            '2 Free for Tubby Cats holders',
            '2 Free for Milady holders',
            '2 Free for MONY GROUP holders including miladystation, cigstation, tubbystation',
            'Snapshot taken May 31st 2024',
            'Max 8 per wallet',
            'Final Mony Group First Generation Release',
          ],
        },
        // More sections...
      ],
      secondaryMarket: 'https://opensea.io/collection/tubbystation',
      colors: {
        backgroundColor: '#ffffff',//'#1e3a8a', // Hex color for background
        primaryTextColor: 'text-gray-50', // Tailwind CSS class for primary text color
        secondaryTextColor: 'text-gray-500 dark:text-gray-400', // Tailwind CSS class for secondary text color
        buttonBackgroundColor: 'bg-custom-blue', // Tailwind CSS class for button background color
        //#5773FF to match web3modal
        buttonHoverBackgroundColor: 'hover:bg-indigo-700', // Tailwind CSS class for button hover background color
        buttonSuccessBackgroundColor: 'bg-green-400', // Tailwind CSS class for button success background color
        buttonFocusRingColor: 'focus:ring-indigo-500', // Tailwind CSS class for button focus ring color
        descriptionTextColor: 'text-gray-700', // Tailwind CSS class for description text color
        disclosureButtonTextColor: 'text-sm font-medium text-gray-900', // Tailwind CSS class for disclosure button text color
        disclosureButtonOpenTextColor: 'text-indigo-600', // Tailwind CSS class for disclosure button text color when open
        disclosureButtonIconColor: 'text-gray-400 group-hover:text-gray-500', // Tailwind CSS class for disclosure button icon color
        disclosureButtonOpenIconColor: 'text-indigo-400 group-hover:text-indigo-500', // Tailwind CSS class for disclosure button icon color when open
      },
      backgroundImage: '/path/to/your/image.jpg', // Optional background image
    },
    {
      id: 2,
      name: 'mcult',
      ca: "0x101d2577ffAD6D981EC301215406EAa904EbDc8f",
      abi: [
        //totalSupply
        {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        //tokenURI
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        //freeMint
        {"inputs":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"freeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},
        //freeMinted
        {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"freeMinted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        //saleOn
        {"inputs":[],"name":"saleOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        //mint
        {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},
        //ownerOf
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        //error NoDice
        {"inputs":[{"internalType":"string","name":"err","type":"string"}],"name":"NoDice","type":"error"},
        //error TooMany
        {"inputs":[{"internalType":"string","name":"err","type":"string"}],"name":"TooMany","type":"error"},
        //error NotEnough
        {"inputs":[],"name":"NoHandoverRequest","type":"error"},{"inputs":[{"internalType":"string","name":"err","type":"string"}],"name":"NotEnough","type":"error"},

      ] as const,
      merkRoot: [],
      merkleLeavesPath: [],
      chainId: 11155111,
      ethereumPrice: 0.008,
      href: "#m-cult",//<ContractLink contract={{id: "", name: "m-cult"}}/>,
      imageSrc: '/images/collections/m-cult/0.png',
      imageAlt: 'SHFHSLKFJS',
      images: [
        {
          id: 1,
          name: 'Main view',
          src: '/images/collections/m-cult/0.png',
          alt: 'Main promotional image of M-CULT.',
        },
        // More images...
      ],
      description: `
        <p>Description of M-CULT</p>
      `,
      details: [
        {
          name: 'Project Details',
          items: [
            'Exclusive to M-CULT members',
            'Limit 5 per wallet',
            // Additional details...
          ],
        },
      ],
      secondaryMarket: "",
      colors: {
        backgroundColor: '#ff1493', // Hex color for background
        primaryTextColor: 'text-white', // Tailwind CSS class for primary text color
        secondaryTextColor: 'text-gray-50 dark:text-gray-50', // Tailwind CSS class for secondary text color
        buttonBackgroundColor: 'bg-indigo-600', // Tailwind CSS class for button background color
        buttonHoverBackgroundColor: 'hover:bg-indigo-700', // Tailwind CSS class for button hover background color
        buttonSuccessBackgroundColor: 'bg-green-400', // Tailwind CSS class for button success background color
        buttonFocusRingColor: 'focus:ring-indigo-500', // Tailwind CSS class for button focus ring color
        descriptionTextColor: 'text-gray-100', // Tailwind CSS class for description text color
        disclosureButtonTextColor: 'text-sm font-medium text-white', // Tailwind CSS class for disclosure button text color
        disclosureButtonOpenTextColor: 'text-indigo-600', // Tailwind CSS class for disclosure button text color when open
        disclosureButtonIconColor: 'text-gray-50 group-hover:text-white', // Tailwind CSS class for disclosure button icon color
        disclosureButtonOpenIconColor: 'text-indigo-400 group-hover:text-indigo-500', // Tailwind CSS class for disclosure button icon color when open
      },
      backgroundImage: '/path/to/your/image.jpg', // Optional background image
    }
    // More projects...
  ];

export default projects;
