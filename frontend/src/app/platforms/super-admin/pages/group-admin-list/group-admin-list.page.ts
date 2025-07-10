import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonSearchbar,
  IonBadge,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonInput,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  eyeOutline,
  createOutline,
  trashOutline,
  shieldOutline,
  personOutline,
  timeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  cameraOutline,
  mailOutline,
  callOutline,
  businessOutline,
  calendarOutline,
  peopleOutline,
  closeOutline,
  imageOutline,
  saveOutline,
  informationCircleOutline,
  openOutline,
  personCircleOutline, cloudUploadOutline } from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface GroupAdmin {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  createdAt: Date;
  groupCount: number;
  permissions: string[];
  profilePicture?: string;
  phone?: string;
  role?: string;
  lastActivity?: {
    action: string;
    timestamp: Date;
  }[];
  associatedGroups?: {
    id: string;
    name: string;
    role: string;
  }[];
}

interface GroupDetails {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  createdAt: Date;
  status: 'active' | 'inactive';
  adminRole: string;
}

@Component({
  selector: 'app-group-admin-list',
  templateUrl: './group-admin-list.page.html',
  styleUrls: ['./group-admin-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonBadge,
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonSegment,
    IonSegmentButton,
    IonInput,
  ],
})
export class GroupAdminListPage implements OnInit {
  selectedImage: string | null = null;
  isEditingContact = false;
  editingAdmin: GroupAdmin | null = null;
  selectedGroup: GroupDetails | null = null;
  selectedAdmin: GroupAdmin | null = null;
  searchTerm = '';
  statusFilter = 'all';
  sortBy = 'name';
  profileSection = 'info';

  admins: GroupAdmin[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'active',
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      groupCount: 3,
      permissions: ['manage_users', 'view_reports', 'edit_settings'],
      phone: '+1 234 567 8900',
      role: 'Group Admin',
      lastActivity: [
        {
          action: 'Updated group settings',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          action: 'Added new member',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
      ],
      associatedGroups: [
        {
          id: 'g1',
          name: 'Premier League Predictions A',
          role: 'Group Admin',
        },
        {
          id: 'g2',
          name: 'Premier League Predictions B',
          role: 'Group Admin',
        },
        {
          id: 'g3',
          name: 'Premier League Predictions C',
          role: 'Group Admin',
        },
      ],
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      groupCount: 2,
      permissions: ['manage_users', 'view_reports'],
      phone: '+1 234 567 8901',
      role: 'Group Admin',
      lastActivity: [
        {
          action: 'Approved new player request',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
      ],
      associatedGroups: [
        {
          id: 'g4',
          name: 'Premier League Predictions D',
          role: 'Group Admin',
        },
        {
          id: 'g5',
          name: 'Premier League Predictions E',
          role: 'Group Admin',
        },
      ],
    },
  ];

  filteredAdmins: GroupAdmin[] = [];

  constructor(private toastService: ToastService) {
    addIcons({timeOutline,eyeOutline,shieldOutline,trashOutline,personCircleOutline,cameraOutline,mailOutline,callOutline,createOutline,calendarOutline,peopleOutline,closeOutline,cloudUploadOutline,saveOutline,informationCircleOutline,openOutline,personOutline,checkmarkCircleOutline,closeCircleOutline,businessOutline,imageOutline,});
  }

  ngOnInit() {
    this.filteredAdmins = [...this.admins];
  }

  filterAdmins() {
    this.filteredAdmins = this.admins.filter((admin) => {
      const matchesSearch =
        !this.searchTerm ||
        admin.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.statusFilter === 'all' || admin.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort the filtered admins
    this.filteredAdmins.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'groups':
          return b.groupCount - a.groupCount;
        default:
          return 0;
      }
    });
  }

  async viewDetails(admin: GroupAdmin) {
    this.selectedAdmin = admin;
  }

  async editPermissions(admin: GroupAdmin) {
    // TODO: Implement permissions editing
    await this.toastService.showToast(
      'Permissions editing coming soon',
      'warning'
    );
  }

  async toggleStatus(admin: GroupAdmin) {
    const newStatus = admin.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activated' : 'deactivated';

    try {
      admin.status = newStatus;
      this.filterAdmins();
      await this.toastService.showToast(
        `Admin account ${action} successfully`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast(
        `Failed to ${action} admin account`,
        'error'
      );
    }
  }

  async removeAdmin(admin: GroupAdmin) {
    try {
      this.admins = this.admins.filter((a) => a.id !== admin.id);
      this.filterAdmins();
      await this.toastService.showToast(
        'Admin removed successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to remove admin', 'error');
    }
  }

  async showActivityLog() {
    await this.toastService.showToast('Activity log coming soon', 'warning');
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        await this.toastService.showToast(
          'Please select an image file',
          'error'
        );
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        await this.toastService.showToast(
          'Image size should be less than 5MB',
          'error'
        );
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadProfilePicture() {
    if (!this.selectedImage || !this.selectedAdmin) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the admin's profile picture
      this.selectedAdmin.profilePicture = this.selectedImage;

      await this.toastService.showToast(
        'Profile picture updated successfully',
        'success'
      );
      this.cancelImageUpload();
    } catch (error) {
      await this.toastService.showToast(
        'Failed to update profile picture',
        'error'
      );
    }
  }

  cancelImageUpload() {
    this.selectedImage = null;
  }

  editContactInfo() {
    if (!this.selectedAdmin) return;

    // Create a copy of the admin for editing
    this.editingAdmin = {
      ...this.selectedAdmin,
      phone: this.selectedAdmin.phone || '',
      role: this.selectedAdmin.role || '',
    };
    this.isEditingContact = true;
  }

  async saveContactInfo() {
    if (!this.editingAdmin || !this.selectedAdmin) return;

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the admin's contact information
      this.selectedAdmin.phone = this.editingAdmin.phone;
      this.selectedAdmin.role = this.editingAdmin.role;

      await this.toastService.showToast(
        'Contact information updated successfully',
        'success'
      );
      this.cancelContactEdit();
    } catch (error) {
      await this.toastService.showToast(
        'Failed to update contact information',
        'error'
      );
    }
  }

  cancelContactEdit() {
    this.isEditingContact = false;
    this.editingAdmin = null;
  }

  async viewGroup(group: any) {
    try {
      // TODO: Replace with actual API call
      // Simulating API call to get group details
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.selectedGroup = {
        id: group.id,
        name: group.name,
        description: 'Sample group description',
        memberCount: Math.floor(Math.random() * 50) + 1,
        createdAt: new Date(),
        status: 'active',
        adminRole: group.role,
      };
    } catch (error) {
      await this.toastService.showToast(
        'Failed to load group details',
        'error'
      );
    }
  }

  async navigateToGroup(group: GroupDetails) {
    // TODO: Replace with actual navigation
    await this.toastService.showToast(
      'Navigating to group details...',
      'success'
    );
    this.selectedGroup = null;
  }
}
