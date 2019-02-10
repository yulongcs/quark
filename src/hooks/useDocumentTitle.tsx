/**
 * useDocumentTitle hooks
 * Set html title
 *
 * Create by vdfor at 2018/12/29
 */

import { useEffect } from 'react';

interface IProps {
  title: string;
}

export default ({ title }: IProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};
