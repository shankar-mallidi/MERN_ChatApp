import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import React from "react";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontfamily="work-sans"
          fontWeight="bold"
          color="black"
        >
          Chat-App
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" mt={2}>
        <Tabs.Root
          variant="enclosed"
          maxW="md"
          fitted
          defaultValue={"tab-1"}
          colorPalette={"blue"}
        >
          <Tabs.List background={"white"} pl={8}>
            <Tabs.Trigger width="50%" value="tab-1">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger width="50%" value="tab-2">
              Sign Up
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="tab-1" color="black">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="tab-2" color="black">
            <Signup />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
}
export default Homepage;
