package com.example.foochat.api;

import com.example.foochat.entities.UserDao;
import com.example.foochat.entities.UserTable;
import com.example.foochat.requestObjects.LoginUserReq;
import com.example.foochat.requestObjects.RegisterUserReq;
import com.example.foochat.responseObjects.GetUserInfoRes;
import com.example.foochat.responseObjects.LoginUserRes;
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

public class UserApi {
    private UserDao userDao;
    Retrofit retrofit;
    WebServiceApi webServiceApi;

    public UserApi(UserDao userDao) {
        this.userDao = userDao;
        retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:3001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceApi = retrofit.create(WebServiceApi.class);
    }

    public void registerUser(String username, String displayName, String password, String profilePic) {
        Call<ResponseBody> call = webServiceApi.registerUser(
                new RegisterUserReq(username, displayName, password, profilePic));
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    //register was successful, save user information to local db.

                    //userDao.insert(new UserTable(username, displayName, password, 1, null, ""));
                }
                //register failed.
                else {
                    try {
                        String msg = response.errorBody().string();
                        Gson gson = new Gson();
                        Type type = new com.google.gson.reflect.TypeToken<Map<String, Object>>() {}.getType();
                        Map<String, Object> map = gson.fromJson(msg, type);

                        // Access the map entries
                        for (Map.Entry<String, Object> entry : map.entrySet()) {
                            String key = entry.getKey();
                            Object value = entry.getValue();
                            System.out.println("Key: " + key + ", Value: " + value);
                        }

                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }

                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                System.out.println(t.toString());
            }
        });
    }

    public void login(String username, String password) {
        Call<ResponseBody> call = webServiceApi.login(new LoginUserReq(username, password));
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    ResponseBody customResponse = response.body();
                    //userDao.updateServerToken(username,customResponse.getResponse());
                    try {
                        String token = customResponse.string();
//                        new Thread(()->{
//                            userDao.updateServerToken(username,token);
//                        }).start();
                    } catch (IOException e) {
                        //throw new RuntimeException(e);
                    }
                    // Access and use the properties of the CustomResponse object
                    // ...
                } else {
                    // Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                // Handle network errors or request failures
                System.out.println("sdfgsdfg");
            }
        });

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
}
