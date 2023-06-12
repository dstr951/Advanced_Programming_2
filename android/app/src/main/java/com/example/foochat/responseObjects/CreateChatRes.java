package com.example.foochat.responseObjects;

public class CreateChatRes {
    private int id;
    private GetUserInfoRes user;

    public CreateChatRes(int id, GetUserInfoRes user) {
        this.id = id;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public GetUserInfoRes getUser() {
        return user;
    }

    public void setUser(GetUserInfoRes user) {
        this.user = user;
    }
}
