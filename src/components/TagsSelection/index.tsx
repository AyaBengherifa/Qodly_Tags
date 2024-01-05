import config, { ITagsSelectionProps } from './TagsSelection.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './TagsSelection.build';
import Render from './TagsSelection.render';

const TagsSelection: T4DComponent<ITagsSelectionProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

TagsSelection.craft = config.craft;
TagsSelection.info = config.info;
TagsSelection.defaultProps = config.defaultProps;

export default TagsSelection;
