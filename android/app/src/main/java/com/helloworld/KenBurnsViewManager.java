package com.helloworld;

import android.graphics.drawable.Drawable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.flaviofaria.kenburnsview.KenBurnsView;

import java.io.IOException;

/**
 * Created by codengshubo on 2017/9/21.
 */

public class KenBurnsViewManager extends SimpleViewManager<KenBurnsView> {
    ThemedReactContext reactContext;

    @Override
    public String getName() {
        return "KenBurnsView";
    }

    @Override
    protected KenBurnsView createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        KenBurnsView kbView = new KenBurnsView(reactContext);
        try {
            kbView.setImageDrawable(Drawable.createFromStream(reactContext.getAssets().open("DaLian.jpg"), null));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return kbView;
    }

    @ReactProp(name = "imgSource")
    public void setImgSource(KenBurnsView kbView, String imgSource) {
        try {
            kbView.setImageDrawable(Drawable.createFromStream(reactContext.getAssets().open(imgSource), null));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
