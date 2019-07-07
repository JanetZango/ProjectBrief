import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { ProjectProvider } from '../../providers/project/project';
import { HomePage } from '../home/home';


declare var firebase;
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
email;
password;
username;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public project :ProjectProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  
  SignUp() {
    console.log(this.email,this.password,this.username)
    if(this.email == "" || this.password== "" || this.email == null || this.password == null  || this.username == "" || this.username == null){
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        title: 'Incorrect data',
        subTitle: "Please enter your details to log in",
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.project.Signup(this.email,this.password,this.username).then(() => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: "We have sent you a link on your email, Please verify your email",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
            this.navCtrl.push(HomePage)

              }
            },
          ]
        });
        alert.present();

      }, (error) => {
        console.log(error.message);
      })
    }

    
  }

}
