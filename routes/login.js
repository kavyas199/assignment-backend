import express from "express";

import users from "../Models/user";

import bcrypt from "bcryptjs";
const router1 = express.Router();
router1.post('/', async function (req, res) {
    await users.findOne({
        where: {
            email: req.body.email,
        },
        raw: true
    }).then(async function (users) {
        console.log(users);
        if (!users) {
            res.send('user not found');
        } else {
            console.log(users.password)
            console.log(req.body.password) 
            bcrypt.compare(req.body.password, users.password, function (err, result) {
                console.log("//", result)
                users.password=null
                if (result) {
                    res.json({message:true,users:users});
                }
                else {
                    res.json({message:false} );
                }
            })
        }
    }).catch(error => {
       console.log(error)
    })
});
export default router1;