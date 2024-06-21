<script lang="ts">
    import TextField from "@smui/textfield";
    import List, { Item, Separator, Text } from '@smui/list';
    import LazyIcon from "$lib/Components/LazyIcon.svelte";
    import Menu from "@smui/menu";
    import {goto} from "$app/navigation";



    let { data, children } = $props();


    let searchValue = $state('');


    let profileBallMenu : null|Menu = $state();


</script>

<style>

    #headerSearch {
        --mdc-theme-primary: var(--color-primarybg-text);
    }

    #header :global(.mdc-floating-label) {
        color: color-mix(in srgb, var(--color-primarybg-text) 70%, transparent);
    }

    #header :global(.mdc-text-field__input) {
        color: var(--color-primarybg-text);

    }

</style>



    <header id="header" class="fixed h-16 w-full z-30 bg-primary border-b text-primarybg-text border-primary-hover shadow-xl top-0">
        <div class="flex w-full justify-end items-center">
            <div id="headerSearch" >
                <TextField input$name="search" class="m-2 bg-primary-hover text-primarybg-text lg:w-96 h-10!" variant="outlined"  bind:value={searchValue}>

                    <div slot="leadingIcon" class="self-center mx-4">
                        <LazyIcon icon="Search" />
                    </div>


                </TextField>
            </div>
            <div id="profileBall" class="mx-4 flex">


                <button type="button" onclick={(e) => {
                profileBallMenu?.setOpen(true)}
                } class="cursor-pointer h-12 aspect-square rounded-full ">
                    <img src="/user/{data.user.entraId}/photo" class="rounded-full border-2 border-primarybg-text hover:border-primary-hover" alt="Profilbild" />
                </button>



                <Menu
                        anchorMargin={{top: 50, right: 0, bottom: 0, left: 0}}
                        bind:this={profileBallMenu}


                >
                    <List>
                        <Item>
                            <Text onclick={() => goto(`/user/${encodeURIComponent(data.user.userName)}`)}>Profil</Text>
                        </Item>
                        <Item>
                            <Text onclick={() => goto(`/logout`)}>Abmelden</Text>
                        </Item>
                    </List>

                </Menu>
            </div>

        </div>
    </header>
<div class="flex flex-row h-full items-stretch">
    <div class="bg-primary w-48 border-r shadow-xl border-primary-hover">
        <nav class="px-4 sticky top-0 pt-20 pb-4 h-full max-h-screen overflow-auto">
            asd<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            sdasdsdkjsdjk<br>
            LAST<br>
        </nav>
    </div>
    <main class="h-full p-4 pt-20">
        {@render children()}
        asd<br>
        sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>      sdasdsdkjsdjk<br>
        sdasdsdkjsdjk<br>
    </main>
</div>




