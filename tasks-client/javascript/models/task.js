class Task {
    constructor(id, name, dueDate, priority, activities) {
        this.id = id
        this.name = name;
        this.dueDate = dueDate
        this.priority = priority
        this.activities = activities
    }

    showCard() {
        const MAIN = document.getElementsByTagName('main')[0]

        MAIN.innerHTML += `    <div class="card card-block card-outline-primary" data-id="${this.id}">
        <button class="delete_button btn btn-outline-primary" delete-task-id="${this.id}">DELETE</button>
        <p>${this.name} (${this.priority})   ${this.dueDate} </p>
        <h4>Activities:</h4>
        <ul id="list${this.id}">

        </ul>
        <button class="fa fa-plus" data-task-id="${this.id}"></button>
      </div>`
        let list = document.querySelector(`#list${this.id}`)
        list.innerHTML = ""
        this.activities.forEach(activity => {
            let newActivity = new Activity(activity.id, activity.name, activity.status, activity.task_id)
            if (newActivity.status === "done") {
                list.innerHTML += `<li  class="strick" data-activity-id="${newActivity.id}"><button class="fa fa-trash" data-activity-id-delete="${newActivity.id}"></button>   ${newActivity.name}</li>`
            } else {
                list.innerHTML += `<li data-activity-id="${newActivity.id}"><button class="fa fa-trash" data-activity-id-delete="${newActivity.id}"></button>   ${newActivity.name}</li>`
            }

        })
    }

    static addTask(taskName, taskDueDate, taskpriority) {
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "name": taskName,
                    "dueDate": taskDueDate,
                    "priority": taskpriority
                }
            )
        };
        return fetch(Constants.TASKS_URL, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (object) {
                Activity.fetchActivities()
            })
            .catch(function (error) {
            });
    }


    static deleteTask(taskID) {

        let configObj = {
            method: "DELETE",
        };
        return fetch(Constants.TASKS_URL + `/${taskID}`, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (object) {
                Activity.fetchActivities()

            })
            .catch(function (error) {


            });
    }
}