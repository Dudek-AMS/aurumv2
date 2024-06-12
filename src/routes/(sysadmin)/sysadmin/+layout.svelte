<script lang="ts">
    import Breadcrumb from "$lib/Components/Breadcrumb/Breadcrumb.svelte";

    let { children } = $props();
</script>
<div class="container m-auto my-2 ">

<div class="bg-secondary text-secondarybg-text mb-4 p-4 rounded-lg">
    <Breadcrumb linkClass="text-secondarybg-text"/>
</div>

{@render children()}
</div>