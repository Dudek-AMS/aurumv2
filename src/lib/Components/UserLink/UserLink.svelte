<script lang="ts">
    import userStore from '$lib/client/UserStore.svelte';
    let {
        userId, userName
    } : {
        userId?: string,
        userName?: string
    } = $props();


</script>


<a href={`/user/${encodeURIComponent(userStore.getUserByIdOrName(userId??userName).userName)}/`}>
    {userStore.getUserByIdOrName(userId??userName).displayName}
</a>