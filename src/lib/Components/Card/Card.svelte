<script lang="ts">
    import type {Snippet} from "svelte";

    let {
        snippetHeader,
        children,
        class$ = '',

        ...others
    }:
        {
            snippetHeader?: Snippet,
            children: Snippet,
            class$?: string,



            others?: {[key:string]:any}
        } = $props();

    let otherProps = $derived(Object.fromEntries(Object.entries(others)));


</script>




<div class="bg-white card rounded-lg border shadow-2xl rounded-lg overflow-hidden {class$}" >

    {#if snippetHeader}
        <div class="bg-primary p-4 text-primarybg-text">
            {@render snippetHeader()}
        </div>
    {/if}


    {#if children}
        {@render children()}
    {/if}
</div>
