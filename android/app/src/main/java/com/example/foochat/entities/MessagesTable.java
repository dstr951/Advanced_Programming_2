package com.example.foochat.entities;

import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity(tableName = "Messages", foreignKeys = {@ForeignKey(entity = PersonTable.class,
        parentColumns = "username",
        childColumns = "sender",
        //if the username from the personTable is deleted, delete the message.
        onDelete = ForeignKey.CASCADE),
        @ForeignKey(entity = ChatsTable.class,
        parentColumns = "chatID",
        childColumns = "chatID",
        onDelete = ForeignKey.CASCADE)
        })

public class MessagesTable {
    @PrimaryKey
    private int messageID;

    private int chatID;

    private String sender;

    private String content;
    private Date created;

    public MessagesTable(int messageID, int chatID, String sender, String content, Date created) {
        this.messageID = messageID;
        this.chatID = chatID;
        this.sender = sender;
        this.content = content;
        this.created = created;
    }

    public int getMessageID() {
        return messageID;
    }

    public void setMessageID(int messageID) {
        this.messageID = messageID;
    }

    public int getChatID() {
        return chatID;
    }

    public void setChatID(int chatID) {
        this.chatID = chatID;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
