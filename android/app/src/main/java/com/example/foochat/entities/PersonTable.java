package com.example.foochat.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "Person")
public class PersonTable {
    @PrimaryKey
    @NonNull
    private String username;
    private String displayName;
    private String password;
    private int profilePic;

    public PersonTable(@NonNull String username, String displayName, String password, int profilePic) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.profilePic = profilePic;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(int profilePic) {
        this.profilePic = profilePic;
    }
}
