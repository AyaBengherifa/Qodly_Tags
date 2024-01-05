import config, { IInputTagsProps } from './InputTags.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './InputTags.build';
import Render from './InputTags.render';

const InputTags: T4DComponent<IInputTagsProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

InputTags.craft = config.craft;
InputTags.info = config.info;
InputTags.defaultProps = config.defaultProps;

export default InputTags;
