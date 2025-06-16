const Task = require("../models/Task");
const User = require("../models/User")
//@desc GET all Tasks (Admin:all,User:only assigned tasks)
//@route GET /api/tasks/
//@access Private
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if (status) {
            filter.status = status;
        }
        let tasks;
        if (req.user.role === 'admin') {
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }
        //Add completed todoChecklist count to each task
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.completed).length;
                return { ...task._doc, completedTodoCount: completedCount };
            }));
        //Status Summary counts
        const allTasks = await Task.countDocuments(
        req.user.role === "admin" ? {} :{assignedTo:req.user._id}
        )
        const pendingTasks = await Task.countDocuments({
            ...filter,
            status:"Pending",
            ...(req.user.role !=="admin" && {assignedTo:req.user._id})
        })
        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: 'In Progress',
            ...(req.user.role !=="admin" && {assignedTo:req.user._id})
        })
        const completedTasks = await Task.countDocuments({
            ...filter,
            status: 'Completed',
            ...(req.user.role !=="admin" && {assignedTo:req.user._id})
        })
        res.json({
            tasks,
            statusSummary:{
                all:allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
//@desc GET Task By Id
//@route GET /api/tasks/:id
//@access Private
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate(
        "assignedTo",
        "name email profileImageUrl")
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

//@desc Create a new task (Admin only)
//@route POST /api/tasks/
//@access Private
const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, assignedTo, attachments, todoChecklist } = req.body
        if (!Array.isArray(assignedTo)) {
            return res
                .status(400).json({ message: "assignedTo must be an array of user IDs" })
        }
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            attachments,
            todoChecklist
        });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


