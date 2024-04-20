"use client";
import { useState } from "react";
import Image from "next/image";
import Icon from "../public/logo/logo-transparent-svg.svg";
import { useRouter } from "next/navigation";
import React from "react";

const navigation = [
	{ name: "Product", href: "#" },
	{ name: "Features", href: "#" },
	{ name: "Company", href: "#" },
	{ name: "FAQ", href: "#" },
];

export default function Home() {
	const router = useRouter();

	return (
		<div className="bg-white">
			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							ConnectU to the rescue 🚀
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Events are a great way to connect with like-minded
							people. They also provide a great opportunity to
							learn and network with others in your field. Get
							started with ConnectU to host or join your next
							event.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<button
								className="rounded-md bg-[#f02e65] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#990e3c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								onClick={() => {
									if (
										localStorage.getItem("userInfo") != null
									) {
										router.push("/landing");
									} else {
										router.push("login/magic");
									}
								}}
							>
								Get started
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
