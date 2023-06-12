package com.example.foochat.responseObjects;

public class GetAllChatsRes {
    private int id;
    private GetUserInfoRes user;
    private String lastMessage;

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public GetUserInfoRes getUser() {
        return user;
    }

    public void setUser(GetUserInfoRes user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
