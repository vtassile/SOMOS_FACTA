import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";

export var CLAVES = {
	localstore: "cualquiera"
};

export var GOOGLE = {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "961411468477-320qj10tn0ulfvcr0t29l056ci4qan7i.apps.googleusercontent.com"
    )
  };
  
export var FACEBOOK =  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("514948119218004")
  };


