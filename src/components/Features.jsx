import { ArrowPathIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Fragment } from 'react'
import {demogif} from '../assets'
import {  Popover, Transition } from '@headlessui/react'
import { 
    
    ChartPieIcon,
    CursorArrowRaysIcon,
    
    SquaresPlusIcon,
     } from '@heroicons/react/24/outline'
    import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import MessageBox from './output/MessageBox'

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


export default function Features() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [replyData,setReplyData] = useState({
      emotional_state:'',
      rawData:'',
      response_text:'' 

    })
    const [form, setForm] = useState({
      inputMess:'',
      reply:'',
      other:'',
  });
        
  const handleChange =(e) =>{
    setForm({...form, [e.target.name]:e.target.value })
    console.log(form);
}

        
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const sendData = {'currentMessage':form.inputMess,
                          'createdAt':new Date()};
      if(form.inputMess){
      
      try {
          const response = await fetch("http://localhost:5000/api/pet",{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(sendData)
          })
          // .then((res) =>
          // res.json().then((data) => {
          //     // Setting a data from api
          //     console.log(data)
          // }) );
          if(response.ok){
            const result = await response.json();
            console.log(result)
            setReplyData(result)
          }
      
      } catch (error) {
          console.log(error);
      }
    }
  }

    // const getData =async()=>{
    //     try {
    //         const response =await fetch('http://127.0.0.1:5000/json',{
    //             method:"POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         }) 
    //         //console.log("getCategories");
    //         if(response.ok){
    //             const result = await response.json();
    //             //setRelatedPosts(result.data)
                
                
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
  return (
   
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center py-16">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
        
          {/* <img src="https://www.homevet.com.hk/wp-content/uploads/shutterstock_118058197.jpg" alt="图片" className="w-full h-auto object-cover rounded-xl" />*/}
          <img src={demogif} alt="图片" className="w-full h-auto object-cover rounded-xl" /> 
   

          {/* <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Would like to find your partner here now? 
          </p>  */}
          
        </div>
        
       {/* 搜索框  */}
        <div >
          
          <form className="mt-12 flex gap-x-4 w-full" onSubmit={handleSubmit}>
              <label htmlFor="email-address" className="sr-only">
                Say something to your pet
              </label>
              <input
                type="text"
                name="inputMess"
                onChange={handleChange}
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

          </form>
        </div>
        <MessageBox data={replyData}/>
        
      </div>
    
  )
}
