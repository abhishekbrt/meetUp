import "../styles/button.css";

function Button({ button_name }) {
  return (
    <button className="login-button" type="button">
      {button_name}
    </button>
  );
}

export default Button;
