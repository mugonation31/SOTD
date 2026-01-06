import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonNote,
  IonIcon,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  createOutline,
  addCircleOutline,
} from 'ionicons/icons';
import { GroupService } from '../../../../core/services/group.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonList,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonNote,
    IonIcon,
    IonLabel,
    IonSpinner,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class CreateGroupPage {
  groupForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private router: Router,
    private toastService: ToastService
  ) {
    addIcons({
      peopleOutline,
      createOutline,
      addCircleOutline,
    });
    this.initForm();
  }

  private initForm() {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onCreateGroup() {
    if (this.groupForm.valid) {
      try {
        this.isLoading = true;
        const formValue = this.groupForm.value;

        this.groupService
          .createGroup({
            name: formValue.name,
            description: `${formValue.name} - A prediction group`,
          })
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.toastService.showToast(
                'Group created successfully!',
                'success'
              );
              this.router.navigate(['/group-admin/dashboard'], {
                replaceUrl: true,
              });
            },
            error: (error: unknown) => {
              this.isLoading = false;
              console.error('Error creating group:', error);
              this.toastService.showToast(
                'Failed to create group. Please try again.',
                'danger'
              );
            },
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error creating group:', error);
        this.toastService.showToast(
          'Failed to create group. Please try again.',
          'danger'
        );
      }
    } else {
      this.toastService.showToast(
        'Please fill in all required fields.',
        'warning'
      );
    }
  }
}
