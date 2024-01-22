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
    const newTags = [...tags, selectedTag];
    setTags(newTags);
    setSelectedTags([...selectedTags, selectedTag]);

    if (ds && ds.dataType === 'array') {
      await ds.setValue(null, newTags);
    }
    (e.target as any).value = '';
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(value !== '' && filteredTags.length > 0);
  }
  function remove(index: number) {
    const updatedTags = [...selectedTags];
    updatedTags.splice(index, 1);
    setSelectedTags(updatedTags);
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
  function handleTagSelection(tag: any) {
    const isDuplicate = selectedTags.some(
      (selectedTag) => _get(selectedTag, field as string) === _get(tag, field as string),
    );
    if (!isDuplicate) {
      const newTag = { ...tag };
      setSelectedTags((prevTags) => [...prevTags, newTag]);
    }
    setInputValue('');
    setShowDropdown(false);
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
              className="inline-flex mx-2 cursor-pointer"
              onClick={() => remove(index)}
            />
          </div>
        ))}
      </div>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          className="border-2 ml-2 pl-2 border-solid border-neutral-500 rounded shadow"
          placeholder="Enter a tag"
          onClick={handleInputClick}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={selectedTags.length >= 3}
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
