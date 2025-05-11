import axios from "axios";

export const gettInitialData = async () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/dataform/")
      .then((res) => {
        console.log("Fetched data:", res.data);
        setHolas(res.data);
        setIsLoading(false); // Detener el spinner una vez que los datos se cargan
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false); // Detener el spinner incluso si hay un error
      });
}