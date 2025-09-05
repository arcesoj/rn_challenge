import { useState, useCallback } from "react";
import { Platform } from "react-native";
import RNPermissions, {
  PERMISSIONS,
} from 'react-native-permissions';

type Permission = {
  enabled: boolean;
  status: 'denied' | 'granted' | 'blocked';
};

export const usePermissions = (): [Permission, () => Promise<void>] => {
  const [permissionRequested, setPermissionRequested] = useState<Permission>({enabled: false, status: 'denied'});

  const requestPermission = useCallback(async () => {
    try {
      console.log('requestPermission - start');
      // TODO: this could be generic for other permissions
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.WRITE_CALENDAR,
        ios: PERMISSIONS.IOS.CALENDARS_WRITE_ONLY
      });

      if (!permission) {
        // TODO: show a toast message to the user to mention the platform is not supported
        console.warn('Platform not supported for permissions');
        return;
      }

      const checkStatus = await RNPermissions.check(permission);

      if (checkStatus === 'granted') {
        setPermissionRequested({enabled: true, status: 'granted'});
        return;
      }

      if (checkStatus === 'denied' || checkStatus === 'unavailable') {
        const requestStatus = await RNPermissions.request(permission);

        if (requestStatus === 'granted') {
          setPermissionRequested({enabled: true, status: 'granted'});
        } else {
          // TODO: show a toast message to the user to mention the permission is denied
          console.warn('permission already denied - please enable in settings');
          setPermissionRequested({enabled: false, status: 'denied'});
        }
        return;
      }

      if (checkStatus === 'blocked') {
        console.warn('permission blocked - please enable in settings');
        setPermissionRequested({enabled: false, status: 'blocked'});
        // TODO: show a toast message to the user to enable the permission in the settings
        return;
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  },[])

  return [permissionRequested, requestPermission];
};
