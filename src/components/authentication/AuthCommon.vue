<script>
import buttonBar from '@/components/ButtonBar'
import inputStyle from '@/components/InputStyle'

export default {
  components: {
    buttonBar,
    inputStyle
  },
  created () {
    this.$store.dispatch('CLEAR_ERRORS')
  },
  computed: {
    iconLockPath () {
      return require('@/assets/lock.svg')
    },
    iconMeilPath () {
      return require('@/assets/meil.svg')
    },
    loading () {
      return this.$store.getters.getLoading
    },
    nonFieldErrors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.non_field_errors) {
        return this.$store.getters.getErrors.non_field_errors.join('\n')
      }
    },
    emailErrors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.email) {
        return this.$store.getters.getErrors.email.join('\n')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .auth-page-wrapper {
    font-family: 'Lato', Arial, sans-serif;
    background: #fcfcfc;
    box-shadow: inset 0 20px 50px -20px rgba(0,0,0,.06);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height:100vh;
    width: 100%;
  }
  .auth-box {
    border-radius: 8px;
    width: 50%;
    min-width: 220px;
    padding: 0;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
    background: #fff;
  }
  .auth-title {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;
    padding: 20px 26px 10px;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3),
               -1px 1px 1px rgba(0,0,0,0.9);
    color: #a087bc;
    position: relative;
    text-transform: uppercase;
  }
  .auth-title::before {
    content: "";
    width: 35%;
    height: 2px;
    background-color: rgba(0,0,0,0.9);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .auth-form-container {
    padding: 10px 26px 25px;
  }
  .input-component {
    margin-bottom: 25px;
  }
  .flexbox-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .auth-button {
    height: 40px;
    padding: 0 10px;
    border: none;
    border-radius: 8px;
    text-transform: uppercase;
    background-color: #7b4fad;
    color: #fff;
    cursor: pointer;
    margin-right: auto;
  }
  .auth-button:active {
    padding: 0 10px;
  }
  .link-change-route {
    font-size: 15px;
    color: #7b4fad;
  }
  .is-danger {
    font-size: 13px;
    color: white;
    background-color: red;
    text-align: center;
    margin-top: 10px;
    line-height: 25px;
    border-radius: 8px;
  }
  .link-back-home {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    .icon-back-home {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
  @media (max-width: 1024px) {
  .auth-box {
    width: 90%;
  }
  .auth-button {
    margin-bottom: 15px;
    width: 20%;
  }
  }
  @media (max-width: 769px) {
  .auth-box {
    width: 90%;
    margin-top: 10vh;
  }
  .flexbox-container {
    flex-direction: column;
  }
  .auth-button {
    margin-bottom: 15px;
    width: 50%;
  }
  .auth-title::before {
    width: 70%;
  }
  .auth-page-wrapper {
    align-items: flex-start;
  }
  }
</style>
