'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
const currentPath = usePathname();
console.log(currentPath);

const nav = [
                {href:'/', label: 'Dashboard'},
                {href:'/issues', label: 'Issues'}
            ]
  return (
    <div className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <Link href={"/"}><AiFillBug></AiFillBug></Link>
        <ul className="flex space-x-6">
            {nav.map(item => 
                <Link key={item.href} 
                    className={
                        classNames({
                            'text-zinc-900':  currentPath === item.href,
                            'text-zinc-500':  currentPath !== item.href,
                            'hover:text-zinc-800 transition-colors': true
                        })}
                    href={item.href}>{item.label}</Link>
            )}
        </ul>
    </div>
  )
}

export default NavBar