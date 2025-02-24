import React, { useEffect, useState } from "react";
import { Avatar } from "./ui/avatar";
import { Tooltip } from "./ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every minute to keep timestamps fresh
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // every 60 seconds

    return () => clearInterval(timer); // Clear interval on component unmount
  }, []);

  // Format timestamps to be more readable
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", flexDirection: "column" }} key={m._id}>
            {/* Display sender's name above the message */}
            <div
              style={{
                fontSize: "0.75em",
                color: "gray", // Same color as the timestamp
                fontWeight: "bold",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginBottom: "5px", // Space between name and message
              }}
            >
              {m.sender.name}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor:
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  color: "black",
                }}
              >
                {m.content}
              </span>
            </div>
            <div
              style={{
                fontSize: "0.75em",
                color: "gray", // Timestamp color matches name color
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: "2px",
              }}
            >
              {/* Display the timestamp below the message */}
              {formatTimestamp(m.createdAt)}
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
