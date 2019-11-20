import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        deleteRoom(room) {
            room.deleteRecord();
            room.save().then(() => {
                this.transitionToRoute("rooms.display")
            })
        }
    }
});
