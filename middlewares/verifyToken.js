const jwt=require("jsonwebtoken")
let verifyToken=(req,res,next)=>{
    let tokenWithBearer=req.headers["authorization"];
    if(tokenWithBearer==undefined)
    {
        res.send({message:"please login to continue"});
    }
    else{
        //remove first 7 characters from token
        let token=tokenWithBearer.slice(7,tokenWithBearer.length);
        console.log("token is ",token);
        //verify the token
        jwt.verify(token,"ssshhh",(err,decodedToken)=>{
            if(err)
            {
                res.send({message:"Please relogin to continue..."});
            }
            else{
                //forward 
                next();
            }
            console.log("decode token is",decodedToken);
        })
    }
}

//export it
module.exports=verifyToken