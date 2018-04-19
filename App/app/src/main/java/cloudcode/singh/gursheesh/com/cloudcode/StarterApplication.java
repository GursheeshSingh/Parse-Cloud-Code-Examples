/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
package cloudcode.singh.gursheesh.com.cloudcode;

import android.app.Application;
import android.util.Log;

import com.parse.Parse;
import com.parse.ParseACL;
import com.parse.ParseUser;


public class StarterApplication extends Application {

  private static final String TAG = "StarterApplication";
  
  @Override
  public void onCreate() {
    super.onCreate();

    Log.d(TAG, "onCreate: Parse initializing");
    
    // Enable Local Datastore.
    Parse.enableLocalDatastore(this);

    // Add your initialization code here
    Parse.initialize(new Parse.Configuration.Builder(getApplicationContext())
            .applicationId(getString(R.string.application_id))
            .clientKey(getString(R.string.client_key))
            .server(getString(R.string.server))
            .build()
    );

    ParseUser.logOut();

    ParseACL defaultACL = new ParseACL();
    defaultACL.setPublicReadAccess(true);
    defaultACL.setPublicWriteAccess(true);
    ParseACL.setDefaultACL(defaultACL, true);

    Log.d(TAG, "onCreate: parse initializing stopping");
    
  }

}
