//create mini express appliatio to handle admin requests
const exp=require("express")
var bcrypt=require("bcrypt")
const adminApp=exp.Router();

adminApp.use(exp.json())
//import dbo from db.js
const dbo=require('../db');
dbo.initDb();


const jwt=require("jsonwebtoken")

adminApp.get('/admindashboard/notifydelays',(req,res)=>{
    var issueCollectionObj=dbo.getDb().issuecollectionobj;
    issueCollectionObj.find().toArray( (err,userObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else{
            var obj=[];
            let date_ob = new Date();
                    
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            currentdate=year + "-" + month + "-" + date;
            for(let i=0;i<userObjFromDB.length;i++)
            {
                const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                const a = new Date(userObjFromDB[i].dateofissue);
                const b = new Date(currentdate);
                const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
                userObjFromDB[i].days=(Math.floor((utc2 - utc1) / _MS_PER_DAY));
                if(userObjFromDB[i].days>=15)
                obj.push(userObjFromDB[i]);
           
            }
            console.log(obj);
           
            res.send({message:"successful",data:obj});
        }
    });
})

adminApp.get('/admindashboard/manageusers/viewusers',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.find().toArray( (err,userObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            res.send({message:"all recs of users",data:userObjFromDB});
        }
    })
});

adminApp.get('/admindashboard/bookslist',(req,res)=>{
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    bookCollectionObj.find().toArray((err,bookObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            for(let i=0;i<bookObjFromDB.length;i++)
            {
                bookObjFromDB[i].total=(bookObjFromDB[i].ids).length;
                delete bookObjFromDB[i].ids;
                delete bookObjFromDB[i]._id;

            }
            console.log(bookObjFromDB);
            res.send({message:"successfully retrieved documents",data:bookObjFromDB});
        }
    })

})

adminApp.get('/admindashboard/circulation/issuefindbook/:bookid',(req,res)=>{
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    //console.log("in adminapi bookid",req.params.bookid);
    bookCollectionObj.findOne({ISBNnumber:req.params.bookid},(err,bookObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else if (bookObjFromDB!=null)
        { //console.log(bookObjFromDB);
            res.send({message:"all recs of users",data:bookObjFromDB});
        }
        else{
            res.send({message:"enter the book details again"});
        }
    })
});
adminApp.get('/admindashboard/circulation/issuefinduser/:userid',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
   // console.log("in adminapi userid",req.params.userid1);
   userCollectionObj.findOne({userid:req.params.userid},(err,userObjFromDB)=>{
    if(err)
    {
        console.log("error");
    }
    else if(userObjFromDB!=null)
    { 
        res.send({message:"user rec",data:userObjFromDB});
    }
    else{
        res.send({message:"enter the user details again"});
    }
});

   
});

adminApp.get('/admindashboard/circulation/returnfindbid/:bid',(req,res)=>{
    var issueCollectionObj=dbo.getDb().issuecollectionobj;
    //console.log("in adminapi bid",req.params.bid);
    issueCollectionObj.findOne({bid:req.params.bid},(err,issueObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else if(issueObjFromDB!=null)
        {// console.log(issueObjFromDB);
            res.send({message:"issue rec",data:issueObjFromDB});
        }
        else{
            res.send({message:"enter the book details again"});
        }
    })
});

