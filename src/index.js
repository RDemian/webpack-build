import React from 'react';
import ReactDom from 'react-dom';
import iconPdf from './assets/img/icon-pdf.png';
import './main.scss';

const App = () => {
    return (
        <div>
            <div>React App</div>
            <img src={iconPdf} />
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('root'));


/* example for Babel
class App {
    run = async (name = 'World') => {
        console.log(`Hello ${name}`);
        console.log([1, 2, [3, 4]].flat());
    }
}

const app = new App();

app.run()
    .then(() => console.log('Done!'))
    .catch(() => console.log('Error!'));
*/
