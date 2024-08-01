import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { RiDropdownList } from 'react-icons/ri';
import { get as _get, set as _set } from 'lodash';

import TagsSelectionSettings, { BasicSettings } from './TagsSelection.settings';

export default {
  craft: {
    displayName: 'Select Tags',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TagsSelectionSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Select Tags',
    exposed: true,
    icon: RiDropdownList,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    field: '',
    max: 0,
    duplicate: true,
    style: {
      display: 'inline-block',
      backgroundColor: 'rgb(218, 216, 216)',
      color: 'rgb(48, 48, 48)',
      paddingRight: '6px',
      paddingLeft: '6px',
      paddingBottom: '6px',
      paddingTop: '6px',
      marginRight: '2px',
      marginBottom: '0px',
      marginLeft: '0px',
      marginTop: '0px',
      fontFamily: 'inherit',
      fontWeight: 400,
      fontSize: '14px',
      fontStyle: 'normal',
      textDecorationLine: 'none',
      textTransform: 'none',
      borderColor: 'rgb(218, 216, 216)',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: '12px',
      alignItems: 'center',
    },
  },
} as T4DComponentConfig<ITagsSelectionProps>;

export interface ITagsSelectionProps extends webforms.ComponentProps {
  field?: string;
  max: number;
  duplicate: boolean;
}
