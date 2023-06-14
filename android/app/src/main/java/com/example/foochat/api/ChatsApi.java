package com.example.foochat.api;

import androidx.lifecycle.MutableLiveData;

import com.example.foochat.entities.ChatsDao;
import com.example.foochat.entities.ChatsTable;
import com.example.foochat.entities.PersonTable;
import com.example.foochat.entities.UserDao;
import com.example.foochat.entities.UserTable;
import com.example.foochat.requestObjects.CreateChatReq;
import com.example.foochat.requestObjects.LoginUserReq;
import com.example.foochat.requestObjects.RegisterUserReq;
import com.example.foochat.requestObjects.SendMessageReq;
import com.example.foochat.responseObjects.CreateChatRes;
import com.example.foochat.responseObjects.GetAllChatsRes;
import com.example.foochat.responseObjects.GetAllMessagesRes;
import com.example.foochat.responseObjects.GetChatRes;
import com.example.foochat.responseObjects.GetUserInfoRes;
import com.example.foochat.responseObjects.SendMessageToChatRes;
import com.google.gson.Gson;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;
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

    private ChatsDao chatsDao;

    public ChatsApi(ChatsDao chatsDao) {
        retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:3001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceApi = retrofit.create(WebServiceApi.class);

        this.chatsDao = chatsDao;

    }

    public void createChat(String token, String username,
                           MutableLiveData<List<PersonTable>> persons,
                           MutableLiveData<List<ChatsTable>> chats){
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

    public void getAllChats(String token){
        Call<List<GetAllChatsRes>> call = webServiceApi.getAllChats("Bearer "+token);
        call.enqueue(new Callback<List<GetAllChatsRes>>() {
            @Override
            public void onResponse(Call<List<GetAllChatsRes>> call, Response<List<GetAllChatsRes>> response) {

                if(response.isSuccessful()){
                    List<GetAllChatsRes> allChatsRes = response.body();
                    //rest of logic with array of chats
                }
                else{

                }

            }

            @Override
            public void onFailure(Call<List<GetAllChatsRes>> call, Throwable t) {
                System.out.println("dsfghdf");
            }
        });
    }

    public void getChat(String token, int id){
        Call<GetChatRes> call = webServiceApi.getChat("Bearer "+token,id);
        call.enqueue(new Callback<GetChatRes>() {
            @Override
            public void onResponse(Call<GetChatRes> call, Response<GetChatRes> response) {
                if(response.isSuccessful()) {
                    GetChatRes chatRes = response.body();

                }
                else{

                }
            }

            @Override
            public void onFailure(Call<GetChatRes> call, Throwable t) {

            }
        });
    }

    public void deleteChat(String token, int id){
        Call<ResponseBody> call = webServiceApi.deleteChat("Bearer "+token, id);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                ResponseBody deletedChatRes = response.body();
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {

            }
        });
    }







}



