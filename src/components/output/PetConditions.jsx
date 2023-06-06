import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import EmojiDetail from './EmojiDetail';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
const petData = [
    { title: 'Product', imgurl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
    { title: 'Title2', imgurl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
    { title: 'Product', imgurl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
    { title: 'Title2', imgurl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
    { title: 'Product', imgurl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
    { title: 'Title2', imgurl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
  ]

const { Meta } = Card;
const PetConditions = () => {

    let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

    return (
        
        <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">宠物表情数据库</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    
          {petData.map((item)=>(

            <>
        <Card
        onClick={openModal}
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={item.imgurl}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
    className='cursor-pointer'
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title={item.title}
      description="This is the description"
    />
  </Card>
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* 阴影效果  */}
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-1 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full h-fit max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                PetEmoji Details
              </Dialog.Title>
              <div className="mt-2">
                <img src="https://www.homevet.com.hk/wp-content/uploads/shutterstock_118058197.jpg" alt="图片" className=" w-full h-auto object-cover rounded-xl" />
          
                <p className="text-sm text-gray-500">
                    
                Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                  Your payment has been successfully submitted. We’ve sent
                  you an email with all of the details of your order.
                </p>
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                   button1
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  button2
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition> 
  </>


    ))}
            
          </div>
        </div>
      </div>
    
    
    
    )
  
}
export default PetConditions;

// const posts = [
//     {
//       id: 1,
//       title: 'Boost your conversion rate',
//       href: '#',
//       description:
//         'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//       date: 'Mar 16, 2020',
//       datetime: '2020-03-16',
//       category: { title: 'Marketing', href: '#' },
//       author: {
//         name: 'Michael Foster',
//         role: 'Co-Founder / CTO',
//         href: '#',
//         imageUrl:
//           'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       },
//     },
//     // More posts...
//   ]
  
      
  
  