
import { useContext } from 'react';
import { ToastContext } from './ToastContextOnly.js';
export const useToast = () => useContext(ToastContext);
