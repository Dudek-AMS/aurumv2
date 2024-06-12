<script lang="ts">
    import { fade } from "svelte/transition";
    import { crumbs } from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";
    import LazyIcon from "$lib/Components/LazyIcon.svelte";

    let { linkClass = '' } : {linkClass?:string} = $props();

</script>

{#snippet snippetCrumb(href, name, icon)}
    <a class="{linkClass}" href={href}>
        {#if icon}
            <LazyIcon class="inline-block" icon={icon}/>
        {/if}
        {name}</a>
{/snippet}

{#snippet snippetSeperator()}
    <span>&nbsp;/</span>
{/snippet}

{#each crumbs.value as crumb, i}
    <span in:fade>
        {#if i > 0}{@render snippetSeperator()}{/if}
        {@render snippetCrumb(crumb.href, crumb.name, crumb.icon)}
    </span>
{/each}