
import { Injectable } from '@angular/core';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
declare var firebase;
/*
  Generated class for the ProjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectProvider {

  //arrays
  projctArr = new Array();
  //varibles
  stayLoggedIn
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    console.log('Hello ProjectProvider Provider');
  }


  checkOrgAuthState() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          this.stayLoggedIn = 1
        }
        else {
          this.stayLoggedIn = 0
        }
        resolve(this.stayLoggedIn)
      })
    })

  }
  SignIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  checkVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user.emailVerified == false) {
          this.logout();
          resolve(0)
        }
        else {
          resolve(1)
        }
      })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut();
      resolve()
    })
  }

  Signup(email, password, name) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Signing up...',
        duration: 4000000
      });
      loading.present();
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
        var user = firebase.auth().currentUser
        firebase.database().ref("App_Users/" + user.uid).set({
          name: name,
          email: email,
          downloadurl: "../../assets/imgs/Defaults/default.jfif",
        })
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
          // Email sent.
        }).catch(function (error) {
          // An error happened.
        });
        resolve();
        loading.dismiss();
      }).catch((error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          cssClass: 'myAlert',
          subTitle: error.message,
          buttons: [
            {
              text: 'ok',
              handler: data => {
                // console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
        // console.log(error);
      })
    })
  }

  addProject(name,Requestingfunds, deadline, Completion, ProjectFile) {
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase.database().ref("ProjectBrief/" + user.uid).push({
        name:name,
        Requestingfunds: Requestingfunds,
        deadline: deadline,
        Completion: Completion,
        ProjectFile: ProjectFile,
        Amount:"",
        token:""
      })
      resolve()
    })
  }

  getcurrentLoggedIn() {
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase.database().ref("App_Users/" + user.uid).on("value", (data: any) => {
        let details = data.val();
        console.log(details)
      })
    })
  }
  RetrieveProjectBrief() {
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Loading data...',
        duration: 4000000
      });
      loading.present();
      firebase.database().ref("ProjectBrief").on("value", (data: any) => {
        let details = data.val();
        if( data.val() != null || data.val() !=undefined){
        let keys = Object.keys(data.val());
        console.log(keys)
          for (var i = 0; i < keys.length; i++) {
          firebase.database().ref("ProjectBrief/" + keys[i]).on("value", (data2: any) => {
             let values = data2.val();
             console.log(values)
             let inderKeys = Object.keys(values)
             console.log(inderKeys)
             for (var x = 0; x < inderKeys.length; x++) {
              let key = inderKeys[x];
              console.log(key)
              let obj = {
                Requestingfunds: values[key].Requestingfunds,
                deadline: values[key].deadline,
                Completion: values[key].Completion,
                ProjectFile: values[key].ProjectFile,
                token: values[key].token,
                Amount: values[key].Amount,
                name: values[key].name,
                k:key              
              }
              console.log(obj)
              this.projctArr.push(obj)
              console.log(this.projctArr)
              resolve(this.projctArr)
             }           
          })      
        }
        loading.dismiss();
      }
  
    })
  })
}
  updateStudent(Amount,token,key) {
    console.log(key)
    return new Promise((accpt, rej) => {
      console.log(key)
    firebase.database().ref("ProjectBrief/" + key).update({
      Amount: Amount,
      token:token
    })
  })
  }
  forgetPassword(email) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve();
      }, (error) => {
        reject(error)
      })

    })

  }

}
