import { Form, useNavigation } from "react-router-dom";
import { Loading } from "../../Loading";

export const SignInButton = () => {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <button disabled={submitting}>
        {submitting ? <Loading text="Signing In" /> : "Sign In with Google"}
      </button>
    </Form>
  );
};
