import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,LoadingController } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
import { SignupPage } from '../signup/signup';
import { ListPage } from '../list/list';


declare var firebase;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
email;
password;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl:LoadingController,public project :ProjectProvider) {

  }

  SignIn() {
    if(this.email == "" || this.password== "" || this.email == null || this.password == null  ){
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        title: 'Incorrect data',
        subTitle: "Please enter your details to log in",
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Signing in...',
        duration: 40000
      });
      loading.present();
      this.project.SignIn(this.email, this.password).then((user: any) => {
        this.project.checkVerification().then((data: any) => {
          if (data == 0) {
            const alert = this.alertCtrl.create({
              cssClass: "myAlert",
              subTitle: "We have sent you a verification mail, Please activate your account with the link in the mail",
              buttons: ['OK'],
            });
            loading.dismiss()
            alert.present();
          }
          else if (data == 1) {
            loading.dismiss()
            this.navCtrl.setRoot(ListPage);
          }
        })
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: error.message,
          buttons: ['OK'],
        });
        loading.dismiss()
        alert.present();
      })
    }

  }
  gotoRegister(){
    this.navCtrl.push(SignupPage)
  }

  forgotpassword(PlaceObject: object) {
    return new Promise((resolve, reject) => {
      if (this.email == null || this.email == undefined) {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          title: 'Forgot your password?',
          message: "We just need your registered email address to reset your password.",
          inputs: [
            {
              name: 'email',
              type:'email',
              placeholder: 'Your email address'
            },
          ],
          buttons: [
            { 
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Send',
              handler: data => {
                console.log('Saved clicked');

                this.project.forgetPassword(data.email).then(()=>{
                  console.log("forgot password works");
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    title: 'Confirmation',
                    subTitle: "Please check your email to reset your password",
                    buttons: ['OK']
                  });
                  alert.present();
                }, Error => {
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    subTitle: Error.message,
                    buttons: ['OK'],
        
                  });
                  alert.present();
                  resolve()
                });
              }
            }
          ],
        });
        alert.present();
      }
      else if (this.email != null || this.email != undefined) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          const alert = this.alertCtrl.create({
            cssClass: "myAlert",
            title: 'Password request Sent',
            subTitle: "We've sent you and email with a reset link, go to your email to recover your account.",
            buttons: ['OK'],

          });
          alert.present();
          resolve()
        }, Error => {
          const alert = this.alertCtrl.create({
            cssClass: "myAlert",
            subTitle: Error.message,
            buttons: ['OK'],

          });
          alert.present();
          resolve()
        });
      }
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: error.message,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ],
      });
      alert.present();
    })
  }
}
