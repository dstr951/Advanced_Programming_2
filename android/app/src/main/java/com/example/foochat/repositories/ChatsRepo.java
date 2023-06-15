package com.example.foochat.repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.foochat.LiveDataTypes.ChatsData;
import com.example.foochat.api.ChatsApi;
import com.example.foochat.converters.DB_DataToLiveData;
import com.example.foochat.entities.AppDB;
import com.example.foochat.entities.ChatsDao;
import com.example.foochat.entities.ChatsTable;
import com.example.foochat.entities.PersonDao;
import com.example.foochat.entities.PersonTable;

import java.util.LinkedList;
import java.util.List;

public class ChatsRepo {
    private MutableLiveData<List<ChatsData>> chats;

    private ChatsApi chatsApi;
    private ChatsDao chatsDao;
    private PersonDao personDao;

    public ChatsRepo(AppDB db) {
        chats = new MutableLiveData<>();
        chats.setValue(new LinkedList<>());
        chatsDao = db.chatsDao();
        personDao = db.personDao();
        chatsApi = new ChatsApi(chatsDao, personDao);
    }

    //for test only!
    public MutableLiveData<List<ChatsData>> getChats() {
        return chats;
    }

    public void createChat(String token, String username){
        //TODO check that chat with current user (from local DB) doesn't exist yet.
        new Thread(()->{
            chatsApi.createChat(token,username,chats);
        }).start();
    }

    public LiveData<List<ChatsData>> getAllChats(String token){
        //get all chats from local db
        List<ChatsData> chatListFromDB = new LinkedList<>();
        for ( ChatsTable row:chatsDao.getAllChats()) {
            chatListFromDB.add(DB_DataToLiveData.toChatData(
                    personDao.getPerson(row.getUsername()),row));
        }
        chats.setValue(chatListFromDB);
        //now update the chats list from the server
        new Thread(()->{
            chatsApi.getAllChats(token,chats);
        }).start();
    return chats;
    }

    public void deleteChat(String token, int chatID){
        //update local DB
        //ChatsData toBedeleted = DB_DataToLiveData.
        personDao.delete(personDao.getPerson(chatsDao.getChatByID(chatID).getUsername()));
        chatsDao.delete(chatsDao.getChatByID(chatID));

    }





}
