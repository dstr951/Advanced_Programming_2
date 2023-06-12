package com.example.foochat.entities;

import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity(tableName = "Messages", foreignKeys = @ForeignKey(entity = PersonTable.class,
        parentColumns = "username",
        childColumns = "sender",
        //if the username from the personTable is deleted, delete the message.
        onDelete = ForeignKey.CASCADE))
public class MessagesTable {
    @PrimaryKey
    private int messageID;

    private Date created;

    private String sender;

    private String content;

    public MessagesTable(int messageID, Date created, String sender, String content) {
        this.messageID = messageID;
        this.created = created;
        this.sender = sender;
        this.content = content;
    }

    public int getMessageID() {
        return messageID;
    }

    public void setMessageID(int messageID) {
        this.messageID = messageID;
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
