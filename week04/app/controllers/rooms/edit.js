import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        updateRoom() {
            this.get('model').save().then((model) => {
                this.transitionToRoute('rooms.view', model.id)
            });
        }
    }
});
