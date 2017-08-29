package com.helloworld;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by codengshubo on 2017/8/29.
 */

public class ExampleInterface extends ReactContextBaseJavaModule {

    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ExampleInterface";
    }

    @ReactMethod
    public void handleMessage(String aMessage) {
        Log.i("ExampleInterface", "received message from RN: " + aMessage);
    }
}
