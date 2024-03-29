import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState, CSSProperties, useEffect, useRef } from 'react';
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
  const tagsCss: CSSProperties = {
    display: style?.display || 'inline-block',
    backgroundColor: style?.backgroundColor || 'rgb(218, 216, 216)',
    color: style?.color || 'rgb(48, 48, 48)',
    paddingRight: style?.paddingRight || '6px',
    paddingLeft: style?.paddingLeft || '6px',
    paddingBottom: style?.paddingBottom || '6px',
    paddingTop: style?.paddingTop || '6px',
    marginRight: style?.marginRight || '0px',
    marginBottom: style?.marginBottom || '10px',
    marginLeft: style?.marginLeft || '5px',
    marginTop: style?.marginTop || '0px',
    fontFamily: style?.fontFamily || 'inherit',
    fontWeight: style?.fontWeight || 400,
    fontSize: style?.fontSize || '14px',
    fontStyle: style?.fontStyle || 'normal',
    textDecorationLine: style?.textDecorationLine || 'none',
    textTransform: style?.textTransform || 'none',
    borderColor: style?.borderColor || 'rgb(218, 216, 216)',
    borderWidth: style?.borderWidth || '2px',
    borderStyle: style?.borderStyle || 'solid',
    borderRadius: style?.borderRadius || '12px',
    alignItems: 'center',
  };
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
        <div style={tagsCss} key={index}>
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
