package com.example.foochat.entities;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface PersonDao {

    @Query("SELECT * FROM Person")
    List<PersonTable> getAllPersons();

    @Query(("SELECT * FROM Person WHERE username = :username\n"))
    PersonTable getPerson(String username);

    @Insert
    void insert(PersonTable... person);

    @Update
    void update(PersonTable... person);

    @Delete
    void delete(PersonTable... person);

    @Query("DELETE FROM Person")
    void clearTable();
}
