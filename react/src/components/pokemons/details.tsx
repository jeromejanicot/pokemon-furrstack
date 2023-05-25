import { trpc } from "../../trpc/client";

export default function Details() {
  const useQuery = trpc.pokemons.findOne.useQuery("pikachu");
  if (useQuery.data == undefined) {
    console.log("undefined");
    return <div>undefined</div>;
  }
  if (useQuery.data == "no such pokemon exists") {
    console.log("no such pokemon exists");
    return <div>no such pokemon exists</div>;
  } else {
    return (
      <div className="page">
        <div className="max_width details_container">
          <div> Picture </div>
          <div> {useQuery.data?.name}</div>
          <div> {useQuery.data?.types}</div>
          <div> {useQuery.data?.weight}</div>
        </div>
      </div>
    );
  }
}
