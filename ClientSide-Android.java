package cloudcode.singh.gursheesh.com.cloudcode;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;

import com.parse.FunctionCallback;
import com.parse.Parse;
import com.parse.ParseCloud;
import com.parse.ParseException;
import com.parse.ParseFile;
import com.parse.ParseObject;
import com.parse.SaveCallback;

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

//        HashMap<String, Object> params = new HashMap<>();
//
//        ParseCloud.callFunctionInBackground("cloudCodeTest", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: "  + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        HashMap<String, Object> params = new HashMap<>();
//        ParseCloud.callFunctionInBackground("moviesList", params, new FunctionCallback<ArrayList<ParseObject>>() {
//            @Override
//            public void done(ArrayList<ParseObject> list, ParseException e) {
//                if (e == null) {
////                    Log.d(TAG, "done: Response: "  + );
//                    for (int i = 0; i < list.size(); i++) {
//                        ParseObject object = list.get(i);
//                        Log.d(TAG, "done: Name = " + object.getString("name") );
//                        Log.d(TAG, "done: Duration = " + object.getNumber("duration") );
//                    }
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        Log.d(TAG, "onCreate: Long Movies List");

//        ParseCloud.callFunctionInBackground("longMoviesList", params, new FunctionCallback<ArrayList<ParseObject>>() {
//            @Override
//            public void done(ArrayList<ParseObject> list, ParseException e) {
//                if (e == null) {
////                    Log.d(TAG, "done: Response: "  + );
//                    for (int i = 0; i < list.size(); i++) {
//                        ParseObject object = list.get(i);
//                        Log.d(TAG, "done: Name = " + object.getString("name") );
//                        Log.d(TAG, "done: Duration = " + object.getNumber("duration") );
//                    }
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        ParseCloud.callFunctionInBackground("avgMovieDuration", params, new FunctionCallback<Double>() {
//            @Override
//            public void done(Double response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: "  + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        ParseCloud.callFunctionInBackground("profilePhotos", params, new FunctionCallback<Integer>() {
//            @Override
//            public void done(Integer response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: "  + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        ParseCloud.callFunctionInBackground("profilePhotos", params, new FunctionCallback<ArrayList<ParseObject>>() {
//            @Override
//            public void done(ArrayList<ParseObject> list, ParseException e) {
//                if (e == null) {
//                    for (int i = 0; i < list.size(); i++) {
//                        ParseObject object = list.get(i);
//                        Log.d(TAG, "done: " + object);
//
//                        //Parse File to image in ImageView
//                        ParseFile file = object.getParseFile("profile_photo");
//                        try {
//                            byte[] byteArray = file.getData();
//                            Bitmap bmp = BitmapFactory.decodeByteArray(byteArray, 0, byteArray.length);
//                            mImageView.setImageBitmap(Bitmap.createScaledBitmap(bmp, mImageView.getWidth(),
//                                    mImageView.getHeight(), false));
//                        } catch (ParseException e1) {
//                            e1.printStackTrace();
//                        }
//
//                    }
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

        //Put Tests
//        params.put("name","Gursheesh");
//        ParseCloud.callFunctionInBackground("cloudCodePutTest", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        params.put("name","Suryavansham");
//        params.put("duration",3.6);
//        ParseCloud.callFunctionInBackground("addMovie", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });


//        Passing ParseObject

//        IMPORTANT: Cannot Pass ParseObject

//        HashMap<String,ParseObject> params = new HashMap<>();
//
//        ParseObject movie = new ParseObject("Movies");
//
//        movie.put("name","PUBG");
//        movie.put("duration",0.4);
//
//        params.put("movie",movie);
//
//        ParseCloud.callFunctionInBackground("addMovie", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });


//       Passing ParseFile
//        SUCCESSFUL

//        final HashMap<String,ParseFile> params = new HashMap<>();
//
//        byte[] data = "This is a great Movie".getBytes();
//        final ParseFile file = new ParseFile("resume.txt", data);
//
//        file.saveInBackground(new SaveCallback() {
//            public void done(ParseException e) {
//                // If successful add file to user and signUpInBackground
//                if(null == e){
//
//                    params.put("file",file);
//
//                    ParseCloud.callFunctionInBackground("addFile", params, new FunctionCallback<String>() {
//                        @Override
//                        public void done(String response, ParseException e) {
//                            if (e == null) {
//                                Log.d(TAG, "done: Response: " + response);
//                            } else {
//                                Log.e(TAG, "done: Error: " + e.getMessage());
//                            }
//                        }
//                    });
//
//                }
//            }
//        });


//        ParseCloud.callFunctionInBackground("getAllTableNames", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//       ParseCloud.callFunctionInBackground("getAllTableRecords", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        ParseCloud.callFunctionInBackground("getAllTableNames", params, new FunctionCallback<Integer>() {
//            @Override
//            public void done(Integer response, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + response);
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        ParseCloud.callFunctionInBackground("getAllTableNames", params, new FunctionCallback<ArrayList<HashMap<String,String>>>() {
//            @Override
//            public void done(ArrayList<HashMap<String,String>> list, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + list);
//
//                    Log.d(TAG, "done: List ------");
//
//                    for (int i = 0; i < list.size(); i++) {
//                        Log.d(TAG, "done: Table " + i + " name = " + list.get(i).get("name"));
//                    }
//
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        HashMap<String, Object> params = new HashMap<>();
//        final String tableName = "Student";
//        params.put("tableName", tableName);
//
//        ParseCloud.callFunctionInBackground("getAllTableRecords", params, new FunctionCallback<ArrayList<HashMap<String, String>>>() {
//            @Override
//            public void done(ArrayList<HashMap<String, String>> list, ParseException e) {
//                if (e == null) {
//                    Log.d(TAG, "done: Response: " + list);
//
//                    Log.d(TAG, "done: List ------");
//
//                    for (int i = 0; i < list.size(); i++) {
//                        Log.d(TAG, "done: " + tableName + " " + i + " name = " + list.get(i).get("name"));
//                    }
//
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });

//        HashMap params = new HashMap();
//
//        params.put("name", "Iniesta");
//        params.put("age", 34);
//
//        ParseCloud.callFunctionInBackground("addStudentRecord", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//
//                    Log.d(TAG, "done: Response = " + response);
//
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });


/*        Not Working
        HashMap<String,ArrayList<HashMap>> params = new HashMap<>();

        ArrayList<HashMap> students = new ArrayList<>();

        HashMap student = new HashMap();
        student.put("name","Hazard");
        student.put("age",25);

        students.add(student);

        params.put("students",students);*/

//        HashMap<String,ArrayList> params = new HashMap<>();
//
//        ArrayList<String> names = new ArrayList<>();
//        names.add("Darren");
//        names.add("Gal");
//
//        ArrayList<Integer> ages = new ArrayList<>();
//        ages.add(40);
//        ages.add(18);
//
//        params.put("name" , names);
//        params.put("age", ages);
//
//        ParseCloud.callFunctionInBackground("addStudentRecords", params, new FunctionCallback<String>() {
//            @Override
//            public void done(String response, ParseException e) {
//                if (e == null) {
//
//                    Log.d(TAG, "done: Response = " + response);
//
//                } else {
//                    Log.e(TAG, "done: Error: " + e.getMessage());
//                }
//            }
//        });


    }
}
