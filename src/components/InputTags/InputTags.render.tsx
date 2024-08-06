import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { IInputTagsProps } from './InputTags.config';

const InputTags: FC<IInputTagsProps> = ({ duplicate, max, style, className, classNames = [] }) => {
  const { connect } = useRenderer();

  const [tags, setTags] = useState<any[]>(() => []);

  

  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const fetchData = async () => {
      const value = await ds.getValue();
      setTags(value);
    };

    fetchData();

    ds.addListener('changed', fetchData);

    return () => ds.removeListener('changed', fetchData);
  }, [ds]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const value = e.currentTarget.value;
    if (!duplicate) {
      const isDuplicate = tags.some((tag) => tag === value);
      if (isDuplicate || tags.length >= max || !value.trim()) {
        return;
      }
    } else {
      if (tags.length >= max || !value.trim()) {
        return;
      }
    }
    setTags((prevTag) => [...prevTag, value]);

    const newTags = [...tags, value];
    ds.setValue(null, newTags);
    (e.target as any).value = '';
  }

  const remove = async (index: number) => {
    const Tags = [...tags];
    Tags.splice(index, 1);

    if (ds && ds.dataType === 'array') {
      await ds.setValue(null, Tags);
    }

    setTags(Tags);
  };

  return (
    <div ref={connect} className={cn(className, classNames)}>
      {tags.map((tag, index) => (
        <div style={style} key={index}>
          {tag}
          <IoIosCloseCircle
            className="inline-flex mx-2 cursor-pointer close-icon"
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        className=" text-input ml-2 pl-2 border border-solid border-inherit	w-full "
        type="text"
        disabled={tags.length >= max}
        placeholder="Enter a tag"
      />
    </div>
  );
};

export default InputTags;
