package com.helloworld;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

import static android.app.Activity.RESULT_OK;

/**
 * Created by codengshubo on 2017/8/29.
 */

public class ExampleInterface extends ReactContextBaseJavaModule {

    ReactApplicationContext rnContext;

    private final ActivityEventListener aeListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            super.onActivityResult(activity, requestCode, resultCode, data);
            Log.i("ActivityEventListener", "requestCode=" + requestCode + ", resultCode=" + resultCode);
            if (requestCode == 8081 && resultCode == RESULT_OK) {
                String aMessage = "{\"peerNumber\":\"" + data.getStringExtra("peerNumber") + "\"}";
                rnContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", aMessage);
            }
        }
    };

    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        rnContext = reactContext;
        rnContext.addActivityEventListener(aeListener);
        Log.i("ExampleInterface", "rnContext.addActivityEventListener(aeListener)");
    }

    @Override
    public String getName() {
        return "ExampleInterface";
    }

    @ReactMethod
    public void handleMessage(String aMessage) {
        Log.i("ExampleInterface", "Received message from RN: " + aMessage);

        Intent intent = new Intent(rnContext, RnStartActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        rnContext.startActivityForResult(intent, 8081, new Bundle());
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("constantName", "constantValue");
        return constants;
    }
}
