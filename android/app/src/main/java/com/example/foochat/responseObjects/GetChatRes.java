package com.example.foochat.responseObjects;

import java.util.List;

public class GetChatRes {
    private int id;
    private List<GetUserInfoRes> users;
    private List<MessageRes> messages;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<GetUserInfoRes> getUsers() {
        return users;
    }

    public void setUsers(List<GetUserInfoRes> users) {
        this.users = users;
    }

    public List<MessageRes> getMessages() {
        return messages;
    }

    public void setMessages(List<MessageRes> messages) {
        this.messages = messages;
    }
}
