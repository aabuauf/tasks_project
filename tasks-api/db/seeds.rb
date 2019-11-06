# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

task1 = Task.create(name: "Los Angeles Trip", dueDate: "11/15/2019", priority: "high")
activity1 = Activity.create(name: "Flight Tickets",status: "new", task_id:1)