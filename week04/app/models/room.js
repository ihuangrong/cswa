import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    address: DS.attr(),
    capacity: DS.attr(),
    features: DS.attr()
});