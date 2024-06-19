<script lang="ts">
    import TextField from "@smui/textfield";
    import LazyIcon from "$lib/Components/LazyIcon.svelte";

    let { data, children } = $props();


    let searchValue = $state('');

</script>

<style>

    #headerSearch {
        --mdc-theme-primary: var(--color-primarybg-text);
    }

    #header :global(.mdc-floating-label) {
        color: color-mix(in srgb, var(--color-primarybg-text) 70%, transparent);
    }

    #header :global(.mdc-text-field__input) {
        color: var(--color-primarybg-text);

    }

</style>

<div id="header" class="sticky z-30 bg-primary border-b bg-primary text-primarybg-text">
    <div class="flex w-full justify-end items-center">
        <div id="headerSearch" >
            <TextField class="m-2 bg-primary-hover text-primarybg-text lg:w-96 h-10!" variant="outlined"  bind:value={searchValue}>

                <div slot="leadingIcon" class="self-center mx-4">
                    <LazyIcon icon="Search" />
                </div>


            </TextField>
        </div>
        <div id="profileBall" class="self-center mx-4">
            <div class="h-10 aspect-square rounded-full border-2 border-primarybg-text hover:border-primary-hover">
                <img src="/user/{data.user.entraId}/photo" class="rounded-full" alt="Profilbild" />
            </div>
        </div>
    </div>
</div>


{@render children()}



