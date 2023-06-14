package com.example.foochat.requestObjects;

public class RegisterUserReq {
    private String username;
    private String displayName;
    private String password;
    private String profilePic;

    public RegisterUserReq(String username, String displayName, String password, String profilePic) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.profilePic = profilePic;
    }
}
