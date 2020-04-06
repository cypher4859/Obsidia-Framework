import 'reflect-metadata'
import store from '@/store'
import TYPES from '@/InjectableTypes/types'
import ICaseFileService from '@/components/case-file/services/ICaseFileService'
import ICameraMonitorService from '@/components/camera-monitor/services/ICameraMonitorService'
import IAddon from '@/components/add-on-manager/types/IAddon'
import IAddonStore from '@/components/add-on-manager/types/IAddonStore'
import INetworkMonitorService from '@/components/network-monitor/services/INetworkMonitorService'
import { inject } from 'inversify-props'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IAddonProperty } from '@/components/add-on-manager/types/IAddonDataTypes'
import CameraMonitorService from '@/components/camera-monitor/services/CameraMonitorService'
import CaseFileService from '@/components/case-file/services/CaseFileService'
import NetworkMonitorService from '@/components/network-monitor/services/NetworkMonitorService'

@Module({ dynamic: true, store, name: 'AddonStore' })
export default class AddonStore extends VuexModule implements IAddonStore {
  // @inject(TYPES.ICameraMonitorService)
  private cameraMonitorService: ICameraMonitorService = new CameraMonitorService()

  // @inject(TYPES.ICaseFileService)
  public caseFileService: ICaseFileService = new CaseFileService()

  // @inject(TYPES.INetworkMonitorService)
  private networkMonitorService: INetworkMonitorService = new NetworkMonitorService()

  // list of all implemented components
  /// THE NAME IS REDUNDANT! Remove
  public registeredAddonComponents : IAddon[] = [
    {
      model: this.cameraMonitorService.defaultModel(),
      enabled: false
    },
    {
      model: this.caseFileService.defaultModel(),
      enabled: false
    },
    {
      model: this.networkMonitorService.defaultModel(),
      enabled: false
    }
  ]

  get getRegisteredAddonComponents () : IAddon[] {
    return this.registeredAddonComponents
  }

  get getEnabledAddonComponents () : IAddon[] {
    return this.getRegisteredAddonComponents.filter((addon) => addon.enabled === true)
  }

  get getRegisteredAddonComponentsTitles () : string[] {
    return this.getRegisteredAddonComponents.map((addon) => addon.model.title)
  }

  @Mutation
  public enableTheseAddons (addonsToEnable: string[]) : void {
    this.registeredAddonComponents.forEach((component) => {
      if (addonsToEnable.indexOf(component.model.title) > -1) {
        component.enabled = true
      }
    })
  }

  @Mutation
  public disableTheseAddons (addonsToDisable: string[]) : void {
    this.registeredAddonComponents.forEach((component) => {
      if (addonsToDisable.indexOf(component.model.title) > -1) {
        component.enabled = false
      }
    })
  }

  @Mutation
  public changeEnabledStateOfRegisteredAddonComponents (componentsToBeEnabled: string[]) : void {
    const registeredAddonComponents = this.getRegisteredAddonComponents

    componentsToBeEnabled.forEach((componentToEnable: string) => {
      const componentsThatShouldBeEnabled = registeredAddonComponents.filter((addon: IAddon) => addon.model.title === componentToEnable)
      if (componentsThatShouldBeEnabled.length > 1) {
        console.error('ERROR! The store contains +1 addons by the same name; we are trying to enable more than one addon...')
      } else {
        componentsThatShouldBeEnabled[0].enabled = true
      }
    })

    registeredAddonComponents.forEach((addonComponent: IAddon) => {
      if (componentsToBeEnabled.indexOf(addonComponent.model.title) === -1) {
        addonComponent.enabled = false
      }
    })
  }
}
