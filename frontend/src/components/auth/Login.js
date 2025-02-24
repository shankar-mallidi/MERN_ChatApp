import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // State to handle loading
  const navigate = useNavigate();

  // Function to toggle password visibility
  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toaster.create({
        title: "Please enter all the fields",
        type: "warning",
      });
      setLoading(false); // Stop loading after error
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toaster.create({
        title: "User logged in Successfully",
        type: "success",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toaster.create({
        title: "Error processing your request",
        type: "error",
      });
      setLoading(false); // Stop loading after error
    }
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Fieldset.Content>
        <Field label="Email address" required>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password" required>
          <Stack direction="row" alignItems="center">
            <Input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClick}
              color="black"
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </Stack>
        </Field>
      </Fieldset.Content>
      <Button
        type="submit"
        background="blue"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        background="red"
        onClick={() => {
          setEmail("guest@email.com");
          setPassword("12345");
        }}
      >
        Guest user
      </Button>
    </Fieldset.Root>
  );
};

export default Login;
