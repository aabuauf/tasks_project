document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "http://localhost:3000"
    const TASKS_URL = `${BASE_URL}/tasks`
    const ACTIVITIES_URL = `${BASE_URL}/activities`
    const MAIN = document.getElementsByTagName('main')[0]

    fetchActivities()




    function fetchActivities() {
        return fetch(TASKS_URL)
            .then(resp => resp.json())
            .then(json => addToCard(json));
    }

    function addToCard(json) {
        MAIN.innerHTML = ""
        json.forEach(task => {
            let newTask = new Task(task.id, task.name, task.dueDate, task.priority, task.activities)
            // debugger
            // showCard(newTask)
            newTask.showCard()
        })
    }

    // function showCard(task) {
    //     MAIN.innerHTML += `    <div class="card" data-id="${task.id}">
    //     <p>${task.name}</p>
    //     <h4>Activities:</h4>
    //     <ul id="list${task.id}">

    //     </ul>
    //     <button class="fa fa-plus" data-task-id="${task.id}"></button>
    //   </div>`
    //     let list = document.querySelector(`#list${task.id}`)
    //     list.innerHTML = ""
    //     task.activities.forEach(activity => {
    //         if (activity.status === "done") {
    //             list.innerHTML += `<li  class="strick" data-activity-id="${activity.id}"><button class="fa fa-trash" data-activity-id-delete="${activity.id}"></button>   ${activity.name}</li>`
    //         } else {
    //             list.innerHTML += `<li data-activity-id="${activity.id}"><button class="fa fa-trash" data-activity-id-delete="${activity.id}"></button>   ${activity.name}</li>`
    //         }

    //     })
    // }

    MAIN.addEventListener("click", function (e) {
        // e.target is our targetted element.
        // try doing console.log(e.target.nodeName), it will result LI
        if (e.target && e.target.nodeName == "LI" && e.target.getAttribute("data-activity-id") != null) {
            //     addPokemon(e.target.getAttribute("data-trainer-id"))
            console.log(e.target.getAttribute("data-activity-id"))
            updateActivity(e.target.getAttribute("data-activity-id"))
        } else if (e.target && e.target.nodeName == "BUTTON" && e.target.getAttribute("data-task-id") != null) {
            openprompt(e.target.getAttribute("data-task-id"))
            console.log(e.target.getAttribute("data-task-id"))
            // addActivity(e.target.getAttribute("data-task-id"))

        } else if (e.target && e.target.nodeName == "BUTTON" && e.target.getAttribute("data-trainer-id") == null) {
            deleteActivity(e.target.getAttribute("data-activity-id-delete"))
            console.log(e.target.getAttribute("data-activity-id-delete"))
            // addActivity(e.target.getAttribute("data-task-id"))
        }
    });


    function addActivity(taskId, activityName) {
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "task_id": taskId,
                    "name": activityName
                }
            )
        };
        return fetch(ACTIVITIES_URL, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (object) {
                fetchActivities()
            })
            .catch(function (error) {
            });
    }

    function updateActivity(activityId) {
        let configObj = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "id": activityId,
                }
            )
        };
        return fetch(ACTIVITIES_URL + `/${activityId}`, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (object) {
                fetchActivities()
            })
            .catch(function (error) {
            });
    }

    function openprompt(taskID) {

        var activityName = prompt("Add new Activity", "New Activity");
        if (activityName != null) {
            addActivity(taskID, activityName)
        }
    }

    function deleteActivity(activityID) {
        let configObj = {
            method: "DELETE",
        };
        return fetch(ACTIVITIES_URL + `/${activityID}`, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (object) {
                fetchActivities()

            })
            .catch(function (error) {


            });
    }

    // document.querySelector("fa fa-trash").onmouseover = function () { mouseOver() };
    // document.querySelector("fa fa-trash").onmouseout = function () { mouseOut() };

    // function mouseOver() {
    //     document.querySelector("fa fa-trash").style.visibility = "visible"
    // }
    // function mouseOut() {
    //     document.querySelector("fa fa-trash").style.visibility = "hidden"
    // }
})