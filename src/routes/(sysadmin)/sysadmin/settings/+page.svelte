<script lang="ts">
    import type {LayoutData, PageData, PageParentData} from "./$types";
    import {setCrumbs} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";
    import Card from "$lib/Components/Card/Card.svelte";
    import TextField from "@smui/textfield";
    import Button, {Label} from "@smui/button";

    let {data} : {data: PageData} = $props();

    setCrumbs(data.crumbs);
    $effect(() => {
        if(data.website.base_url === null) {
            data.website.base_url = location.protocol + '//' + location.hostname;
        }
    })


</script>

<div class="cardColumns ">
    <Card>
        {#snippet snippetHeader()}
        <h3 class="text-center text-xl font-bold">Webserver</h3>
        {/snippet}
        <form method="post">
        <input type="hidden" name="action" value="updateWebsite" />
        <div class="p-4">
            <TextField input$name="base_url" class="w-full mt-3" variant="outlined" label="Base URL" value={data.website.base_url} />



            <Button
                    class="bg-primary mt-4"
                    type="submit"
                    variant="raised">
                <Label>Speichern</Label>
            </Button>

        </div>

        </form>

    </Card>

</div>
