import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;

import com.parse.FunctionCallback;
import com.parse.ParseCloud;
import com.parse.ParseException;
import com.parse.ParseFile;
import com.parse.ParseObject;

import java.util.ArrayList;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    private ImageView mImageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mImageView = findViewById(R.id.imageView);

        HashMap<String, Object> params = new HashMap<>();
       ParseCloud.callFunctionInBackground("cloudCodeTest", params, new FunctionCallback<String>() {
           @Override
           public void done(String response, ParseException e) {
               if (e == null) {
                   Log.d(TAG, "done: Response: "  + response);
               } else {
                   Log.e(TAG, "done: Error: " + e.getMessage());
               }
           }
       });

       HashMap<String, Object> params = new HashMap<>();
       ParseCloud.callFunctionInBackground("moviesList", params, new FunctionCallback<ArrayList<ParseObject>>() {
           @Override
           public void done(ArrayList<ParseObject> list, ParseException e) {
               if (e == null) {
//                    Log.d(TAG, "done: Response: "  + );
                   for (int i = 0; i < list.size(); i++) {
                       ParseObject object = list.get(i);
                       Log.d(TAG, "done: Name = " + object.getString("name") );
                       Log.d(TAG, "done: Duration = " + object.getNumber("duration") );
                   }
               } else {
                   Log.e(TAG, "done: Error: " + e.getMessage());
               }
           }
       });

//        Log.d(TAG, "onCreate: Long Movies List");

        ParseCloud.callFunctionInBackground("longMoviesList", params, new FunctionCallback<ArrayList<ParseObject>>() {
            @Override
            public void done(ArrayList<ParseObject> list, ParseException e) {
                if (e == null) {
//                    Log.d(TAG, "done: Response: "  + );
                    for (int i = 0; i < list.size(); i++) {
                        ParseObject object = list.get(i);
                        Log.d(TAG, "done: Name = " + object.getString("name") );
                        Log.d(TAG, "done: Duration = " + object.getNumber("duration") );
                    }
                } else {
                    Log.e(TAG, "done: Error: " + e.getMessage());
                }
            }
        });

    //    ParseCloud.callFunctionInBackground("avgMovieDuration", params, new FunctionCallback<Double>() {
    //        @Override
    //        public void done(Double response, ParseException e) {
    //            if (e == null) {
    //                Log.d(TAG, "done: Response: "  + response);
    //            } else {
    //                Log.e(TAG, "done: Error: " + e.getMessage());
    //            }
    //        }
    //    });

    //    ParseCloud.callFunctionInBackground("profilePhotos", params, new FunctionCallback<Integer>() {
    //        @Override
    //        public void done(Integer response, ParseException e) {
    //            if (e == null) {
    //                Log.d(TAG, "done: Response: "  + response);
    //            } else {
    //                Log.e(TAG, "done: Error: " + e.getMessage());
    //            }
    //        }
    //    });

    //    ParseCloud.callFunctionInBackground("profilePhotos", params, new FunctionCallback<ArrayList<ParseObject>>() {
    //        @Override
    //        public void done(ArrayList<ParseObject> list, ParseException e) {
    //            if (e == null) {
    //                for (int i = 0; i < list.size(); i++) {
    //                    ParseObject object = list.get(i);
    //                    Log.d(TAG, "done: " + object);

    //                    //Parse File to image in ImageView
    //                    ParseFile file = object.getParseFile("profile_photo");
    //                    try {
    //                        byte[] byteArray = file.getData();
    //                        Bitmap bmp = BitmapFactory.decodeByteArray(byteArray, 0, byteArray.length);
    //                        mImageView.setImageBitmap(Bitmap.createScaledBitmap(bmp, mImageView.getWidth(),
    //                                mImageView.getHeight(), false));
    //                    } catch (ParseException e1) {
    //                        e1.printStackTrace();
    //                    }

    //                }
    //            } else {
    //                Log.e(TAG, "done: Error: " + e.getMessage());
    //            }
    //        }
    //    });

    }
}
