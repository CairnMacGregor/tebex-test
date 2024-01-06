import { useToast } from 'vue-toast-notification';

export default function useCustomToast() {
  let showToast;
  const $toast = useToast();

  if (typeof window !== 'undefined') {
    showToast = (message, type = 'success', position = 'top-right', duration = 3500) => {
      $toast.open({
        message: message,
        type: type,
        position: position,
        duration: duration,
      });
    };
  } else {
    showToast = () => {
      return false;
    };
  }
  return { showToast };
}