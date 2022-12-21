import { useLoaderData } from "react-router-dom";
import Client from "../components/Client";
import { getClients } from "../data/clients";

export function loader() {
  const clients = getClients();
  return clients;
}
const Home = () => {
  const data = useLoaderData();

  console.log(data);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clients</h1>
      <p className="mt-3">Management</p>
      {data.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Client</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((client) => (
              <Client key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-100">No data</p>
      )}
    </>
  );
};

export default Home;
