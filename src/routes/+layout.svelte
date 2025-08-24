<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>IKEA or Sigur Rós? - The Ultimate Nordic Quiz</title>
	<meta name="description" content="Can you tell Swedish furniture from Icelandic art rock? Test your knowledge of IKEA product names and Sigur Rós song titles in this fun quiz!" />
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

{@render children?.()}
