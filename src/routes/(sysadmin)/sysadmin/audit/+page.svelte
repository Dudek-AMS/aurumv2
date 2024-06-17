<script lang="ts">
    import type {PageData} from './$types';
    import {setCrumbs} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";
    import Card from "$lib/Components/Card/Card.svelte";
    import DataTable from "$lib/Components/DataTable/DataTable.svelte";
    import UserLink from "$lib/Components/UserLink/UserLink.svelte";
    let {data } : {
        data: PageData
    } = $props();
    setCrumbs(data.crumbs);
</script>

<Card>
    <DataTable backend="/sysadmin/audit/data">
        {#snippet snippetuserId(value)}
            <UserLink userId={value} />
        {/snippet}
    </DataTable>
</Card>