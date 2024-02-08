import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'duplicate',
    label: 'Duplicated',
    type: ESetting.CHECKBOX,
    defaultValue: true,
  },
  {
    key: 'min',
    label: 'Min',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 0,
  },
  {
    key: 'max',
    label: 'Max',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 0,
  },
  {
    key: 'dataAccess',
    label: 'Data Access',
    type: ESetting.GROUP,
    tipKey: 'editors:webform:properties:dataaccess',
    components: [
      {
        key: 'datasource',
        label: 'DataSource',
        type: ESetting.DS_AUTO_SUGGEST,
      },
      {
        key: 'field',
        label: 'field',
        type: ESetting.TEXT_FIELD,
        defaultValue: 'Qodly',
      },
    ],
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...load(DEFAULT_SETTINGS).filter(
    'dataAccess',
    'background',
    'dimensions',
    'style.textAlign',
    'display',
  ),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter(
    'dataAccess',
    'background',
    'dimensions',
    'style.textAlign',
    'display',
  ),
];

export default Settings;
