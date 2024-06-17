import {error} from "@sveltejs/kit";

export const forbidden = (message: string = 'forbidden') => {
    error(403, message)
}

export const notFound = (message: string = 'not found') => {
    error(404, message)
}