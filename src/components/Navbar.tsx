import React from 'react';
import { onGetUserAction } from '@/app/actions/NavGetUser';
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { Grey_Qo } from "next/font/google"

export default async function Navbar() {
	const userExists = await onGetUserAction();

	return (
		<div className='pr-4 pt-4 pl-4 '>
			<div className="navbar glass rounded-xl">
				<div className="navbar-start">
					<p className="text-xl text-black pl-2 font-Grey_Qo">Notefy</p>
				</div>
				<div className="navbar-end">
					{userExists ? (
						<a href="/dashboard">
							<button className="btn btn-info mr-2 font-Grey_Qo text-xl">Dashboard</button>
						</a>
					) : (
						<form
							action={async () => {
								"use server"
								await signIn("google", { redirectTo: '/dashboard' })
							}}
						>
							<button className="btn btn-info mr-2" type="submit">Signin with Google</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
