export const parseSignupErrors = error => {
  switch (error.code) {
    case 'auth/email-already-in-use':
    case 'auth/invalid-email':
      // return { email: error.message }
      return { _error: error.message }
      break
    case 'auth/weak-password':
      // return { password: error.message }
      return { _error: error.message }
      break
    case 'auth/operation-not-allowed':
      return { _error: error.message }
      break
  }
}
