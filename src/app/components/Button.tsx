'use client'

import Link from "next/link"

type Props = {
   className: string,
   href?: string,
   children: any,
   onclick?: () => void
}

export default function Button({className, href, children, onclick} : Props) {
   if (href) {
      return (
         <Link href={href} className={className}>{children}</Link>
      )
   }

   return (
      <button onClick={() => onclick ? onclick() : null} className={className}>{children}</button>
   )
}