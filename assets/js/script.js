$(document).ready(initializeApp);

var student_array = [];
var input = $("input[type=text]");
var selectedStudentID = null;
var confirmDelete = false;
var ave = null;

function initializeApp() {
      addClickHandlersToElements();
}

function addClickHandlersToElements() {
      $('#add').on("click", handleAddClicked);
      $('#cancel').on('click', handleCancelClick);
      $('#getServerData').on('click', getDB);
      $('#saveChange').on('click', updateDBStudentInfor);
}

function handleAddClicked() {
      addStudent();
}

function handleCancelClick() {
      console.log('cancel');
      $('tr').val();
      clearAddStudentFormInputs();
}

function addStudent() {
      var stuname = $('#studentName').val();
      var course = $('#course').val();
      var gradeStr = $('#studentGrade').val();
      var grade = parseFloat(gradeStr);
      grade = grade.toFixed(0);
      var stuID = myid;

      if (stuname.trim() == '') {
            $('input#studentName').addClass('invalid');
      }
      if (grade > 100 || grade < 0) {
            $('input#studentGrade').addClass('invalid');
      }
      if ($.isNumeric(grade) && course.trim() !== '' && stuname.trim() !== '' && (grade <= 100 && grade >= 0)) {
            var inputObj = {
                  name: stuname,
                  grade: grade,
                  course_name: course,
                  student_id: myid,
                  action: 'insert'
            };

            $.ajax({
                  url: 'data.php',
                  method: 'POST',
                  dataType: "json",
                  data: inputObj,

                  success: function (response) {
                        debugger;
                        console.log('response: ', response);

                        if (response.success) {
                              stuID = response.new_id;
                              console.log('response.new_id ', response.new_id);
                        }
                  }
            });

            var inputObj = {
                  id: stuID,
                  name: stuname,
                  grade: grade,
                  course_name: course

            };

            student_array.push(inputObj);
            clearEmptyTableWarning();
            clearAddStudentFormInputs();
            updateStudentList(inputObj);
            hiddenAverageResult();
      } 
   
}

function hiddenAverageResult(){
      $('.avgGrade').text('');
      // <i class="fa fa-spinner fa-spin" style="font-size:14px"></i>
      var i = $('<i>', {
            class: 'fa fa-spinner fa-spin'
      });
      $('.avgGrade').append(i);
}
function clearEmptyTableWarning() {
      $('.emptywarning').remove();
}
function clearAddStudentFormInputs() {
      $('#studentName').val("");
      $('#course').val("");
      $('#studentGrade').val("");
      $('input').removeClass("invalid");
}

function renderStudentOnDom(inputObj) {
      var stuID = inputObj.id;
      var tr = $('<tr>');

      var tdName = $('<td>', {
            text: inputObj.name
      });
      var tdCourse = $('<td>', {

            text: inputObj.course_name
      });
      var tdGrade = $('<td>', {
            text: inputObj.grade
      });
      var tdButton = $('<td>', {
            class: 'tdbutton td-Delbutton'
      });
      var delButton = $('<button>', {
            class: 'btn btn-danger trigger-btn',

            "data-toggle": "modal",
            on: {
                  click: function (event) {
                        event.stopPropagation();
                        var row = student_array.indexOf(inputObj);
                        console.log('del student id is ', stuID);
                        $(this).parent().parent().addClass("strikeout");

                        handleDelete(row, stuID);

                  }
            }
      });


      var delspan = $('<span>');
      var deli = $('<i>', {
            class: 'fas fa-trash'
      });
      delspan.append(deli);
      delButton.append(delspan);
      tdButton.append(delButton);


      var tdEdit = $('<td>', {
            class: 'tdbutton td-editbutton'
      });
      var editButton = $('<button>', {
            class: 'btn btn-primary',
            "data-toggle": "modal",
            "data-target": "#myModalHorizontal",
            on: {
                  click: function (e) {
                        e.stopPropagation();
                        console.log('this is ', $(this));
                        $('#myModalHorizontal').modal({
                              show: true
                        });

                        //show stu info on form modal
                        console.log(inputObj);
                        // console.log(inputObj.name);
                        // console.log(inputObj.grade);
                        // console.log(inputObj.course_name);
                        selectedStudentID = parseInt(inputObj.id);
                        console.log('selected stduent id ', selectedStudentID);
                        $('#updateName').val(inputObj.name);
                        $('#updateCourse').val(inputObj.course_name);
                        $('#updateGrade').val(inputObj.grade);
                  }
            }
      });
      var editspan = $('<span>');
      var editi = $('<i>', {
            class: 'fas fa-pencil-alt'
      });
      editspan.append(editi);
      editButton.append(editspan);
      tdEdit.append(editButton);

      tr.append(tdName);
      tr.append(tdCourse);
      tr.append(tdGrade);
      tr.append(tdEdit);
      tr.append(tdButton);
      $('.student-list tbody').append(tr);
}

