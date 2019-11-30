import Controller from '@ember/controller';

export default Controller.extend({
    newCode: '',
    newName: '',
    newSemester: 'WS18/19',
    teacher: '',
    errorCode: '',
    errorName: '',
    errorSemester: '',
    errorTeacher: '',

    actions: {
        createModule() {
            this.set('errorCode', '')
            this.set('errorName', '')
            this.set('errorSemester', '')
            this.set('errorTeacher', '')
            let newModule = this.store.createRecord('module', {
                code: this.get('newCode'),
                name: this.get('newName'),
                semester: this.get('newSemester'),
                // creator: this.get('model')
                teacher: this.get('model')
            })
            newModule.save().then((module) => {
                this.transitionToRoute('modules.view', module.id)
            }).catch((response) => {
                response.errors.forEach((error) => {
                    if(error.source.pointer == '/data/attributes/code') {
                        this.set('errorCode', error.detail)
                    } else if(error.source.pointer == '/data/attributes/name') {
                        this.set('errorName', error.detail)
                    } else if(error.source.pointer == '/data/attributes/semester') {
                        this.set('errorSemester', error.detail)
                    } else if (error.source.pointer == '/data/relationships/teacher/data') {
                        this.set('errorTeacher', error.detail)
                    }
            
                })
            })
        },
        setNewSemester(value) {
            this.set('newSemester', value)
        }
    }
});
