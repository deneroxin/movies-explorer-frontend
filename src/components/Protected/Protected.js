import React from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext, GlobalContext } from '../../contexts/contexts';

export default function Protected({element}) {
  const { tryingToAuthorize } = React.useContext(GlobalContext);
  const currentUser = React.useContext(CurrentUserContext);
  return tryingToAuthorize ? null
    : (currentUser ? element : <Navigate to="/signin" replace/>);
}
