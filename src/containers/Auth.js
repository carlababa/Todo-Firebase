import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/auth';

export function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
}
