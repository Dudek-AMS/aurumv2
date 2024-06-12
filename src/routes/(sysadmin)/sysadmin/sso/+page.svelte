<script lang="ts">

    import {setCrumbs} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";

    let {data} = $props();
    setCrumbs(data.crumbs);

</script>