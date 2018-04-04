import * as React from 'react';
import NavigationMenu from './components/navigation-menu/NavigationMenu';

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <NavigationMenu />
        <h1>Hello, World!</h1>
      </div>
    );
  }
}

export default App;
