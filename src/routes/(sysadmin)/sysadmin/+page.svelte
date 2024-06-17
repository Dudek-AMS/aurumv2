<script lang="ts">
    import Card from "$lib/Components/Card/Card.svelte";
    import LazyIcon from "$lib/Components/LazyIcon.svelte";
    import { setCrumbs} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";
    let {data} = $props();
    setCrumbs(data.crumbs);
</script>




<div class="flex flex-row flex-wrap w-max m-auto gap-4 ">

    <Card class$="w-56">
        {#snippet snippetHeader()}
        <h3 class="text-center text-lg font-bold">Allgemein</h3>
        {/snippet}
        <a href="/sysadmin/settings">
            <div class="aspect-square text-black/10 hover:text-black/20 relative p-4">
                <LazyIcon icon="Settings" class="w-full h-full"/>
            </div>
        </a>

    </Card>

    <Card class$="w-56">
        {#snippet snippetHeader()}
        <h3 class="text-center text-lg font-bold">EntraID SSO</h3>
        {/snippet}
        <a href="/sysadmin/sso">
            <div class="aspect-square text-black/10 hover:text-black/20 relative p-4">
                <LazyIcon icon="Fingerprint" class="w-full h-full"/>
            </div>
        </a>

    </Card>


    <Card class$="w-56">
        {#snippet snippetHeader()}
        <h3 class="text-center text-lg font-bold">LDAP Verbindung</h3>
        {/snippet}
        <a href="/sysadmin/ldap">
            <div class="aspect-square text-black/10 hover:text-black/20 relative p-4">
                <LazyIcon icon="Groups" class="w-full h-full"/>
            </div>
        </a>

    </Card>

    <Card class$="w-56">
        {#snippet snippetHeader()}
        <h3 class="text-center text-lg font-bold">Design</h3>
        {/snippet}
        <a href="/sysadmin/design">
            <div class="aspect-square text-black/10 hover:text-black/20 relative p-4">
                <LazyIcon icon="Design_services" class="w-full h-full"/>
            </div>
        </a>

    </Card>

    <Card class$="w-56">
        {#snippet snippetHeader()}
        <h3 class="text-center text-lg font-bold">AUDIT</h3>
        {/snippet}
        <a href="/sysadmin/audit">
            <div class="aspect-square text-black/10 hover:text-black/20 relative p-4">
                <LazyIcon icon="History" class="w-full h-full"/>
            </div>
        </a>

    </Card>



</div>

