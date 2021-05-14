import React from 'react';
import { Heading } from 'rebass';

export default function Home() {
  const homeStyles = {
    color: 'black',
    fontFamily: 'heading',
    margin: 2,
    fontSize: 4
  };

  return (
    <Heading sx={homeStyles}>
      Hello World!
    </Heading>
  );
}