import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { IInputTagsProps } from './InputTags.config';

const InputTags: FC<IInputTagsProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  
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
        <div style={style} key={index}>
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
