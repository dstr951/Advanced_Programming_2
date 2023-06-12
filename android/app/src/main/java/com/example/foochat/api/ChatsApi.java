package com.example.foochat.api;

import com.example.foochat.entities.UserDao;
import com.example.foochat.entities.UserTable;
import com.example.foochat.requestObjects.CreateChatReq;
import com.example.foochat.requestObjects.LoginUserReq;
import com.example.foochat.requestObjects.RegisterUserReq;
import com.example.foochat.responseObjects.CreateChatRes;
import com.example.foochat.responseObjects.GetUserInfoRes;
import com.google.gson.Gson;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class ChatsApi {
    Retrofit retrofit;
    WebServiceApi webServiceApi;

    public ChatsApi() {
        retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:3001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceApi = retrofit.create(WebServiceApi.class);
    }
    public void getUserInfo(String token, String username){
        Call<GetUserInfoRes> call = webServiceApi.getUserInfo("Bearer "+token, username);
        call.enqueue(new Callback<GetUserInfoRes>() {
            @Override
            public void onResponse(Call<GetUserInfoRes> call, Response<GetUserInfoRes> response) {
                if(response.isSuccessful()){
                    GetUserInfoRes userInfoRes = response.body();

                }
            }

            @Override
            public void onFailure(Call<GetUserInfoRes> call, Throwable t) {
                System.out.println("sdfgs");

            }
        });
    }

    public void createChat(String token, String username){
        CreateChatReq  req = new CreateChatReq();
        req.setUsername(username);
        Call<CreateChatRes> call = webServiceApi.createChat("Bearer "+token, req);
        call.enqueue(new Callback<CreateChatRes>() {
            @Override
            public void onResponse(Call<CreateChatRes> call, Response<CreateChatRes> response) {
                if(response.isSuccessful()){
                    CreateChatRes res = response.body();
                    //rest of logic with the res
                }
                else{
                    //logic when an error happens
                }
            }

            @Override
            public void onFailure(Call<CreateChatRes> call, Throwable t) {
                System.out.println("dsfghdf");

            }
        });
    }



}



