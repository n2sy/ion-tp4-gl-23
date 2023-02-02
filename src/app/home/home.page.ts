import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ListTasksService } from '../list-tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate;
  allTasks: any[] = [];
  showButton = true;

  constructor(
    private taskSer: ListTasksService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.currentDate = new Date();

    this.taskSer.getAllTasks().subscribe({
      next: (response: any[]) => {
        // this.allTasks = response;

        this.allTasks = [];
        for (const key in response) {
          response[key]['id'] = key;
          this.allTasks.push(response[key]);
        }
        console.log(this.allTasks);
      },
    });
  }

  changeChecked(task) {
    task.checked = !task.checked;
    this.taskSer.updateTask(task).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async presentAlert(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes vous sur de vouloir supprimer ce task ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.taskSer.deleteTask(id).subscribe({
              next: (response) => {
                this.ngOnInit();
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        },
        {
          text: 'Non',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  addNewTask(valueInput) {
    this.taskSer
      .addTask({
        text: valueInput,
        date: new Date(),
        checked: false,
      })
      .subscribe({
        next: (response) => {
          console.log('Task Added');
          this.toggleButton();
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  toggleButton() {
    this.showButton = !this.showButton;
  }
}
