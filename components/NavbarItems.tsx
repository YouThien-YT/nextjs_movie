import React from 'react'

interface NavbarItemsProps {
    lable: string
}

const NavbarItems: React.FC<NavbarItemsProps> = ({
    lable
}) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition'>
        {lable}
    </div>
  )
}

export default NavbarItems