<script lang="ts">
    import TextField from "@smui/textfield";
    import Button, {Label} from "@smui/button";
    import {goto} from "$app/navigation";
    import {setCrumbs} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";
    import Banner from "$lib/Components/Banner/Banner.svelte";
    let sysPassword = $state('');


    let {data, form} = $props();
    setCrumbs(data.crumbs);



    $effect(() => {
        if(form !== null && form.error === null) {
            goto('/sysadmin');
        }
    });
</script>

{#if form && form.error}
    <Banner status="error">
        <p>{form.error}</p>
    </Banner>
{/if}
<form method="POST">
    <TextField
            class="w-full"
            variant="outlined"
            type="password"
            input$name="sysPassword"
            label="Sysadmin Passwort aus dem Log"
            bind:value={sysPassword} required />
    <Button
        type="submit"
        variant="raised">
        <Label>Login</Label>
    </Button>
</form>
