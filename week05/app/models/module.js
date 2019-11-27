import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    code: DS.attr(),
    name: DS.attr(),
    semester: DS.attr(),
    
    actions: computed('creator.role', function(){
        return [
            {
                icon: 'mdi mdi-delete warning',
                title: 'Delete this module',
                action: 'deleteModule'
            }]
    }),

    creator: DS.belongsTo('user')
});
