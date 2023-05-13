import React from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext, GlobalContext } from '../../contexts/contexts';

export default function Protected({element, inverse=false }) {
  const { tryingToAuthorize } = React.useContext(GlobalContext);
  const currentUser = React.useContext(CurrentUserContext);
  if (tryingToAuthorize) return null;
  if (!inverse) {
    return currentUser ? element : <Navigate to="/" replace />;
  } else {
    return currentUser ? <Navigate to="/movies" replace /> : element;
  }
}
