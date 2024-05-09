import React from 'react'

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="relative container mx-auto p-6">
       <div className="flex items-center justify-between">
         <div className="flex items-center space-x-20">
           <h2>Kevin's Finance App</h2>
           <div className="hidden font-bold lg:flex">
             <a href="" className="text-black hover:text-darkBlue">
               Dashboard
             </a>
           </div>
         </div>
         <div className="hidden lg:flex items-center space-x-6 text-back">
           <div className="hover:text-darkBlue">Login</div>
           <a
             href=""
             className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
           >
             Signup
           </a>
         </div>
       </div>
     </nav>
  )
}

export default Navbar