// src/lib/google.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogle() {
  GoogleSignin.configure({
    webClientId: '906458769387-gslsoem95p8mabqmc2up8g2812pgj6g3.apps.googleusercontent.com',
    offlineAccess: true,
  });
}
