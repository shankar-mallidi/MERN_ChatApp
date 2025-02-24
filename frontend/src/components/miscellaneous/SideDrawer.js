import { Box, Text, Button, Input } from "@chakra-ui/react";
import { Tooltip } from "../../components/ui/tooltip";
import { IoIosNotifications } from "react-icons/io";
import { IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "../../components/ui/avatar";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { toaster } from "../../components/ui/toaster";
import UserListItem from "../../components/UserAvatar";
import { Spinner } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import ChatLoading from "../ChatLoading";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toaster.create({
        title: "Please enter a search term",
        type: "warning",
        position: "top-right",
        duration: 5000,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      toaster.create({
        title: "Error processing your request",
        type: "error",
        position: "top-right",
        duration: 5000,
      });
    }
  };
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toaster.create({
        title: "Error fetching your chat",
        type: "error",
        position: "top-right",
        duration: 5000,
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        bg="white"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
          content="Search Users to chat "
          //positioning={{ placement: "right-end" }}
        >
          <DrawerRoot placement="start">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <IconButton variant="ghost" color="black">
                <i className="fas fa-search" style={{ marginRight: "8px" }}></i>
                <Text display={{ base: "none", md: "flex" }}>Search User</Text>
              </IconButton>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Serach Users</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <Box display="flex" pb={2}>
                  <Input
                    placeholder="Enter something to search"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </Box>
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResults?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )}
                {loadingChat && <Spinner ml="auto" display="flex" />}
              </DrawerBody>
              {/* <DrawerFooter>
                        <DrawerActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerActionTrigger>
                        <Button>Save</Button>
                    </DrawerFooter> */}
            </DrawerContent>
          </DrawerRoot>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="work-sans" color="black">
          Chat-App
        </Text>
        <div>
          <MenuRoot>
            <MenuTrigger asChild>
              <IconButton variant="plain" color="black" size="md" p={1} m={1}>
                <IoIosNotifications />
              </IconButton>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="new-txt">New Text File</MenuItem>
              <MenuItem value="new-file">New File...</MenuItem>
              <MenuItem value="new-win">New Window</MenuItem>
              <MenuItem value="open-file">Open File...</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </MenuContent>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger asChild>
              <IconButton variant="ghost" color="black" size="md" p={1} m={1}>
                <AvatarGroup>
                  <Avatar name={user.name} />
                </AvatarGroup>
              </IconButton>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="new-txt">My Profile</MenuItem>
              <MenuItem value="new-file" onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
