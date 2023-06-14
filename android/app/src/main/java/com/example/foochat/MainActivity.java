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
        personDao.clearTable();
        chatsDao.clearTable();
        messagesDao.clearTable();
        // create userTable row element
        UserTable user1 = new UserTable("user1","steve","Asdf1234",1,null,"");
        PersonTable person1 = new PersonTable(user1.getUsername(), user1.getDisplayName(),user1.getProfilePic());
        PersonTable person2 = new PersonTable("user2", "steve2", 1);

        userDao.insert(user1);
        personDao.insert(person1);
        personDao.insert(person2);
        chatsDao.insert(new ChatsTable(1,person2.getUsername(),null));

        messagesDao.insert(new MessagesTable(1,1,person1.getUsername(),"hello friend!",new Date()));
        messagesDao.insert(new MessagesTable(2,1,person2.getUsername(),"hello to you too!",new Date()));
        List<MessagesTable> messages = messagesDao.getAllMessagesOfChat(1);
        //checking that if a chat is deleted than all messages corosponding to that chat are 'automatically' deleted as well
        chatsDao.delete(chatsDao.getChat(1));
        messages = messagesDao.getAllMessagesOfChat(1);


        userDao.delete(user1);
        UserTable temp = userDao.index();
        userDao.insert(user1);

        try {
            userDao.insert(user1);
        } catch (SQLiteConstraintException e) {
            e.getCause();
            // Handle the exception (e.g., display an error message)
        }
        temp = userDao.index();
        userDao.updateServerToken("user1", "sdfbsts");
        temp =  userDao.index();
       String token = temp.getServerToken();

    }

}