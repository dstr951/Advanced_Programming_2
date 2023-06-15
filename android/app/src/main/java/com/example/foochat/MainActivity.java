package com.example.foochat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.os.Bundle;

import com.example.foochat.LiveDataTypes.ChatsData;
import com.example.foochat.entities.AppDB;
import com.example.foochat.entities.ChatsDao;
import com.example.foochat.entities.MessagesDao;
import com.example.foochat.entities.PersonDao;
import com.example.foochat.entities.UserDao;
import com.example.foochat.entities.UserTable;
import com.example.foochat.repositories.ChatsRepo;


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
        //chatsRepo.createChat(tempToken,"user2");
        chatsRepo.getAllChats(tempToken).observe(this, chats ->{
            if(!chats.isEmpty()){
                for(ChatsData chat : chats){
                    chat.getChatId();
                }
            }
        });


    }

}