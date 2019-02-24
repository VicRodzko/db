const xlsx = require('xlsx');
const fs = require('fs');

(function jsonConstructor() {
  const mentorStudents = './data/Mentor score.xlsx';
  const mentorsInfo = './data/Mentors info.xlsx';
  const score = './data/Mentor score.xlsx';
  const tasks = './data/Tasks.xlsx';

  const mentorsInfoArr = xlsxRead(mentorsInfo);
  const mentorStudentsArr = xlsxRead(mentorStudents);
  const scoreArr = xlsxRead(score);
  const tasksArr = xlsxRead(tasks);

  function xlsxRead(xlsxPath) {
    const xlsxList = xlsx.readFile(xlsxPath);
    const sheet_name_list = xlsxList.SheetNames;
    return xlsx.utils.sheet_to_json(xlsxList.Sheets[sheet_name_list[0]]);
  }

  const studentsTasksArr = tasksArr.map(function(elem) {
    return {
      task: elem.task,
      taskLink: elem.link,
      status: elem.Status,
    };
  });

  const uniqueMentorsArr = [];

  for (let i = 0; i < mentorStudentsArr.length; i++) {
    if (!uniqueMentorsArr.includes(mentorStudentsArr[i].interviewer)) {
      uniqueMentorsArr.push(mentorStudentsArr[i].interviewer);
    }
  }

  const dashboardArr = uniqueMentorsArr.map(function(elem) {
    const elemToObj = {
      mentorName: elem,
    };
    return elemToObj;
  });

  for (let i = 0; i < dashboardArr.length; i++) {
    for (let j = 0; j < mentorsInfoArr.length; j++) {
      if (dashboardArr[i].mentorName === mentorsInfoArr[j].Name + ' ' + mentorsInfoArr[j].Surname) {
        dashboardArr[i].mentorGitName = mentorsInfoArr[j].GitHub.substring(19);
        dashboardArr[i].mentorGitLink = mentorsInfoArr[j].GitHub;
      }
    }
  }

  for (let i = 0; i < dashboardArr.length; i++) {
    dashboardArr[i].students = [];
    for (let j = 0; j < mentorStudentsArr.length; j++) {
      if (dashboardArr[i].mentorName === mentorStudentsArr[j].interviewer) {
        dashboardArr[i].students.push(mentorStudentsArr[j]['student github']);
      }
    }
  }

  for (let i = 0; i < dashboardArr.length; i++) {
    dashboardArr[i].students = dashboardArr[i].students.map(function(elem) {
      const elemToObj = {
        studentName: elem,
        studentGit: 'https://github.com/' + elem,
        studentTasks: [],
      };
      return elemToObj;
    });
  }

  for (let i = 0; i < dashboardArr.length; i++) {
    for (let j = 0; j < dashboardArr[i].students.length; j++) {
      const name = new RegExp(dashboardArr[i].students[j].studentName);
      for (let k = 0; k < scoreArr.length; k++) {
        const str = scoreArr[k][
          'Ссылка на GitHub студента в формате: https://github.com/nickname'
        ].toLowerCase();
        let bool = name.test(str);
        if (bool === true) {
          dashboardArr[i].students[j].studentTasks.push(scoreArr[k]['Таск']);
        }
      }
    }
  }

  dashboardArr.unshift(studentsTasksArr);

  fs.writeFileSync('./dashboard.json', JSON.stringify(dashboardArr));
})();
