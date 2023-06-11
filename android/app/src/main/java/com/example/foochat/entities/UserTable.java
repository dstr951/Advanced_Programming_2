/**
 * this class should hold all current logged in user information. if user isn't logged data must be
 * uploaded to local db
 */

package com.example.foochat.entities;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
@Entity(tableName = "User")
public class UserTable {
       @PrimaryKey
       @NonNull
    private String username;
    private String displayName;
    private String password;
    private int profilePic;
    @Nullable
    private String serverToken;
    private String appToken;

    public UserTable(@NonNull String username, String displayName, String password, int profilePic, @Nullable String serverToken, String appToken) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.profilePic = profilePic;
        this.serverToken = serverToken;
        this.appToken = appToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
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

    public String getServerToken() {
        return serverToken;
    }

    public void setServerToken(String serverToken) {
        this.serverToken = serverToken;
    }

    public String getAppToken() {
        return appToken;
    }

    public void setAppToken(String appToken) {
        this.appToken = appToken;
    }
}