function updateStudentList(inputObj) {
      renderStudentOnDom(inputObj);
      calculateGradeAverage();
      renderGradeAverage(ave);
}

function calculateGradeAverage() {
      var sendData = {
            student_id: myid,
            action: 'getAverageGrade'
      }

      $.ajax({
            url: 'data.php',
            data: sendData,
            method: 'post',
            dataType: 'json',

            success: function (response) {
                  console.log(response); //{success: true, errors: Array(0), average: {…}}
                  if (response.success) {
                        ave = response.average.average;
                        ave = parseFloat(ave).toFixed(1);
                        console.log('calculate function average is ', ave);
                        renderGradeAverage(ave);

                  } else {
                        console.log('no data response');
                  }
            },
            error: function (response) {
                  console.log('server not response.');
            }
      });

}

function renderGradeAverage(ave) {
      if(ave == null) {
            hiddenAverageResult();
      } else {
          $('.avgGrade').text(ave);  
      }
      
}

function removeStudent(index, studentID) {
      student_array.splice(index, 1);
      console.log('after remove index now array ', student_array);
      console.log('remove function id is ', studentID);

      $.ajax({
            url: 'data.php',
            dataType: 'JSON',
            data: {
                  id: studentID,
                  action: 'delete'
            },
            method: 'POST',
            success: function (response) {
                  console.log('removeStudent response is ', response);
                  hiddenAverageResult();
            }

      });

}

//****************************************************************************************
function getDB() {
      $("tbody").empty();

      console.log('in getdb user_role is ', user_role);
      console.log('in getDB myemail is ', myemail);

      if (user_role == 'admin') {
            //console.log('admin in getdb');
            $.ajax({
                  dataType: 'json',
                  data: {
                        action: 'readAll'
                  },
                  url: 'data.php',
                  method: 'POST',
                  success: function (studentRecord) {
                        //studentRecord.data = [{id: 1, name: xx, grade: 80, course: 'xx', }, {..}, {..}, {..}.....]
                        // console.log('response is ', studentRecord);
                        // console.log( 'data is ',studentRecord.data);
                        // console.log('server is running');

                        for (var i = 0; i < studentRecord.data.length; i++) {
                              renderStudentOnDom(studentRecord.data[i]);
                        }
                  },

                  error: function () {
                        $('tbody').html('<p>An error has occurred</p>');
                        console.log('error');
                  },
            });
      } else if (user_role == 'student') {
            console.log('getdb script.js email is ', myemail);
            var getdata = {
                  email: myemail,
                  action: 'readMydata'
            };

            $.ajax({
                  data: getdata,
                  url: 'data.php',
                  method: 'post',
                  dataType: 'json',
                  success: function (response) {
                        if (response.success) {
                              console.log('login users data: ', response);
                              for (var i = 0; i < response.data.length; i++) {
                                    renderStudentOnDom(response.data[i]);
                              }
                              calculateGradeAverage();
                              renderGradeAverage(ave);
                        } else {
                              emptyDBmodal();
                        }

                  },
                  error: function () {
                        $('tbody').html('<p>An error has occurred</p>');
                        console.log('error');
                  }
            });
      }

}

//connect script.js to data.php
//inside different ajax call=>
//change url to data.php
//change thd data to action: different action value
//change function renderStudentOnDom(inputObj) {
//inputObj.id/ inputObj.name  inputObj.xxxx xxxx should match mysql DB column key  
function updateDBStudentInfor() {
      // hiddenAverageResult();
     
      if (myid == null) {
            needLoginModal();
            return;
      }
      var studentObj = {
            name: $("#updateName").val(),
            course_name: $("#updateCourse").val(),
            grade: parseInt($("#updateGrade").val()),

      }
      console.log('update sutdent name', studentObj.name);
      var sendData = {
            name: studentObj.name,
            course_name: studentObj.course_name,
            grade: studentObj.grade,
            id: selectedStudentID,
            action: "update"
      }
      $.ajax({
            data: sendData,
            url: 'data.php',
            method: "POST",
            dataType: "json",

            success: function (response) {
                  console.log('update response is ', response);
                  getDB();
                  hiddenAverageResult();
                 
            }
      });
}

function needLoginModal() {
      $('#needLoginModal').modal('show');
}

function emptyDBmodal() {
      $('#dbEmptyModal').modal('show');
}

function handleDelete(row, stuID) {
      showDeleteModal();
      $('#del-modalconfirm').on('click', function () {
            $('#deleteModal').modal('hide');
       
            console.log($(this));
            removeStudent(row, stuID);

            $('tr.strikeout').fadeOut(500, function () {
                  $(this).remove();
            });
      });

      $('#del-modalcancel').on('click', function () {
            console.log(this);
            $('tr.strikeout').removeClass("strikeout");
      });

}

function showDeleteModal() {
      $('#deleteModal').modal('show');
}