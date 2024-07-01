<script lang="ts">
    import {setCrumbs} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte.js";
    import type {PageData, ActionData} from './$types';
    import Card from "$lib/Components/Card/Card.svelte";
    import TextField from "@smui/textfield";

    let {data, form}: {
        data: PageData,
        form: ActionData
    } = $props();



    let ldapHost = $state(data.ldapSettings.ldap.host);
    let ldapUsername = $state(data.ldapSettings.ldap.password);
    let ldapPassword = $state(data.ldapSettings.ldap.username);


    setCrumbs(data.crumbs);


</script>

<Card>
    {#snippet snippetHeader()}
        <h3 class="text-center text-xl font-bold">LDAP Server</h3>
    {/snippet}

    <div class="p-4">
        <form method="post">
                <div>
                   <TextField class="w-full" bind:value={ldapHost} label="LDAP Host"></TextField>
                </div>

                <div>
                    <TextField class="w-full" bind:value={ldapHost} label="Username"></TextField>
                </div>

                <div>
                    <TextField input$type="password" class="w-full" bind:value={ldapHost} label="Password"></TextField>
                </div>
        </form>

    </div>

</Card>