import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Puzzle from './pages/puzzle'
import Editor from './pages/editor'

class HelloWorld extends React.Component<{}, {}> {
  render() {
    return (
      <ul>
        <li><Link to={"/puzzle/1"}>Puzzle</Link></li>
        <li><Link to="/editor">Editor</Link></li>
      </ul>
    );
  }
}

class HomeView extends React.Component<{}, {}> {
  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={HelloWorld} />
        <Route path="/puzzle/:id" component={Puzzle} />
        <Route path="/editor" component={Editor} />
      </Router>
    );
  }
}


ReactDOM.render(<HomeView />, document.getElementById('root'));
