"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppwriteConfig } from "@/app/constants/appwrite_config";

export default function Sucess({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();
	useEffect(() => {
		const updateSession = async () => {
			const appwriteconfig = new AppwriteConfig();

			try {
				// Update the magic URL session with the provided user ID and secret
				await appwriteconfig.account.updateMagicURLSession(
					searchParams.userId,
					searchParams.secret
				);

				// Assuming `getCurUser` is an async function, await its execution
				await appwriteconfig.getCurUser();
				router.push("/landing");


			} catch (error) {
				console.error(
					"Error handling magic URL session confirmation:",
					error
				);
			}
		};
		// Call the updateSession function when the component mounts
		updateSession();
	});

	// Render any UI components here if needed
	return (
		<div className="h-screen flex items-center justify-center">
			Loading...
		</div>
	);
}
