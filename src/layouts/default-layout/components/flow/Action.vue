<template>
  <div
      class="transition position-relative"
      :class="data.animate ? 'animate-fade-in' : ''"
      style="min-width: 250px"
  >
    <div
        class="card action-card"
    >
      <div class="card-body p-4">
        <div class="d-flex align-items-center">
          <img
              v-if="data.icon"
              :src="getAssetPath('media/svg/' + data.icon)"
              alt=""
              width="40px"
          />
          &nbsp;&nbsp;&nbsp;
          <div>
            <div>
              <small class="text-dark">{{ data.title }}</small>
            </div>
            <small class="text-muted mb-1">{{ data.description }}</small>
          </div>
        </div>
      </div>
    </div>

    <!--    <div-->
    <!--        class="action-buttons bg-white btn-group position-absolute  end-25 start-25  p-1 d-flex gap-1">-->
    <!--      <button-->
    <!--          class="btn btn-sm btn-light bg-white"-->
    <!--          @click.stop="onDelete"-->
    <!--          title="Delete"-->
    <!--      >-->
    <!--        <i class="fa fa-trash"></i>-->
    <!--      </button>-->
    <!--      <button-->
    <!--          class="btn btn-sm btn-light"-->
    <!--          @click.stop="onEdit"-->
    <!--          title="Edit"-->
    <!--      >-->
    <!--        <i class="fa fa-edit"></i>-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import {getAssetPath} from "@/core/helpers/assets";

export default defineComponent({
  setup(_, {attrs}) {
    const data = attrs.data;
    const id = attrs.id;

    const editNode = inject("editNode") as Function;
    const deleteNode = inject("deleteNode") as Function;

    const onDelete = () => {
      if (deleteNode) deleteNode(id);
    };
    const onEdit = () => {
      if (editNode) editNode(id);
    };

    return {
      data,
      getAssetPath,
      onDelete,
      onEdit,
    };
  },
});
</script>

<style scoped>
/* إخفاء الأزرار افتراضيًا */
.action-buttons {
  bottom: -45px;
  display: none !important;
}

/* إظهار الأزرار عند الإشارة على .action-card */
.action-card:hover + .action-buttons,
.action-card:hover .action-buttons,
.action-buttons:hover {
  display: flex !important;
}

.action-card {
  transition: box-shadow 0.3s ease-in-out;
}

.action-card:hover {
  box-shadow: 0 0 0 2px #0d6efd20;
}
</style>
