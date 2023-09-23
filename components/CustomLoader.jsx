import React from 'react'
import { Oval } from 'react-loader-spinner';
export default function CustomLoader() {
  return (
    <div className="flex w-full h-screen fixed z-100 bg-[#ffffff3d]  items-center justify-center">
      <Oval
  height={80}
  width={80}
  color="#C1E7F2"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#07121C"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
    </div>
  )
}
