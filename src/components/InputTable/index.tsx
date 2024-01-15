import config, { IInputTableProps } from './InputTable.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './InputTable.build';
import Render from './InputTable.render';

const InputTable: T4DComponent<IInputTableProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

InputTable.craft = config.craft;
InputTable.info = config.info;
InputTable.defaultProps = config.defaultProps;

export default InputTable;
