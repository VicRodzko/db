import React from 'react';
import Select from 'react-select';

import dashboard from './xlsxToJson/dashboard.json';
import Table from './components/Table';
import './App.css';

const options = dashboard.map(function(elem) {
  const objElem = {
    value: elem.mentorGitName,
    label: elem.mentorGitName + ' (' + elem.mentorName + ')',
  };
  return objElem;
});

class App extends React.Component {
  state = {
    selectedOption: null,
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="mainContainer">
        <h1>Enter your GitHub login</h1>
        <Select
          className="select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        <Table selectedOption={selectedOption} />
      </div>
    );
  }
}

export default App;
