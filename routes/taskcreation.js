import express, { response } from "express";
import Tasks from '../models/task'
import Nodemailer from 'nodemailer'
import users from '../models/user'
// const Tasks= require('../models/task')
const router5 = express.Router();



// getting all

router5.get('/', async (req, res) => {
    try {
    const tasks = await Tasks.find();
    res.json(tasks);
    } catch (err) {
    res.json({ message: err });
   }
  });

router5.get("/:taskid", async (req, res) => {
   try {
     const task = await Tasks.findOne({ taskid: req.params.taskid })
      ;
     res.json(task);
   } catch (err) {
     res.json({ message: err });
   }

});




// getting


// router5.get("/:taskid", async (req, res) => {
//   try {
//     const task = await Tasks.findById(req.params.taskid);
//     res.json(task);

//   } catch (err) {
//     res.json({ message: err });

//   }

// });



// creating



router5.post('/create', async (req, res) => {
  console.log(req.body);
  const task = new Tasks({

    taskname: req.body.data.taskname,

    taskid: req.body.data.taskid,

    taskdescription: req.body.data.description,

    files: req.body.data.files ? req.body.data.files : "",

    leader: req.body.leader ? req.body.leader : "",

    associate: req.body.data.associate ? req.body.data.associate : "",

    status: req.body.data.status,

    approval: req.body.approval ? req.body.approval : ""



  });
  console.log(task);
  const Email = await users.findOne({
    where:{uid:task.associate}
  })
  console.log(Email.email)
  let transporter=Nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    auth:{
      user:"tmail7034@gmail.com",
      pass:"tmail123"
    }
  })
  var message = {
    from:"tmail7034@gmail.com",
    to:Email.email,
    subject:"Regarding Task",
    text:"A task is assigned to you"
  };
  task.save()
  .then(
    transporter.sendMail(message,(err,info)=>{
      if(err){
        console.log("error in sending mail",err)
        return response.status(400).json({
          message:`error in sending mail ${err}`
        })
      }
      else{
        console.log("sucessfully send the mail",info)
      }
      return res.json({
        message:info
      })
    })
  )
  .then(data => { res.json(data); }).catch(err => { res.json({ message: err }); })
});



// // deleting
// router5.delete('/:taskid', async (req, res) => {
//   try {
//     const removepost = await Tasks.deleteOne({ taskid: req.params.taskid });
//     res.json(removepost);
//   }
//   catch (err) {
//     res.json({ message: err });
//   }

// });

// upadating status of task

router5.patch("/:taskid", async (req, res) => {
  try {

    const task = await Tasks.findOne({ taskid: req.params.taskid });

    console.log("user done", task)

    if (req.body.status) {

      task.status = req.body.status;

    }

    await task.save((err) => { if (err) { console.log("err", err) } });

    res.json(task);

  } catch (err) {

    res.json({ message: err });

  }

});

//Getting TaskID
router5.get("/:taskid", async (req, res) => {

  try {

    const task = await Taskss.find({ taskid: req.params.taskid })

      ;

    res.json(task);

  } catch (err) {

    res.json({ message: err });

  }

});

//});





export default router5;

















/*import express from "express";
import Tasks from '../models/task'
import nodeMailer from 'nodemailer';
import users from "../Models/user";

// const Tasks= require('../models/task')
const router5 = express.Router();



// getting all

router5.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (err) {
    res.json({ message: err });
  }
});

router5.get("/:taskid", async (req, res) => {
  try {
    const task = await Tasks.findOne({ taskid: req.params.taskid })
      ;
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }

});




// getting



router5.get("/:taskid", async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.taskid);
    res.json(task);

  } catch (err) {
    res.json({ message: err });

  }

});

// creating



router5.post('/create', async (req, res) => {
  //console.log(req.body);
  const task = new Tasks({
    taskname: req.body.data.taskname,
    taskid: req.body.data.taskid,
    taskdescription: req.body.data.description,
    files: req.body.data.files ? req.body.data.files : "",
    leader: req.body.leader ? req.body.leader : "",
    associate: req.body.data.associate ? req.body.data.associate : "",
    status: req.body.data.status,
    approval: req.body.approval ? req.body.approval : ""
  });
  console.log(task);
  const Email= 
   await users.findOne({
    where:{uid:task.associate}
  })
  console.log(Email.email)
  let transporter=nodeMailer.createTransport({
    service:'gmail',
     host: 'smtp.gmail.com',
     auth:{
         user:"tmail7034@gmail.com",

         pass:"tmail123"

     }

 })

//console.log(userMessage)

 var message = {

     from:"tmail7034@gmail.com",

     to:Email.email,

     subject:"Regarding Task",

     text:"A task is assigned to you",

    

 };
  task.save()
  
  .then(  
   transporter.sendMail(message,(err,info)=>{
         if(err){
             console.log("error in sending mail",err)
             return res.status(400).json({
                 message:`error in sending mail ${err}`
             })
         }
         else{
         console.log("sucessfully send the mail",info)
         }
         return  res.json({
           message:info
         })
     })
)
.then(data => {  res.json(data); })

  .catch(err => { res.json({ message: err }); })
    });
// deleting



router5.delete('/:taskid', async (req, res) => {

  try {

    const removepost = await Tasks.deleteOne({ taskid: req.params.taskid });

    res.json(removepost);
  }

  catch (err) {
    res.json({ message: err });

  }

});
//updating a custumer by id



// router.patch("/:taskid", async (req, res) => {

//     try {

//       const task= await Tasks.findOne({ _id: req.params.taskid });

//       console.log("user done",task)



//       if (req.body.status) {

//         task.status= req.body.status;

//       }



//       await task.save((err)=>{if(err){console.log("err",err)}});

//       res.json(task);

//     } catch (err) {

//       res.json({ message: err });

//     }





//updating status of task

router5.patch("/:taskid", async (req, res) => {
  try {

    const task = await Tasks.findOne({ taskid: req.params.taskid });

    console.log("user done", task)

    if (req.body.status) {

      task.status = req.body.status;

    }

    await task.save((err) => { if (err) { console.log("err", err) } });

    res.json(task);

  } catch (err) {

    res.json({ message: err });

  }

});

//Getting TaskID
router5.get("/:taskid", async (req, res) => {

  try {

    const task = await Taskss.find({ taskid: req.params.taskid })

      ;

    res.json(task);

  } catch (err) {

    res.json({ message: err });

  }

});

//});





export default router5;
*/