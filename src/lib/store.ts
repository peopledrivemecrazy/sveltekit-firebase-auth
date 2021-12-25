import { writable } from 'svelte/store';

export const currentUser = writable({
	user: null,
	loggedIn: false,
	uid: ''
});

export const loading = writable(false);
