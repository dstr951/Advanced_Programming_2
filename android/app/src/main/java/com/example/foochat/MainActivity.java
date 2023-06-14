package com.example.foochat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.database.sqlite.SQLiteConstraintException;
import android.os.Bundle;
import android.util.Log;

import com.example.foochat.LiveDataTypes.ChatsData;
import com.example.foochat.api.ChatsApi;
import com.example.foochat.api.UserApi;
import com.example.foochat.entities.AppDB;
import com.example.foochat.entities.ChatsDao;
import com.example.foochat.entities.ChatsTable;
import com.example.foochat.entities.MessagesDao;
import com.example.foochat.entities.MessagesTable;
import com.example.foochat.entities.PersonDao;
import com.example.foochat.entities.PersonTable;
import com.example.foochat.entities.UserDao;
import com.example.foochat.entities.UserTable;
import com.example.foochat.repositories.ChatsRepo;

import java.util.Date;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private AppDB db;
    private UserTable userTable;
    private UserDao userDao;
    private PersonDao personDao;
    private ChatsDao chatsDao;
    private MessagesDao messagesDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // create db
        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "FooDB").allowMainThreadQueries().build();

        ChatsRepo chatsRepo = new ChatsRepo(db);
        String tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNjg2NTE1OTQxfQ.JA9a7kngkxppbt4emNT2fTAoM7inQ3KnLjPLSGyT8LM";
        chatsRepo.getChats().observe(this, chats ->{
            if(!chats.isEmpty()){
                for(ChatsData chat : chats){
                    chat.getChatId();
                }
            }
        });
        chatsRepo.createChat(tempToken,"user2");


    }

}