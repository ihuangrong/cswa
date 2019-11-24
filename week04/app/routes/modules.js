import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        semester: {
            refreshModel: true
        }
    },
    model(params) {
        return this.store.query('module', params)
    }
});
