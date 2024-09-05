'use server'

import {db} from '@/db';
import { redirect } from "next/navigation";
export async function addSnippet(formData:any){
    console.log("adding snippet: ",formData);

        const snippet = await db.snippet.create({
          data: formData
        });
    
        console.log("Snippet", snippet);
        redirect("/");
      

}



export async function editSnippet(id:number,formData:any) {
    console.log("editing snippet: ",formData);

  

      if (id) {
        await db.snippet.update({
          where: { id: id },
          data: formData,
        });
      }
  
     
      redirect("/");
    
  
}


