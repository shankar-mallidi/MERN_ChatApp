import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "@chakra-ui/react";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { IoMdAdd } from "react-icons/io";
import {  IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { toaster } from "../../components/ui/toaster";
import UserListItem from "../../components/UserAvatar";
import UserBadgeItem from "../../components/UserBadgeItem";
const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);


    const { user, chats, setChats } = ChatState();
    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toaster.create({
                title: "User already added",
                type: "warning",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
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
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toaster.create({
                title: "Failed to load the Search Results",
                type: "error",
            });
        }
    };
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",

            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            onClose();
            toaster.create({
                title: "Chat Created Successfully",
                type: "success",

            });
        } catch (error) {
            toaster.create({
                title: "Failed to create the chat",
                type: "error",

            });
        }
    };
    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <IconButton
                    display="flex"
                    fontSize={{ base: "20px", md: "14px", lg: "17px" }}
                    variant={"outline"}
                    color="black"

                >
                    New Group Chat
                    <IoMdAdd />
                </IconButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                    fontSize="35px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                    >Create a group Chat</DialogTitle>
                </DialogHeader>
                <DialogBody
                display="flex"
                flexDir="column"
                alignItems="center">
                    <Input
                    placeholder="Chat Name"
                    mb={3}
                    onChange={(e) => setGroupChatName(e.target.value)}
                      />
                    <Input
                        placeholder="Add Users eg: John, Doe"

                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {selectedUsers.map((u) => (
<UserBadgeItem
key={user._id}
user={u}
handleFunction={() =>handleDelete(u)}
/>
                        ))}
                    {loading ? (
                        // <ChatLoading />
                        <div>Loading...</div>
                    ) : (
                        searchResult
                            ?.slice(0, 4)
                            .map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleGroup(user)}
                                />
                            ))
                    )}

                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" onClick={handleSubmit}>Create chat</Button>
                    </DialogActionTrigger>
                    {/* <Button>Save</Button> */}
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )

};
export default GroupChatModal; 