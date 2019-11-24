import Controller from '@ember/controller';

export default Controller.extend({
    newName: '',
    newAddress: '',
    newCapacity: '',
    newFeatures: '',
    errorName: '',
    errorAddress: '',
    errorCapacity: '',
    errorFeatures: '',

    actions: {
        createRoom() {
            let newRoom = this.store.createRecord('room', {
                name: this.get('newName'),
                address: this.get('newAddress'),
                capacity: this.get('newCapacity'),
                features: this.get('newFeatures')
            })
            this.set('errorName', '')
            this.set('errorAddress', '')
            this.set('errorCapacity', '')
            this.set('errorFeatures', '')
            newRoom.save().then((room) => {
                this.transitionToRoute("rooms.view", room.id)
            }).catch((response) => {
                response.errors.forEach((error) => {
                    if(error.source.pointer == '/data/attributes/name') {
                        this.set('errorName', error.detail)
                    } else if(error.source.pointer == '/data/attributes/address') {
                        this.set('errorAddress', error.detail)
                    } else if(error.source.pointer == '/data/attributes/capacity') {
                        this.set('errorCapacity', error.detail)
                    } else if(error.source.pointer == '/data/attributes/features') {
                        this.set('errorFeatures', error.detail)
                    }
                })
            });
        }
    }
});
