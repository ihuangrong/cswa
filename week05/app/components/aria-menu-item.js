import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

/**
 * A component that generates an ARIA compliant menuitem.
 *
 * The first three parameters must be given as unnamed parameters.
 *
 * @param {string} routeName The first parameter must be the target route name
 * @param {Object[]} [models] Optional a list of modules to use in the URL generation
 * @param {Object} [queryParams] Optional query parameters to use in the URL generation
 * @param {string} [title] The text to use as the element's title
 * @param {number} [tabindex] The tabindex for this element. Defaults to -1.
 */
export default Component.extend({
    router: service(),

    tagName: 'li',
    tabindex: -1,
    title: null,

    href: computed('router.currentURL', 'targetParams', function() {
        return this.get('router').urlFor('modules.index')
    }),
    current: computed('router.currentURL', 'targetParams', function() {
        return this.get('router').isActive('modules.index') ? 'true': 'false'
    }),

     /**
     * When Ember has initialised the component with its parameters, extract the target route parameters and store
     * those as an array 'targetParams' that can be passed to the router for generation
     */
    didReceiveAttrs() {
        let targetParams = []
        let params = this.get('params')
        targetParams.push(params[0])
        params = params.slice(1)
        if(params.length > 0) {
            if(params[params.length - 1] && params[params.length - 1].isQueryParams) {
                targetParams = targetParams.concat(params.slice(0, params.length - 1))
                targetParams.push({queryParams: params[params.length - 1].values})
            } else {
                targetParams = targetParams.concat(params)
            }
        }
        this.set('targetParams', targetParams)
    },
    /**
     * Manually handle clicks and transition to the configured route.
     */
    click(ev) {
        ev.preventDefault()
        this.get('router').transitionTo(...this.get('targetParams'))
    }
}).reopenClass({
    positionalParams: 'params'
});
