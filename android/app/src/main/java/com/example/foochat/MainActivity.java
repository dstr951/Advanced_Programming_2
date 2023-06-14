package com.example.foochat;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.database.sqlite.SQLiteConstraintException;
import android.os.Bundle;
import android.util.Log;

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
import com.example.foochat.responseObjects.GetAllChatsRes;

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
        // create all dao's
        userDao = db.userDao();
        personDao = db.personDao();
        chatsDao = db.chatsDao();
        messagesDao = db.messagesDao();
        userDao.clearAll();
        //personDao.clearTable();
        //chatsDao.clearTable();
        messagesDao.clearTable();
        ChatsRepo chatsRepo = new ChatsRepo(new ChatsApi(), chatsDao);
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNjg2NTE1OTQxfQ.JA9a7kngkxppbt4emNT2fTAoM7inQ3KnLjPLSGyT8LM";
        chatsRepo.getAllChats(token).observe(this, allChats ->{

            if(!allChats.isEmpty()) {
                for (GetAllChatsRes chat: allChats
                     ) {
                    try {
                        personDao.insert(new PersonTable(chat.getUser().getUsername(), chat.getUser().getDisplayName(), 3));
                        ChatsTable temp = new ChatsTable(chat.getId(), chat.getUser().getUsername());
                        chatsDao.insert(temp);
                    } catch (Exception e) {
                    }
                }
            }
        });


    }

}