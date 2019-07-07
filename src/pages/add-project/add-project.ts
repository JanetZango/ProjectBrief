import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
import { compareDates } from 'ionic-angular/util/datetime-util';
import { ListPage } from '../list/list';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AddProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
})
export class AddProjectPage {
  projectbrief;
  funds;
  deadline;
  Completion
  name;
  constructor(public navCtrl: NavController, public navParams: NavParams,public hubs : ProjectProvider,public toastCtrl: ToastController) {
    this.hubs.getcurrentLoggedIn().then(data=>{
    console.log(data)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProjectPage');
  }
  UploadProfilePic(event:any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
        reader.onload = (event: any) => {
          this.projectbrief = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    
    }
  }
  addProject(){
  this.hubs.addProject(this.name,this.funds,this.deadline,this.Completion,this.projectbrief).then((data)=>{
    console.log(data)
    this.navCtrl.push(ListPage);
    const toast = this.toastCtrl.create({
      message: 'Project was added successfully',
      duration: 3000
    });
    toast.present();
  })
  }


}
