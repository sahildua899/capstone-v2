import { useDispatch } from "react-redux";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

const SignInForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formFieldsArr = new FormData(e.target);
    const formData = Object.fromEntries(formFieldsArr.entries());
    try {
      dispatch(emailSignInStart(...formData));
      e.target.reset();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          alert("Incorrect Credentials");
          break;
        case "auth/user-not-found":
          alert("Account Not Found");
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="sign-in-container">
      <h2>Don't Have an Account?</h2>
      <span>Sign up with Email</span>
      <form onSubmit={handleSubmit}>
        <FormInput type="email" required name="email" label="Email" />
        <FormInput type="password" required name="password" label="Password" />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button onClick={signInWithGoogle} buttonType="google" type="button">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
