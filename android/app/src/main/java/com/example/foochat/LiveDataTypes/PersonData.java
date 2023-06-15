package com.example.foochat.LiveDataTypes;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

public class PersonData {
    private String username;
    private String displayName;
    private Bitmap profilePic;

    public PersonData(String username, String displayName, String base64Img) {
        this.username = username;
        this.displayName = displayName;
        base64Img = base64Img.substring(base64Img.indexOf(",") + 1);
        byte[] imageBytes = Base64.decode(base64Img, Base64.DEFAULT);
        this.profilePic = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);;
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

    public Bitmap getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(Bitmap profilePic) {
        this.profilePic = profilePic;
    }
}
