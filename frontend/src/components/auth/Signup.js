import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Correct import for react-hot-toast
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) {
      setEmailError(
        "Please enter a valid Gmail address (e.g., name@name.name)."
      );
      setLoading(false);
      return;
    } else {
      setEmailError("");
    }

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields", {
        duration: 5000,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 5000,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/",
        { name, email, password },
        config
      );

      toast.success("User registered successfully", {
        duration: 5000,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      // Improved error handling
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
        {
          duration: 5000,
          position: "bottom",
        }
      );
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Fieldset.Root size="lg" maxW="md" as="form" onSubmit={submitHandler}>
      {" "}
      {/* Wrap in form */}
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>
      <Fieldset.Content>
        <Field label="Name" required>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>

        <Field label="Email address" required>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </Field>

        <Field label="Password" required>
          <Stack direction="row" alignItems="center">
            <Input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

        <Field label="Confirm password" required>
          <Stack direction="row" alignItems="center">
            <Input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
        onClick={submitHandler} // Pass submitHandler to onClick
        type="submit"
        alignSelf="flex-start"
        background="darkblue"
        isLoading={loading} // Add a loading state to button
      >
        Signup
      </Button>
    </Fieldset.Root>
  );
};

export default Signup;
