export const actions = {
    default: async ({request, locals}) => {
        const formData = await request.formData();
        const action = formData.get('action');

        return {
            action, error: 'unknown.'
        }

    }
};