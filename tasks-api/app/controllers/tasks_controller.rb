class TasksController < ApplicationController
    def index
        render json: Task.all, only: [:id, :name, :dueDate, :priority], include: {activities: {only: [:id, :name, :status]}}
    end

    def create
        p=Task.create(name: params[:name], dueDate: params[:dueDate], priority: params[:priority])
        render json: Task.all, only: [:id, :name, :dueDate, :priority], include: {activities: {only: [:id, :name, :status]}}
        
      end

      def destroy
       
        p = Task.find(params[:id])
        p.activities.each do|activity|
           
            activity.destroy
        end
      
        p.destroy
        render json: Task.all, only: [:id, :name, :dueDate, :priority], include: {activities: {only: [:id, :name, :status]}}
    end
end
