import Controller from '@ember/controller';

export default Controller.extend({
    isExpanded1: false,
    isExpanded2: false,
    isExpanded3: false,

    actions: {
        expanded(id) {
            if (this.get('isExpanded1') === false && id === 1) {
                this.set('isExpanded1', true)
            } else { this.set('isExpanded1', false)}
            if (this.get('isExpanded2') === false && id === 2) {
                this.set('isExpanded2', true)
            } else { this.set('isExpanded2', false)}
            if (this.get('isExpanded3') === false && id === 3) {
                this.set('isExpanded3', true)
            } else { this.set('isExpanded3', false)}
        }
    }
});
