import Controller from '@ember/controller';
import { inject as service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    actions: {
        delete(module) {
            module.deleteRecord()
            module.save()
        }
    },

    mediaQuery: service(),
    actionMenuDirection: computed('mediaQuery.small', function() {
        if (this.get('mediaQuery.small')) {
            return 'horizontal'
        } else {
            return 'vertical'
        }
    })
});
