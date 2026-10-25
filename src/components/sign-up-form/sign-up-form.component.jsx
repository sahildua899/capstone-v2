import { useDispatch } from "react-redux";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";
import { signUpStart } from "../../store/user/user.action";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFieldsArr = new FormData(e.target);

    const formData = Object.fromEntries(formFieldsArr.entries());
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords Not Matched");
      return;
    }
    delete formData.confirmPassword;

    try {
      const { email, password, displayName } = formData;
      dispatch(signUpStart(email, password, displayName));

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have an Account?</h2>
      <span>Sign up with Email</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          required
          name="displayName"
          label="Display Name"
        />
        <FormInput type="email" required name="email" label="Email" />
        <FormInput type="password" required name="password" label="Password" />
        <FormInput
          type="password"
          required
          name="confirmPassword"
          label="Confirm Password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
