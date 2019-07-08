import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { HttpClient } from "@angular/common/http";
import { AlertController } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { ListPage } from '../list/list';

/**
 * Generated class for the ViewProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-project',
  templateUrl: 'view-project.html',
})
export class ViewProjectPage {
  //array
  getProjectDetails = new Array();
  loginState = this.navParams.get('loginState')


  //variables
  funds;
  deadline;
  completion
  projectbrief;
  key
  stripe_key = "pk_test_n47qQgW5Mf80nl9atiVSPSwC00uTrPCLVS"
  number;
  expMonth;
  expYear;
  cvc;
  Amount;
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams, private stripe: Stripe, private http: HttpClient, public alertCtrl: AlertController, public project: ProjectProvider,private document: DocumentViewer) {
    console.log(this.loginState)

    this.funds = this.loginState[0].Requestingfunds
    this.deadline = this.loginState[0].deadline
    this.completion = this.loginState[0].Completion
    this.projectbrief = this.loginState[0].ProjectFile
    this.user = this.loginState[0].user
    this.key = this.loginState[0].k

    console.log(this.loginState)
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ViewProjectPage');
  }

  // viewpdf(){
  //   const options: DocumentViewerOptions = {
  //     title: 'My PDF'
  //   }
    
  //   this.document.viewDocument('assets/myFile.pdf', 'application/pdf', options)
  // }


  payment() {
    this.stripe.setPublishableKey(this.stripe_key);

    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220',
      Amount: 500
    };

    this.stripe.createCardToken(card)
      .then(token => {
        this.getProjectDetails.push(this.loginState[0].token = token.id)
        console.log(this.loginState)
        console.log(this.getProjectDetails)
        console.log(card)
        console.log('payment successful')
      })
      .catch(error =>
        console.error(error));

  }

  showPrompt() {
    console.log(this.key)
    this.stripe.setPublishableKey(this.stripe_key);
    const prompt = this.alertCtrl.create({
      cssClass: "myAlert",
      title: 'Payment',
      message: "Enter your details to pay the payment",
      inputs: [
        {
          name:'number',
          placeholder: this.number
        },
        {
          name: 'expMonth',
          placeholder: this.expMonth
        },
        {
          name: 'expYear',
          placeholder: this.expYear
        },
        {
          name: 'cvc',
          placeholder: this.cvc
        },
        {
          name: 'Amount',
          placeholder: this.Amount
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
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            let card = {
              number: data.number,
              expMonth:  data.expMonth,
              expYear: data.expYear,
              cvc:  data.cvc,
            };
            this.stripe.createCardToken(card)
              .then(token => {
                this.getProjectDetails.push(this.loginState[0].token = token)
                console.log(token)
                console.log(this.getProjectDetails)
                console.log('Payment successful')
                this.project.updateStudent(data.Amount,token,this.key,this.user).then((data) => {
                  console.log('updated')
                  console.log(this.key)
                  this.getProjectDetails.length=0;
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    title: 'Confirmation',
                    subTitle: "The Payment has been made",
                    buttons: ['OK']
                  });
                  alert.present();
                })
              })
              .catch(error =>
                console.error(error));
          }
        }
      ]
    });
    prompt.present();
  }


  
  
  removeImage() {
    this.project.removeproject(this.key,this.user);
      // this.navCtrl.push(ListPage)

}

}