package com.example.foochat.api;

import androidx.lifecycle.MutableLiveData;

import com.example.foochat.LiveDataTypes.ChatsData;
import com.example.foochat.converters.DB_DataToLiveData;
import com.example.foochat.converters.ResponseToDB_Data;
import com.example.foochat.entities.ChatsDao;
import com.example.foochat.entities.ChatsTable;
import com.example.foochat.entities.PersonDao;
import com.example.foochat.entities.PersonTable;
import com.example.foochat.responseObjects.CreateChatRes;
import com.example.foochat.responseObjects.GetAllChatsRes;
import com.example.foochat.requestObjects.CreateChatReq;
import com.example.foochat.responseObjects.GetChatRes;

import java.util.LinkedList;
import java.util.List;

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
    private PersonDao personDao;

    public ChatsApi(ChatsDao chatsDao, PersonDao personDao) {
        retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:3001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceApi = retrofit.create(WebServiceApi.class);

        this.chatsDao = chatsDao;
        this.personDao = personDao;

    }

    public void createChat(String token, String username,
                           MutableLiveData<List<ChatsData>> chats){
        CreateChatReq req = new CreateChatReq();
        req.setUsername(username);
        Call<CreateChatRes> call = webServiceApi.createChat("Bearer "+token, req);
        call.enqueue(new Callback<CreateChatRes>() {
            @Override
            public void onResponse(Call<CreateChatRes> call, Response<CreateChatRes> response) {
                if(response.isSuccessful()){
                    //get the response body from the server
                    CreateChatRes res = response.body();
                    //convert the response to a row in personTable, chatsTable
                    PersonTable tempPerson = ResponseToDB_Data.convertToPerson(res);
                    ChatsTable tempChat = ResponseToDB_Data.convertToChat(res);
                    // insert the new created chat and person to the local db.
                    personDao.insert(tempPerson);
                    chatsDao.insert(tempChat);
                    // update the live data
                    List<ChatsData> tempChats = chats.getValue();
                    tempChats.add(DB_DataToLiveData.toChatData(tempPerson,tempChat));
                    chats.postValue(tempChats);
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

    public void getAllChats(String token, MutableLiveData<List<ChatsData>> chats){
        Call<List<GetAllChatsRes>> call = webServiceApi.getAllChats("Bearer "+token);
        call.enqueue(new Callback<List<GetAllChatsRes>>() {
            @Override
            public void onResponse(Call<List<GetAllChatsRes>> call, Response<List<GetAllChatsRes>> response) {

                if(response.isSuccessful()){
                    List<GetAllChatsRes> allChatsRes = response.body();
                    chatsDao.clearTable();
                    personDao.clearTable();
                    List<ChatsData> updatedChatList = new LinkedList<>();
                    for (GetAllChatsRes res: allChatsRes) {
                        PersonTable tempPerson = ResponseToDB_Data.convertToPerson(res);
                        ChatsTable tempChat = ResponseToDB_Data.convertToChat(res);
                        personDao.insert(tempPerson);
                        chatsDao.insert(tempChat);
                        updatedChatList.add(DB_DataToLiveData.toChatData(tempPerson,tempChat));
                    }
                    chats.postValue(updatedChatList);
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



