import { defineComponent, type PropType, h, ref, type Component } from 'vue'
import { type InlineCountInfo } from 'jinqu'
import { type IODataQuery } from '@buchatsky/jinqu-odata'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'

function useGenericComponent<TValue = unknown>() {
  const data = ref<TValue[]>([])
  const rowsPerPageOptions = ref<Number[]>([])
  const service = ref<IODataQuery<TValue, InlineCountInfo>>()
  const rows = ref(10)
  const dt = ref()
  const loading = ref(false)
  const totalRecords = ref(0)

  const lazyParams = ref({})

  const loadLazyData = () => {
    loading.value = true
    const values = lazyParams.value as any

    service
      .value!.take(values.rows)
      .skip(values.page * values.rows)
      .toArrayAsync()
      .then((x: any) => {
        data.value = x.value
        loading.value = false
        totalRecords.value = x.inlineCount
      })
  }
  const GenericComponent = defineComponent({
    props: {
      value: {
        type: null as unknown as PropType<TValue>,
        required: false
      },
      service: {
        type: null as unknown as PropType<IODataQuery<TValue, InlineCountInfo>>,
        required: true
      },
      rows: {
        type: Number,
        required: false,
        default: 10
      },
      rowsPerPageOptions: {
        type: Array<Number>,
        required: false,
        default: () => [5, 10, 15]
      }
    },
    mounted() {
      loading.value = true

      lazyParams.value = {
        first: dt.value.first,
        rows: dt.value.rows,
        page: 0,
        sortField: null,
        sortOrder: null
      }
      service.value = this.$props?.service
      rows.value = this.$props?.rows
      rowsPerPageOptions.value = this.$props?.rowsPerPageOptions
      loadLazyData()
    },
    render: () =>
      h(
        DataTable as Component,
        {
          value: data.value,
          onPage: (event: DataTablePageEvent) => {
            lazyParams.value = { ...lazyParams.value, ...event }
            loadLazyData()
          },
          lazy: true,
          paginator: true,
          ref: dt,
          loading: loading.value,
          dataKey: 'Id',
          rows: rows.value,
          totalRecords: totalRecords.value,
          paginatorTemplate:
            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
          rowsPerPageOptions: rowsPerPageOptions.value,
          currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords} products'
        },
        [h(Column, { field: 'Id', header: 'Id', key: 'Id' })]
      )
  })
  return GenericComponent
}

export default useGenericComponent
