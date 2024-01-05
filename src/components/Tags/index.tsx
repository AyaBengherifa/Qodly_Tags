import config, { ITagsProps } from './Tags.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Tags.build';
import Render from './Tags.render';

const Tags: T4DComponent<ITagsProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Tags.craft = config.craft;
Tags.info = config.info;
Tags.defaultProps = config.defaultProps;

export default Tags;
