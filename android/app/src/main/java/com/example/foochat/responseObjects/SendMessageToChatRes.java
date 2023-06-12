package com.example.foochat.responseObjects;

import java.util.Date;

public class SendMessageToChatRes {
    private int id;
    private Date created;
    private GetUserInfoRes sender;
    private String content;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public GetUserInfoRes getSender() {
        return sender;
    }

    public void setSender(GetUserInfoRes sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
