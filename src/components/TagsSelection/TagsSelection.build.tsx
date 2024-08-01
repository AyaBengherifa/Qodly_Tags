import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState, useEffect, useRef } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { ITagsSelectionProps } from './TagsSelection.config';

const TagsSelection: FC<ITagsSelectionProps> = ({ style, className, classNames = [] }) => {
  const [selectedTag, setSelectedTag] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    setSelectedTag('');
  }
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(selectedTag.toLowerCase()),
  );
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSelectedTag(value);
    setShowDropdown(value !== '' && filteredTags.length > 0);
  }

  function handleTagSelection(tagName: string) {
    setTags([...tags, { name: tagName }]);
    setSelectedTag('');
    setShowDropdown(false);
  }

  function handleInputClick() {
    setShowDropdown(true);
  }
  function remove(index: number) {
    setTags(tags.filter((_elem, i) => i !== index));
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
      {tags.map((Tag, index) => (
        <div style={style} key={index}>
          {Tag.name}
          <IoIosCloseCircle
            onClick={() => remove(index)}
            className="inline-flex ml-2 cursor-pointer tag-close"
          />
        </div>
      ))}

      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          className="text-input  pl-2 border border-solid border-inherit w-full"
          placeholder="Enter a tag"
          value={selectedTag}
          onClick={handleInputClick}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {showDropdown && (
          <div className=" dropDown absolute px-4 py-2 left-0 z-1 bg-zinc-50 border-1 border-solid border-zinc-900 rounded shadow">
            {filteredTags.map((tag, index) => (
              <div
                className="dropDown-item cursor-pointer"
                key={index}
                onClick={() => handleTagSelection(tag.name)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsSelection;
