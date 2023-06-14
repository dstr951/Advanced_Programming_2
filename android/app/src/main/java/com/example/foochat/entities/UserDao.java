package com.example.foochat.entities;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface UserDao {
    @Query("SELECT * FROM User")
    UserTable index();

    @Query("UPDATE User SET serverToken = :token WHERE username = :username\n")
    void updateServerToken(String username, String token);

    @Insert
    void insert(UserTable... user);

    @Update
    void update(UserTable... user);

    @Delete
    void delete(UserTable... user);

    @Query("DELETE FROM User")
    void clearAll();
}
