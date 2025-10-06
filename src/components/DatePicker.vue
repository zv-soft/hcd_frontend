<template>
  <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
    <template v-slot:activator="{ props }">
      <v-text-field
        :name="name"
        :prepend-inner-icon="prependIcon"
        :placeholder="placeholder"
        :label="label"
        :class="fieldClass"
        :required="required"
        :rules="rules"
        :model-value="modelValue"
        :variant="variant"
        :disabled="disabled"
        readonly
        v-bind="props"
      >
      </v-text-field>
    </template>
    <v-date-picker
      v-model="datePicker"
      @update:model-value="updateDate"
      no-title
      scrollable
    >
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  modelValue?: string | null
  name?: string
  label?: string
  placeholder?: string
  prependIcon?: string
  fieldClass?: string
  required?: boolean
  rules?: any[]
  variant?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  label: '',
  placeholder: '1991-01-01',
  prependIcon: 'mdi-calendar',
  fieldClass: 'mb-2',
  required: false,
  rules: () => [],
  variant: 'outlined',
  disabled: false
})

const emit = defineEmits<Emits>()

const menu = ref(false)
const datePicker = ref<Date | null>(null)

// Watch for changes in modelValue to update the date picker
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    // Parse date correctly to avoid timezone issues
    const [year, month, day] = newValue.split('-')
    datePicker.value = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  } else {
    datePicker.value = null
  }
}, { immediate: true })

function updateDate(date: Date | null) {
  if (date) {
    // Format date as YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    
    emit('update:modelValue', formattedDate)
    menu.value = false
  }
}
</script>
