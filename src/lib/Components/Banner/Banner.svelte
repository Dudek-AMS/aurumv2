<script lang="ts">
    import type {Snippet} from "svelte";
    import {fade} from "svelte/transition";
    import Check_circle from "svelte-google-materialdesign-icons/Check_circle.svelte";
    import Error from "svelte-google-materialdesign-icons/Error.svelte";
    import Info from "svelte-google-materialdesign-icons/Info.svelte";

    type BannerStatus = 'notice' | 'warning' | 'error' | 'danger' | 'success';
    let {
        children,
        status = 'notice',
        snippetIcon = snippetDefaultIcon,
        withIcon = true,
        ..._restProps
    } : {
        children: Snippet,
        status?: BannerStatus,
        snippetIcon?: Snippet,
        withIcon?: boolean,
        _restProps?: { [key: string]: any, class: string }
    } = $props();

    const defaultIcons = {
        'notice': Info,
        'warning': Info,
        'error': Error,
        'danger': Error,
        'success': Check_circle
    }
</script>
<style>
    .banner {
        @apply p-2 rounded-lg border my-2;
        &.notice, &.warning {
            @apply bg-amber-100 text-amber-600 border-amber-600;
        }

        &.error, &.danger {
            @apply bg-red-200 text-red-800 border-red-600;
        }

        &.success {
            @apply bg-green-200 text-green-800 border-green-600;
        }
    }
</style>
{#snippet snippetDefaultIcon()}<div class="mr-2">
<svelte:component this={defaultIcons[status]} />
</div>
{/snippet}

<div class="{status} banner flex {_restProps['class'] ?? ''}" in:fade>
    {#if withIcon}
        {@render snippetIcon()}
    {/if}
    {@render children()}
</div>