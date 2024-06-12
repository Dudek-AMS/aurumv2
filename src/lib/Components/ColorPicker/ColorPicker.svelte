<script lang="ts">
import TextField from "@smui/textfield";
import type {Snippet} from "svelte";
import ColorPicker from "svelte-awesome-color-picker";
import {ClickOutside} from "$lib/Components/ClickOutside"
import Restore from "svelte-google-materialdesign-icons/Restore.svelte";
let {
    value = $bindable(),
    label,
    pickerOpen = $bindable(false),
    snippetPreview = snippetPreviewDefault as Snippet,
    resetValue = $bindable(structuredClone(value)),
    name = undefined
    } : {
    value: string,
    label: string,
    snippetPreview?: Snippet,
    pickerOpen?: boolean,
    resetValue?: string
    name?: string
} = $props();




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
    <ColorPicker bind:hex={value} isDialog={false}/>
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
