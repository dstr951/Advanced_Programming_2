package com.example.foochat.repositories;

import androidx.lifecycle.MutableLiveData;

import com.example.foochat.api.ChatsApi;
import com.example.foochat.entities.AppDB;
import com.example.foochat.entities.ChatsDao;
import com.example.foochat.entities.ChatsTable;
import com.example.foochat.entities.PersonTable;

import java.util.LinkedList;
import java.util.List;

public class ChatsRepo {
    private MutableLiveData<List<ChatsTable>> chats;
    private MutableLiveData<List<PersonTable>> persons;

    private ChatsApi chatsApi;
    private ChatsDao chatsDao;

    public ChatsRepo(AppDB db) {
        chats = new MutableLiveData<>();
        chats.setValue(new LinkedList<>());
        persons = new MutableLiveData<>();
        persons.setValue(new LinkedList<>());
        chatsDao = db.chatsDao();
        chatsApi = new ChatsApi(chatsDao);
    }




}
