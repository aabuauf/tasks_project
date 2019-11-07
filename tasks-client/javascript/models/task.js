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

        MAIN.innerHTML += `    <div class="card" data-id="${this.id}">
        <p>${this.name}</p>
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
}