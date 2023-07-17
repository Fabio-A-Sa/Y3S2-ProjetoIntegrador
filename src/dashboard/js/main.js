// ------------------- Initialization of content -------------------
const tableSet = document.querySelector('.table-set')
const tableSetCenter = document.querySelector('.table-set-center');
const bottomPart = document.querySelector('.bottom-part');
const tableSetLeft = bottomPart.querySelector('.table-set-left');
const tableSetRight = bottomPart.querySelector('.table-set-right');

const addTableBtn = document.querySelector('.add-table');
const removeTableBtn = document.querySelector('.remove-table');

const url = "http://localhost:5000";
let tableCount = 4;
// ------------------- Working Schedule -------------------
const openTime = 10;
const lunchOpenTime = 12;
const lunchCloseTime = 14.5;
const closeTime = 16.5;

// ------------------- modal form -------------------
const modal = document.getElementById('modal');
const form = document.getElementById("table-form");
const cancelBtn = document.getElementById('cancel-btn');


// ------------------- Displays the Modal for Adding a Table -------------------
if(addTableBtn){
    addTableBtn.addEventListener('click', () => {
        //if(tableCount < 6){
        //    modal.style.display = 'block';
        //}
        modal.style.display = 'block';

        // Get the add course button and courses container
        const addCourseBtn = document.getElementById("add-course-btn");
        const coursesContainer = document.getElementById("courses-container");

        // Get the location buttons
        const locationButtons = document.querySelectorAll(".location-btn");


        // Add event listener for add course button
        addCourseBtn.addEventListener("click", function(event) {
            event.preventDefault();
          
            // Get the last course input
            const lastCourse = coursesContainer.lastElementChild;
            if(lastCourse) {
                const lastCourseName = lastCourse.querySelector(".course-name").value;
                if (!lastCourseName) {
                  // If the last course input is empty, do nothing
                  return;
                }
            }
        
            // Create a new course input and add it to the container
            const newCourse = document.createElement("div");
            newCourse.classList.add("course");
            newCourse.innerHTML = `
              <label for="course-name">Course Name:</label>
              <input type="text" class="course-name" name="course-name">
              <button type="button" class="remove-course-btn">-</button>
            `;
            coursesContainer.appendChild(newCourse);
        });
        

        // Add event listener for remove course button
        coursesContainer.addEventListener("click", function(event) {
          if (event.target.classList.contains("remove-course-btn")) {
            event.preventDefault();
            // Remove the corresponding course input
            event.target.parentNode.remove();
          }
        });

        // Add event listener for location buttons
        locationButtons.forEach((button) => {
            button.addEventListener("click", function () {
                // Remove 'selected' class from all location buttons
                locationButtons.forEach((btn) => {
                    btn.classList.remove("selected");
                });

                // Add 'selected' class to the clicked location button
                button.classList.add("selected");
            });
        });
    });
}

if(cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}


// ------------------- Adding a table -------------------
form.addEventListener("submit", function(event) {
    event.preventDefault();
    addTable();
  
});
  
// ------------------- Removing a table -------------------
if (removeTableBtn) {
removeTableBtn.addEventListener('click', function() {
    removeTable();
});
}

// ------------------- Timer -------------------
const timer = document.createElement('div');
timer.classList.add('timer');

function updateTime() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    timer.textContent = timeString;
    document.body.appendChild(timer);

    if(minutes >= 30)
        hours += 0.5;
    getTable(hours);
}

// ------------------- Updates the Content Every second -------------------
updateTime(); // update immediately
setInterval(updateTime, 1000); // update every second


// ------------------- Server Part -------------------

