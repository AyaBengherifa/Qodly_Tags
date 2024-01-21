import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { get as _get, set as _set } from 'lodash';

import { FC, useEffect, useState, CSSProperties, useRef, useMemo } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { ITagsSelectionProps } from './TagsSelection.config';

const TagsSelection: FC<ITagsSelectionProps> = ({ field, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [tags, setTags] = useState<any[]>(() => []);
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<any[]>(() => []);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filteredTags, setFilteredTags] = useState<any[]>([]);

  useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);
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
    if (isDuplicate || !value.trim()) {
      return;
    }
    const focusedTag = tags.find((tag) => _get(tag, field) === value);
    const selectedTag = focusedTag || { [field]: value };
    const newTags = [...selectedTags, selectedTag];
    setSelectedTags(newTags);
    setInputValue('');
    if (ds && ds.dataType === 'array') {
      await ds.setValue(null, newTags);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(value !== '' && filteredTags.length > 0);
  }
  useMemo(() => {
    const lowerCaseValue = inputValue.toLowerCase();
    const limitedTags = tags.slice(0, 10);
    setFilteredTags(
      limitedTags.filter((tag) =>
        _get(tag, field as string)
          .toLowerCase()
          .includes(lowerCaseValue),
      ),
    );
  }, [tags, field, inputValue]);
  function handleTagSelection(selectedTag: any) {
    const newTags = [...selectedTags, selectedTag];
    setSelectedTags(newTags);
    setInputValue('');
    if (ds && ds.dataType === 'array') {
      ds.setValue(null, newTags);
    }

    setShowDropdown(false);
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
        {selectedTags.map((tag, index) => (
          <div key={index} style={tagsCss}>
            {_get(tag, field as string)}
            <IoIosCloseCircle
              onClick={() => remove(tag)}
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
                {_get(tag, field as string)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsSelection;
