import Vue from 'vue';
import Toast from './components/Alert/Toast.vue'

const ToastVm = Vue.extend(Toast);

function show(options) {
  const ToastComponent = new ToastVm({ el: document.createElement('div') });
  
  ToastComponent.message = options.message;
  ToastComponent.handleShow();

  document.documentElement.appendChild(ToastComponent.$el);

  setTimeout(() => {
    ToastComponent.handleHide();
  }, 2000);
}

export default show;