import React, { memo, useState } from "react";

import { useCMEditViewDataManager } from "@strapi/helper-plugin";

import get from "lodash/get";
import pick from "lodash/pick";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { useRelation } from "../../hooks/useRelation";
import { getInitialDataPathUsingTempKeys } from "../../utils/paths";

import {
  PUBLICATION_STATES,
  RELATIONS_TO_DISPLAY,
  SEARCH_RESULTS_TO_DISPLAY,
} from "./constants";
import {
  connect,
  diffRelations,
  normalizeRelation,
  normalizeSearchResults,
  select,
} from "./utils";
import RelationInput from "../RelationInput/RelationInput";

const getTrad = (id) => `content-manager.${id}`;

export const RelationInputDataManager = ({
  error,
  entityId,
  componentId,
  isComponentRelation,
  description,
  intlLabel,
  isCreatingEntry,
  isCloningEntry,
  labelAction,
  mainField,
  name,
  queryInfos: { endpoints, defaultParams, shouldDisplayRelationLink },
  placeholder,
  required,
  relationType,
  size,
  targetModel,

  disabled,
  onComboboxChange,
}) => {
  const [liveText, setLiveText] = useState("");
  const { formatMessage } = useIntl();
  const {
    slug,
    initialData,
    modifiedData,
    relationConnect,
    relationDisconnect,
    relationLoad,
    relationReorder,
  } = useCMEditViewDataManager();

  const nameSplit = name.split(".");

  const initialDataPath = getInitialDataPathUsingTempKeys(
    initialData,
    modifiedData
  )(name);

  const relationsFromModifiedData = get(modifiedData, name, []);

  const currentLastPage = Math.ceil(
    get(initialData, name, []).length / RELATIONS_TO_DISPLAY
  );

  const { relations, search, searchFor } = useRelation(
    [slug, initialDataPath.join("."), modifiedData.id, defaultParams],
    {
      relation: {
        enabled: !!endpoints.relation,
        endpoint: endpoints.relation,
        pageGoal: currentLastPage,
        pageParams: {
          ...defaultParams,
          pageSize: RELATIONS_TO_DISPLAY,
        },
        onLoad(value) {
          relationLoad({
            target: {
              initialDataPath: ["initialData", ...initialDataPath],
              modifiedDataPath: ["modifiedData", ...nameSplit],
              value,
            },
          });
        },
        normalizeArguments: {
          mainFieldName: mainField.name,
          shouldAddLink: shouldDisplayRelationLink,
          targetModel,
        },
      },
      search: {
        endpoint: endpoints.search,
        pageParams: {
          ...defaultParams,
          // eslint-disable-next-line no-nested-ternary
          entityId:
            isCreatingEntry || isCloningEntry
              ? undefined
              : isComponentRelation
              ? componentId
              : entityId,
          pageSize: SEARCH_RESULTS_TO_DISPLAY,
        },
      },
    }
  );

  const toOneRelation = [
    "oneWay",
    "oneToOne",
    "manyToOne",
    "oneToManyMorph",
    "oneToOneMorph",
  ].includes(relationType);

  const handleRelationConnect = (relation) => {
    /**
     * Any relation being added to the store should be normalized so it has it's link.
     */
    const normalizedRelation = normalizeRelation(relation, {
      mainFieldName: mainField.name,
      shouldAddLink: shouldDisplayRelationLink,
      targetModel,
    });

    onComboboxChange({ relation, toOneRelation });

    relationConnect({ name, value: normalizedRelation, toOneRelation });
  };

  const handleRelationDisconnect = (relation) => {
    onComboboxChange({ toOneRelation });

    relationDisconnect({ name, id: relation.id });
  };

  const handleRelationLoadMore = () => {
    relations.fetchNextPage();
  };

  const handleSearch = (term = "") => {
    const [connected, disconnected] = diffRelations(
      relationsFromModifiedData,
      get(initialData, name)
    );

    searchFor(term, {
      idsToInclude: disconnected,
      idsToOmit: connected,
    });
  };

  const handleSearchMore = () => {
    search.fetchNextPage();
  };

  // #################
  /**
   *
   * @param {number} index
   * @returns {string}
   */
  const getItemPos = (index) =>
    `${index + 1} of ${relationsFromModifiedData.length}`;

  /**
   *
   * @param {number} currentIndex
   * @param {number} oldIndex
   */
  const handleRelationReorder = (oldIndex, newIndex) => {
    const item = relationsFromModifiedData[oldIndex];

    setLiveText(
      formatMessage(
        {
          id: getTrad("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}.",
        },
        {
          item: item.mainField ?? item.id,
          position: getItemPos(newIndex),
        }
      )
    );

    relationReorder({
      name,
      newIndex,
      oldIndex,
    });
  };

  /**
   *
   * @param {number} index
   * @returns {void}
   */
  const handleGrabItem = (index) => {
    const item = relationsFromModifiedData[index];

    setLiveText(
      formatMessage(
        {
          id: getTrad("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`,
        },
        {
          item: item.mainField ?? item.id,
          position: getItemPos(index),
        }
      )
    );
  };

  /**
   *
   * @param {number} index
   * @returns {void}
   */
  const handleDropItem = (index) => {
    const item = relationsFromModifiedData[index];

    setLiveText(
      formatMessage(
        {
          id: getTrad("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`,
        },
        {
          item: item.mainField ?? item.id,
          position: getItemPos(index),
        }
      )
    );
  };

  /**
   *
   * @param {number} index
   * @returns {void}
   */
  const handleCancel = (index) => {
    const item = relationsFromModifiedData[index];

    setLiveText(
      formatMessage(
        {
          id: getTrad("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled.",
        },
        {
          item: item.mainField ?? item.id,
        }
      )
    );
  };

  // #################

  const browserRelationsCount = relationsFromModifiedData.length;
  const serverRelationsCount = (get(initialData, initialDataPath) ?? []).length;
  const realServerRelationsCount =
    relations.data?.pages[0]?.pagination?.total ?? 0;

  const totalRelations =
    !relations.data && browserRelationsCount === serverRelationsCount
      ? browserRelationsCount
      : browserRelationsCount - serverRelationsCount + realServerRelationsCount;

  return (
    <RelationInput
      error={error}
      canReorder={!toOneRelation}
      description={description}
      disabled={disabled}
      iconButtonAriaLabel={formatMessage({
        id: getTrad("components.RelationInput.icon-button-aria-label"),
        defaultMessage: "Drag",
      })}
      id={name}
      label={`${formatMessage({
        id: intlLabel.id,
        defaultMessage: intlLabel.defaultMessage,
      })} ${totalRelations > 0 ? `(${totalRelations})` : ""}`}
      labelAction={labelAction}
      labelLoadMore={
        !isCreatingEntry || isCloningEntry
          ? formatMessage({
              id: getTrad("relation.loadMore"),
              defaultMessage: "Load More",
            })
          : null
      }
      labelDisconnectRelation={formatMessage({
        id: getTrad("relation.disconnect"),
        defaultMessage: "Remove",
      })}
      listAriaDescription={formatMessage({
        id: getTrad("dnd.instructions"),
        defaultMessage: `Press spacebar to grab and re-order`,
      })}
      listHeight={320}
      liveText={liveText}
      loadingMessage={formatMessage({
        id: getTrad("relation.isLoading"),
        defaultMessage: "Relations are loading",
      })}
      name={name}
      noRelationsMessage={formatMessage({
        id: getTrad("relation.notAvailable"),
        defaultMessage: "No relations available",
      })}
      numberOfRelationsToDisplay={RELATIONS_TO_DISPLAY}
      onDropItem={handleDropItem}
      onGrabItem={handleGrabItem}
      onCancel={handleCancel}
      onRelationConnect={handleRelationConnect}
      onRelationDisconnect={handleRelationDisconnect}
      onRelationLoadMore={handleRelationLoadMore}
      onRelationReorder={handleRelationReorder}
      onSearch={(term) => handleSearch(term)}
      onSearchNextPage={() => handleSearchMore()}
      placeholder={formatMessage(
        placeholder || {
          id: getTrad("relation.add"),
          defaultMessage: "Add relation",
        }
      )}
      publicationStateTranslations={{
        [PUBLICATION_STATES.DRAFT]: formatMessage({
          id: getTrad("relation.publicationState.draft"),
          defaultMessage: "Draft",
        }),

        [PUBLICATION_STATES.PUBLISHED]: formatMessage({
          id: getTrad("relation.publicationState.published"),
          defaultMessage: "Published",
        }),
      }}
      relations={pick(
        { ...relations, data: relationsFromModifiedData },
        "data",
        "hasNextPage",
        "isFetchingNextPage",
        "isLoading",
        "isSuccess"
      )}
      required={required}
      searchResults={normalizeSearchResults(search, {
        mainFieldName: mainField.name,
      })}
      size={size}
    />
  );
};

RelationInputDataManager.defaultProps = {
  componentId: undefined,
  entityId: undefined,
  editable: true,
  error: undefined,
  description: "",
  labelAction: null,
  isFieldReadable: false,
  isComponentRelation: true,
  isFieldAllowed: true,
  placeholder: null,
  required: false,
  size: 6,
  disabled: false,
};

RelationInputDataManager.propTypes = {
  componentId: PropTypes.number,
  entityId: PropTypes.number,
  editable: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }).isRequired,
  labelAction: PropTypes.element,
  isCloningEntry: PropTypes.bool.isRequired,
  isCreatingEntry: PropTypes.bool.isRequired,
  isComponentRelation: PropTypes.bool,
  isFieldAllowed: PropTypes.bool,
  isFieldReadable: PropTypes.bool.isRequired,
  mainField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    schema: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  required: PropTypes.bool,
  relationType: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  targetModel: PropTypes.string.isRequired,
  queryInfos: PropTypes.shape({
    defaultParams: PropTypes.shape({
      locale: PropTypes.string,
    }),
    endpoints: PropTypes.shape({
      relation: PropTypes.string,
      search: PropTypes.string.isRequired,
    }).isRequired,
    shouldDisplayRelationLink: PropTypes.bool.isRequired,
  }).isRequired,
  onComboboxChange: PropTypes.func.isRequired,
};

const Memoized = connect(memo(RelationInputDataManager), select);

export default Memoized;
