import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default JSONAPIAdapter.extend({
    host: 'https://mht.uzi.uni-halle.de',
    namespace: 'client-seitige-web-anwendungen/api/example'
});
