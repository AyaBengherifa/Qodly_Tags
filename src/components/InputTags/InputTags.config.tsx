import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineTextSnippet } from 'react-icons/md';

import InputTagsSettings, { BasicSettings } from './InputTags.settings';

export default {
  craft: {
    displayName: 'InputTags',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(InputTagsSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'InputTags',
    exposed: true,
    icon: MdOutlineTextSnippet,
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
    duplicate: false,
    style: {
      display: 'inline-block',
      paddingBottom: '6px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '6px',
      backgroundColor: 'rgb(218, 216, 216)',
      color: 'rgb(48, 48, 48)',
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
      borderColor: '',
      borderWidth: '0px',
      borderStyle: 'none',
      alignItems: 'center',
      borderRadius: '12px',
    },
  },
} as T4DComponentConfig<IInputTagsProps>;

export interface IInputTagsProps extends webforms.ComponentProps {
  field?: string;
  max: number;
  duplicate: boolean;
}
