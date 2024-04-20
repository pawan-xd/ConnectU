"use client";

import { Client, Account, Models, ID, Databases, Storage } from "appwrite";
import { User } from "./interface";
import sdk, { Permission, Role } from "node-appwrite";


class ServerConfig {
	client: sdk.Client = new sdk.Client();
	regDb: string = `${process.env.NEXT_PUBLIC_REGDB}`;
	databases: sdk.Databases = new sdk.Databases(this.client);
	users = new sdk.Users(this.client);

	constructor() {
		this.client
			.setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
			.setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`)
			.setKey(`${process.env.NEXT_PUBLIC_DBKEY}`);
	}

	createRegColl(id: string, name: string) {
		this.databases
			.createCollection(this.regDb, id, name, [
				Permission.read(Role.any()), // Anyone can view this document
				Permission.update(Role.any()), // Writers can update this document
				Permission.create(Role.any()), // Admins can update this document
				Permission.delete(Role.any()), // Admins can delete this document
			])
			.then((res) => {
				this.databases.createStringAttribute(
					this.regDb,
					id,
					"name",
					50,
					false
				);
				this.databases.createStringAttribute(
					this.regDb,
					id,
					"email",
					50,
					false
				);
				this.databases.createStringAttribute(
					this.regDb,
					id,
					"confirm",
					50,
					false,
					""
				);
			});
	}

}

class AppwriteConfig {
	databaseId: string = `${process.env.NEXT_PUBLIC_DATABASEID}`;
	activeCollId: string = `${process.env.NEXT_PUBLIC_EVENT_COLLID}`;
	bannerBucketId: string = `${process.env.NEXT_PUBLIC_EVENTBUCKET}`;
	regDbId: string = `${process.env.NEXT_PUBLIC_REGDB}`;

	client: Client = new Client();
	account: Account = new Account(this.client);
	databases: Databases = new Databases(this.client);
	regDb: Databases = new Databases(this.client);
	storage: Storage = new Storage(this.client);
	user: User = {} as User;

	constructor() {
		this.client
			.setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
			.setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`);
	}

	async getCurUser(): Promise<void> {
		const res = await this.account.get();
		this.user = res;
		console.log("res: ", res);
		localStorage.setItem("userInfo", JSON.stringify(this.user));
	}

	emailSignUp(name: string, email: string, password: string): void {
		try {
			this.account.create(ID.unique(), email, password, name);
		} catch (error) {
			console.log(error);
		}
	}

	emailLogin(email: string, password: string): Promise<Models.Session> {
		return this.account.createEmailSession(email, password);
	}

	signOut(id: string): boolean {
		try {
			this.account.deleteSession(id);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async magicUrlLogin(email: string): Promise<void> {
		try {
			await this.account.createMagicURLSession(
				ID.unique(),
				email,
				`${process.env.NEXT_PUBLIC_APPURL}/login/sucess` 
			);
			console.log("Magic URL session created successfully.");
		} catch (error) {
			console.error("Error creating magic URL session:", error);
		}
	}

	createEvent(
		eventname: string,
		description: string,
		banner: File,
		hostname: string,
		eventdate: string,
		email: string,
		address: string,
	): Promise<String> {
		try {
			this.storage
			.createFile(this.bannerBucketId, ID.unique(), banner)
			.then((res) => {
			this.databases
				.createDocument(this.databaseId, this.activeCollId, ID.unique(), {
					eventname: eventname,
					description: description,
					url: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${this.bannerBucketId}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`,
					hostname: hostname,
					eventdate: eventdate,
					email: email,
					address: address,
					created: JSON.parse(localStorage.getItem("userInfo") || "{}").$id,
					registrations: [],
				})
				.then((res) => {
					console.log(res);
					const serverConfig = new ServerConfig();
					serverConfig.createRegColl(res.$id, eventname);
					return Promise.resolve("sucess");
				});
			});
		} catch (error) {
			console.log("error block 1");
			throw error;
		}
		return Promise.resolve("sucess");
	}
}

export { AppwriteConfig, ServerConfig };
