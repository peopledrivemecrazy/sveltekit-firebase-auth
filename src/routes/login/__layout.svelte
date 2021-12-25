<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import { authChanged } from '$lib/firebase';
	import { currentUser } from '$lib/store';

	import { onMount } from 'svelte';

	onMount(async () => {
		authChanged();
	});
	$: {
		if (!$currentUser.user) {
			if (browser) goto('/login');
		} else {
			if (browser) goto('/dashboard');
		}
	}
</script>

<slot />
