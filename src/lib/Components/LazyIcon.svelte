<script lang="ts">
    import type {Component} from "svelte";

    let {
        icon = $bindable<string>(),
            ...rest
    } = $props();


    let iconComp : Component|null = $state(null);

    $effect(() => {
        import(`../../../node_modules/svelte-google-materialdesign-icons/dist/${icon}.svelte`).then((module) => {
            iconComp = module.default;
        });
    })

</script>

{#if iconComp}
    <svelte:component this={iconComp} {...rest}>XYZ</svelte:component>
{/if}