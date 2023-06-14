package com.example.foochat.LiveDataTypes;

public class ChatsData {
    private int chatId;
    private PersonData person;
    private String lastMessage;

    public ChatsData(int chatId, PersonData person, String lastMessage) {
        this.chatId = chatId;
        this.person = person;
        this.lastMessage = lastMessage;
    }

    public ChatsData(int chatId, String username, String displayName,  String base64Img ,String lastMessage) {
        this.chatId = chatId;
        this.lastMessage = lastMessage;
        this.person = new PersonData(username,displayName,base64Img);
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public PersonData getPerson() {
        return person;
    }

    public void setPerson(PersonData person) {
        this.person = person;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }
}
