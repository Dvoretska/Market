const languageValue = localStorage.getItem('language') || navigator.language.replace('-', '_');
let currentLanguage = null;
if (languageValue) {
  currentLanguage = {locale: languageValue, language: languageValue.split('_')[0]}
} else {
  currentLanguage = {locale: 'ru_RU', language: 'ru'}
}
export default currentLanguage
