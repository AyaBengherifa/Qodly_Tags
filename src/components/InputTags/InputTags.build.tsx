import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, CSSProperties, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { IInputTagsProps } from './InputTags.config';

const InputTags: FC<IInputTagsProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const tagsCss: CSSProperties = {
    display: style?.display || 'inline-block',
    padding: style?.padding || '6px 12px',
    backgroundColor: style?.backgroundColor || 'rgb(218, 216, 216)',
    color: style?.color || 'rgb(48, 48, 48)',
    marginRight: style?.marginRight || '2px',
    marginBottom: style?.marginBottom || '0px',
    marginLeft: style?.marginLeft || '0px',
    marginTop: style?.marginTop || '0px',
    fontFamily: style?.fontFamily || 'inherit',
    fontWeight: style?.fontWeight || 400,
    fontSize: style?.fontSize || '14px',
    fontStyle: style?.fontStyle || 'normal',
    textDecorationLine: style?.textDecorationLine || 'none',
    textTransform: style?.textTransform || 'none',
    borderColor: style?.borderColor || '',
    borderWidth: style?.borderWidth || '0px',
    borderStyle: style?.borderStyle || 'none',
    borderRadius: style?.borderRadius || '12px',
  };
  const [tags, setTags] = useState([
    {
      name: 'Tag1',
    },
    {
      name: 'Tag2',
    },
    {
      name: 'Tag3',
    },
  ]);
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const value = e.currentTarget.value;
    if (!value.trim()) return;
    setTags([...tags, { name: value }]);
    e.currentTarget.value = '';
  }
  return (
    <div ref={connect} className={cn(className, classNames)}>
      {tags.map((Tag, index) => (
        <div style={tagsCss} key={index}>
          {Tag.name}
          <IoIosCloseCircle
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: '3px',
              cursor: 'pointer',
            }}
          />
        </div>
      ))}
      <input onKeyDown={handleKeyDown} type="text" placeholder="Type something" />
    </div>
  );
};
export default InputTags;
