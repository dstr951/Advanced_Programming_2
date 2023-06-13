package com.example.foochat.entities;


import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {UserTable.class, PersonTable.class, ChatsTable.class, MessagesTable.class}, version = 1)
public abstract class AppDB extends RoomDatabase{
    public abstract UserDao userDao();
    public abstract PersonDao personDao();
    public abstract ChatsDao chatsDao();
    public abstract MessagesDao messagesDao();

}
