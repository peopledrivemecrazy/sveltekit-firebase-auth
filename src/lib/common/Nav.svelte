<script lang="ts">
	const links = [
		['Home', '/'],
		['About', '/about'],
		['Dashboard', '/dashboard']
	];
</script>

<ul>
	{#each links as [name, url]}
		<li><a href={url}>{name}</a></li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		gap: 1em;
        list-style: none;
        padding: 0;
	}
</style>
