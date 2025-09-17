/**
 * Debug utility to fix first_login status for all existing Supabase users
 * This should be run once to clean up any existing users
 */

import { Injectable } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class FirstLoginFixer {

  constructor(private supabaseService: SupabaseService) {}

  async fixAllUsersFirstLoginStatus(): Promise<void> {
    console.log('🔧 Starting first_login status fix for all users...');

    try {
      // Get all profiles from Supabase
      const { data: profiles, error } = await this.supabaseService.client
        .from('profiles')
        .select('*');

      if (error) {
        console.error('❌ Error fetching profiles:', error);
        return;
      }

      console.log(`📊 Found ${profiles?.length || 0} profiles to check`);

      if (!profiles || profiles.length === 0) {
        console.log('ℹ️ No profiles found to update');
        return;
      }

      // Update logic:
      // - If user has completed an action (joined a group, created a group), set first_login = false
      // - Otherwise, set first_login = true for new users

      let updatedCount = 0;
      const updatePromises = profiles.map(async (profile) => {
        try {
          // Check if user has performed any "first login complete" actions
          const hasCompletedActions = await this.checkIfUserCompletedActions(profile.id, profile.role);

          const shouldBeFirstLogin = !hasCompletedActions;

          // Only update if the current value is different from what it should be
          if (profile.first_login !== shouldBeFirstLogin) {
            console.log(`🔄 Updating user ${profile.email}: first_login ${profile.first_login} -> ${shouldBeFirstLogin}`);

            const { error: updateError } = await this.supabaseService.client
              .from('profiles')
              .update({
                first_login: shouldBeFirstLogin,
                updated_at: new Date().toISOString()
              })
              .eq('id', profile.id);

            if (updateError) {
              console.error(`❌ Error updating profile ${profile.email}:`, updateError);
            } else {
              updatedCount++;
            }
          } else {
            console.log(`✅ User ${profile.email} already has correct first_login status: ${profile.first_login}`);
          }
        } catch (error) {
          console.error(`❌ Error processing profile ${profile.email}:`, error);
        }
      });

      await Promise.all(updatePromises);

      console.log(`✅ First login status fix completed. Updated ${updatedCount} profiles.`);

    } catch (error) {
      console.error('❌ Error in fixAllUsersFirstLoginStatus:', error);
    }
  }

  private async checkIfUserCompletedActions(userId: string, role: string): Promise<boolean> {
    try {
      switch (role) {
        case 'player':
          // Check if player has joined any groups
          const { data: membershipData } = await this.supabaseService.client
            .from('group_members')
            .select('id')
            .eq('user_id', userId)
            .limit(1);
          return (membershipData && membershipData.length > 0);

        case 'group-admin':
          // Check if group admin has created any groups
          const { data: groupData } = await this.supabaseService.client
            .from('groups')
            .select('id')
            .eq('admin_id', userId)
            .limit(1);
          return (groupData && groupData.length > 0);

        case 'super-admin':
          // Super admins are considered to have completed first login by default
          // since they likely have system access
          return true;

        default:
          return false;
      }
    } catch (error) {
      console.error(`Error checking completed actions for user ${userId}:`, error);
      return false; // Default to first-time user if we can't determine
    }
  }

  // Method to manually mark a specific user as having completed first login
  async markUserAsReturning(email: string): Promise<boolean> {
    try {
      console.log(`🔄 Marking user ${email} as returning user (first_login = false)...`);

      const { error } = await this.supabaseService.client
        .from('profiles')
        .update({
          first_login: false,
          updated_at: new Date().toISOString()
        })
        .eq('email', email);

      if (error) {
        console.error(`❌ Error updating user ${email}:`, error);
        return false;
      }

      console.log(`✅ Successfully marked user ${email} as returning user`);
      return true;
    } catch (error) {
      console.error(`❌ Error in markUserAsReturning for ${email}:`, error);
      return false;
    }
  }

  // Method to manually mark a specific user as first-time user
  async markUserAsFirstTime(email: string): Promise<boolean> {
    try {
      console.log(`🔄 Marking user ${email} as first-time user (first_login = true)...`);

      const { error } = await this.supabaseService.client
        .from('profiles')
        .update({
          first_login: true,
          updated_at: new Date().toISOString()
        })
        .eq('email', email);

      if (error) {
        console.error(`❌ Error updating user ${email}:`, error);
        return false;
      }

      console.log(`✅ Successfully marked user ${email} as first-time user`);
      return true;
    } catch (error) {
      console.error(`❌ Error in markUserAsFirstTime for ${email}:`, error);
      return false;
    }
  }

  // Method to list all users and their current first_login status
  async listAllUsersFirstLoginStatus(): Promise<void> {
    try {
      console.log('📋 Listing all users and their first_login status...');

      const { data: profiles, error } = await this.supabaseService.client
        .from('profiles')
        .select('email, role, first_login, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching profiles:', error);
        return;
      }

      if (!profiles || profiles.length === 0) {
        console.log('ℹ️ No profiles found');
        return;
      }

      console.log('\n📊 Current user first_login status:');
      console.log('='.repeat(80));
      profiles.forEach(profile => {
        const status = profile.first_login ? '🆕 First-time' : '🔄 Returning';
        console.log(`${status} | ${profile.role.padEnd(12)} | ${profile.email.padEnd(30)} | Created: ${profile.created_at?.substring(0, 10)}`);
      });
      console.log('='.repeat(80));

      const firstTimeCount = profiles.filter(p => p.first_login).length;
      const returningCount = profiles.length - firstTimeCount;
      console.log(`\n📈 Summary: ${firstTimeCount} first-time users, ${returningCount} returning users\n`);

    } catch (error) {
      console.error('❌ Error in listAllUsersFirstLoginStatus:', error);
    }
  }
}

// Usage instructions:
// 1. Import this service in your component
// 2. Inject FirstLoginFixer in constructor
// 3. Call the appropriate method:
//    - this.firstLoginFixer.listAllUsersFirstLoginStatus() - to see current status
//    - this.firstLoginFixer.fixAllUsersFirstLoginStatus() - to auto-fix all users
//    - this.firstLoginFixer.markUserAsReturning('email@example.com') - to manually mark user as returning
//    - this.firstLoginFixer.markUserAsFirstTime('email@example.com') - to manually mark user as first-time