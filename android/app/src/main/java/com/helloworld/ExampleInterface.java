package com.helloworld;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
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

public class ExampleInterface extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {

    ReactApplicationContext rnContext;
    Promise interfacePromise;

    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        rnContext = reactContext;
        reactContext.addActivityEventListener(this);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "ExampleInterface";
    }

    /**
     * Callback Mechanism
     *
     * @param aMessage
     * @param rnCallback
     */
    @ReactMethod
    public void handleMessageCallback(String aMessage, Callback rnCallback) {
        Log.i("ExampleInterface", "********** Received message from RN: " + aMessage);

        Intent intent = new Intent(rnContext, RnStartActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        rnContext.startActivityForResult(intent, 8081, new Bundle());
        getCurrentActivity().startActivityForResult(intent, 8081, new Bundle());

        rnCallback.invoke("AndroidMsg");
    }

    /**
     * Promise Mechanism
     *
     * @param aMessage
     */
    @ReactMethod
    public void handleMessagePromise(String aMessage, Promise interfacePromise) {
        Log.i("ExampleInterface", "********** Received message from RN: " + aMessage);
        this.interfacePromise = interfacePromise;

        Intent intent = new Intent(rnContext, RnStartActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        rnContext.startActivityForResult(intent, 8081, new Bundle());
        getCurrentActivity().startActivityForResult(intent, 8081, new Bundle());
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("constantName", "constantValue");
        return constants;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        Log.i(this.getClass().getName(), "********** ExampleInterface.onActivityResult() is called.");
        if (requestCode == 8081 && resultCode == RESULT_OK) {
            String aMessage = "{\"peerNumber\":\"" + data.getStringExtra("peerNumber") + "\"}";

            // Message Mechanism
            rnContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", aMessage);

//            // Callback Mechanism
//            interfacePromise.resolve(aMessage);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        Log.i(this.getClass().getName(), "********** ExampleInterface.onNewIntent() is called.");
    }


    @Override
    public void onHostResume() {
        Log.i(this.getClass().getName(), "********** ExampleInterface.onHostResume() is called.");
    }

    @Override
    public void onHostPause() {
        Log.i(this.getClass().getName(), "********** ExampleInterface.onHostPause() is called.");
    }

    @Override
    public void onHostDestroy() {
        Log.i(this.getClass().getName(), "********** ExampleInterface.onHostDestroy() is called.");
    }
}
