import { useContext } from 'react';
import { TagsContext } from '../contexts/TagsContext';

export const useTags = () => useContext(TagsContext)
