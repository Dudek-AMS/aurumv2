<script lang="ts">

    import type {DataTableResponse} from "$lib/Components/DataTable/DataTableResponse";


    let {
        backend,
        data = $bindable(),
        ...others
    }:
        {
            backend: string,
            data?: any
            others?: any
        } = $props();





    let fetchPromise: Promise<any> = $state(Promise.resolve())
    let fetchData: DataTableResponse<Auditlog>|undefined = $state();
    $effect(() => {
        fetchPromise = fetch(backend, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => {
                fetchData = data;
            });
    })

</script>
<style>
    table {
        width: 100%;
        border-collapse: collapse;

        tbody tr {
            & td:nth-child(odd) {
                background-color: color-mix(in srgb, black 1%, transparent);
            }
            &:hover {
                background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
                color: var(--primarybg-text);
            }

        }

        thead th {
            padding: var(--padding-2);
            background: var(--color-primary);
            &:nth-child(odd) {
                background: var(--color-primary-accent);
            }
        }
    }




</style>
<table>
    <thead>
    <tr>
        {#if fetchData}
            {#each fetchData.columns as column, i}
                {@const odd = i%2===1}
                <th >{column.label}</th>
            {/each}
        {/if}
    </tr>
    </thead>
    <tbody>
    {#if fetchData}
        {#each fetchData.entries as entry, i}
            {@const odd = i%2===1}
            <tr class=" {odd?'bg-secondary/20':'bg-secondary/40'} text-secondarybg-text">
                {#each fetchData.columns as column}
                    {@const keyMap = column.keyMap}
                    {@const value = entry[column.keyMap]}
                    <td class="p-2">



                    {#if others[`snippet${column.keyMap}`]}
                        {@render others[`snippet${keyMap}`](value)}
                    {:else}
                        {typeof value === 'object' ? JSON.stringify(value) : value}
                    {/if}
                            </td>

                {/each}
            </tr>
        {/each}
    {/if}
    </tbody>
</table>