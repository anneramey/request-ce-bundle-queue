import { List, Record } from 'immutable';

export const Profile = Record({
  displayName: '',
  username: '',
  email: '',
});

export const VALID_STATUSES = List([
  'Open',
  'Pending',
  'Canceled',
  'Completed',
]);

export const isActiveStatus = status =>
  status !== 'Completed' && status !== 'Canceled';

export const AssignmentCriteria = Record({
  mine: false,
  teammates: false,
  unassigned: false,
  byIndividuals: false,
  individuals: List(),
});

export const DateRangeCriteria = Record({
  // createdAt, updatedAt, closedAt
  timeline: 'createdAt',
  // 7days, 30days, 60days, 90days
  preset: '',
  custom: false,
  start: '',
  end: '',
});

export const Filter = Record({
  name: '',
  slug: '',
  adhoc: false,

  // Filter sort order: createdAt, updatedAt, Due Date.
  sortBy: 'createdAt',

  // Search Criteria.
  status: VALID_STATUSES.filter(isActiveStatus),
  teams: List(),
  assignments: AssignmentCriteria(),
  dateRange: DateRangeCriteria(),
});
