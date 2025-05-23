<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';
	import { fromLonLat } from 'ol/proj';

	let mapElement: HTMLDivElement;
	let map: Map;
	let observer: ResizeObserver;

	onMount(() => {
		if (!browser) return;

		map = new Map({
			target: mapElement,
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: fromLonLat([-71.27, 46.8]),
				zoom: 12
			})
		});

		observer = new ResizeObserver(() => {
			map.updateSize();
		});

		observer.observe(mapElement);
	});

	onDestroy(() => {
		if (browser) {
			observer?.disconnect();
			map?.setTarget(undefined);
		}
	});
</script>

<div bind:this={mapElement} class="h-full w-full"></div>
