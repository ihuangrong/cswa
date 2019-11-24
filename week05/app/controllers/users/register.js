import Controller from '@ember/controller';

export default Controller.extend({
    newEmail: '',
    newFirstName: '',
    newLastName: '',
    newRole: 'student',
    errorEmail: '',
    errorFirstName: '',
    errorLastName: '',
    errorRole: '',

    actions: {
        createUser() {
            this.set('errorEmail', '')
            this.set('errorFirstName', '')
            this.set('errorLastName', '')
            this.set('errorRole', '')
            let newUser = this.store.createRecord('user', {
                email: this.get('newEmail'),
                first_name: this.get('newFirstName'),
                last_name: this.get('newLastName'),
                role: this.get('newRole')
            })
            newUser.save().then((user) => {
                this.transitionToRoute('modules')
            }).catch((response) => {
                response.errors.forEach((error) => {
                    if(error.source.pointer == '/data/attributes/email') {
                        this.set('errorEmail', error.detail)
                    } else if(error.source.pointer == '/data/attributes/first_name') {
                        this.set('errorFirstName', error.detail)
                    } else if(error.source.pointer == '/data/attributes/last_name') {
                        this.set('errorLastName', error.detail)
                    } else if(error.source.pointer == '/data/attributes/role') {
                        this.set('errorRole', error.detail)
                    }
                })
            })
        },
        setNewRole(value) {
            this.set('newRole', value)
        }
    }
});
