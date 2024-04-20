"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { AppwriteConfig } from "../constants/appwrite_config";
import { useRouter } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Header from "../components/header";

interface Sponsors {
	id: number;
	name: string;
	url: string;
}

const CreateEventPage = () => {
	const [eventname, setEventName] = useState(" ");
	const [description, setDescription] = useState(" ");
	const [banner, setBanner] = useState<File | null>(null);
	const [hostname, setHostName] = useState(" ");
	const [eventdate, setEventDate] = useState(" ");
	const [email, setEmail] = useState(" ");
	// const [country, setCountry] = useState(" ");
	const [address, setAddress] = useState(" ");
	// const [city, setCity] = useState(" ");
	// const [state, setState] = useState("");
	// const [postal, setPostal] = useState(" ");
	// const [audience, setAudience] = useState(" ");
	// const [type, setType] = useState("In Person");
	// const [attendees, setAttendees] = useState(0);
	// const [price, setPrice] = useState(0);
	// const [tech, setTech] = useState("Yes");
	// const [agenda, setAgenda] = useState(" ");
	// const [approval, setApproval] = useState(" ");
	// const [twitter, setTwitter] = useState(" ");
	// const [website, setWebsite] = useState(" ");
	// const [linkedin, setLinkedin] = useState(" ");
	// const [instagram, setInstagram] = useState(" ");

	const router = useRouter();
	const appwriteConfig = new AppwriteConfig();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		appwriteConfig
			.createEvent(
				eventname,
				description,
				banner || new File([], ""),
				hostname,
				eventdate,
				email,
				address
			)
			.then((res) => {
				if (res == "sucess") {
					router.push("/events");
				} else {
				}
			});
	};

	const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setBanner(file);
	};

	return (
		<div>
			<Header />
			<div className="max-w-md mx-auto">
				<h2 className="text-2xl text-[#f02e65] font-bold mb-4 my-5">
					Create Event
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="space-y-12">
						<div className="border-b border-gray-900/10 pb-12">
							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

								{/* event name */}
								<div className="sm:col-span-4 ">
									<label
										htmlFor="eventname"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Event Name
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="eventname"
											id="eventname"
											value={eventname}
											onChange={(e) =>
												setEventName(e.target.value)
											}
											autoComplete="given-name"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>


								{/* description */}
								<div className="col-span-full">
									<label
										htmlFor="description"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Description
										<span className="text-gray-600 px-3">
											(Markdown will be suported soon)
										</span>
									</label>
									<div className="mt-2">
										<textarea
											id="description"
											name="description"
											value={description}
											rows={3}
											onChange={(e) =>
												setDescription(e.target.value)
											}
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											// defaultValue={""}
										/>
									</div>
									<p className="mt-3 text-sm leading-6 text-gray-600">
										Write a few sentences about your event.
									</p>
								</div>
								

								{/* banner image */}
								<div className="col-span-full">
									<label
										htmlFor="banner"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Banner photo
									</label>
									<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
										<div className="text-center">
											<PhotoIcon
												className="mx-auto h-12 w-12 text-gray-300"
												aria-hidden="true"
											/>
											<div className="col-span-2">
												<label
													htmlFor="banner"
													className="text-gray-700 font-semibold"
												>
													Banner of Event:
												</label>
												<input
													id="banner"
													type="file"
													accept="image/*"
													onChange={
														handleBannerChange
													}
													pattern="/(\.jpg|\.jpeg|\.png|\.gif)$/i"
													className="border-2 rounded-md w-full px-3 py-2 mt-1"
												/>
											</div>
											<p className="text-xs leading-5 text-gray-600">
												PNG, JPG, up to 10MB
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Event Contact
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Give some contact information about your awesome
								event
							</p>

							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

								{/* hostname */}
								<div className="sm:col-span-3">
									<label
										htmlFor="hostname"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Host Name
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="hostname"
											id="hostname"
											value={hostname}
											onChange={(e) =>
												setHostName(e.target.value)
											}
											autoComplete="given-name"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>


								{/* date */}
								<div className="sm:col-span-3">
									<label
										htmlFor="eventdate"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Event Date
									</label>
									<div className="mt-2">
										<input
											type="date"
											name="eventdate"
											id="eventdate"
											value={eventdate}
											onChange={(e) =>
												setEventDate(e.target.value)
											}
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>


								{/* email */}
								<div className="sm:col-span-4">
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Contact Email address
									</label>
									<div className="mt-2">
										<input
											id="email"
											name="email"
											type="email"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											autoComplete="email"
											pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>


								{/* address */}
								<div className="col-span-full">
									<label
										htmlFor="address"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Street address
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="address"
											id="address"
											value={address}
											onChange={(e) =>
												setAddress(e.target.value)
											}
											autoComplete="street-address"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* submit button */}
					<div className="mt-6 flex items-center justify-center gap-x-6 py-5">
						<button
							type="submit"
							className="rounded-md bg-[#f02e65] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#f02e65] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f02e65]"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateEventPage;
