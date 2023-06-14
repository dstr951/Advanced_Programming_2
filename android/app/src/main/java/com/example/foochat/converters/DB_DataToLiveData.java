package com.example.foochat.converters;

import com.example.foochat.LiveDataTypes.ChatsData;
import com.example.foochat.LiveDataTypes.PersonData;
import com.example.foochat.entities.ChatsTable;
import com.example.foochat.entities.PersonTable;

public class DB_DataToLiveData {

    public static PersonData toPersonData(PersonTable personTable){
        return new PersonData(personTable.getUsername(),
                personTable.getDisplayName(),
                personTable.getProfilePic());
    }
    public static ChatsData toChatData(PersonTable personTable, ChatsTable chatsTable){
        return new ChatsData(chatsTable.getChatID(),
                toPersonData(personTable),
                chatsTable.getLastMessage());
    }
}
