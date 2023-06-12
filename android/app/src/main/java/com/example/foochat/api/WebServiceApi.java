package com.example.foochat.api;

import com.example.foochat.requestObjects.CreateChatReq;
import com.example.foochat.requestObjects.LoginUserReq;
import com.example.foochat.requestObjects.RegisterUserReq;
import com.example.foochat.responseObjects.CreateChatRes;
import com.example.foochat.responseObjects.GetUserInfoRes;
import com.example.foochat.responseObjects.LoginUserRes;


import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;


public interface WebServiceApi {
    @POST("api/Users/")
    Call<ResponseBody> registerUser(@Body RegisterUserReq req);

    @POST("api/Tokens")
    Call<ResponseBody> login(@Body LoginUserReq req);

    @GET("api/Users/{username}")
    Call<GetUserInfoRes> getUserInfo(@Header("Authorization") String token, @Path("username") String username);

    @POST("api/Chats/")
    Call<CreateChatRes> createChat(@Header("Authorization") String token, @Body CreateChatReq req);
}
