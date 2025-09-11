package com.skymet.indianweather;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
      @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set navigation bar color to black
        getWindow().setNavigationBarColor(
          getColor(android.R.color.black)
        );
    }
}
