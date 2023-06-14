package com.example.foochat.converters;

import com.example.foochat.entities.PersonTable;
import com.example.foochat.responseObjects.CreateChatRes;

public class CreateChatConvert {

    public PersonTable convertToPerson(CreateChatRes res){
        PersonTable temp = new PersonTable(res.getUser().getUsername(),
                res.getUser().getDisplayName(),
                res.getUser().getProfilePic());
    }
}
