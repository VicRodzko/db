import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import xlsx from './xlsxToJson/dashboard.json';

const assert = require('assert');

it('drawing (render) - done', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('json correctly - done', () => {
  const findMentor = xlsx.filter(elem => {
    if (elem.mentorGitName === 'zianisreznik/') return elem;
  });
  assert.deepEqual(findMentor[0], {
    mentorName: 'Dzianis Reznik',
    mentorGitName: 'zianisreznik/',
    mentorGitLink: 'http://github.com/dzianisreznik/',
    students: [
      {
        studentName: 'eugene3112',
        studentGit: 'https://github.com/eugene3112',
        studentTasks: [],
      },
      {
        studentName: 'heat98',
        studentGit: 'https://github.com/heat98',
        studentTasks: [
          'Code Jam "CV"',
          'Code Jam "CoreJS"',
          'Code Jam "DOM, DOM Events"',
          'Markup #1',
          'Presentation',
        ],
      },
      {
        studentName: 'tanyamatesha',
        studentGit: 'https://github.com/tanyamatesha',
        studentTasks: [],
      },
      {
        studentName: 'egorgorbik',
        studentGit: 'https://github.com/egorgorbik',
        studentTasks: [
          'Code Jam "CV"',
          'Code Jam "CoreJS"',
          'Code Jam "DOM, DOM Events"',
          'Presentation',
        ],
      },
      {
        studentName: 'vicrodzko',
        studentGit: 'https://github.com/vicrodzko',
        studentTasks: [
          'Code Jam "CV"',
          'Code Jam "CoreJS"',
          'Code Jam "DOM, DOM Events"',
          'Markup #1',
          'Presentation',
          'YouTube',
        ],
      },
      {
        studentName: 'ilyatrat',
        studentGit: 'https://github.com/ilyatrat',
        studentTasks: [
          'Code Jam "DOM, DOM Events"',
          'Markup #1',
          'Code Jam "CV"',
          'Code Jam "CoreJS"',
          'Presentation',
        ],
      },
      {
        studentName: 'unbelievablysmart',
        studentGit: 'https://github.com/unbelievablysmart',
        studentTasks: ['Code Jam "CoreJS"', 'Code Jam "CV"', 'Markup #1'],
      },
      {
        studentName: 'viktoryia-hrechykha',
        studentGit: 'https://github.com/viktoryia-hrechykha',
        studentTasks: [],
      },
    ],
  });
});
