<script>
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';

	import { logOut } from '$lib/firebase';
	import { currentUser, loading } from '$lib/store';

	$: if (!$currentUser.uid) browser ? goto('/login') : null;
</script>

{#if $currentUser.uid}
	<button on:click={logOut}> Logout </button>
	<div>dashboard</div>
{:else if loading}
	<div>loading</div>
{/if}
