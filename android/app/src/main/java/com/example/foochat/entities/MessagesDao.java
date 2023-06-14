package com.example.foochat.entities;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;
@Dao
public interface MessagesDao {
    @Query("SELECT * FROM Messages WHERE chatID = :chatID\n")
    List<MessagesTable> getAllMessagesOfChat(int chatID);

    @Insert
    void insert(MessagesTable... message);

    @Update
    void update(MessagesTable... message);

    @Delete
    void delete(MessagesTable... message);

    @Query("DELETE FROM Messages")
    void clearTable();
}
