import Controller from '@ember/controller';

export default Controller.extend({
    display: false,

    actions: {
        openDialog() {
            this.set('display', true)
        },
        
        closeDialog() {
            this.set('display', false)
        }
    }
});