adminApp.post('/issue',(req,res)=>{
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    var issueCollectionObj=dbo.getDb().issuecollectionobj;
    var userCollectionObj=dbo.getDb().usercollectionobj;
    console.log(req.body);
    console.log(req.params);
       bookCollectionObj.findOne({ISBNnumber:req.body.ISBNnumber},(err,bookObjFromDB)=>
       {
            if(err)
            {
                console.log('error in issue',err);
            }
            else if(bookObjFromDB!=null)
            {
                userCollectionObj.findOne({userid:req.body.userid},(err,userObjFromDB)=>{
                if(err)
                {
                    console.log("error");
                }
                else if(userObjFromDB!=null)
                { 
                    var f=0;
                    for(var i=0;i<(bookObjFromDB.ids).length;i++)
                    {
                        if(bookObjFromDB.ids[i].bid==req.body.bid && bookObjFromDB.ids[i].status==false)
                        {
                            f=1;
                            break;
                        }
                    }
                    if(f==1)
                    {
                     console.log("hello",req.body);
                     bookCollectionObj.updateOne({ISBNnumber:req.body.ISBNnumber,"ids.bid":req.body.bid},{$set:{"ids.$.status":true}});
                     bookCollectionObj.updateOne({ISBNnumber:req.body.ISBNnumber},{$inc:{"count":-1}});
                     issueCollectionObj.findOne({bid:req.body.bid},req.body,(err,isbobj)=>{
                        if(err){
                            console.log("error");
                        }
                        else if(isbobj!=null){
                            res.send({message:"book already issued"});
                        }
                        else{
                     issueCollectionObj.insertOne(req.body,(err,success)=>{
                         if(err)
                         {
                             console.log('error');;
                         }
                         else{
                             res.send({message:"book issued"});
                         }
                     });} });
                 }
                 else{
                    res.send({message:"book is not available to issue"});
                    }

                }
                else{
                    f=0;
                    res.send({message:"enter the user details again"}); }
            });
            }
        else{
            
            res.send({message:"enter the book details again"});
        }
    })
});
adminApp.post('/return',(req,res)=>{
    var issueCollectionObj=dbo.getDb().issuecollectionobj;
    var returnCollectionObj=dbo.getDb().returncollectionobj;
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
   //console.log(req.body);
    //console.log(req.params);
    issueCollectionObj.findOne({bid:req.body.bid},(err,issueObjFromDB)=>{
       
       // console.log(issueObjFromDB);
        if(err)
        {
            console.log('error in issue',err);
        }
        else if(issueObjFromDB!=null)
        {
            bookCollectionObj.updateOne({ISBNnumber:issueObjFromDB.ISBNnumber,"ids.bid":req.body.bid},{$set:{"ids.$.status":false}});
            bookCollectionObj.updateOne({ISBNnumber:issueObjFromDB.ISBNnumber},{$inc:{"count":1}});
            issueCollectionObj.deleteOne( { bid:req.body.bid },(err,delobj)=>{
                if(err)
                {
                    console.log('error in deleting from issue table',err);
                }
                else
                {
                    //console.log("got");
                
                    let date_ob = new Date();
                    
                    let date = ("0" + date_ob.getDate()).slice(-2);
                    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                    let year = date_ob.getFullYear();
                    returndate=year + "-" + month + "-" + date;
                    //console.log(date_ob);
                    var bookobj= JSON.parse(JSON.stringify(issueObjFromDB));

                    bookobj.returndate=returndate;
                    delete bookobj._id;

                   // console.log(bookobj);
                    returnCollectionObj.insertOne(bookobj,(err,success)=>{
                        if(err)
                        {
                            console.log('error');;
                        }
                        else{
                            res.send({message:"bookreturned successfully"});
                        }
                    });
                }
            })  
        }
        else
        {
            
            res.send({message:"book is not issued yet to return"});
        }
    });
});
adminApp.post('/bookregister',(req,res)=>{
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    //console.log(req.body);
    //console.log(req.params);
    bookCollectionObj.findOne({ISBNnumber:req.body.ISBNnumber},(err,bookObjFromDB)=>{
        if(err)
        {
            console.log('error in register',err);
        }
        else if(bookObjFromDB!=null)
        {
            var len=(req.body.ids).length;
            for(let i=0;i<len;i++)
            {
                bookObjFromDB.ids.push(req.body.ids[i]);
               
            }
            bookObjFromDB.count=bookObjFromDB.count+req.body.count;
            bookCollectionObj.save(bookObjFromDB);
           //console.log(bookObjFromDB);
            res.send({message:"book added to existed isbc"});
        }
        else{
           // console.log("entered");
            bookCollectionObj.insertOne(req.body,(err,success)=>{
                if(err)
                {
                    console.log("error");
                }
                else{
                    res.send({message:"book registered succsessfully"});
                }
            })
        }
    

    })
});
adminApp.put('/edituser',(req,res)=>{
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
                { $set: { "userid" : req.body.userid, "email" : req.body.email , "username" : req.body.username ,"contactno" : req.body.contactno ,"secques":req.body.secques,"secans":req.body.secans} },(err,succ)=>{
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

adminApp.delete('/deleteuser/:userid',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.findOne({userid:req.params.userid},(err,obj)=>{
        if(err)
        {
            console.log("error");
        }
        else if(obj!=null)
        {
            userCollectionObj.deleteOne(({"userid":req.params.userid}),(err,delobj)=>{
                if(err)
                {
                    res.send({message:"error in deletion"}); 
                }
                else
                {
                    res.send({message:"user deleted"}); 
                }
            });

        }
        else{
            res.send({message:"user not found"});
        }
    });
});

adminApp.put('/editbook',(req,res)=>{
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    bookCollectionObj.findOne({userid:req.body.userid},(err,obj)=>{
        if(err)
        {
            console.log("error");
        }
        else if(obj!=null)
        {
            bookCollectionObj.updateOne(
                { ISBNnumber : req.body.ISBNnumber },
                { $set: { "title" : req.body.title , "Author" : req.body.Author ,"Publisher" : req.body.Publisher} },(err,succ)=>{
                    if(err)
                    {
                        res.send({message:"error in updation"});
                    }
                    else{
                        res.send({message:"book details updated"});
                    }
                });
        }
        else{
            res.send({message:"book not found"});
        }
    });

});          

adminApp.put('/deletebookid',(req,res)=>{
    console.log("in admin api:",req.body.ISBNnumber,req.body.bookid);
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    bookCollectionObj.findOne({ISBNnumber:req.body.ISBNnumber},(err,obj)=>{
        if(err)
        {
            console.log("error");
        }
        else if(obj!=null)
        {
            bookCollectionObj.updateOne(
                { ISBNnumber : req.body.ISBNnumber },
                {"$pull":{"ids":{"bid":req.body.bookid} } },(err,succ)=>{
                if(err)
                {
                    console.log(err);
                    res.send({message:"error in deletion"}); 
                }
                else
                {
                    res.send({message:"book deleted"}); 
                }
            });
        }
        else{
            res.send({message:"book not found"});
        }
    });
});

adminApp.get('/getissuedetails',(req,res)=>{
    var issueCollectionObj=dbo.getDb().issuecollectionobj;
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    var userCollectionObj=dbo.getDb().usercollectionobj;
    issueCollectionObj.find({}).toArray( (err,issuedetailsObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            var issuedetailsObjFromDB= JSON.parse(JSON.stringify(issuedetailsObjFromDB));
            var obj=[];
            var bool=false;
            for(let i=0;i<issuedetailsObjFromDB.length;i++)
            {
                userCollectionObj.findOne({userid:issuedetailsObjFromDB[i].userid},(err,userObjFromDb)=>{
                    if(err)
                    {
                        console.log("error");
                    }
                    else{
                   
                        issuedetailsObjFromDB[i].username=userObjFromDb.username;
                    }
                });
                bookCollectionObj.findOne({ISBNnumber:issuedetailsObjFromDB[i].ISBNnumber},(err,bookObjFromDb)=>{
                    if(err)
                    {
                        console.log("error");
                    }
                    else{
                   
                        issuedetailsObjFromDB[i].bookname=bookObjFromDb.bookname;
                        issuedetailsObjFromDB[i].Author=bookObjFromDb.Author;
                        if(i==issuedetailsObjFromDB.length-1)
                        {
                        res.send({message:"all recs",data:issuedetailsObjFromDB});
                        }  
                    }
                });
            }
        }
    })
});

adminApp.get('/getissuereturndetails',(req,res)=>{
    var issueCollectionObj=dbo.getDb().returncollectionobj;
    var bookCollectionObj=dbo.getDb().bookcollectionobj;
    var userCollectionObj=dbo.getDb().usercollectionobj;
    issueCollectionObj.find({}).toArray( (err,issuedetailsObjFromDB)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            var issuedetailsObjFromDB= JSON.parse(JSON.stringify(issuedetailsObjFromDB));
            var obj=[];
            var bool=false;
            for(let i=0;i<issuedetailsObjFromDB.length;i++)
            {
                userCollectionObj.findOne({userid:issuedetailsObjFromDB[i].userid},(err,userObjFromDb)=>{
                    if(err)
                    {
                        console.log("error");
                    }
                    else{
                   
                        issuedetailsObjFromDB[i].username=userObjFromDb.username;
                    }
                });
                bookCollectionObj.findOne({ISBNnumber:issuedetailsObjFromDB[i].ISBNnumber},(err,bookObjFromDb)=>{
                    if(err)
                    {
                        console.log("error");
                    }
                    else{
                   
                        issuedetailsObjFromDB[i].bookname=bookObjFromDb.bookname;
                        issuedetailsObjFromDB[i].Author=bookObjFromDb.Author;
                        if(i==issuedetailsObjFromDB.length-1)
                        {
                        res.send({message:"all recs",data:issuedetailsObjFromDB});
                        }  
                    }
                });
            }
        }
    })
});

