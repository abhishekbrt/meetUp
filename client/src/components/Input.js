// import React from 'react';

// import '../styles/Input.css';

// const Input = ({ setMessage, sendMessage, message }) => (
//   <form className="form">
//     <input
//       className="input"
//       type="text"
//       placeholder="Type a message..."
//       value={message}
//       onChange={({ target: { value } }) => setMessage(value)}
//       onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
//     />
//     <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
//   </form>
// )

function Input({placeholder }){
  return(
    <div>
      <form>

      <input
      className=" bg-red-300"
      type="text"
      placeholder={placeholder}
      
      
      />
      
      </form>

    </div>
  );
}
export default Input;