import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddProjectPage } from '../add-project/add-project';
import { ProjectProvider } from '../../providers/project/project';
import { HomePage } from '../home/home';
import { ViewProjectPage } from '../view-project/view-project';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  //Arrays
  ProjectArr = new Array();

  //varibles
  logInState
  constructor(public navCtrl: NavController, public navParams: NavParams, public hubs: ProjectProvider) {
    this.hubs.RetrieveProjectBrief().then((data: any) => {
      this.ProjectArr = data
      console.log(data)
      console.log(this.ProjectArr)   
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  goToAddproject() {
    this.navCtrl.push(AddProjectPage)
  }
  logOut() {
    this.hubs.logout().then(() => {
      this.navCtrl.push(HomePage, { out: 'logout' });
    }, (error) => {
      console.log(error.message);
    })
  }

  goToViewPage(name) {
    // console.log(this.orgArray)
    for (var x = 0; x < this.ProjectArr.length; x++) {
      if (name == this.ProjectArr[x].Requestingfunds) {
        this.navCtrl.push(ViewProjectPage, { orgObject: this.ProjectArr[x], loginState: this.ProjectArr });
        break;
      }
    }
  }

  

}
