<script lang="ts">
import useGenericComponent from '@/GenericODataDatatableComponent'
import Country from '@/ViewModels/Country'
import { ODataService } from '@buchatsky/jinqu-odata'

const service = new ODataService('https://localhost:7275/odata')
const CountryComponent = useGenericComponent<Country>()
export default {
  components: {
    CountryComponent
  },
  data() {
    return {
      services: service.createQuery(Country).inlineCount()
    }
  }
}
</script>

<template>
  <CountryComponent :service="services" />
</template>
