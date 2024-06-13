"use strict"

window.onload = () => {
    // make sure we are working
    console.log("hello form inside the index.js file");

    populateTable();
}

async function populateTable() {

    // get the courses from the API
    let courses = await getCourses();

    // get a hold of the table body where the data is going to go
    let tbody = document.querySelector("#courseTableBody");

    // loop over all the courses and work with a single course
    courses.forEach((course) => {
        // call a function to build the row
        // pass it where the row goes (tbody)
        // pass it what goes in the row (data/course)
        buildRow(tbody, course);
    });
}

function buildRow(someTableBody, someData) {

    // create the row for the table
    let row = someTableBody.insertRow();

    // create the cell for the department
    let departmentCell = row.insertCell();
    // put the releveant course data in the 
    departmentCell.innerHTML = someData.dept;

    // create the cell for the course number
    let courseNumberCell = row.insertCell();
    // put the releveant course data in the 
    courseNumberCell.innerHTML = someData.courseNum;

    // create the cell for the course name
    let courseNameCell = row.insertCell();
    // put the releveant course data in the 
    courseNameCell.innerHTML = someData.courseName;

    // create the cell for the course details
    let courseDetailsCell = row.insertCell();
    // put the releveant course data in the 
    courseDetailsCell.innerHTML = `<a href="./details.html?courseId=${someData.id}">Show Details</a>`;

    // create the cell for the admin stuff
    let adminStuffCell = row.insertCell();
    // put the releveant course data in the 
    adminStuffCell.innerHTML = `
    <a href="./edit_course.html?courseId=${someData.id}">Edit Course</a> &nbsp; &nbsp;
    <a href="./delete_course.html?courseId=${someData.id}">Delete Course</a>
    `;
}

async function getCourses() {

    // the try says try these things and if it doesn't work out, fall into the catch
    // and deal with the error
    try {
        // make API call to get all the courses
        let response = await fetch("http://localhost:8081/api/courses", {});
        let courses = await response.json();

        return courses;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}