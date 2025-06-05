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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonRange,
  IonSpinner,
  IonBadge,
} from '@ionic/angular/standalone';
import { NgIf, CurrencyPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  cashOutline,
  trophyOutline,
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonRange,
    IonSpinner,
    IonBadge,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    CurrencyPipe,
  ],
})
export class CreateGroupPage {
  groupForm!: FormGroup;
  isLoading = false;
  currentMemberCount = 0;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private router: Router,
    private toastService: ToastService
  ) {
    addIcons({
      peopleOutline,
      cashOutline,
      trophyOutline,
      createOutline,
      addCircleOutline,
    });
    this.initForm();
  }

  private initForm() {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['casual', Validators.required],
      entryFee: [{ value: 10, disabled: true }],
    });

    // Listen to type changes to enable/disable entry fee
    this.groupForm.get('type')?.valueChanges.subscribe((type) => {
      const entryFeeControl = this.groupForm.get('entryFee');
      if (type === 'prize') {
        entryFeeControl?.enable();
      } else {
        entryFeeControl?.disable();
      }
    });
  }

  onGroupTypeChange() {
    const type = this.groupForm.get('type')?.value;
    if (type === 'casual') {
      this.groupForm.get('entryFee')?.setValue(null);
      this.groupForm.get('entryFee')?.clearValidators();
    } else {
      this.groupForm.get('entryFee')?.setValidators(Validators.required);
    }
    this.groupForm.get('entryFee')?.updateValueAndValidity();
  }

  calculatePrize(position: number): number {
    const totalPool = this.calculateTotalPool();
    const distribution = this.getPrizeDistribution(this.currentMemberCount);
    return totalPool * distribution[position];
  }

  calculateTotalPool(): number {
    const entryFee = this.groupForm.get('entryFee')?.value || 0;
    return entryFee * this.currentMemberCount;
  }

  getPrizeDistribution(memberCount: number): { [key: number]: number } {
    if (memberCount <= 5) {
      return { 1: 1.0, 2: 0, 3: 0 };
    } else if (memberCount <= 10) {
      return { 1: 0.7, 2: 0.3, 3: 0 };
    } else if (memberCount <= 20) {
      return { 1: 0.5, 2: 0.3, 3: 0.2 };
    } else {
      return { 1: 0.45, 2: 0.35, 3: 0.2 };
    }
  }

  onEntryFeeChange(event: any) {
    const value = event.detail.value;
    const roundedValue = Math.round(value / 5) * 5;
    this.groupForm.patchValue({ entryFee: roundedValue }, { emitEvent: false });
  }

  onManualFeeInput(event: any) {
    let value = event.detail.value;

    if (value === '' || value === null) {
      this.groupForm.patchValue({ entryFee: null }, { emitEvent: false });
      const input = event.target;
      input.classList.remove('has-value');
      return;
    }

    value = Number(value);
    if (value < 1) value = 1;
    if (value > 100) value = 100;

    const input = event.target;
    input.classList.add('has-value');
    this.groupForm.patchValue({ entryFee: value }, { emitEvent: false });
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
            entryFee: formValue.type === 'prize' ? formValue.entryFee : 0,
            isPrivate: false,
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
