<template>
  <div class="step-content">
    <div class="row g-4">

      <div
          v-for="option in options"
          :key="option.id"
          class="col-md-4"
      >
        <div
            class="card radio-card"
            :class="{ active: entryMode === option.id }"
            @click="setEntryMode(option.id)"
        >
          <div class="card-body d-flex align-items-start gap-3">

            <!-- Hidden radio for accessibility -->
            <input
                type="radio"
                name="entry_mode"
                class="form-check-input d-none"
                :checked="entryMode === option.id"
            />

            <div>
              <KTIcon
                  v-if="option.id === 0"
                  icon-name="click"
                  icon-type="outline"
                  :icon-class="entryMode === 0 ? 'text-primary' : ''"
                  style="font-size: 40px"
              />
              <KTIcon
                  v-else-if="option.id === 1"
                  icon-name="calendar"
                  icon-type="outline"
                  :icon-class="entryMode === 1 ? 'text-primary' : ''"
                  style="font-size: 40px"
              />
              <KTIcon
                  v-else
                  icon-name="flag"
                  icon-type="outline"
                  :icon-class="entryMode === 2 ? 'text-primary' : ''"
                  style="font-size: 40px"
              />

              <h6 class="mb-1 mt-3">{{ option.title }}</h6>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import KTIcon from '@/core/helpers/kt-icon/KTIcon.vue'

/**
 * Props (v-model)
 */
const props = defineProps<{
  modelValue: {
    entry_mode: number | null
  }
}>()

const emit = defineEmits(['update']);
/**
 * Two-way computed binding
 */
const entryMode = computed<number | null>({
  get: () => props.modelValue.entry_mode,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      entry_mode: value,
    })
  },
})


/**
 * Options
 */
type Option = {
  id: number
  title: string
}

const options: Option[] = [
  {
    id: 0,
    title: 'On Event Trigger',
  },
  {
    id: 1,
    title: 'At Fixed Time',
  },
  {
    id: 2,
    title: 'On Flow Exit',
  },
]

/**
 * Methods
 */
const setEntryMode = (id: number) => {
  entryMode.value = id
  emit('update')
}
</script>

<style scoped>
.radio-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #e5e7eb;
}

.radio-card:hover {
  border-color: #2196f3;
}

.radio-card.active {
  border-color: #2196f3;
  background-color: #eef2ff;
}
</style>
