import supabase from "../../supabase";

const API = (store) => (next) => async (action) => {
  if (action.type !== "API_REQUEST") {
    next(action);
    return;
  }

  const { table, method, body, onSuccessType, onErrorType, id , onSuccessCallback = () => {} } =
    action.payload;

  switch (method) {
    case "INIT": {
      //start loading
      store.dispatch({ type: "loader/LOADING_ON" });

      const { data, error } = await supabase.from(table).select("*");

      if (data) {
        // success type dispatch =>
        await store.dispatch({
          type: onSuccessType,
          payload: {
            data,
          },
        });

        //end loading
        store.dispatch({ type: "loader/LOADING_OFF" });
      }

      break;
    }
    case "POST": {
      //start loading
      store.dispatch({ type: "loader/LOADING_ON" });

      const { data, error } = await supabase.from(table).insert(body).select();

      if (data) {
        onSuccessCallback(data[0].id)
        // success type dispatch =>
        await store.dispatch({
          type: onSuccessType,
          payload: {
            data: data[0],
          },
        });
      
        //end loading
        store.dispatch({ type: "loader/LOADING_OFF" });
      }

      break;
    }
    case "PUT": {
      //start loading
      store.dispatch({ type: "loader/LOADING_ON" });

      const { data, error } = await supabase
        .from(table)
        .update(body)
        .eq("id", id)
        .select();

      if (data) {
        await store.dispatch({
          type: onSuccessType,
          payload: {
            data: data[0],
            id,
          },
        });

        //end loading
        store.dispatch({ type: "loader/LOADING_OFF" });
      }

      break;
    }
    case "DELETE": {
      //start loading
      store.dispatch({ type: "loader/LOADING_ON" });

      const { error } = await supabase.from(table).delete().eq("id", id);

      if (error === null) {
        await store.dispatch({
          type: onSuccessType,
          payload: {
            id,
          },
        });
        
        store.dispatch({ type: "loader/LOADING_OFF" });
      }
      break;
    }
    case "TEST": {
      const { data, error } = await supabase
      .from("exams").select(`
        *,
        questions (
          *
        )
    `);

    console.log(data)

      break;
    }
    default: {
    }
  }
};

export default API;
