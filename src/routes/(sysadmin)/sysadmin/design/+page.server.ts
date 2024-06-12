import Design from "$lib/server/Design";
export const actions = {
    default: async ({request, locals})=> {
        const formData = await request.formData();

        const action = formData.get('action');
        if(action === 'saveColors') {
            let colorPrimary = formData.get('--color-primary')?.toString();
            let colorPrimaryBg = formData.get('--color-primarybg-text')?.toString();
            let colorSecondary = formData.get('--color-secondary')?.toString();
            let colorSecondaryBG = formData.get('--color-secondarybg-text')?.toString();
            let colorSecondaryBGLink = formData.get('--color-secondarybg-link')?.toString();
            let colorBodyBG = formData.get('--color-bodybg')?.toString();

            if(colorSecondaryBGLink === null) {
                return {
                    action, error: 'Secondary BG Link color is required.'
                }
            }

            if(colorPrimary === null) {
                return {
                    action, error: 'Primary color is required.'
                }
            }
            if(colorPrimaryBg === null) {
                return {
                    action, error: 'Secondary BG color is required.'
                }
            }
            if(colorBodyBG=== null) {
                return {
                    action, error: 'Body BG color is required.'
                }
            }

            if(colorSecondary === null) {
                return {
                    action, error: 'Secondary color is required.'
                }
            }

            if(colorSecondaryBG === null) {
                return {
                    action, error: 'Secondary BG color is required.'
                }
            }

            Design.set('--color-primary', colorPrimary as string);
            Design.set('--color-primarybg-text', colorPrimaryBg as string);
            Design.set('--color-bodybg', colorBodyBG as string);
            Design.set('--color-secondary', colorSecondary as string);
            Design.set('--color-secondarybg-text', colorSecondaryBG as string);
            Design.set('--color-secondarybg-link', colorSecondaryBGLink as string);
            return {
                action: 'saveColors', error: null
            }
        }
    }
};