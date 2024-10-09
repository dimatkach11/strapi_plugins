import type { Schema, Attribute } from '@strapi/strapi';

export interface TestGroupTestComponent extends Schema.Component {
  collectionName: 'components_test_group_test_components';
  info: {
    displayName: 'test component';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    nation: Attribute.Relation<
      'test-group.test-component',
      'oneToOne',
      'api::nation.nation'
    >;
    cities: Attribute.Relation<
      'test-group.test-component',
      'oneToMany',
      'api::city.city'
    >;
    c_nation: Attribute.JSON &
      Attribute.CustomField<
        'plugin::parent-child-relationships.relation',
        {
          name: 'nation';
          current_column: 'locale_code';
          child_column: 'city_code';
        }
      >;
    c_cities: Attribute.JSON &
      Attribute.CustomField<
        'plugin::parent-child-relationships.relation',
        {
          name: 'cities';
          parent: 'c_nation';
        }
      >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'test-group.test-component': TestGroupTestComponent;
    }
  }
}
