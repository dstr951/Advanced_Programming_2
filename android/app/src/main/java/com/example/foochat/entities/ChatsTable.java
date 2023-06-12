package com.example.foochat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.PrimaryKey;
@Entity(tableName = "chats", foreignKeys = {@ForeignKey(entity = PersonTable.class,
                    parentColumns = "username",
                    childColumns = "username",
                    //if the username from the personTable is deleted so is the chat.
                    onDelete = ForeignKey.CASCADE),
                    @ForeignKey(entity = MessagesTable.class,
                    parentColumns = "messageID",
                    childColumns = "messageID",
                    onDelete = ForeignKey.CASCADE)
                    })

public class ChatsTable {
    @PrimaryKey
    @NonNull
    private int ChatID;


    @NonNull
    private String username;

    private int messageID;

    public ChatsTable(int chatID, @NonNull String username, int messageID) {
        ChatID = chatID;
        this.username = username;
        this.messageID = messageID;
    }

    public int getChatID() {
        return ChatID;
    }

    public void setChatID(int chatID) {
        ChatID = chatID;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
    }

    public int getMessageID() {
        return messageID;
    }

    public void setMessageID(int messageID) {
        this.messageID = messageID;
    }
}
