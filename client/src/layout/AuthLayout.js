import { Tab, Dialog, Transition } from '@headlessui/react'
import Login from '../components/Login/Login'
import { Fragment, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Register from '../components/Register/Register'

const AuthLayout = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn, user } = useContext(AuthContext)

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
      <div className="mt-2">
        {
          isLoggedIn ? <p>{user.username}</p> : <button
            type="button"
            onClick={openModal}
            className="ring-2 ring-violet-400 w-32 rounded-2xl active:bg-violet-300"
          >
            Login
          </button>
        }

      </div>
      {
        isLoggedIn ? " " :
          <>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10 ring" onClose={closeModal}>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">

                    <Dialog.Panel className="w-full ring-2 ring-black max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Authorization
                      </Dialog.Title>
                      <div>

                        <Tab.Group>
                          <Tab.List className="bg-red-200 text-center text-lg space-x-4 rounded-2xl">
                            <Tab className="focus:border-b-2 border-black">Login</Tab>
                            <Tab className="focus:border-b-2 border-black">Register</Tab>
                          </Tab.List>
                          <Tab.Panels>
                            <Tab.Panel><Login /></Tab.Panel>
                            <Tab.Panel><Register/></Tab.Panel>
                          </Tab.Panels>
                        </Tab.Group>
                      </div>

                      
                    </Dialog.Panel>

                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
      }

    </>

  )
}

export default AuthLayout




