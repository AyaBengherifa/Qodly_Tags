import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';

import { FC, useEffect, useState, useRef, useMemo } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { ITagsSelectionProps } from './TagsSelection.config';

const TagsSelection: FC<ITagsSelectionProps> = ({
  duplicate,
  max,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [tags, setTags] = useState<any[]>(() => []);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filteredTags, setFilteredTags] = useState<any[]>([]);

  useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);

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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(value !== '' && filteredTags.length > 0);
  }
  function remove(index: number) {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    if (ds && ds.dataType === 'array') {
      ds.setValue(null, updatedTags);
    }
    setTags(updatedTags);
  }

  useMemo(() => {
    const lowerCaseValue = inputValue.toLowerCase();
    const limitedTags = tags.slice(0, 10);
    setFilteredTags(limitedTags.filter((tag) => tag.toLowerCase().includes(lowerCaseValue)));
  }, [tags, inputValue]);

  function handleInputClick() {
    setShowDropdown(true);
  }
  function handleTagSelection(selectedTag: string) {
    if (!duplicate) {
      const isDuplicate = tags.some((tag) => tag === selectedTag);
      if (isDuplicate || tags.length >= max || !selectedTag.trim()) {
        return;
      }
    } else {
      if (tags.length >= max || !selectedTag.trim()) {
        return;
      }
    }

    const newTags = [...tags, selectedTag];

    ds.setValue(null, newTags);

    setTags(newTags);
    setInputValue('');
    setShowDropdown(false);
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
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <div key={index} style={style}>
            {tag}
            <IoIosCloseCircle
              className="inline-flex mx-2 cursor-pointer tag-close"
              onClick={() => remove(index)}
            />
          </div>
        ))}
      </div>
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          className=" text-input pl-2 border border-solid border-inherit	w-full "
          placeholder="Enter a tag"
          onClick={handleInputClick}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={tags.length >= max}
        />
        {showDropdown && (
          <div className=" dropdown absolute px-4 py-2 left-0 z-1 bg-zinc-50 border-1 border-solid border-zinc-900 rounded shadow">
            {filteredTags.map((tag, index) => (
              <div
                className="dropdown-item cursor-pointer"
                key={index}
                onClick={() => handleTagSelection(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsSelection;
