import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoImage from "@/assets/logo_adaptations/full.png"

const Logo = ({}) => {
  return (
    <Link href={"/"} className='flex items-center gap-1'>
      <Image src={LogoImage} alt='Logo' className='w-20 md:w-22' />
    </Link>
  )
}

export default Logo