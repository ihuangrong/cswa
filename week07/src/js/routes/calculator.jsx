import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from "react-router-dom";

import '../../styles/app.scss';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            a: '',
            b: '',
            operation: '+',
            result: 0,
            isCalculator: false,
            history: []
        }
    }

    setA = (ev) => {
        this.setState({
            a: ev.target.value
        });
    }

    setB = (ev) => {
        this.setState({
            b: ev.target.value
        });
    }

    setOperation = (ev) => {
        this.setState({
            operation: ev.target.value
        });
    }

    calculate = (ev) => {
        ev.preventDefault();
        let a = Number.parseInt(this.state.a)
        let b = Number.parseInt(this.state.b)
        let operator = this.state.operation
        let result = 0;

        switch (operator) {
            case '+':
                result = (a + b);
                break;
            case '-':
                result = (a - b);
                break;
            case '*':
                result = (a * b);
                break;
            case '/':
                if (b === 0) return NaN;
                result = ((a / b).toFixed(2));
                break;
            case '%':
                result = (a % b);
                break;
            default:
                result = NaN;
        }

        this.setState({
            isCalculator: true,
            result: result,
            history: [...this.state.history, {
                a: this.state.a,
                b: this.state.b,
                operation: this.state.operation
            }]

        });
    }

    reCalculate = (a, operation, b) => {
        this.setState({
            a: a, b: b, operation: operation, result: '?'
        });
    }

    renderResult = () => {
        if (!this.state.isCalculator) { return ""; }
        return this.state.a + " " 
        + this.state.operation + " " 
        + this.state.b + " = "
        + this.state.result;
    }

    renderHistory = () => {
        if (!this.state.isCalculator) {return "";}
        return this.state.history.map((item) => {
            return <li><a onClick={(ev) => {
                this.reCalculate(item.a, item.operation, item.b);
            }}>{item.a + " " + item.operation + " " + item.b}</a></li>
        })
    }

    render() {
        let showResult = () => {
            if (!this.state.isCalculator) { return ""; }
            return <div className="cell"><span id='result' class="label primary">{this.renderResult()}</span></div>
        }

        let showHistory = () => {
            if (!this.state.isCalculator) { return ""; }
            return <div className="cell"><h4>History</h4><ul id='history' class="vertical menu">{this.renderHistory()}</ul></div>
        }

        return (
        <div>
            <div className="grid-x grid-padding-x">
              <h1 className="cell">Calculator</h1>
            </div>
            <main className="grid-container-x small callout">
                <h4>Neue Operation</h4>
                <div className="cell">
                    <label>
                    a:
                    <input type="number" name="a" value={this.state.a} onChange={this.setA} />
                    </label>
                    <select value={this.state.operation} onChange={this.setOperation}>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">*</option>
                        <option value="/">/</option>
                        <option value="%">%</option>
                    </select>
                    <label>b:
                      <input type="number" name="b" value={this.state.b} onChange={this.setB} />
                    </label>
                  <div className="text-right">
                    <Link to="/calculator" onClick={() => window.location.reload(true)} className="secondary button">Reset</Link>
                    <button tabIndex="3" className="button" onClick={this.calculate}>Calculate</button>
                  </div>
                </div>
                {showResult()}
                {showHistory()}
            </main>
        </div>
        )
    }
}

export function install(attachmentPoint, options, callback) {
    ReactDOM.render(<Calculator/>, attachmentPoint);
}