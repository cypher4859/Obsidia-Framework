<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ILocation from '../types/ILocation'
import IPersonOfInterest from '../types/IPersonOfInterest'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'CaseFileReportCardBaseData'
})
export default class CaseFileReportCardBaseData extends Vue {
  @Prop(Object) readonly reportModel! : IPersonOfInterest
  @Prop(Boolean) isEditableFlag! : boolean
}
</script>
