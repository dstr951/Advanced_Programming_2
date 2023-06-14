package com.example.foochat.api;

import com.example.foochat.requestObjects.SendMessageReq;
import com.example.foochat.responseObjects.GetAllMessagesRes;
import com.example.foochat.responseObjects.SendMessageToChatRes;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MessagesApi {

    Retrofit retrofit;
    WebServiceApi webServiceApi;

    public MessagesApi() {
        retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:3001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceApi = retrofit.create(WebServiceApi.class);
    }


    public void sendMessageToChat(String token, int id, String msg){
        Call<SendMessageToChatRes> call = webServiceApi.sendMessageToChat("Bearer "+token,id, new SendMessageReq(msg));
        call.enqueue(new Callback<SendMessageToChatRes>() {
            @Override
            public void onResponse(Call<SendMessageToChatRes> call, Response<SendMessageToChatRes> response) {
                if (response.isSuccessful()){
                    SendMessageToChatRes sentMessageRes = response.body();
                }
                else {

                }
            }

            @Override
            public void onFailure(Call<SendMessageToChatRes> call, Throwable t) {

            }
        });
    }

    public void getAllMessages(String token, int id){
        Call<List<GetAllMessagesRes>> call = webServiceApi.getAllMessages("Bearer "+token, id);
        call.enqueue(new Callback<List<GetAllMessagesRes>>() {
            @Override
            public void onResponse(Call<List<GetAllMessagesRes>> call, Response<List<GetAllMessagesRes>> response) {
                if(response.isSuccessful()){
                    List<GetAllMessagesRes> allMessagesRes = response.body();
                }
                else{

                }
            }

            @Override
            public void onFailure(Call<List<GetAllMessagesRes>> call, Throwable t) {

            }
        });
    }


}
