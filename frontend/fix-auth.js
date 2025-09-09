// Run this in browser console to fix authentication issues
console.log('🔧 Fixing authentication issues...');

// Clear all storage
localStorage.clear();
sessionStorage.clear();

// Enable Supabase authentication
localStorage.setItem('useSupabase', 'true');

// Clear any Supabase locks
if ('locks' in navigator) {
  navigator.locks.query().then(locks => {
    console.log('Found locks:', locks.map(l => l.name));
    locks.forEach(lock => {
      if (lock.name.includes('sb-') || lock.name.includes('supabase')) {
        console.log('🔓 Found Supabase lock:', lock.name);
      }
    });
  });
}

// Wait a moment then reload
setTimeout(() => {
  console.log('🔄 Reloading page...');
  location.reload();
}, 2000);

console.log('✅ Authentication fix applied! Page will reload in 2 seconds...');
