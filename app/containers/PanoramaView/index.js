/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Panorama from '../../components/Panorama';
// import { useInjectReducer } from 'utils/injectReducer';

const key = 'home';

export function PanoramaView({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  // useEffect(() => {
  //   // When initial state username is not null, submit the form to load repos
  //   if (username && username.trim().length > 0) onSubmitForm();
  // }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
        <title>Panorama View</title>
        <meta
          name="description"
          content="360 view of the best projects in the world"
        />
      <div>
        <h1>Panorama View</h1>
        <p>This is the panorama view</p>
        <Panorama />
      </div>
    </article>
  );
}

PanoramaView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};



// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });

// export function mapDispatchToProps(dispatch) {
//   return {
//     onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
//     onSubmitForm: evt => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(loadRepos());
//     },
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

export default compose(
  // withConnect,
  memo,
)(PanoramaView);
