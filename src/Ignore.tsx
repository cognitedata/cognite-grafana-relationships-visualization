/* const  i = () => {return  Object.keys(defaultCollapse).map((key: string) => {
  const { children, label, selector } = defaultCollapse[key];
  const collapsPath = [key, AVOIDED_KEY];
  const collapsPathValue = pathValue(collapsPath);
  return (
    <CollapsablePanelSection
      key={`${key}.${AVOIDED_KEY}`}
      {...{
        label,
        isOpen: collapsPathValue,
        onToggle: () => onChange(setPathValue(!collapsPathValue, collapsPath)),
      }}
    >
      {Object.keys(children).map((childKey) => {
        if (childKey !== CONDITIONED_FIELDS) {
          if (defaultCollapse[key][AVOIDED_TAB]) {
            if (childKey === EDGES) {
              console.log(key, childKey, children[childKey]);
              return undefined;
            } else {
              console.log(key, childKey, children[childKey], AVOIDED_TAB);
              return undefined;
            }
          }
          return getChildrens(children, selector, key, childKey, pathValue, setPathValue, onChange);
        }
        const [condition, ...rest] = children[childKey];
        const conditionPath = selector
          ? [key, selector, condition[CONDITION_PATH]]
          : [key, condition[CONDITION_PATH]];
        const conditionValue = pathValue(conditionPath);

        return (
          checkCondition(conditionValue, condition[CONDITION_PATH]) &&
          rest.map((v: any) => getChildrens(v, selector, key, childKey, pathValue, setPathValue, onChange))
        );
      })}
    </CollapsablePanelSection>
  );
});
} */