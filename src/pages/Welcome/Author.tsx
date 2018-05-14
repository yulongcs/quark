import * as React from 'react';

interface Props {
  name: string;
}

const Author: React.SFC<Props> = ({ name }) => (
  <p>{name}</p>
);

export default Author;
