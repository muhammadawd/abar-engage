<template>
  <div class="user-properties-section bg-white border rounded p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-1 text-capitalize">User properties</h5>
        <small class="text-muted">{{ properties.length }} User properties</small>
      </div>
      <button
          class="btn btn-sm btn-link text-secondary"
          @click="toggleCollapse"
      >
        <i :class="['bi', isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']"></i>
      </button>
    </div>

    <div v-show="!isCollapsed">
      <PropertyFilter
          v-for="property in properties"
          :key="property.id"
          :property="property"
          @remove="$emit('remove-property', property.id)"
          @update="updateProperty"
      />

      <button
          class="btn btn-link text-primary p-0"
          @click="$emit('add-property')"
      >
        <i class="bi bi-plus"></i> Add user property
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PropertyFilter from './PropertyFilter.vue';

interface UserProperty {
  id: string;
  name: string;
  filterBy: string;
  operator: string;
  value: string;
}

export default defineComponent({
  name: 'UserPropertiesSection',
  components: {
    PropertyFilter
  },
  props: {
    properties: {
      type: Array as () => UserProperty[],
      required: true
    }
  },
  emits: ['add-property', 'remove-property', 'update:properties'],
  setup(props, { emit }) {
    const isCollapsed = ref(false);

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const updateProperty = (id: string, field: string, value: any) => {
      const updatedProperties = props.properties.map(p =>
          p.id === id ? { ...p, [field]: value } : p
      );
      emit('update:properties', updatedProperties);
    };

    return {
      isCollapsed,
      toggleCollapse,
      updateProperty
    };
  }
});
</script>

<style scoped>
.user-properties-section {
  background-color: #f8f9fa;
}
</style>