import React from 'react';

import dashboard from '../xlsxToJson/dashboard.json';
import './Table.css';

const dataArr = dashboard.splice(0, 1);

const Table = ({ selectedOption }) => {
  if (selectedOption !== null) {
    const taskArrObj = dataArr[0];
    let mentorStudents = ' ';
    const studentsTasksArr = [];
    const headArr = [];

    dashboard.map(function(elem) {
      if (selectedOption.value === elem.mentorGitName) {
        return (mentorStudents = elem);
      }
      return elem;
    });

    const mentorTh = (
      <th key={mentorStudents.mentorGitName}>
        <a href={mentorStudents.mentorGitLink} target="_blank" rel="noopener noreferrer">
          Mentor: {selectedOption.label}
        </a>
      </th>
    );

    headArr.push(mentorTh);

    mentorStudents.students.map(function(elem) {
      const studentTh = (
        <th key={elem.studentName}>
          <a href={elem.studentGit} target="_blank" rel="noopener noreferrer">
            {elem.studentName}
          </a>
        </th>
      );
      headArr.push(studentTh);
      return elem;
    });

    studentsTasksArr.push(<tr key={mentorStudents.mentorName}>{headArr}</tr>);

    function getColorTd(keyId, color) {
      return <td key={keyId} style={{ backgroundColor: color }} />;
    }

    for (let i = 0; i < taskArrObj.length; i++) {
      const taskTdArr = [];

      const taskTd = (
        <td key={taskArrObj[i].task}>
          <a href={taskArrObj[i].taskLink} target="_blank" rel="noopener noreferrer">
            {taskArrObj[i].task}
          </a>
        </td>
      );

      taskTdArr.push(taskTd);

      for (let j = 0; j < mentorStudents.students.length; j++) {
        let taskTd;
        const key = mentorStudents.students[j].studentName + taskArrObj[i].status;

        if (taskArrObj[i].status === 'In Progress') {
          taskTd = getColorTd(key, 'rgb(255, 115, 0)');
        }
        if (
          taskArrObj[i].status === 'Checking' &&
          !mentorStudents.students[j].studentTasks.includes(taskArrObj[i].task)
        ) {
          taskTd = getColorTd(key, 'rgb(255, 179, 179)');
        }

        if (mentorStudents.students[j].studentTasks.includes(taskArrObj[i].task)) {
          taskTd = getColorTd(key, 'rgba(4, 114, 0, 0.692)');
        }

        if (
          taskArrObj[i].status === 'Checked' &&
          !mentorStudents.students[j].studentTasks.includes(taskArrObj[i].task)
        ) {
          taskTd = getColorTd(key, 'rgb(255, 0, 0)');
        }

        if (taskArrObj[i].status === 'ToDo') {
          taskTd = getColorTd(key, 'rgb(99, 99, 99)');
        }

        taskTdArr.push(taskTd);
      }

      studentsTasksArr.push(<tr key={taskArrObj[i].task}>{taskTdArr}</tr>);
    }

    studentsTasksArr.push(
      <tr key="Legend">
        <th style={{ textAlign: 'center' }}>Legend</th>
      </tr>
    );
    studentsTasksArr.push(
      <tr key="gold">
        <td style={{ backgroundColor: 'rgb(255, 115, 0)' }} />
        <td> - students working on that task now</td>
      </tr>
    );
    studentsTasksArr.push(
      <tr key="lightcoral">
        <td style={{ backgroundColor: 'rgb(255, 179, 179)' }} />
        <td> - need to check</td>
      </tr>
    );
    studentsTasksArr.push(
      <tr key="green">
        <td style={{ backgroundColor: 'rgba(4, 114, 0, 0.692)' }} />
        <td> - checked by mentor</td>
      </tr>
    );
    studentsTasksArr.push(
      <tr key="maroon">
        <td style={{ backgroundColor: 'rgb(255, 0, 0)' }} />
        <td> - time to checking is gone and no mark from mentor</td>
      </tr>
    );
    studentsTasksArr.push(
      <tr key="grey">
        <td style={{ backgroundColor: 'rgb(99, 99, 99)' }} />
        <td> - task in todo state</td>
      </tr>
    );

    return (
      <table className="tableDashboard">
        <tbody key="studentsTasks">{studentsTasksArr}</tbody>
      </table>
    );
  } else return null;
};

export default Table;
