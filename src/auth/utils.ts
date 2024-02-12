

/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  const user = localStorage.getItem('user');
  if(user!=null)
  {
      return true
  }
  else
  {
      return false
  }

}

export const getUserData = () => JSON.parse(localStorage.getItem('user')||'{}')
export const getRol = () => JSON.parse(localStorage.getItem('role')||'{}')



