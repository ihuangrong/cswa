import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    intl: service(),
    mediaQuery: service(),
    menuDirection: computed('mediaQuery.small', function() {
        if (this.get('mediaQuery.small')) {
            return 'vertical'
        } else {
            return 'horizontal'
        }
    }),
    menuVisible: false,

    actions: {
        setLocale(primaryLocale) {
            let locale = ['en-us']
            if(primaryLocale) {
                locale.splice(0, 0, primaryLocale)
            }
            this.intl.setLocale(locale)
        },
        toggleMenu() {
            this.set('menuVisible', !this.get('menuVisible'))
        }
    }
});
