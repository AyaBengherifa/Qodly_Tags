import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { CiViewList  } from 'react-icons/ci';

import TagsSettings, { BasicSettings } from './Tags.settings';

export default {
  craft: {
    displayName: 'Tags',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TagsSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Tags',
    exposed: true,
    icon: CiViewList ,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
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
} as T4DComponentConfig<ITagsProps>;

export interface ITagsProps extends webforms.ComponentProps {
  field?: string;
}
