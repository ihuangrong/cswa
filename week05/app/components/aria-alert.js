import Component from '@ember/component';

export default Component.extend({
    tagName: 'div',

    actions: {
        alertMessage: function() {
            alert("Please check your screenreader works");
        }
    }
});
