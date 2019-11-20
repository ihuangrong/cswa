import Controller from '@ember/controller';

export default Controller.extend({
    newName: "",
    newAddress: "",
    newCapacity: "",
    newFeatures: "",

    actions: {
        createRoom() {
            this.store.createRecord('room', {
                name: this.get('newName'),
                address: this.get('newAddress'),
                capacity: this.get('newCapacity'),
                features: this.get('newFeatures')
            }).save();
        }
    }
});