// POST - create a new table
function addTable() {
    // getting the courses from modal and hide the modal
    const courseElems = document.querySelectorAll(".course");
    const courseNames = [];
    
    courseElems.forEach(function(courseElem) {
      const courseNameElem = courseElem.querySelector(".course-name");
      const courseName = courseNameElem.value;
      courseNames.push(courseName);
    });

    const attendant = document.querySelector(".attendant-name");
    const attendantName = attendant.value;
    console.log(attendantName, " + ", attendant);

    const macAddress = document.querySelector(".mac-address-input");
    const mac = macAddress.value;
    console.log(mac);

    // Getting the selected location button
    const selectedLocationButton = document.querySelector(".location-btn.selected");
    const location = selectedLocationButton.getAttribute("data-location");
    console.log(location);

    if(tableCount == 0){
        removeTableBtn.style.display = 'block';
    }
    tableCount++;
    modal.style.display = 'none';

    // json to send to server
    const jsonToSend = {
        courses: courseNames,
        attendant: attendantName,
        mac: mac,
        location: location
    }

    fetch(url + '/table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonToSend)
    })
    .then(response => response.json())
    .then(json => {
        if ('error' in json) {
          console.log('Error adding the table', error);
        } else {
          console.log('Successfully added table!');
        }
    })
    .catch(error => console.log(error));
}

// POST - removes a table
function removeTable() {
    tableCount--;
    
    if(tableCount == 0){
        removeTableBtn.style.display = 'none';
    }

    fetch(url + '/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ""
    })
    .then(response => response.json())
    .then(json => {
        if ('error' in json) {
          console.log('Error adding the table', error);
        } else {
          console.log('Successfully added table!');
        }
    })
    .catch(error => console.log(error));
}

// GET - all Tables
function getTable(hours) {
    fetch(url + '/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        construct_Table_set(data, hours)
    })
    .catch(error => {
        console.error(error);
    });  
}

// Contruct all the table set
function construct_Table_set(data, hours) {
    const temp = tableCount;

    for(let i = 0; i < temp; i++){
        let lastChild = tableSetCenter.lastElementChild;
        if(lastChild && lastChild.id !== 'modal') {
          lastChild.remove();
          tableCount--;
        }
        else {
            lastChild = tableSetLeft.lastElementChild;
            if(lastChild) {
                lastChild.remove();
                tableCount--;
            }
            else {
                lastChild = tableSetRight.lastElementChild;
                if(lastChild) {
                    lastChild.remove();
                    tableCount--;
                }
                else
                    tableCount = 0;
            }
        }
    }
      
    data.forEach(ele => {
        const coursesValue = document.createElement('div');
        coursesValue.textContent = "|";

        ele.courses.forEach(course => {
            coursesValue.textContent += " " + course + " |";
        });

        coursesValue.classList.add('courses-container');

        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');
        const chair = document.createElement('div');
        chair.classList.add('chair');
        const table = document.createElement('div');
        table.classList.add('table');
        const statusContainer = document.createElement('div');
        statusContainer.classList.add('status-container');

        if(hours < openTime || (hours > lunchOpenTime && hours < lunchCloseTime) || hours > closeTime)
          ele.state = 3;

        switch (ele.state) {
            case 0:
                table.classList.add('Disponivel');
                chair.classList.add('Disponivel');
                statusContainer.textContent = "State: Available\n";
                break;
            case 1:
                table.classList.add('Indisponivel');
                chair.classList.add('Indisponivel');
                statusContainer.textContent = "State: Unavailable\n";
                break;
            case 2:
                table.classList.add('Ausente');
                chair.classList.add('Ausente');
                statusContainer.textContent = "State: Away\n";
                break;
            case 3:
                table.classList.add('Closed');
                chair.classList.add('Closed');
                statusContainer.textContent = "State: Closed\n";
                break;
            default:
                table.classList.add('Default');
                chair.classList.add('Default');
                statusContainer.textContent = "State: Default\n";
                break;
        }

        statusContainer.textContent += "Attendant: " + ele.attendant;
        tableContainer.appendChild(coursesValue);
        tableContainer.appendChild(chair);
        tableContainer.appendChild(table);
        tableContainer.appendChild(statusContainer);
        
        switch(ele.location) {
            case "left":   
                tableSetLeft.appendChild(tableContainer);
                break;
            case "right":
                tableSetRight.appendChild(tableContainer);
                break; 
            default:
                tableSetCenter.appendChild(tableContainer);
                break;    
        }
        
        tableCount++;
    });
  
}

