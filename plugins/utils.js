import moment from './utils/moment'
import avatars from './utils/avatars'

export default ({ }, inject) => {
  inject('util', { moment, avatars });
}