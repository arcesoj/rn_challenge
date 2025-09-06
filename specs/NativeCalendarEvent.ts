import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addEvent(title: string, description: string): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCalendarEvent');
