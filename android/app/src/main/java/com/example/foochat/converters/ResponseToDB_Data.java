package com.example.foochat.converters;

import com.example.foochat.entities.ChatsTable;
import com.example.foochat.entities.PersonTable;
import com.example.foochat.responseObjects.CreateChatRes;

public class ResponseToDB_Data {

    public static PersonTable convertToPerson(CreateChatRes res){
        PersonTable temp = new PersonTable(res.getUser().getUsername(),
                res.getUser().getDisplayName(),
                res.getUser().getProfilePic());
        return temp;
    }

    public static ChatsTable convertToChat(CreateChatRes res){
        //when creating a chat the first message is always null.
        return new ChatsTable(res.getId(),res.getUser().getUsername(),null);
    }
}
