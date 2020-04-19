export const authHeader = () => {
  // Return authorization header with JWT
  const user = JSON.parse(localStorage.getItem('user') || '');

  console.log({ user });

  if (user && user.token) {
    return { 'authorization': `Bearer ${user.token}` };
  } else {
    return {};
  }
}
