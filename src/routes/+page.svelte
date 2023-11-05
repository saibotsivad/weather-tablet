<script>
	import { onMount, onDestroy } from 'svelte'
	import { temperatureToColor } from '$lib/temperature-to-color.js'

	const upIcon = '⬆️'
	const downIcon = '⬇️'

	let apiCall
	let interval
	const getTemperature = async () => fetch('/temperature')
		.then(response => response.json())
	onMount(() => {
		apiCall = getTemperature()
		interval = setInterval(() => {
			apiCall = getTemperature()
		}, 800)
	})
	onDestroy(() => {
		if (interval) clearInterval(interval)
	})
</script>

<style>
	main {
		font-size: 43vmin;
		align-self: center;
		margin: 0 auto;
	}
	span {
		position: absolute;
		left: 0;
		display: block;
		width: 100%;
		margin: 0 auto;
		font-size: 10vmin;
		text-align: center;
	}
</style>

{#await apiCall then response}
	<span style="top: 0; color: {temperatureToColor(response?.high)}">
		{response?.high || '🤔'}
		{#if response?.going === 'up'}
			<br>
			{upIcon}
		{/if}
	</span>
	<main style="color: {temperatureToColor(response?.temperature)}">
		{response?.temperature || '🤔'}
	</main>
	<span style="bottom: 0; color: {temperatureToColor(response?.low)}">
		{#if response?.going === 'down'}
			{downIcon}
			<br>
		{/if}
		{response?.low || '🤔'}
	</span>
{/await}
