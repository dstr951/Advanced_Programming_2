package com.example.foochat.repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.foochat.api.ChatsApi;
import com.example.foochat.entities.ChatsDao;
import com.example.foochat.entities.ChatsTable;
import com.example.foochat.responseObjects.GetAllChatsRes;
import com.example.foochat.responseObjects.GetChatRes;

import java.util.ArrayList;
import java.util.List;

public class ChatsRepo {
    private ChatsApi chatsApi;
    private ChatsDao chatsDao;

    private MutableLiveData<List<GetAllChatsRes>> chats;

    public ChatsRepo(ChatsApi chatsApi, ChatsDao chatsDao) {
        this.chatsApi = chatsApi;
        this.chatsDao = chatsDao;
        this.chats = new MutableLiveData<>();
    }

    public LiveData<List<GetAllChatsRes>> getAllChats(String token){
        List<ChatsTable> temp = chatsDao.getAllChats();
        List<GetAllChatsRes> localDB = new ArrayList<>();
        for (ChatsTable i: temp) {
            GetAllChatsRes chatRes = new GetAllChatsRes();
            chatRes.setId(i.getChatID());
        }
        chats.setValue(localDB);
        chatsApi.getAllChats(token, chats);
        return chats;
    }
}
