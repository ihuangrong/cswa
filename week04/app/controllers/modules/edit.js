import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        updateModule() {
            this.set('errorCode', '')
            this.set('errorName', '')
            this.set('errorSemester', '')
            this.get('model').save().then((model) => {
                this.transitionToRoute('modules.view', model.id)
            }).catch((response) => {
                response.errors.forEach((error) => {
                    if(error.source.pointer == '/data/attributes/code') {
                        this.set('errorCode', error.detail)
                    } else if(error.source.pointer == '/data/attributes/name') {
                        this.set('errorName', error.detail)
                    } else if(error.source.pointer == '/data/attributes/semester') {
                        this.set('errorSemester', error.detail)
                    }
                })
            })
        },
        setSemester(semester) {
            this.set('model.semester', semester)
        }
    }
});
