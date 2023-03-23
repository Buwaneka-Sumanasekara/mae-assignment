import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchRedux from "./redux/modules/search"


function App() {

  const dispatch = useDispatch();

  const onPressFavorite = useCallback(
    () => {

      dispatch(SearchRedux.actions.loadSuggestionsValueChanged("sri"));

    },
    [dispatch],
  );

  useEffect(() => {
    onPressFavorite()
  }, [])
  return (
    <div>searching</div>
  );
}

export default App;