//@desc Update task detail
//@route PUT /api/tasks/:id
//@access Private
const updateTask = async (req, res) => {
    try {
        // Find task by ID
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task fields
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        // Validate and update `assignedTo` field
        if (req.body.assignedTo) {
            if (!Array.isArray(req.body.assignedTo)) {
                return res
                    .status(400)
                    .json({ message: 'assignedTo must be an array of user IDs' });
            }

            // Optionally validate assignedTo user IDs here
            // Example: Validate that all IDs exist in the User model
            const assignedUsers = await User.find({
                _id: { $in: req.body.assignedTo },
            });
            if (assignedUsers.length !== req.body.assignedTo.length) {
                return res.status(400).json({ message: 'One or more user IDs are invalid' });
            }

            task.assignedTo = req.body.assignedTo;
        }

        // Save changes to the database
        const updatedTask = await task.save();

        // Send the updated task back to the client
        return res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

 
//@desc Delete Task status
//@route DELETE /api/tasks/:id
//@access Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        await task.deleteOne();
        res.json({message:"Task  deleted successfully"})
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//@desc Update task status
//@route PUT /api/tasks/:id/todo
//@access Private
const updateTaskCheklist = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//@desc Dashboard Data (Admin only)
//@route GET /api/dashboard-data
//@access Private
const getDashboardData = async (req, res) => {
    try {
        //Fetch statistic
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({status:"Pending"});
        const completedTasks = await Task.countDocuments({status:"Completed"});
        const overdueTasks = await Task.countDocuments({
            status: {$ne:"Completed"},
            dueDate: {$lt: new Date()}
        })

        //Ensure all possible statuses are included
        const taskStatus = ["Pending","In Progress","Completed"];
        const taskDistributionRaw = await Task.aggregate([
            {
                $group:{
                    _id:"$status",
                    count:{$sum:1}
                },
            },
        ]);

        const taskDistribution = taskStatus.reduce((acc,status)=>{
            const  formattedKey = status.replace(/\s+/g,""); //Remove spaces for response key;
            acc[formattedKey]= taskDistributionRaw.find((item)=> item._id === status)?.count || 0;
            return acc;
        },{})
        taskDistribution["All"] = totalTasks; //Add total count to  taskDistribution

        //Ensure all priority levels are included
        const taskPriorities = ["Low","Medium","High"];
        const taskPriorityLevelsRaw = await Task.aggregate([{
            $group:{
                _id:"$priority",
                count:{$sum:1}
            },
        },])
        const taskPriorityLevels = taskPriorities.reduce((acc,priority)=>{
            acc[priority] = 
            taskPriorityLevelsRaw.find((item)=> item._id === priority)?.count ||0;
            return acc;
        },{})
        //Fetch Recent 10 tasks
        const recentTasks = await Task.find().
        sort({createdAt:-1})
        .limit(10)
        .select("title status priority dueDate createdAt")

        res.status(200).json({
            statistics:{
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks
            },
            charts:{
                taskDistribution,
                taskPriorityLevels
            },
            recentTasks
        })
    }catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//@desc Dashboard Data (User-specific)
//@route GET /api/tasks/user-dashboard-data
//@access Private
const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user._id; //only fetch data for logged-in user
        //Fetch statistic for user-specific tasks
        console.log(userId)
        const totalTasks = await Task.countDocuments({assignedTo:userId});
        const pendingTasks = await Task.countDocuments({assignedTo:userId,status:"Pending"});
        const completedTasks = await Task.countDocuments({assignedTo:userId,status:"Completed"});
        const overdueTasks = await Task.countDocuments({
            assignedTo:userId,
            status:{$ne:"Completed"},
            dueDate:{$lt:new Date()}
        })

        //Task distribution by status
        const taskStatus = ["Pending","In Progress","Completed"];
        const taskDistributionRaw = await Task.aggregate([
            { $match: { assignedTo: userId }  },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const  taskDistribution = taskStatus.reduce((acc,status)=>{
            const formattedKey = status.replace(/\s+/g,"");
            acc[formattedKey] = taskDistributionRaw.find((item)=>item._id === status)?.count || 0;
            return acc;
        },{});
        taskDistribution['All'] = totalTasks;
        
        //Task distribution by priority
        const taskPriorities = ["Low","Medium","High"];
        const taskPriorityLevelsRaw = await Task.aggregate([
            { $match: { assignedTo: userId }  },
            {$group:{_id:"$priority",count:{$sum:1}}}
        ])
        const taskPriorityLevels = taskPriorities.reduce((acc,priority)=>{
            acc[priority] = taskPriorityLevelsRaw.find((item)=> item._id === priority)?.count || 0
            return acc
        },{})
        //Fetch recent 10 tasks for the logged-in user
        const recentTasks = await Task.find({assignedTo:userId})
        .sort({createdAt: -1})
        .limit(10)
        .populate('title status priority dueDate createdAt')
        res.status(200).json({
            statistics:{
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts:{
                taskDistribution,
                taskPriorityLevels,
            },
            recentTasks,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//@desc Upadate task status
//@roue PUT /api/tasks/:id/status
//@access Private
const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found'})
        const isAssigned = task.assignedTo.some(
         (userId)=>userId.toString()===req.user._id.toString());
        if(!isAssigned && req.user.role !== "admin"){
            return res.status(403).json({message: "You are not authorized to update this task"})
        }    
        task.status = req.body.status || task.status
        if(task.status === "Completed"){
            task.todoChecklist.forEach((item)=>(item.completed = true));
            task.progress = 100;
        }
        await task.save();
        res.json({ message: 'Task status updated successfully',task });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//@desc Update task checklist
//@route PUT /api/tasks/:id/todo
//@access Private
const updateTaskChecklist = async (req, res) => {
    try {
        const {todoChecklist} = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found'});
        if(!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
            return res.status(403).json({message: "Not authorized to update checklist"})
        }  
        task.todoChecklist = todoChecklist; //Replace with updated checklist
        //Auto-update progress based on checklist completion
        const completedCount = task.todoChecklist.filter((item) => item.completed ).length
        const totalItems = task.todoChecklist.length
        task.progress = totalItems > 0 ? Math.round((completedCount/totalItems)*100):0;
        //Auto-mark task as completed if all items are checked
        if(task.progress === 100){
            task.status = "Completed";
        } else if(task.progress > 0){
            task.status = "In Progress";
        }else{
            task.status = "Pending";
        }
        await task.save();
        const updateTask = await Task.findById(req.params.id).populate(
        "assignedTo",
        "name email profileImageUrl"
        )
        res.json({ message: 'Task checklist updated successfully', task:updateTask });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskCheklist,
    getDashboardData,
    getUserDashboardData,
    updateTaskStatus,
    updateTaskChecklist
};
