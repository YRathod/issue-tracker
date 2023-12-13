'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
const currentPath = usePathname();
const {status, data: session} = useSession();

const nav = [
                {href:'/', label: 'Dashboard'},
                {href:'/issues/list', label: 'Issues'}
            ]
  return (
    <div className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <Link href={"/"}><AiFillBug></AiFillBug></Link>
        <ul className="flex space-x-6">
            {nav.map(item =>
                <li key={item.href}>
                <Link 
                    className={
                        classNames({
                            'text-zinc-900':  currentPath === item.href,
                            'text-zinc-500':  currentPath !== item.href,
                            'hover:text-zinc-800 transition-colors': true
                        })}
                    href={item.href}>{item.label}</Link>
                </li>
            )}
        </ul>
        <Box>
            { status === 'authenticated' && (<Link href="/api/auth/signout">Log out</Link>)}
            { status === 'unauthenticated' && (<Link href="/api/auth/signin">Log In</Link>)}
        </Box>
    </div>
  )
}

export default NavBar