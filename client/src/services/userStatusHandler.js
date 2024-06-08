

const statusHandler=async(flag)=>{
    
    const token=localStorage.getItem('token');
    const data=await fetch('http://192.168.1.23:3045/api/connect',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        authorization:`Bearer ${token}`,
      },
      body:JSON.stringify({
        flag:flag
      })
    });
    const json= await data.json();
    console.log(json);
    }


module.exports=statusHandler;