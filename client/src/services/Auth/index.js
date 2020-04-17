import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedPagePlaceholder = () => <div>PROTECTED PAGE</div>;

const withProtected = (
  Component,
  { redirect = true, redirectTo = "/auth/login" } = {} // options are always present
) => ({ user, loading }) => {
  if (user) {
    // If we have a user, then render the component
    return <Component />;
  } else {
    // If the user auth backend is loading (because there's no user yet) render the placeholder
    if (loading) return <ProtectedPagePlaceholder />;
    else {
      // If the auth has been completed and there is no user then redirect or render placehoder
      // depending on choosen option
      if (redirect) {
        return <Redirect to={redirectTo} />;
      } else {
        return <ProtectedPagePlaceholder />;
      }
    }
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.me,
    loading: state.user.loading,
  };
};

export default connect(mapStateToProps)(withProtected);
