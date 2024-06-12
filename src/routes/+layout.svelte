<script lang="ts">
    import "../app.css";
    import {setContext} from "svelte";

    let {data, children} = $props();




    const parseCSSVariables = () => {
        let css = '';
        if(data.design !== undefined) {
            data.design.forEach(design => {
                if(design.key.startsWith('--'))
                    css += `${design.key}: ${design.value};`;
            });
        }
        return css;
    }



    const iconCtx = {
        variation: 'filled'
    };
    setContext('iconCtx', iconCtx);

</script>
<div style="{parseCSSVariables()}" id="layoutWrapper" class="bg-bodybg w-full h-full pt-2">
    {@render children()}
</div>
