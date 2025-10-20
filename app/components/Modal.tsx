// "use client";

// import { FormEvent, Fragment, useState, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import Image from "next/image";
// import { addUserEmailToProduct } from "@/lib/actions";

// interface Props {
//   productId: string;
// }

// const Modal = ({ productId }: Props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [email, setEmail] = useState("");

//   // ✅ Open modal after mount to avoid SSR/client mismatch
//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     await addUserEmailToProduct(productId, email);

//     setIsSubmitting(false);
//     setEmail("");
//     closeModal();
//   };

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   return (
//     <>
//       {/* Button outside to reopen modal manually */}
//       <button type="button" className="py-4 px-4 bg-black hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold" onClick={openModal}>
//         Track
//       </button>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" onClose={closeModal} className="fixed inset-0 z-10 overflow-y-auto bg-secondary bg-opacity-60">
//           <div className="min-h-screen px-4 text-center">
//             {/* Background Overlay */}
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             </Transition.Child>

//             {/* Trick to center vertically */}
//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             />

//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="p-6  bg-white inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-2xl">
//                 <div className="flex flex-col">
//                   <div className="flex justify-between">
//                     <div className="p-3 border border-gray-200 rounded-10">
//                       <Image
//                         src="/assets/icons/logo.svg"
//                         alt="logo"
//                         width={28}
//                         height={28}
//                       />
//                     </div>

//                     <Image
//                       src="/assets/icons/x-close.svg"
//                       alt="close"
//                       width={24}
//                       height={24}
//                       className="cursor-pointer"
//                       onClick={closeModal}
//                     />
//                   </div>

//                   <h4 className="text-secondary text-lg leading-[24px] font-semibold mt-4">
//                     Stay updated with product pricing alerts right in your inbox!
//                   </h4>

//                   <p className="text-sm text-gray-600 mt-2">
//                     Never miss a bargain again with our timely alerts!
//                   </p>
//                 </div>

//                 <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
//                   <label
//                     htmlFor="email"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Email address
//                   </label>

//                   <div className="px-5 py-3 mt-3 flex items-center gap-2 border-gray-300 rounded-[27px]">
//                     <Image
//                       src="/assets/icons/mail.svg"
//                       alt="mail"
//                       width={18}
//                       height={18}
//                     />
//                     <input
//                       required
//                       type="email"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email address"
//                       className="flex-1 pl-1 border-none text-gray-500 text-base focus:outline-none border-gray-300 rounded-[27px] shadow-xs"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="px-5 py-3 text-white text-base font-semibold border border-secondary bg-black rounded-lg mt-8"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Submitting..." : "Track"}
//                   </button>
//                 </form>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default Modal;

"use client"

import { FormEvent, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
  productId: string
}

const Modal = ({ productId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await addUserEmailToProduct(productId, email)

    setIsSubmitting(false)
    setEmail('')
    setIsOpen(false)
  }

  return (
    <>
      {/* Button to open modal */}
      <button
        type="button"
        className="btn px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Track
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          {/* Overlay */}
          <Transition.Child
            as="div"
            className="fixed inset-0 bg-black/30"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              
              {/* Modal panel */}
              <Transition.Child
                as="div"
                className="inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Modal header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 border rounded-full">
                    <Image
                      src="/assets/icons/logo.svg"
                      alt="logo"
                      width={28}
                      height={28}
                    />
                  </div>
                  <button onClick={() => setIsOpen(false)}>
                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>

                {/* Modal text */}
                <h4 className="text-lg font-semibold mb-1">
                  Stay updated with product pricing alerts right in your inbox!
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Never miss a bargain again with our timely alerts!
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <Image
                      src="/assets/icons/mail.svg"
                      alt="mail"
                      width={18}
                      height={18}
                    />
                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="ml-2 w-full outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    {isSubmitting ? 'Submitting...' : 'Track'}
                  </button>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
