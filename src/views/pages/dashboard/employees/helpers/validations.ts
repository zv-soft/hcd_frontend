import { ref } from "vue";

  export const titleRule = (inputName: string) => [
    (v: string) => {
      return !!v || `${inputName} es requerido`;
    },
  ];

  export const requiredNumberRule = (inputName: string, min:number) => [
    (v: string) => {
      return !!v.trim() || `${inputName} es requerido`;
    },
    (v: string) => {
      return !isNaN(Number(v)) || `${inputName} debe ser un número`;
    },
    (v: string) => {
      return v.length >= min || `${inputName} debe tener al menos ${min} digitos`;
    },
  ];
  export const emailRule = () => [
  (v: string) => {
    return !!v || "El email es requerido";
  },
  (v: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(v.trim()) || `Ingrese un Correo válido`;
  },
];

export const dobRule = () => [
  (v: string) => {
    return !!v || "La fecha de nacimiento es requerido";
  },
  (v: string) => {
    const emailRegex = /^\d{4}\-\d{2}\-\d{2}$/;
    return emailRegex.test(v.trim()) || `Ingrese una fecha valida`;
  },
];

export const dateRule = (value) => [
  (v: string) => {
    return !!v || `${value} es requerido`;
  },
  (v: string) => {
    const emailRegex = /^\d{4}\-\d{2}\-\d{2}$/;
    return emailRegex.test(v.trim()) || `${value} debe ser una fecha valida`;
  },
];
 export const passwordRule = ref([
  (v: string) => {
    return !!v || "El password es requerido";
  },
]);
 export const passwordConfirmationRule = ref([
  (v: string) => {
    return !!v || "La confirmación del password es requerido";
  },
]);


