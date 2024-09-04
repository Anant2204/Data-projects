import { AxiosError } from 'axios';
import {
  FETCH_EXTENSIONS_REGISTRATION_BEGIN,
  FETCH_EXTENSIONS_REGISTRATION_SUCCESS,
  FETCH_EXTENSIONS_REGISTRATION_FAILURE,
} from '..';
import {
  IExtensionsRegistration,
  IAppExtension,
  IKeyValueItem,
} from '@msx/platform-services';
import { IDataService } from '../../../app/interfaces';

const emptyData = {
  routes: [],
  extensions: [],
  catalogue: [],
};

export const fetchExtensionsRegistrationBegin = () => ({
  type: FETCH_EXTENSIONS_REGISTRATION_BEGIN,
});

export const fetchExtensionsRegistrationSuccess = (payload: IExtensionsRegistration) => ({
  type: FETCH_EXTENSIONS_REGISTRATION_SUCCESS,
  payload: payload,
});

export const fetchExtensionsRegistrationError = (error: AxiosError) => ({
  type: FETCH_EXTENSIONS_REGISTRATION_FAILURE,
  payload: error,
});


export const fetchExtensionsRegistration = (dataService: IDataService, testExtensions: IKeyValueItem[]) => {
  return async (dispatch: any, getState: any) => {
    if (
      getState().extensionsRegistration &&
      getState().extensionsRegistration.extensionsRegistration.extensions.length > 0
    ) {
      return getState().extensionsRegistration.extensionsRegistration;
    }

    try {
      const response = await dataService.GetExtensionsRegistration(); 
      const data = processExtensionsRegistration(response, testExtensions);
      dispatch(fetchExtensionsRegistrationSuccess(data));
    } catch (err) {
      dispatch(fetchExtensionsRegistrationError(err));
    }
  };
};

const processExtensionsRegistration = (res: IExtensionsRegistration, testExtensions: IKeyValueItem[]) => {
  if (!res) return emptyData;

  //replace cdn in extensions
    let extensions = res.extensions;
    extensions.forEach((extension) => {
      extension.files.forEach((file) => {
        if (process.env.REACT_APP_CDN_BASE_URL?.trim() !==''
          && process.env.REACT_APP_CDN_BASE_URL
          && process.env.REACT_APP_CDN_TOKEN?.trim() !==''
          && process.env.REACT_APP_CDN_TOKEN) {
          file.url = process.env.REACT_APP_CDN_BASE_URL;
          file.token = process.env.REACT_APP_CDN_TOKEN;
        }
      });
    });

  // enable/disable extension based on catalogue settings
  const catalogue = res.catalogue;

  if (catalogue.length > 0) {
    catalogue.forEach((group, i) => {
      group.items.forEach((item, j) => {
        const extension = res.extensions.find((ext) => ext.key === item.key);
        if (extension) {
          const active = item.active;
          extension.active = active;
          extension.pages.forEach((page) => {
            page.active = active;
          });
          extension.tiles.forEach((tile) => {
            tile.active = active;
          });
        }
      });
    });
  }

  // enable side loading support
  testExtensions.forEach((testExtension) => {
    const extension = res.extensions.find((item) => item.key === testExtension.key);
    if (extension) {
      enableSideLoading(extension, testExtension.value);
    }
  });
  return res;
};

const enableSideLoading = (extension: IAppExtension, url: string) => {
  extension.active = true;
  extension.files.forEach((item) => {
    item.url = url;
    if (!item.log) {
      item.active = false;
    }
  });
  extension.pages.forEach((item) => {
    item.active = true;
  });
  extension.tiles.forEach((item) => {
    item.active = true;
  });
};
