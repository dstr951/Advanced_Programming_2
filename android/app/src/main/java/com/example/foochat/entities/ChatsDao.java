package com.example.foochat.entities;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;
@Dao
public interface ChatsDao {

    @Query("SELECT * FROM chats")
    List<ChatsTable> getAllChats();

    @Query("SELECT * FROM chats WHERE chatID = :chatID\n")
    ChatsTable getChatByID(int chatID);

    @Query("SELECT * FROM chats WHERE username =:username\n")
    ChatsTable getChatByUsername(String username);
    @Insert
    void insert(ChatsTable... chat);

    @Update
    void update(ChatsTable... chat);

    @Delete
    void delete(ChatsTable... chat);

    @Query("DELETE FROM chats")
    void clearTable();

}
