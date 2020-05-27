import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const Main = () => {
    const socket = useRef(null);
    const [currentAction, setCurrentAction] = useState("get_info");
    const [result, setResult] = useState({});

    useEffect(() => {
        socket.current = io("http://localhost:5000");

        socket.current.on("connect", async () => {
            console.log("Socket connected");
        });

        socket.current.on("get_info", (data) => {
            setResult(data);
        });

        socket.current.on("get_chat_channels", (data) => {
            setResult(data);
        });

        socket.current.on("create_chat_channel", (data) => {
            setResult(data);
        });
    }, []);

    const getInfo = () => {
        socket.current.emit("get_info");
    };
    const getChatChannels = () => {
        socket.current.emit("get_chat_channels");
    };

    const createChatChannel = () => {
        socket.current.emit("create_chat_channel");
    };

    const actionChanged = (e) => {
        setCurrentAction(e.target.value);
    };

    return (
        <div>
            <select name="action" id="action" onChange={actionChanged}>
                <option autoFocus value="get_info">
                    Get Info
                </option>
                <option value="get_chat_messages">Get Chat Messages</option>
                <option value="write_chat_messages">Write Chat Messages</option>
                <option value="get_chat_channels">Get Chat Channels</option>
                <option value="write_chat_channels">Write Chat Channels</option>
                <option value="create_chat_channel">
                    Create a Chat Channel
                </option>
            </select>
            {currentAction === "get_info" && (
                <div>
                    <button onClick={getInfo}>Get Info</button>
                </div>
            )}
            {currentAction === "get_chat_channels" && (
                <div>
                    <button onClick={getChatChannels}>Get Chat Channels</button>
                </div>
            )}
            {currentAction === "create_chat_channel" && (
                <div>
                    <button onClick={createChatChannel}>
                        Create Chat Channel
                    </button>
                </div>
            )}
            {result !== {} && (
                <ul>
                    {Object.keys(result).map((key) => {
                        return (
                            <li key={key}>
                                {key}: {result[key]}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Main;
