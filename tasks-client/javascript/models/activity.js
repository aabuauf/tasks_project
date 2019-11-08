class Activity {
    static all = []
    static BASE_URL = "http://localhost:3000"
    static TASKS_URL = `${this.BASE_URL}/tasks`
    static ACTIVITIES_URL = `${this.BASE_URL}/activities`
    static MAIN = document.getElementsByTagName('main')[0]
    constructor(id, name, status, task_id) {
        this.id = id
        this.name = name;
        this.status = status
        this.task_id = task_id

        Activity.all.push(this)
    }
    static fetchActivities() {

        return fetch(this.TASKS_URL)
            .then(resp => resp.json())
            .then(json => Activity.addToCard(json));
    }

    static addToCard(json) {
        this.MAIN.innerHTML = ""
        json.forEach(task => {
            let newTask = new Task(task.id, task.name, task.dueDate, task.priority, task.activities)
            // debugger
            // showCard(newTask)
            newTask.showCard()
        })
    }
    static addActivity(taskID, activityName) {
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "task_id": taskID,
                    "name": activityName
                }
            )
        };
        return fetch(this.ACTIVITIES_URL, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (object) {
                Activity.fetchActivities()
            })
            .catch(function (error) {
            });
    }

    static updateActivity(activityId) {
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
        return fetch(this.ACTIVITIES_URL + `/${activityId}`, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (object) {
                Activity.fetchActivities()
            })
            .catch(function (error) {
            });
    }

    static deleteActivity(activityID) {
        let configObj = {
            method: "DELETE",
        };
        return fetch(this.ACTIVITIES_URL + `/${activityID}`, configObj)
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