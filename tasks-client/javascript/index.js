document.addEventListener("DOMContentLoaded", () => {

    const MAIN = document.getElementsByTagName('main')[0]

    // let a = new Activity()
    Activity.fetchActivities()



    MAIN.addEventListener("click", function (e) {
        // e.target is our targetted element.
        // try doing console.log(e.target.nodeName), it will result LI
        if (e.target && e.target.nodeName == "LI" && e.target.getAttribute("data-activity-id") != null) {
            //     addPokemon(e.target.getAttribute("data-trainer-id"))
            console.log(e.target.getAttribute("data-activity-id"))
            Activity.updateActivity(e.target.getAttribute("data-activity-id"))
        } else if (e.target && e.target.nodeName == "BUTTON" && e.target.getAttribute("data-task-id") != null) {
            openprompt(e.target.getAttribute("data-task-id"))
            console.log(e.target.getAttribute("data-task-id"))
            // addActivity(e.target.getAttribute("data-task-id"))

        } else if (e.target && e.target.nodeName == "BUTTON" && e.target.getAttribute("data-trainer-id") == null) {
            Activity.deleteActivity(e.target.getAttribute("data-activity-id-delete"))
            console.log(e.target.getAttribute("data-activity-id-delete"))
            // addActivity(e.target.getAttribute("data-task-id"))
        }
    });



    function openprompt(taskID) {

        var activityName = prompt("Add new Activity", "New Activity");
        if (activityName != null) {
            Activity.addActivity(taskID, activityName)
        }
    }

    //Add Task button
    document.getElementById("add_task_button").addEventListener("click", function (e) {
        var taskName = prompt("Add new Task", "New Task");
        if (taskName != null) {
            var taskDueDate = prompt("Add Task Due Date", "12/01/2019");
            if (taskDueDate != null) {
                var taskpriority = prompt("Add Task Priority", "High");
                Task.addTask(taskName, taskDueDate, taskpriority)
            }
        }
    })


    // document.querySelector("fa fa-trash").onmouseover = function () { mouseOver() };
    // document.querySelector("fa fa-trash").onmouseout = function () { mouseOut() };

    // function mouseOver() {
    //     document.querySelector("fa fa-trash").style.visibility = "visible"
    // }
    // function mouseOut() {
    //     document.querySelector("fa fa-trash").style.visibility = "hidden"
    // }
})