package com.helloworld;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class RnStartActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rn_start);

        Button closeBtn = (Button) findViewById(R.id.close);
        closeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("RnStartActivity", "View.OnClickListener.onClick() is called.");
                finish();
            }
        });
    }

    public void closeBtn_Click(View v) {
        Log.i("RnStartActivity", "RnStartActivity.closeBtn_Click() is called.");
        this.finish();
    }
}
