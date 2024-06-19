<script lang="ts">
import TextField from "@smui/textfield";
import ColorPicker from "svelte-awesome-color-picker";
import {ClickOutside} from "$lib/Components/ClickOutside"
import Restore from "svelte-google-materialdesign-icons/Restore.svelte";
let {
    value = $bindable(),
    label,
    pickerOpen = $bindable(false),
    snippetPreview = snippetPreviewDefault,
    resetValue = $bindable(structuredClone(value)),
    name = undefined
    } : {
    value: string,
    label: string,
    snippetPreview?: typeof snippetPreviewDefault
    pickerOpen?: boolean,
    resetValue?: string
    name?: string
} = $props();

type numberObj = {
    r: number,
    g: number,
    b: number,
    a: number
}

function hexToRgba(hexColor: string): numberObj {
    // Entferne das führende "#" Zeichen
    hexColor = hexColor.replace("#", "");

    // Bestimme die Länge der HEX-Farbe
    const length = hexColor.length;

    if (length === 3) {
        // Konvertiere 3-stelliges HEX zu 6-stelligem HEX
        hexColor = hexColor.split("").map((c) => c + c).join("");
    }
    if (length === 6) {
        // Füge den Alpha-Kanal hinzu (vollständig undurchsichtig)
        hexColor += "FF";
    } else if (length !== 8) {
        throw new Error("Ungültiges HEX-Farbenformat. Muss 3, 6 oder 8 Stellen haben.");
    }

    // Konvertiere HEX zu RGBA
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    const a = parseInt(hexColor.slice(6, 8), 16) / 255;

    return {r, g, b, a};
}


    let realValue : numberObj = $state({'r':0, 'g':0, 'b':0, 'a': 1});
    $effect(() => {
        if(value.startsWith('rgb(')) {
            let [r, g, b, a = 1] = value.slice(4, -1).split(',').map(v => parseInt(v));
            realValue = {r, g, b, a};
        } else if(value.startsWith('#')) {
            realValue = hexToRgba(value);

        }
    });

    $effect(() => {
        value = `rgba(${realValue.r}, ${realValue.g}, ${realValue.b}, ${realValue.a})`;
    });


    let randomId = '--colorpicker-' + Math.random().toString(36).substring(7);


    function resetEvent(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        value = resetValue;
    }

</script>
<style>
    .colorpicker-textfield :global(.mdc-text-field) {
        border-top-left-radius: 0;
    }
</style>

{#snippet snippetPreviewDefault(value)}
    <div style:background-color={value} class="border-b border-black box-border">
        <div class="w-14 flex justify-center items-center"></div>
    </div>
{/snippet}

{#if pickerOpen}
<div class="absolute z-50"  style:top={`calc(anchor(${randomId} top) + 0.5em)`} style:left={`calc(anchor(${randomId} left))`} use:ClickOutside onclickoutside={() => pickerOpen=false}>
    <ColorPicker bind:rgb={realValue} isDialog={false}/>
</div>
{/if}

<div class="flex flex-row mt-3 items-stretch">
    <div style:anchor-name={randomId} role="button" tabindex="-1" class="flex items-stretch relative" onclick={() => pickerOpen=true} onkeypress={(e) => { if(e.key === 'Enter') pickerOpen = true}}>
        {@render snippetPreview(value)}




    </div>

    <div class="flex-auto colorpicker-textfield">
        <TextField class="w-full" input$name={name}
                   variant="filled" label={label} bind:value={value}>
            <div role="button" tabindex="-1" slot="trailingIcon" onkeypress={resetEvent} onclick={resetEvent} class="pr-4 opacity-40 hover:opacity-70 cursor-pointer hover:text-primary">
                <Restore />
            </div>

        </TextField>
    </div>
</div>
