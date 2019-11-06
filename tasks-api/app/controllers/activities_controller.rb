class ActivitiesController < ApplicationController
    def update
        # binding.pry
        render json: Task.all, only: [:id, :name, :dueDate, :priority], include: {activities: {only: [:id, :name, :status]}}
      
    end
    def create
      p=Activity.create(name: params[:name], status: "new", task_id: params[:task_id])
      render json: Task.all, only: [:id, :name, :dueDate, :priority], include: {activities: {only: [:id, :name, :status]}}
      
    end
end
