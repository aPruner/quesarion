import React from 'react';
import {
  Box,
  Flex,
  Text
} from 'rebass';
import { Link } from 'react-router-dom';
import Routes from '../app/Routes';

export default function NavBar() {


  return (
    <Flex
      alignItems='center'
      px={2}
      bg='danger'
      color='primary'
    >
      <Text fontWeight='bold' fontSize={5}>Quesarion</Text>
      <Box mx='auto' />
      <Link variant='nav' href='#!' to={Routes.home}>
        Profile
      </Link>
    </Flex>
  );
}