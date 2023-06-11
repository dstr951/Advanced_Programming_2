package com.example.foochat.entities;


import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {UserTable.class}, version = 1)
public abstract class AppDB extends RoomDatabase{
    public abstract UserDao userDao();
}
