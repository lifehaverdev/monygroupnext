export type Items = {
    id: number;
    element: JSX.Element; // Assuming element is JSX element
  }[];
  
  export function Cards({ items }: { items: Items }) {
    return (
      <>
      {/* <div className="bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Productions</h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Invest in us so we can make your money into mony.
        </p>
      </div>
    </div> */}
      <ul role="list" className="">
        {items.map((item) => (
          <li key={item.id} className="">
            {item.element}
          </li>
        ))}
      </ul>
      </>
    )
  }
  