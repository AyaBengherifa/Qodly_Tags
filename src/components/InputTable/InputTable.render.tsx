import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, CSSProperties } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { IInputTableProps } from './InputTable.config';

const InputTable: FC<IInputTableProps> = ({style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const {
    sources: { datasource: ds },
  } = useSources();
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
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    if (!ds) return;

    const listener = async () => {
      const v = await ds.getValue<string[]>();
      setTags(v || []);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
  }, [ds]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (newTag.trim() !== '') {
        setTags([...tags, newTag.trim()]);
        setNewTag('');
        ds.setValue(null, [...tags, newTag.trim()]);
      }
    }
  }
  function remove(index: number) {
    setTags(tags.filter((_elem, i) => i !== index));
  }

  return (
    <div ref={connect} className={cn(className, classNames)}>
      {tags.map((tag, index) => (
        <div style={tagsCss} key={index}>
          {tag}
          <IoIosCloseCircle
            onClick={() => remove(index)}
            className="inline-flex mx-2 cursor-pointer"
          />
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Type something"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
    </div>
  );
};
export default InputTable;
