import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
    breakpoint: 'small',
    small: computed('breakpoint', function() {
        return this.get('breakpoint') === 'small'
    }),
    notSmall:  computed('breakpoint', function() {
        return this.get('breakpoint') !== 'small'
    }),

    init() {
        this._super(...arguments)
        if (window.innerWidth >= 1024) {
            this.set('breakpoint', 'large')
        } else if (window.innerWidth >= 640) {
            this.set('breakpoint', 'medium')
        } else {
            this.set('breakpoint', 'small')
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                this.set('breakpoint', 'large')
            } else if (window.innerWidth >= 640) {
                this.set('breakpoint', 'medium')
            } else {
                this.set('breakpoint', 'small')
            }
        })
    }
});
