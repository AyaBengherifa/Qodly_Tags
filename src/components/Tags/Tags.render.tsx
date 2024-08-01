import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo, useCallback } from 'react';
import { DataLoader } from '@ws-ui/webform-editor';
import { ITagsProps } from './Tags.config';

const Tags: FC<ITagsProps> = ({ field, style, className, classNames = [] }) => {

  const { connect } = useRenderer();
  const [tags, setTags] = useState<datasources.IEntity[]>([]);
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

  useEffect(() => {
    if (!loader || !ds) {
      return;
    }

    const dsListener = () => {
      loader.sourceHasChanged().then(updateFromLoader);
    };
    ds.addListener('changed', dsListener);
    return () => {
      ds.removeListener('changed', dsListener);
    };
  }, [ds, loader]);

  return (
    <div ref={connect} className={cn(className, classNames)}>
      {tags.map((tag, index) => (
        <div style={style} key={index}>
          {tag[field as keyof typeof tag] as string}
        </div>
      ))}
    </div>
  );
};

export default Tags;
