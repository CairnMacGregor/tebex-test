import {useToast} from 'vue-toast-notification';

export default function useCustomToast() {
const $toast = useToast();

  const showToast = (message, type = 'success', position = 'top-right', duration = 3500) => {
    $toast.open({
        message: message,
        type: type,
        position: position,
        duration: duration,
    });
  };

  return { showToast };
}