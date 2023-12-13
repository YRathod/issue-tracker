'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import {Skeleton} from '../Components/Skeleton';

const NavBar = () => {
  return (
    <div className="border-b mb-5 px-5 py-3">
        <Flex justify="between">
            <Flex align="center" gap="3">
                <Link href={"/"}><AiFillBug></AiFillBug></Link>
                <NavLinks></NavLinks>
            </Flex>
            <AuthStatus></AuthStatus>
        </Flex>
    </div>
  )
}

const NavLinks = () => {
    const currentPath = usePathname();

    const nav = [
                    {href:'/', label: 'Dashboard'},
                    {href:'/issues/list', label: 'Issues'}
                ]

    return <ul className="flex space-x-6">
    {nav.map(item =>
        <li key={item.href}>
        <Link 
            className={
                classNames({
                    'nav-link': true,
                    '!text-zinc-900':  currentPath === item.href,
                })}
            href={item.href}>{item.label}</Link>
        </li>
    )}
</ul>
}
const AuthStatus = () => {
    const {status, data: session} = useSession();

    if(status === "loading") return <Skeleton width="3rem"></Skeleton>;

    if(status === 'unauthenticated')
     return <Link className="nav-link" href="/api/auth/signin">Login</Link>

    return <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar size="2" src={session!.user!.image!} fallback="?"></Avatar>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                <Text size="2">{session!.user!.email!}</Text> 
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
}
export default NavBar