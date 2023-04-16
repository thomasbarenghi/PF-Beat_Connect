import { Main, Head, Search, Switch, Input } from "@/components";
import { usuariosDos } from "../data/fakeDB";
import { beats } from "../data/fakeDB";
import TableBody from "./admin/tableTest";
import FormCreateBeat from "@/components/client/formCreateBeat";

export default function TestForm() {

  const usuariosDosJson = JSON.stringify(usuariosDos);
  console.log(usuariosDosJson)
 

  return (
    <>
      <Head title={"Test"} description={"Head from test"} />
      <Main>

        <div className="bg-slate-500"> 
      <TableBody data={usuariosDosJson} /> 
      </div>
      <br />

      <FormCreateBeat />
                  
      </Main>    
            
    </>
  );
}