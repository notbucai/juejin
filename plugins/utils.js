import moment from './utils/moment'

export default ({ }, inject) => {
  inject('util', { moment });
}