import { connect } from 'react-refetch';
import { bundle } from 'react-kinetic-core';
import { Catalog } from './Catalog';

export const refetchMapper = () => ({
  kapp: `${bundle.apiLocation()}/kapps/${bundle.kappSlug()}?include=forms`,
});

export const CatalogContainer = connect(refetchMapper)(Catalog);
