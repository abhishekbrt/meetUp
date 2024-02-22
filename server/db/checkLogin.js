const db=require('./db.js');
const {promisify}=require('util');
const dbRun=promisify(db.run.bind(db));
const dbGet=promisify(db.get.bind(db));

const tableName='logindata';

async function checkUser(email){

    let query=`SELECT * FROM ${tableName} WHERE email=?`;
    try{
        const row=await dbGet(query,[email]);
        if(row===undefined){
            return false;
        }
        else{
            return true;
        }
    }
    catch(err){
        console.error(`error occur while checking user ${err.message}`);
        throw err;

    }
};



async function newUser(email,password){
    const isAlreadyLogin= await checkUser(email);
   
    if(isAlreadyLogin){
        return "User is already registered";
    }
    else{
        const query=`INSERT INTO ${tableName} (email,password) VALUES (?,?)`;
        try{
            await dbRun(query,[email,password]);
            return `user is registered succesfully with email: ${email} and password: ${password}`

        }
        catch(err){
            console.error(err.message);
            throw err;
        }
    }
}



module.exports=newUser;