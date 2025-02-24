import React from 'react';
import { Text, IconButton , Box, Stack} from '@chakra-ui/react';    
import { IoMdArrowRoundBack } from "react-icons/io";
import { ChatState } from '../Context/ChatProvider';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { toaster } from './ui/toaster';
import { Spinner } from '@chakra-ui/react';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import io from "socket.io-client";
import animationData from "../animations/typing.json";
const ENDPOINT ="http://localhost:5000";
var socket, selectedChatCompare;
// import UpdateGroupChatModal from './UpdateGroupChatModal';
const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const {user , selectedChat, setSelectedChat, chats, setChats} = ChatState();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toaster.create({
                title: "Failed to fetch messages",
                type: "error",
            });
        }
    };
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
         socket.on("typing", () => setIsTyping(true));
         socket.on("stop typing", () => setIsTyping(false));

        //     // eslint-disable-next-line
    }, []);
    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            //socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toaster.create({
                    title: "Failed to send message",
                    type: "error",

                });
            }
        }
    };

   

    useEffect(() => {
       fetchMessages();

        selectedChatCompare = selectedChat;
    //     // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
       socket.on("message recieved", (newMessageRecieved) => {
            if (
                 !selectedChatCompare || // if chat is not selected or doesn't match current chat
                 selectedChatCompare._id !== newMessageRecieved.chat._id
           ) {
    //             if (!notification.includes(newMessageRecieved)) {
    //                 setNotification([newMessageRecieved, ...notification]);
    //                 setFetchAgain(!fetchAgain);
    //             }
           } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

         if (!socketConnected) return;

         if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    
    return (
 <>
            {selectedChat ? (
        <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                        color={"black"}
                    >
                        <IconButton
                             display={{ base: "flex", md: "none" }}

                            onClick={() => setSelectedChat("")} >
                            <IoMdArrowRoundBack />
                            </IconButton>
                            
                        
                            
                            
                        {
                            (!selectedChat.isGroupChat ? (
                                <>
                                    {getSender(user, selectedChat.users)}
                                    <ProfileModal
                                        user={getSenderFull(user, selectedChat.users)}
                                    />
                                </>
                            ) : (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    <UpdateGroupChatModal
                                        fetchMessages={fetchMessages}
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                    />
                                </>
                            ))}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent={{ base: "flex-end" }}
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                        >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )} 
                        <Stack
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            mt={3}
                        >
                            {istyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                color="black"
                                onChange={typingHandler}
                                borderRadius="full"
                                borderBlockColor="blue"
                                borderWidth="2px"
                            />
                        </Stack>
                        </Box>
                </>
            ) : (
                // to get socket.io on same page
                <Box d="flex" alignItems="center" justifyContent="center" h="100%" color="black" textAlign="center">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChat;