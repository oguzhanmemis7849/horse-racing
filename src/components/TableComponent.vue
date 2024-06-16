<script setup lang="ts">
withDefaults(
  defineProps<{
    list: any[]
    columns: { field: string; header: string; sortable: boolean }[]
    title: string | null
    subTitle: string | null
    subTitleBackgroundColor: string | null
    titleBackgroundColor: string
    tableHeaderBackgroundColor: string
    rowSize: 'small' | 'large'
  }>(),
  {
    list: () => [],
    columns: () => [],
    title: null,
    subTitle: null,
    subTitleBackgroundColor: null,
    titleBackgroundColor: '#ffeb3b',
    tableHeaderBackgroundColor: 'red',
    rowSize: 'large'
  }
)
</script>

<template>
  <div class="table">
    <h3 v-show="title">{{ title }}</h3>
    <div v-show="subTitle" class="table__sub-title">
      <h4>{{ subTitle }}</h4>
    </div>
    <DataTable
      :value="list"
      stripedRows
      class="p-datatable-gridlines"
      :scrollable="true"
      scrollHeight="720px"
      :size="rowSize"
    >
      <div v-if="list.length > 0">
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column.field"
          :header="column.header"
          :sortable="column.sortable"
        />
      </div>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.table {
  background-color: #f9f9f9;

  & h3 {
    background-color: v-bind(titleBackgroundColor);
    padding: 0.5rem;
    text-align: center;
    font-weight: $font-semi-bold;
  }

  &__sub-title {
    background-color: v-bind(subTitleBackgroundColor);
    padding: 0.25rem;
    text-align: center;

    & h4 {
      font-weight: $font-medium;
    }
  }
  .p-datatable .p-datatable-tbody > tr > td {
    padding: 0.25rem 0.5rem; /* Satır içi aralıkları ayarlar */
  }
}
</style>
