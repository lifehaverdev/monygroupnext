//import Link from 'next/link';
import Image from 'next/image';
import projects from '../../data/projects'
  
  export default function CollectionsDisplay() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Live Mints</h2>
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {projects.map((project) => (
              <div key={project.id} className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                  <Image
                    width={512}
                    height={512}
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {project.href}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-900">{project.ethereumPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
