//create mini express appliatio to handle admin requests
const exp=require("express")
var bcrypt=require("bcrypt")
const userApp=exp.Router();
//use body parsing middleware
userApp.use(exp.json())

//import dbo from db.js
const dbo=require('../db');
dbo.initDb();

//import jsonwebtoken
const jwt=require("jsonwebtoken")


userApp.get('/readprofile/:username',(req,res)=>{
    res.send({message:"user profile works"})
});

userApp.get('/userdashboard/:username',(req,res)=>{
    //res.send({message:'user profile works',data:''})
    
    console.log("userapi has a username",req.params.username);
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.findOne({username:req.params.username},(err,userObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            res.send({message:"profile get func",data:userObjFromDB});
        }
    })
}
);
userApp.get('/userdashboardfinduser/:userid',(req,res)=>{
    //res.send({message:'user profile works',data:''})
    
    console.log("userapi has a userid",req.params.userid);
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.findOne({userid:req.params.userid},(err,userObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            res.send({message:"profile get func",data:userObjFromDB});
        }
    })
}
);

userApp.post('/register',(req,res)=>{
    //check for username in db
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.findOne({username:req.body.username},(err,userObjFromDB)=>{
        if(err)
        {
            console.log('error in register',err)
        }
        else if(userObjFromDB!=null)
        {
            res.send({message:'username already existed'});
        }
        else
        {   
            //hash password
            var hashedPassword=bcrypt.hashSync(req.body.password,7);
            req.body.password=hashedPassword;
            userCollectionObj.insertOne(req.body,(err,success)=>{
                if(err)
                {
                    console.log('error');
                }
                else
                {
                    res.send({message:'register successfully'});
                }
            })
        }
    })
});


//login req handler
userApp.post('/login',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
    var adminCollectionObj=dbo.getDb().admincollectionobj;
    //verify username
    userCollectionObj.findOne({username:req.body.username},(err,userObj)=>{
        if(err)
        {
            console.log("error in read");
        }
        else if(userObj==null)
        {
            adminCollectionObj.findOne({username:req.body.username},(err,adminObj)=>{
                console.log(adminObj);
                if(err)
                {
                    console.log("error in read");
                }
                else if(adminObj==null)
                {
                    res.send({message:'invalid username'});
                }
                else
                {
                    bcrypt.compare(req.body.password,adminObj.password,(err,result)=>{
                        if(err)
                        {
                            console.log("err in password compare",err);
                        }
                        else if(result==false)
                        {
                            res.send({message:'invalid password'});
                        }
                    else
                    {
                        
                        jwt.sign({username:adminObj.username},'ssshhh',{expiresIn:60},(err,signedToken)=>{
                            if(err)
                            {
                                console.log("err ",err);
                            }
                            else
                            {
                                res.send({message:signedToken,adminid:adminObj.adminid,username:adminObj.username,check:"admin"});
                            }
                        })  
                    }
                });
                   
                   
                }
            })
        }
        else
        {
            bcrypt.compare(req.body.password,userObj.password,(err,result)=>{
                if(err)
                {
                    console.log("err in password compare",err);
                }
                else if(result==false)
                {
                    res.send({message:'invalid password'});
                }
                else
                {
                    //create a token and send it to client
                    jwt.sign({username:userObj.username},'ssshhh',{expiresIn:60},(err,signedToken)=>{
                        if(err)
                        {
                            console.log("err ",err);
                        }
                        else
                        {
                            res.send({message:signedToken,username:userObj.username,userid:userObj.userid,check:"user"});
                        }
                    })  
                }
            });
        }
    })

})

//-------------------
userApp.post('/addsecques',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.updateOne({userid:req.body.userid},{$set:{"secques":req.body.secques,"secans":req.body.secans}},(err,obj)=>{
        if(err)
        {
            console.log("err ",err);
        }
        else{

            res.send({message:'added successfully'});
        }
        
    });
})

userApp.put('/changepassword',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.findOne({userid:req.body.userid},(err,obj)=>{
        if(err)
        {
            console.log("error");
        }
        else{
            if(req.body.password==req.body.repassword)
            {
                var hashedPassword=bcrypt.hashSync(req.body.password,7);
                req.body.password=hashedPassword;
                userCollectionObj.updateOne(
                    { userid : req.body.userid },
                    { $set: { "password" : req.body.password } },(err,succ)=>{
                        if(err)
                        {
                            console.log("error in password change");
                        }
                        else{
                            res.send({message:"password successfully updated"});
                        }
                    }
                 );
            }
            else{
                res.send({message:"passwords mismatch"})
            }
        }
    });

})

userApp.get('/viewissuedbooks/:userid',(req,res)=>{
    console.log("the userid is",req.params.userid);
    var issueCollectionObj=dbo.getDb().issuecollectionobj;
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    issueCollectionObj.find({userid:req.params.userid}).toArray( (err,userObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            var userObjFromDB= JSON.parse(JSON.stringify(userObjFromDB));
            console.log("1",userObjFromDB);
            var obj=[];
            var bool=false;
            for(let i=0;i<userObjFromDB.length;i++)
            {
                bookCollectionObj.findOne({ISBNnumber:userObjFromDB[i].ISBNnumber},(err,bookObjFromDb)=>{
                    if(err)
                    {
                        console.log("error");
                    }
                    else{
                   
                        userObjFromDB[i].bookname=bookObjFromDb.bookname;
                        userObjFromDB[i].Author=bookObjFromDb.Author;
                        if(i==userObjFromDB.length-1)
                        {
                        res.send({message:"all recs of users",data:userObjFromDB});
                        }  
                    }
                });
            }
        }
    })
});

userApp.put('/edituser',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.findOne({userid:req.body.userid},(err,obj)=>{
        if(err)
        {
            console.log("error");
        }
        else if(obj!=null)
        {
            userCollectionObj.updateOne(
                { userid : req.body.userid },
                { $set: { "email" : req.body.email , "username" : req.body.username ,"contactno" : req.body.contactno } },(err,succ)=>{
                    if(err)
                    {
                        res.send({message:"error in updation"});
                    }
                    else{
                        res.send({message:"user details updated"});
                    }
                });
        }
        else{
            res.send({message:"user not found"});
        }
    });

});     
 
userApp.post('/submitbookrequest',(req,res)=>{
    var bookrequestsCollectionObj=dbo.getDb().bookrequestscollectionobj;
    let date_ob = new Date();
                    
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    req.body= JSON.parse(JSON.stringify(req.body));
    req.body.reqdate=date + "-" + month + "-" + year;

    bookrequestsCollectionObj.insertOne(req.body,(err,succ)=>{
        if(err)
        {
            console.log("error in request upload",err);
        }
        else{
            res.send({message:"request successfully submitted"});
        }
    })
})
const verifyToken=require("../middlewares/verifyToken");

//testReqHandler
userApp.get('/test',verifyToken,(req,res)=>{
    console.log("req headers is ",req.headers.authorization)
})
//export adminApp

module.exports=userApp;
