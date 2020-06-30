// 1. You should create a function constructor ‘Student’ which you can call with two arguments name and email.
// Name, email and homeworkResults fields should be hidden from user. 
// Instance of Student should provide the following methods to get or change it’s state:
// getName(): returns student’s name.
// getEmail(): returns student’s email.
// addHomeworkResult(topic, success): you can call this method with 2 arguments: 
// topic(string) and success(boolean). This method should add new element to student’s homeworkResults property.

// 2. You should create a function constructor ‘FrontendLab’ which you can call with two arguments students and failedLimit.
// Instance of FrontendLab should have 2 property fields: failedHomeworksLimit and studentsList. 
// This fields should be hidden from user.
// Instance of FrontendLab should provide the following methods to get or change it’s state.
// printStudentsList(): this method logs to console list of students with their homeworks results.
// addHomeworkResults(homeworkResults): this method can be called with argument homeworkResult, 
// object with 2 fields: topic(string) and results(array of objects with 2 fields: email(string) and success(boolean)). 
// This method should update all student objects in FrontendLab studentsList.
// printStudentsEligibleForTest(): this method should log to console list of students who didn’t fail more homework, 
// than allowed failedLimit. 

function Student(name, email) {
  let _name = name;
  let _email = email;
  let _homeworkResults = [];

  this.getName = function () {
    return _name;
  }

  this.getEmail = function () {
    return _email;
  }

  this.addHomeworkResult = function (topic, success) {
    let _homeworkResult = {};

    if (typeof topic === 'string') {
      _homeworkResult.topic = topic;
    }
    if (typeof success === 'boolean') {
      _homeworkResult.success = success;
    }

    _homeworkResults.push(_homeworkResult);
  }

  this.getHomeworkResults = function () {
    return _homeworkResults;
  }
}

function FrontendLab(students, failedLimit) {
  let _failedHomeworksLimit = failedLimit;
  let _studentsList = [];

  let _addToStudentList = function () {
    for (let st of students) {
      let student = new Student(st.name, st.email);

      _studentsList.push(student);
    }
  }

  _addToStudentList();

  this.printStudentsList = function () {
    for (let s of _studentsList) {
      console.log(`name: ${s.getName()}, email: ${s.getEmail()}`);
      console.log(s.getHomeworkResults());
    }
  }

  this.addHomeworkResults = function (homeworkResult) {
    let _results = homeworkResult.results;
    let _topic = homeworkResult.topic;

    for (let st of _studentsList) {
      for (let res of _results) {
        if (st.getEmail() === res.email) {
          st.addHomeworkResult(_topic, res.success);
        }
      }
    }
  }

  this.printStudentsEligibleForTest = function () {
    for (let s of _studentsList) {
      let _count = 0;

      for (let r of s.getHomeworkResults()) {
        if (r.success === false) {
          _count++;
        }
      }

      if (_count <= _failedHomeworksLimit) {
        console.log(`name: ${s.getName()}, email: ${s.getEmail()}`);
      }
    }
  }
}