import firebase from 'firebase';
import 'firebase/firestore';

export class Firebase{
    constructor(){
        this._config = {
            apiKey: "AIzaSyAAjvCjiKyz1L38nT9b_hbKdm1RrTf2dEQ",
            authDomain: "whatsapp-clone-b6161.firebaseapp.com",
            projectId: "whatsapp-clone-b6161",
            storageBucket: "whatsapp-clone-b6161.appspot.com",
            messagingSenderId: "385857761105",
            appId: "1:385857761105:web:dca8df8cd79a6d40d02d70"
        };

        this.init();
    }

    init(){
        if (!window._initializedFirebase){ 
            firebase.initializeApp(this._config);
            firebase.firestore().settings({timestampsInSnapshots: true});
            window._initializedFirebase = true;
        }
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    initAuth(){
        return new Promise((s, f)=>{
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result){
                let token = result.credential.accessToken;
                let user = result.user;
                s({user, token});
            }).catch(function(err){f(err)});
        });
    }
}