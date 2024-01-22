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
    alignItems: 'center',
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
  function remove(index: number) {
    setTags(tags.filter((_elem, i) => i !== index));
  }
  return (
    <div ref={connect} className={cn(className, classNames)}>
      {tags.map((Tag, index) => (
        <div style={tagsCss} key={index}>
          {Tag.name}
          <IoIosCloseCircle
            onClick={() => remove(index)}
            className="inline-flex mx-2 cursor-pointer"
          />
        </div>
      ))}
      <input
        className="border-2 ml-2 pl-2 border-solid border-neutral-500 rounded shadow"
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Enter a tag"
      />
    </div>
  );
};
export default InputTags;
