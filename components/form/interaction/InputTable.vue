<script setup>
import Input from '~/components/form/interaction/Input.vue'
import Delete from "~/components/icones/delete.vue";
import Button from "~/components/form/interaction/Button.vue";
import Add from "~/components/icones/add.vue";
import Select from "~/components/form/interaction/Select.vue";
import {ColorPicker} from "vue3-colorpicker";
import DatePicker from "~/components/form/interaction/DatePicker.vue";

const props = defineProps({
  inputTitle: {
    type : Array,
    required : true
  },
  inputModel : {
    type: Object,
    required : true,
  },
  modelOn : {
    type : Array,
    required : true,
  },
  specificField : {
    type : Object,
    required :false,
    default : {}
  },
  OnDeleteRow : {
    type : Function,
    required : false,
    default : (key) => { console.log('remove :' + key) }
  },
  onAddRow : {
    type : Function,
    required : false,
    default : (model,inputModel) => model.push({...inputModel})
  }
})

const arrayName = Object.keys(props.inputModel);

</script>

<template>
<div>
  <table class="input-table">

    <thead>
    <tr>
      <th v-for="input in inputTitle"> {{ input }} </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(data, key) in modelOn">
      <td v-for="id in arrayName">
        <div v-if="id !== 'errors'">

          <Select
              v-if="specificField[id] && specificField[id].type === 'select'"
              v-model="data[id]"
              custom-class="tableView"
              :is-error="(data.errors !== null && data.errors[id])"
              :errors="(data.errors !== null && data.errors[id]) ? [data.errors[id]] : []"
          >
            <option v-for="(options, key) in specificField[id].data" :value="key">{{ options }}</option>
          </Select>

          <color-picker
              v-else-if="specificField[id] && specificField[id].type === 'color'"
              v-model:pureColor="data[id]"
          />

          <DatePicker
              v-else-if="specificField[id] && specificField[id].type === 'hours'"
              custom-class="tableView"
              v-model="data[id]"
              model-type="HH:mm:ss"
              type="time"
              :is-error="(data.errors !== null && data.errors[id])"
              :errors="(data.errors !== null && data.errors[id]) ? [data.errors[id]] : []"
          />

          <Input
              v-else
              :type="( specificField[id] && specificField[id].type ) ? specificField[id].type : 'text' "
              placeholder="Saisir une valeur"
              v-model="data[id]"
              custom-class="tableView"
              :is-error="(data.errors !== null && data.errors[id])"
              :errors="(data.errors !== null && data.errors[id]) ? [data.errors[id]] : []"
          />

        </div>
      </td>
      <Button custom-class="clear" @click.prevent="modelOn.splice( key, 1 )"> <delete /> </Button>
    </tr>
    </tbody>
  </table>
  <div class="action">
    <Button custom-class="clear" @click.prevent="onAddRow(modelOn,inputModel)"> <Add type="rounded" /> </Button>
  </div>
</div>
</template>

<style scoped lang="scss">
.input-table {
  max-height: 50vh;
  overflow: auto;
  width: 100%;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;

    th {
      text-align: left;
      padding: 0.5rem;

    }

  }

  tbody {
    margin: 0;

    tr {
      margin: 0;
      position: relative;

      button {
        position: absolute;
        top: 50%;
        transform: translate(30%,-50%);

      }

      td {
        margin: 0;

      }

      div {
        padding: 0 5px;

      }

    }

  }

}

.action {
  margin: 1rem 0 0;

}
</style>