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
    displayName: 'InputTags',
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
  },
} as T4DComponentConfig<ITagsSelectionProps>;

export interface ITagsSelectionProps extends webforms.ComponentProps {
  field?: string;
}
