import { DataLoader, useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, CSSProperties, useMemo, useCallback, useRef } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { ITagsSelectionProps } from './TagsSelection.config';

const TagsSelection: FC<ITagsSelectionProps> = ({ field, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [tags, setTags] = useState<any[]>(() => []);
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<any[]>(() => []);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    if (!value) return;
    const newTag = { [field as keyof typeof tags]: value };
    const isDuplicate = tags.some((tag) => tag[field as keyof typeof tag] === value);
    if (tags.length >= 3 || isDuplicate) {
      return;
    }
    setTags([...tags, newTag]);
    ds.setValue(null, newTag[field as keyof typeof newTag]);
    e.currentTarget.value = '';
  }
  const filteredTags = useMemo(() => {
    const lowerCaseValue = inputValue.toLowerCase();
    const limitedTags = tags.slice(0, 10);
    return limitedTags.filter((tag) =>
      (tag[field as keyof typeof tag] as string).toLowerCase().includes(lowerCaseValue),
    );
  }, [tags, field]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(value !== '' && filteredTags.length > 0);
  }
  const updateDataSource = (selectedTags: (string | null)[]) => {
    if (!ds) return;
    ds.setValue(null, selectedTags as (string | null)[]);
  };

  function handleTagSelection(tag: any) {
    const tagName = tag[field as keyof typeof tag] as string | undefined;
    if (tagName) {
      const isDuplicate = selectedTags.includes(tagName);
      if (!isDuplicate) {
        const newSelectedTags = [...selectedTags, tagName];
        setSelectedTags(newSelectedTags);
        updateDataSource(newSelectedTags);
        setShowDropdown(false);
      }
    }
  }

  function remove(tagName: string) {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
  }

  function handleInputClick() {
    setShowDropdown(true);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={connect} className={cn(className, classNames)}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {selectedTags.map((tagName, index) => (
          <div key={index} style={tagsCss}>
            {tagName}
            <IoIosCloseCircle
              onClick={() => remove(tagName)}
              className="inline-flex mx-2 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Type something"
          onClick={handleInputClick}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={tags.length >= 3}
        />
        {showDropdown && (
          <div className="absolute px-4 py-2 left-0 z-1 bg-zinc-50 border-1 border-solid border-zinc-900 rounded shadow">
            {filteredTags.map((tag, index) => (
              <div className="cursor-pointer" key={index} onClick={() => handleTagSelection(tag)}>
                {tag[field as keyof typeof tag] as string}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsSelection;
