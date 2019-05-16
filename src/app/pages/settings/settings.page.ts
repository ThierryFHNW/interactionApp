import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
// this is the controller now, no function in brackets
export class SettingsPage implements OnInit {

    constructor(private fb: FormBuilder, private settingsService: SettingsService) {
    }

    profileForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        address: this.fb.group({
            street: [''],
            city: [''],
            state: [''],
            zip: ['']
        }),
    });

/*    get project() {
        return this.settingsForm.get('project');
    }

    get pyWall() {
        return this.settingsForm.get('pywall');
    }

    get syncServer() {
        return this.settingsForm.get('syncserver');
    }


    settingsForm = this.fb.group({
        project: [''],
        pywall: [''],
        syncserver: [''],
    })

    onSubmit() {
        console.log(this.settingsForm.value);
    }*/

    ngOnInit(): void {

    }
}
