/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * input - global variable to get the input lement of DOM 
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];
var input = $("input[type=text]");

/***************************************************************************************************
 * initializeApp 
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp() {
      addClickHandlersToElements();
      getDB()
}

/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined} 
 * @returns  {undefined}
 *     
 */
function addClickHandlersToElements() {
      $('#add').on("click", handleAddClicked);
      $('#cancel').on('click', handleCancelClick);
      $('#getServerData').on('click',getDB);
      $('#saveChange').on('click', updateDBStudentInfor);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked() {
      addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick() {
      console.log('cancel');
      $('tr').val();
      clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent() {
      //get info from input
      var stuname = $('#studentName').val();
      var course = $('#course').val();
      var gradeStr = $('#studentGrade').val();
      var grade = parseFloat(gradeStr);
      var stuID;
      if($.isNumeric(grade) && course.trim() !== '' && stuname.trim()!=='') {
            var inputObj = {
                  name: stuname,
                  grade: grade,
                  course_name: course,
                  action: 'insert'
            };

            $.ajax({
                  url: 'data.php',
                  method: 'GET',
                  dataType: "json",
                  data: inputObj,
            
                  success: function(response) {
                        debugger;
                        console.log('response: ', response);
                       
                        if(response.success) {
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
            console.log('array now is ', student_array);
            //clear input
            clearAddStudentFormInputs();
      
            //add to update array
            updateStudentList(inputObj);
      }
      else {
            alert('not valid input');
            clearAddStudentFormInputs();
      }
      //console.log('studen name',stuname);
      
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs() {
      //why input.val(''); not work???
      $('#studentName').val("");
      $('#course').val("");
      $('#studentGrade').val("");
}

/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(inputObj) {
      console.log('inside dom response', inputObj);
      //console.log('inside render dom obj.id is', inputObj.id);
      var stuID = inputObj.id;
      var tr = $('<tr>');

      var tdName = $('<td>', {
            text: inputObj.name
      });
      var tdCourse = $('<td>', {
            //change name to match DB column KEY
            //text: inputObj.name
            text: inputObj.course_name
      });
      var tdGrade = $('<td>', {
            text: inputObj.grade
      });
      var tdButton = $('<td>', {
            class: 'tdbutton td-Delbutton'
      });
      var delButton = $('<button>', {
            // text: 'Delete',
            class: 'btn btn-danger',
            on: {
                  click: function(event) {
                        event.stopPropagation();
                        // console.log('this is ', $(this));// this is button clicked
                        // console.log('this.parent() is', $(this).parent());
                        var row = student_array.indexOf(inputObj);  //get the index of passed in object in array  
                        console.log('row of this obj is ',row);
                        console.log('deleted row is ', row);
                        console.log('del student id is ', stuID);
                        removeStudent(row, stuID);
                        $(this).parent().parent().remove();
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
            "data-toggle":  "modal",
            "data-target": "#myModalHorizontal",
            on: {
                  click: function(e) {
                        e.stopPropagation();
                        console.log('this is ', $(this));
                        $('#myModalHorizontal').modal({show: true});

                        //show stu info on form modal
                        // console.log(inputObj);
                        // console.log(inputObj.name);
                        // console.log(inputObj.grade);
                        // console.log(inputObj.course_name);
                        $('#updateName').val(inputObj.name);
                        $('#updateCourse').val(inputObj.course_name);
                        $('#updateGrade').val(inputObj.grade);
                  }
            }
      });
      var editspan = $('<span>');
      var editi = $('<i>',  {
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

// class: 'fas fa-edit'
// class: 'fas fa-pencil-alt'
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(inputObj) {
      renderStudentOnDom(inputObj);
      var ave = calculateGradeAverage();
      renderGradeAverage(ave);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage() {
      var total = 0;
      var count = student_array.length;
      var ave;
      // debugger;
      for (var i = 0; i < student_array.length; i++) {
            total += parseFloat(student_array[i].grade);
      }

      ave = (total / count).toFixed(2);
      console.log('ave is ', ave);
      return ave;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(ave) {
      $('.avgGrade').text(ave);
}


/***************************************************************************************************
 * removeStudent - remove obj from student array after click delete button on DOM
 * @param: {number} array index    the index of student_array 
 * @returns {undefined} none
 */
function removeStudent(index, studentID) {
      student_array.splice(index, 1); //index in array will automatically update 
      console.log('after remove index now array ', student_array);
      console.log('remove function id is ', studentID);

      $.ajax({
            url: 'data.php',
            dataType: 'JSON',
            data: {
                  id: studentID,
                  action: 'delete'
            },
            method: 'GET',
            success: function(response) {
                  console.log('response is ', response);
            }

      });

}

//****************************************************************************************
function getDB() {
      $("tbody").empty();
      var apiUrl = 'data.php';
      
      $.ajax({
            dataType: 'json',
            data: {
                  action: 'readAll'
            },
            url: 'data.php',
            method: 'GET',
            success: function(studentRecord) {
                  //studentRecord.data = [{id: 1, name: xx, grade: 80, course: 'xx', }, {..}, {..}, {..}.....]
                  console.log('response is ', studentRecord);
                  console.log( 'data is ',studentRecord.data);
                  console.log('server is running');

                  for(var i=0; i<studentRecord.data.length; i++) {
                        renderStudentOnDom(studentRecord.data[i]);                                  
                  }
            },

            error: function() {
                  $('tbody').html('<p>An error has occurred</p>');
                  console.log('error');
               },
            
      });
}
 
//connect script.js to data.php
//inside different ajax call=>
   //change url to data.php
   //change thd data to action: different action value
//change function renderStudentOnDom(inputObj) {
   //inputObj.id/ inputObj.name  inputObj.xxxx xxxx should match mysql DB column key  
function updateDBStudentInfor() {
      alert('hi');
}