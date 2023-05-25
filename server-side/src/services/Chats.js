import express from "express";

/*
    todo add functionality for
    -GET: api/Chats get list of all chats with logged-in user (from token extract username) req{} res = {code,body{[]}} (req, should automatically send token)(body has- array of Chat objects.)
    -POST: api/Chats add a chat with a specific user req={username} res = {code, body{id, User}}
    -GET: api/Chats/{id} get a specific chat with a user using the chatID req={id}, res={code,body{id,users[],messages[]}}(array of type User, array of type Message )
    -DELETE: api/Chats/{id} delete specific chat with a user using the chatID req{} res{coed,body{}}
    -POST: api/Chats/{id}/Messages send a message to a specific chat req= {msg:"string"} res={code, body{Message}
    -GET: api/Chats/{id}/Messages use web socket to get incoming messages content req{} res={code, bod{yMessage}

 */