export function isLoggedIn() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    
    return userLoggedIn === 'true';
  }