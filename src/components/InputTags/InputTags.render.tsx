import { useRenderer, useSources } from '@ws-ui/webform-editor';
import { get as _get, set as _set } from 'lodash';
import cn from 'classnames';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { IInputTagsProps } from './InputTags.config';

const InputTags: FC<IInputTagsProps> = ({ field, style, className, classNames = [] }) => {
  const { connect } = useRenderer();

  const [tags, setTags] = useState<any[]>(() => []);

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

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || !field) return;

    const value = e.currentTarget.value;
    const isDuplicate = tags.some((tag) => _get(tag, field) === value);
    if (tags.length >= 3 || isDuplicate || !value.trim()) {
      return;
    }
    const newTag = {};
    _set(newTag, field, value);
    // await ds.setValue(null, newTag[field as keyof typeof newTag], true);
    const newTags = [...tags, newTag];
    if (ds && ds.dataType === 'array') {
      await ds.setValue(null, newTags);
    }

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
        <div style={tagsCss} key={index}>
          {_get(tag, field as string)}
          <IoIosCloseCircle
            className="inline-flex mx-2 cursor-pointer"
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        disabled={tags.length >= 3}
        placeholder="Type something"
      />
    </div>
  );
};

export default InputTags;
