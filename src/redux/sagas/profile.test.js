import { put, call } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { doFetchProfile, doUpdateProfile } from './profile';

import { actions } from '../modules/profile';

// Mock out the bundle object from a dependency.
jest.mock('react-kinetic-core', () => ({
  bundle: {
    apiLocation: () => 'space/app/api/v1',
  },
  CoreAPI: { updateProfile: () => {}, fetchProfile: () => {} },
}));

describe('profile saga', () => {
  describe('#doFetchProfile', () => {
    test('when errors it dispatches FETCH_PROFILE_ERROR', () => {
      const response = { errors: ['fake-error'] };

      // Step 1 - trigger the saga - as if watchProfile had seen an action.
      const saga = doFetchProfile();
      // Step 2 - call to fetch the profile.
      expect(saga.next().value).toEqual(call(CoreAPI.fetchProfile));
      // Step 3 - that call results in an error, dispatch a fetch error action.
      expect(saga.next(response).value).toEqual(put(actions.fetchProfileError(response.errors)));
    });

    test('when successful it dispatches SET_PROFILE', () => {
      const response = { profile: { name: 'fake-profile' } };

      // Step 1 - trigger the saga - as if watchProfile had seen an action.
      const saga = doFetchProfile();
      // Step 2 - call to fetch the profile.
      expect(saga.next().value).toEqual(call(CoreAPI.fetchProfile));
      // Step 3 - that call response with a profile, dispatch a set profile action.
      expect(saga.next(response).value).toEqual(put(actions.setProfile(response.profile)));
    });
  });

  describe('#doUpdateProfile', () => {
    test('when errors it dispatches FETCH_PROFILE_ERROR', () => {
      const fakeProfile = { name: 'foo' };
      const watchAction = actions.setProfile(fakeProfile);
      const response = { errors: ['fake-error'] };

      // Step 1 - trigger the saga - as if watchProfile had seen an action.
      const saga = doUpdateProfile(watchAction);
      // Step 2 - call to update the profile.
      expect(saga.next().value).toEqual(
        call(CoreAPI.updateProfile, { profile: watchAction.payload }));
      // Step 2 - that call results in an error, dispatch a fetch error action.
      expect(saga.next(response).value).toEqual(put(actions.fetchProfileError(response.errors)));
    });

    test('when successful it dispatches SET_PROFILE', () => {
      const fakeProfile = { name: 'foo' };
      const watchAction = actions.setProfile(fakeProfile);
      const response = { profile: fakeProfile };

      // Step 1 - trigger the saga - as if watchProfile had seen an action.
      const saga = doUpdateProfile(watchAction);
      // Step 2 - call to update the profile.
      expect(saga.next().value).toEqual(
        call(CoreAPI.updateProfile, { profile: watchAction.payload }));
      // Step 2 - that call responds with a profile, dispatch a fetch error action.
      expect(saga.next(response).value).toEqual(put(actions.setProfile(response.profile)));
    });
  });
});
