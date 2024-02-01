export function checkPattern() {

  /**
   * check email validity
   * @param email typed in email
   * @returns validity
   */
  function checkEmailValidity (email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  /**
   * check password validity
   * @param password typed in password 
   * @returns validity
   */
  function checkPasswordValidity(password: string) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password);
  }

  return {
    checkEmailValidity,
    checkPasswordValidity
  }
};