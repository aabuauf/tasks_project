class TasksController < ApplicationController
    def index
        render json: Task.all, only: [:id, :name, :dueDate, :priority], include: {activities: {only: [:id, :name, :status]}}
    end
end
