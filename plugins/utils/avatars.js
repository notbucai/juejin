
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-male-sprites";
const options = {};
const avatars = new Avatars(sprites(options));

function init(id) {
  return avatars.create(id);
}

export default {
  init
}