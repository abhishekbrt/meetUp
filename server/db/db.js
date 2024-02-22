const sqlite3=require('sqlite3').verbose();
const path=require('path');

const dbPath=path.join(__dirname, 'userdata.db');

let db=new sqlite3.Database(dbPath,sqlite3.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('database connected succesfully');
    }

});

module.exports=db;