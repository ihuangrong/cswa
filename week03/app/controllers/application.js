import Controller from '@ember/controller';

export default Controller.extend({
    a: '',
    b: '',
    operation: '+',
    calculated: false,
    result: '',
    history: [],

    actions: {
        calculate() {
            let a = Number(this.get('a'))
            let b = Number(this.get('b'))
            let operator = this.get('operation')
            let solution;

            switch (operator) {
                case '+':
                    solution = (a + b);
                    break;
                case '-':
                    solution = (a - b);
                    break;
                case '*':
                    solution = (a * b);
                    break;
                case '/':
                    solution = ((a / b).toFixed(2));
                    break;
                case '%':
                    solution = (a % b);
                    break;
            }
            this.set('result', solution);
            this.history.pushObject(a + " " + operator + " " + b);
            this.set("calculated", true);
        },

        history(entry) {
            let x = entry.split(" ")
            this.set('a', x[0])
            this.set('b', x[2])
            this.set('operation', x[1])
            this.send('calculate')
        }
    }
});
