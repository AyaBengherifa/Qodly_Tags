import {
  EComponentKind,
  T4DComponentConfig,
  T4DComponentDatasourceDeclaration,
  splitDatasourceID,
} from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { CiViewList } from 'react-icons/ci';

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
    icon: CiViewList,
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
      declarations: (props: ITagsProps) => {
        const { field, datasource = '' } = props;
        const declarations: T4DComponentDatasourceDeclaration[] = [
          { path: datasource, iterable: true },
        ];
        if (field) {
          const { id: ds, namespace } = splitDatasourceID(datasource?.trim()) || {};

          if (!ds) {
            return;
          }
          const fieldSrc = `${ds}.[].${field}`;
          console.log(field);
          declarations.push({
            path: namespace ? `${namespace}:${fieldSrc}` : fieldSrc,
          });
        }

        return declarations;
      },
      accept: ['entitysel'],
    },
  },
  defaultProps: {
    field: '',
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
} as T4DComponentConfig<ITagsProps>;

export interface ITagsProps extends webforms.ComponentProps {
  field?: string;
}
