const sqlite3=require('sqlite3').verbose();

let db=new sqlite3.Database('./userdata.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err.message);
    }
    // else{
    //     console.log('database connected succesfully');
    // }
});

db.serialize(()=>{
    db.each(`SELECT * FROM logindata`,(err,row)=>{
        if(err){
            console.log(err.message);
        }
        else{
            console.log(row.id,row.email,row.password);
        }

    });
});

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });