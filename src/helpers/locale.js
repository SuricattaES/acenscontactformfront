// Get browser language with contry code
export function getBrowserLanguage() {
    let _language = navigator.languages.find(x => x.includes('-'));
    let userLanguage = (navigator.language || navigator.userLanguage).includes('-');
  
    if (_language) {
      return _language.split('-')[1];
    } else if (userLanguage) {
      return userLanguage.split('-')[1];
    }
    return undefined;
  }
  