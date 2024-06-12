<script lang="ts">
    import Card from "$lib/Components/Card/Card.svelte";
    import ColorPicker from "$lib/Components/ColorPicker/ColorPicker.svelte";
    import Button, {Label} from "@smui/button";
    import Banner from "$lib/Components/Banner/Banner.svelte";
    import type {PageData, ActionData} from './$types';
    import LazyIcon from "$lib/Components/LazyIcon.svelte";
    import {setCrumbs} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";


    let {data, form}: {
        data: PageData,
        form: ActionData
    } = $props();

    setCrumbs(data.crumbs);



    let design = $derived(structuredClone($state.snapshot(data.design)))


    let colorPrimary = $state(design.find(d => d.key === '--color-primary')?.value ?? '');
    let colorPrimaryBGText = $state(design.find(d => d.key === '--color-primarybg-text')?.value ?? '');
    let colorBodyBG = $state(design.find(d => d.key === '--color-bodybg')?.value ?? '');
    let colorSecondary = $state(design.find(d => d.key === '--color-secondary')?.value ?? '');
    let colorSecondaryBGText = $state(design.find(d => d.key === '--color-secondarybg-text')?.value ?? '');
    let colorSecondaryBGLink = $state(design.find(d => d.key === '--color-secondarybg-link')?.value ?? '');

    let errorColorPrimary = $state(false);
    let errorColorPrimaryBGText = $state(false);
    let errorColorSecondary = $state(false);
    let errorColorSecondaryBGText = $state(false);
    let errorColorSecondaryBGLink = $state(false);
    let errorColorBodyBG = $state(false);

    $effect(() => {
        const layoutWrapper = document.querySelector<HTMLElement>('#layoutWrapper');
        if (layoutWrapper === null) return;


        errorColorPrimary = !CSS.supports('color', colorPrimary);
        if (!errorColorPrimary)
            layoutWrapper.style.setProperty('--color-primary', colorPrimary);

        errorColorPrimaryBGText = !CSS.supports('color', colorPrimaryBGText)
        if (!errorColorPrimaryBGText)
            layoutWrapper.style.setProperty('--color-primarybg-text', colorPrimaryBGText);


        errorColorSecondary = !CSS.supports('color', colorSecondary);
        if (!errorColorSecondary)
            layoutWrapper.style.setProperty('--color-secondary', colorSecondary);

        errorColorSecondaryBGText = !CSS.supports('color', colorSecondaryBGText)
        if (!errorColorSecondaryBGText)
            layoutWrapper.style.setProperty('--color-secondarybg-text', colorSecondaryBGText);

        errorColorSecondaryBGLink = !CSS.supports('color', colorSecondaryBGLink)
        if (!errorColorSecondaryBGLink)
            layoutWrapper.style.setProperty('--color-secondarybg-link', colorSecondaryBGLink);


        errorColorBodyBG = !CSS.supports('color', colorBodyBG);
        if (!errorColorBodyBG)
            layoutWrapper.style.setProperty('--color-bodybg', colorBodyBG);

    });

    let saveableColors = $derived.by(() => {
        if (errorColorPrimary || errorColorPrimaryBGText || errorColorBodyBG || errorColorSecondary || errorColorSecondaryBGText || errorColorSecondaryBGLink)
            return false;

        return true;
    });


    let errorColorBlock: string = $state('');

    function checkColorSubmit(event: Event | undefined) {
        if (errorColorPrimary) {
            errorColorBlock = 'Die Primärfarbe ist ungültig.';
        } else if (errorColorPrimaryBGText) {
            errorColorBlock = 'Die Schriftfarbe auf der Primärfarbe ist ungültig.'
        } else if (errorColorBodyBG) {
            errorColorBlock = 'Die Seitenhintergrundfarbe ist ungültig.';
        } else if (errorColorSecondary) {
            errorColorBlock = 'Die Sekundärfarbe ist ungültig.';
        } else if (errorColorSecondaryBGText) {
            errorColorBlock = 'Die Schriftfarbe auf der Sekundärfarbe ist ungültig.';
        } else if (errorColorSecondaryBGLink) {
            errorColorBlock = 'Die Linkfarbe auf der Sekundärfarbe ist ungültig.';
        } else {
            errorColorBlock = '';
        }
        if (errorColorBlock !== '' && event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

</script>

<div class="cardColumns">
<Card>
    {#snippet snippetHeader()}
    <h3 class="text-center text-xl font-bold">Farben</h3>
    {/snippet}

    <div class="p-4">
        {#if errorColorBlock}
            <Banner status="error">
                <p>{errorColorBlock}</p>
            </Banner>
        {/if}
        {#if form?.action === 'saveColors'}
            {#if form.error}
                <Banner status="error">
                    <p>{form.error}</p>
                </Banner>
            {:else}
                <Banner status="success">
                    <p>Die Farben wurden erfolgreich gespeichert.</p>
                </Banner>
            {/if}
        {/if}
        <form method="post" onsubmit={checkColorSubmit}>
            <input type="hidden" name="action" value="saveColors"/>
            <ColorPicker bind:value={colorPrimary} label="Primärfarbe" name="--color-primary"/>
            <ColorPicker bind:value={colorPrimaryBGText} label="Schriftfarbe auf Primär" name="--color-primarybg-text">
                {#snippet snippetPreview(color)}
                <div class="bg-primary text-primarybg-text w-14 flex justify-center items-center">
                    <div>
                        <LazyIcon icon="Palette"/>
                    </div>
                </div>
                {/snippet}
            </ColorPicker>

            <ColorPicker bind:value={colorSecondary} label="Sekundärfarbe" name="--color-secondary"/>
            <ColorPicker bind:value={colorSecondaryBGText} label="Schriftfarbe auf Sekundär"
                         name="--color-secondarybg-text">
                {#snippet snippetPreview(color)}
                <div class="bg-secondary text-secondarybg-text w-14 flex justify-center items-center">
                    <div>
                        <LazyIcon icon="Palette"/>
                    </div>
                </div>
                {/snippet}
            </ColorPicker>
            <ColorPicker bind:value={colorSecondaryBGLink} label="Linkfarbe auf Sekundär"
                         name="--color-secondarybg-link">
                {#snippet snippetPreview(color)}
                <div class="bg-secondary text-secondarybg-link w-14 flex justify-center items-center">
                    <div>
                        <LazyIcon icon="Palette"/>
                    </div>
                </div>
                {/snippet}
            </ColorPicker>

            <ColorPicker bind:value={colorBodyBG} label="Seitenhintergrundfarbe" name="--color-bodybg"/>

            <Button
                    class="bg-primary mt-4"
                    type="submit"
                    disabled={!saveableColors}
                    variant="raised">
                <Label>Speichern</Label>
            </Button>
        </form>


    </div>
</Card>
</div>