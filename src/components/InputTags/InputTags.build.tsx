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
    backgroundColor: style?.backgroundColor || 'rgb(218, 216, 216)',
    color: style?.color || 'rgb(48, 48, 48)',
    paddingRight: style?.paddingRight || '6px',
    paddingLeft: style?.paddingLeft || '6px',
    paddingBottom: style?.paddingBottom || '6px',
    paddingTop: style?.paddingTop || '6px',
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
    borderColor: style?.borderColor || 'rgb(218, 216, 216)',
    borderWidth: style?.borderWidth || '2px',
    borderStyle: style?.borderStyle || 'solid',
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
            className="inline-flex mx-2 cursor-pointer close-icon"
          />
        </div>
      ))}
      <input
        className=" text-input  pl-2 border border-solid border-inherit	w-full "
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Enter a tag"
      />
    </div>
  );
};
export default InputTags;
