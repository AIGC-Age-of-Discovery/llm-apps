import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Fragment } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { 
    
    ChartPieIcon,
    CursorArrowRaysIcon,
    
    SquaresPlusIcon,
     } from '@heroicons/react/24/outline'
    import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import MessageBox from './output/MessageBox'
import { ImageDisplay } from './display'
  const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
  ]
  const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
  ]
const features = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
]

export default function Features() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
   
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center py-16">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
        
          {/* <img src="https://www.homevet.com.hk/wp-content/uploads/shutterstock_118058197.jpg" alt="图片" className=" w-full h-auto object-cover rounded-xl" />
           */}
          
          <ImageDisplay/>

          <p className="py-16 mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Would like to find your partner here now? 
          </p>
          {/* <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p> */}
        </div>
        
       {/* 搜索框  */}
        <div className=" flex gap-x-4 w-full">

        <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full min-w-0 flex-auto rounded-md border-0 bg-/white5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Say something"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Send
              </button>

              
        </div>
        <MessageBox/>
        
      </div>
    
  )
}
