import { DataLoader, useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { IoIosCloseCircle } from 'react-icons/io';
import { FC, useEffect, useState, CSSProperties, useMemo, useCallback } from 'react';

import { IInputTagsProps } from './InputTags.config';

const InputTags: FC<IInputTagsProps> = ({ field, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [tags, setTags] = useState<datasources.IEntity[]>(() => []);

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
  const {
    sources: { datasource: ds },
  } = useSources();
  const loader = useMemo<DataLoader | null>(() => {
    if (!ds) {
      return null;
    }
    return DataLoader.create(ds, [field as string]);
  }, [field, ds]);

  const updateFromLoader = useCallback(() => {
    if (!loader) {
      return;
    }
    setTags(loader.page);
  }, [loader]);

  useEffect(() => {
    if (!loader || !ds) return;

    loader.sourceHasChanged().then(updateFromLoader);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const value = e.currentTarget.value;
    if (!value.trim()) return;
    const newTag = { [field as keyof typeof tags]: value };
    setTags([...tags, newTag]);
    e.currentTarget.value = '';
  }

  function remove(index: number) {
    setTags(tags.filter((_elem, i) => i !== index));
  }
  return (
    <div ref={connect} className={cn(className, classNames)}>
      {tags.map((tag, index) => (
        <div style={tagsCss} key={index}>
          {tag[field as keyof typeof tag] as string}
          <IoIosCloseCircle
            onClick={() => remove(index)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: '5px',
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
