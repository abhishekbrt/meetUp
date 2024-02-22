const db=require('./db.js');

let query=`CREATE TABLE IF NOT EXISTS logindata (
    'id' INTEGER  PRIMARY KEY,
    'email' TEXT NOT NULL,
    'password' TEXT NOT NULL
   
);`
db.run(query,(err)=>{
    if(err){
        console.log(err.message);
    }
});

db.close();