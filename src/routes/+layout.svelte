<script lang="ts">
	import '@/app.css';
	import Map from '@/components/Map.svelte';
</script>

<div class="grid h-screen grid-cols-12">
	<!-- Sidebar: 3/12 -->
	<div class="col-span-3 flex flex-col border-r border-gray-700">
		<div class="border-b border-gray-700 p-4">
			<h1 class="text-xl font-semibold">Sidebar</h1>
		</div>
		<div class="flex-1 overflow-auto p-4">
			<slot />
		</div>
	</div>

	<!-- Map: 9/12 -->
	<div class="col-span-9">
		<Map />
	</div>
</div>
