const express = require('express');
const router = express.Router();

const Task = require('../models/Task');


//---------------------------------- CREATE TASK ----------------------------------

router.post('/create',async (req,res)=>{
    try{
        const completed = {'completed':false}
        const task = await Task.create({...req.body,...completed});
        res
            .status(201)
            .send(task);

    }catch(error){
        console.error(error);
        res
            .status(500)
            .send({message: 'FAIL : AT CREATE TASK'});
    }
})

//---------------------------------- VIEW ALL TASK ----------------------------------

router.get('/',async (req,res)=>{
    try{
        const tasks = await Task.find();
        res
            .status(201)
            .send(tasks);
        
    }catch(error){
        console.error(error);
        res
            .status(500)
            .send({message: 'FAIL : AT VIEW ALL TASK'});
    }
})

//---------------------------------- VIEW TASK BY ID ----------------------------------

router.get('/id/:_id',async (req,res)=>{
    try{
        const task = await Task.findById(req.params);
        res
            .status(201)
            .send(task);

    }catch(error){
        console.error(error);
        res
            .status(500)
            .send({message: 'FAIL : AT VIEW TASK BY ID'});
    }
})

//---------------------------------- UPDATE COMPLETED TASK ----------------------------------

router.put('/markAsCompleted/:_id',async (req,res)=>{
    try{
        await Task.updateOne(req.params, { completed:true });

        const task = await Task.findById(req.params);
        res
            .status(201)
            .send(task);

    }catch(error){
        console.error(error);
        res
            .status(500)
            .send({message: 'FAIL : AT UPDATE COMPLETED TASK'});
    }
})

//---------------------------------- UPDATE NAME TASK ----------------------------------

router.put('/id/:_id',async (req,res)=>{
    try{
        await Task.updateOne(req.params, {task_name:req.body.task_name});

        const task = await Task.findById(req.params);
        res
            .status(201)
            .send(task);

    }catch(error){
        console.error(error);
        res
            .status(500)
            .send({message: 'FAIL : AT UPDATE NAME TASK'});
    }
})

//---------------------------------- DELETE TASK ----------------------------------

router.delete('/id/:_id',async (req,res)=>{
    try{
        const delTask = await Task.deleteOne(req.params);
        if(delTask)
            res
                .status(201)
                .send({message:'DONE : TASK DELETED FINE'});
        else 
            throw new Error ('Task deleted error');

    }catch(error){
        console.error(error);
        res
            .status(500)
            .send({message: 'FAIL : AT DELETE TASK'})
    }
})


module.exports = router;