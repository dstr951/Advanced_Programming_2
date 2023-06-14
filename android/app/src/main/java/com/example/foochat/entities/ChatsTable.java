package com.example.foochat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.PrimaryKey;
@Entity(tableName = "chats", foreignKeys = @ForeignKey(entity = PersonTable.class,
                    parentColumns = "username",
                    childColumns = "username",
                    //if the username from the personTable is deleted so is the chat.
                    onDelete = ForeignKey.CASCADE)
                    )

public class ChatsTable {
    @PrimaryKey
    private int chatID;


    @NonNull
    private String username;

    private String lastMessage;


    public ChatsTable(int chatID, @NonNull String username, String lastMessage) {
        this.chatID = chatID;
        this.username = username;
        this.lastMessage = lastMessage;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public int getChatID() {
        return chatID;
    }

    public void setChatID(int chatID) {
        this.chatID = chatID;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
    }
}
