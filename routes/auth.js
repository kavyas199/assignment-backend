import express from "express";
import users from "../models/user";
import bcrypt from 'bcryptjs'
const router = express.Router();

/*      /api/auth/add        */
router.post("/user", (req, res)=> {
    const { id,name,roleid,uid,email,password,addedby} = req.body
    users.findOne({ where: { id: id }}).then(async existing_user => {
        if(existing_user){
            res.send({message: "User already exist"})
        } else {
            const new_user = new users({  
                id,
                name,
                roleid,
                uid,
                email,
                password,
                addedby
            })
            //console.log("hi")
            //console.log(new_user.password)
            /* var bpass = bcrypt.hash(new_user.password,8);
            new_user.password = JSON.stringify(bpass).toString() */
            async function hashIt(pwd){
                const salt = await bcrypt.genSalt(6);
                return await bcrypt.hash(pwd, salt);
              }
            new_user.password = await hashIt(new_user.password);
            console.log(new_user.password);

            new_user.save().then(response => {
                if(response) {
                    res.send( { message: "Added Successfully" })
                }
            }).catch((err) => {
                res.send(err)
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}) 
router.get('/list/addedby/:addedby', async (req, res) => {
    try {
    const user = await users.findAll({ where: { addedby: req.params.addedby } });
    res.json(user);
    res.send( user)
    } catch (err) { res.json({ message: err }); }

    })

    
    
    //getting data
    
    router.get('/list', async (req, res) => {   
        const user = await users.findAll()           
        res.send(user); // true  
        });    
    
    //getting by uid
    
     
    
    router.get('/list/uid/:uid', async (req, res) => {
       try {    
            const user = await users.findOne({ where: { uid: req.params.uid } });  
            res.json(user);
            res.send( user)
        } catch (err) { res.json({ message: err }); }
    })
    
    // getting a user by id
    
    router.get('/list/id/:id', async (req, res) => {
        try {
            const user = await users.findOne({ where: { id: req.params.id } });
            res.json(user);
            res.send( user)
    
        } catch (err) { res.json({ message: err }); }
        })
    
    // deleting a associate
    
     
    
    router.delete('/list/:uid', async (req, res) => {   
        try {   
            const user= await users.destroy({ where: { uid: req.params.uid } });    
            res.json("delete success");
            res.send( { message: "Deleted Successfully" })
        } catch (err) {
            res.json({ message: err });
        }
    });
    
    // updating the user
    
    // router.patch('/list/:id', async (req, res) => {
    //     try {
    //         const user = await users.update({
    //             roleid: req.body.roleid,
    //         },
    //             { where: { id: req.params.id } });
    //         res.json(user);
    //         res.json("update succesfull")
    //     } catch (err) {
    //         res.json({ message: err });   
    //     }
    // });

export default router