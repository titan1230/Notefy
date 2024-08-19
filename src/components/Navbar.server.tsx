import React from 'react';
import { onGetUserAction } from '@/actions/GetUser';
import NavbarContent from '@/components/NavbarContent';
import Image from 'next/image';

export default async function Navbar() {
    const userExists = await onGetUserAction();

    return (
        <div className='pr-4 pt-4 pl-4 '>
            <div className="navbar glass rounded-xl">
                <div className="navbar-start">
                    <p className="text-xl text-black pl-2 font-Grey_Qo flex">
                        <Image src="/favicon.ico" alt="Notefy Logo" width={30} height={30}  className='mr-5'/>
                        Notefy 
                    </p>
                </div>
                <NavbarContent userExists={userExists} />
            </div>
        </div>
    );
}
