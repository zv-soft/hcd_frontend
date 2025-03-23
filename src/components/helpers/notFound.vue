<template>
  <div class="not-found-card">
    <img
      src="../../assets/undraw_void_wez2.svg"
      alt="404 Not Found"
      class="not-found-image"
    />
    <p>El <strong>{{ entidadNombre }}</strong> no existe.</p>

    <h1>404 Not Found</h1>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  entidadNombre: { type: String, required: true }, // Nombre de la entidad (ejemplo: "usuario", "producto")
  entidadId: { type: [String, Number], default: null }, // ID opcional
});

const route = useRoute();
const id = computed(() => props.entidadId || route.params.id); // Usa el ID de prop o de la URL
</script>

<style scoped>
.not-found-card {
  padding: 16px;
  background-color: #f8f9fa; /* Color de fondo suave */
  color: #495057; /* Texto oscuro pero no muy fuerte */
  border-left: 5px solid #dc3545; /* Borde rojo discreto a la izquierda */
  border-radius: 6px;
  font-size: 16px;
  text-align: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05); /* Sombra ligera */
  max-width: 400px;
  margin: 20px auto;
}

.not-found-image {
  width: 100px;
  margin-bottom: 10px;
  opacity: 0.8; /* Imagen más sutil */
}
</style>
