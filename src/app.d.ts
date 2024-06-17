// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {Session} from "$lib/Session/TypeSession";
import type User from "$lib/server/Database/Entities/User.db";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session,
			user?: User,
			ip: string,
			isSysadmin: () => boolean
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
