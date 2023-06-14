package com.example.foochat.responseObjects;

public class RegisterUserRes {
    private int status;
    private String tittle;

    public RegisterUserRes(int status, String tittle) {
        this.status = status;
        this.tittle = tittle;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }
}
