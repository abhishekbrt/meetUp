const login = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 14) {
    errors.password = "Password cannot exceed more than 14 characters";
  }
  return errors;
};

const register = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Those passwords didn’t match. Try again.";
  }
  return errors;
};

const Validate = {
  login,
  register,
};

export default Validate;