adminApp.post('/login',(req,res)=>{
    res.send({message:"admin login works"})
});
adminApp.post('/userRegister',(req,res)=>{
    var userCollectionObj=dbo.getDb().usercollectionobj;
    userCollectionObj.findOne({userid:req.body.userid},(err,userObjFromDB)=>{
        if(err)
        {
            console.log('error in register',err)
        }
        else if(userObjFromDB!=null)
        {
            res.send({message:'userid already existed'});
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

adminApp.post('/verifysecuritykey/:adminid',(req,res)=>{
    console.log(req.params.adminid);
    var adminCollectionObj=dbo.getDb().admincollectionobj;
    adminCollectionObj.findOne({adminid:req.params.adminid},(err,Obj)=>{
        console.log(Obj);
        if(err)
        {
            console.log("error");
        }
        else
        {
            bcrypt.compare(req.body.securitykey,Obj.securitykey,(err,result)=>{
                if(err)
                {
                    console.log("err in securitykey compare",err);
                }
                else if(result==false)
                {
                    res.send({message:'reenter security key'});
                }
                else{
                    res.send({message:'security key successfully verified'});
                }
                
            });
        }
        
    })

})

adminApp.post('/changeusername/:adminid',(req,res)=>{
    var adminCollectionObj=dbo.getDb().admincollectionobj;
    adminCollectionObj.findOne({adminid:req.params.adminid},(err,obj)=>{
        if(err)
        {
            console.log("error");
        }
        else{
           
          //  console.log(req.body.changedusername);
          
    
            adminCollectionObj.updateOne(
                { adminid : req.params.adminid },
                { $set: { "username" : req.body.changedusername} },(err,succ)=>{
                    if(err)
                    {
                        console.log("error in changes updation");
                    }
                    else{
                        res.send({message:"username successfully updated"});
                    }
                }
             );
        }
    })

})


adminApp.post('/changepassword/:adminid',(req,res)=>{
    var adminCollectionObj=dbo.getDb().admincollectionobj;
    adminCollectionObj.findOne({adminid:req.params.adminid},(err,obj)=>{
        if(err)
        {
            console.log("error");
        }
        else{
            var hashedPassword=bcrypt.hashSync(req.body.password,7);
            req.body.password=hashedPassword;
          //  console.log(req.body.changedusername);
          
    
            adminCollectionObj.updateOne(
                { adminid : req.params.adminid },
                { $set: { "password" : req.body.password} },(err,succ)=>{
                    if(err)
                    {
                        console.log("error in changes updation");
                    }
                    else{
                        res.send({message:"password successfully updated"});
                    }
                }
             );
        }
    })

})

adminApp.get('/displaybookrequests',(req,res)=>{
    var bookrequestsCollectionObj=dbo.getDb().bookrequestscollectionobj; 
    bookrequestsCollectionObj.find().toArray( (err,bookrequestsObjFromDB)=>{
        if(err)
        {
            console.log("error in book requests retrieval",err);
        }
        else{
            console.log("vamshi",bookrequestsObjFromDB);
            res.send({message:"requests retrieved successfully",data:bookrequestsObjFromDB});
        }

    });
})

//export adminApp

module.exports=adminApp;