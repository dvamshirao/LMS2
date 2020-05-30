var mc=require("mongodb").MongoClient;

//to hold db object
var dbo;

var usercollectionobj;
var admincollectionobj;
var bookcollectionobj;
var issuecollectionobj;
var returncollectionobj;
var bookrequestscollectionobj;
var projectcollectionobj;
var projissuecollectionobj;
var projreturncollectionobj;
//database url
var dbUrl="mongodb+srv://vnrlms:lmsvnr@vnrlms-hrwmq.mongodb.net/test?retryWrites=true&w=majority";

//function to intialize db
 function initDb()
 {
     mc.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},
        (err,client)=>{
            if(err)
            {
                console.log('error in connecting to db');
            }
            console.log("connected to db");
            dbo=client.db("vnrlms");
            usercollectionobj=dbo.collection("user");
            admincollectionobj=dbo.collection("admin");
            bookcollectionobj=dbo.collection("book");
            issuecollectionobj=dbo.collection("issue");
            returncollectionobj=dbo.collection("returnlog");
            bookrequestscollectionobj=dbo.collection("bookrequests");
            projcollectionobj=dbo.collection("project");
            projissuecollectionobj=dbo.collection("projissue");
            projreturncollectionobj=dbo.collection("projreturn");
            
        });
 }

 //function to return db object
 function getDb()
 {
    // console.log(dbo,"Db has not been initialised.Please called intit function first")
     return {
         usercollectionobj:usercollectionobj,
         admincollectionobj:admincollectionobj,
         bookcollectionobj:bookcollectionobj,
         issuecollectionobj:issuecollectionobj,
         returncollectionobj:returncollectionobj,
         bookrequestscollectionobj:bookrequestscollectionobj,
         projcollectionobj:projcollectionobj,
         projissuecollectionobj:projissuecollectionobj,
         projreturncollectionobj:projreturncollectionobj
     }
}

//export two funtions
module.exports={
    getDb,
    initDb
};