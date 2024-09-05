'use server'

import {db} from '@/db';
import { redirect } from "next/navigation";
export async function addSnippet(title:string,code:string){
    console.log("adding snippet: ",{title,code});

        const snippet = await db.snippet.create({
          data: {   
            title,
            code,
          },
        });
    
        console.log("Snippet", snippet);
        redirect("/");
      

}



export async function editSnippet(id:number,title:string,code:string) {
    console.log("editing snippet: ",{id,title,code});

  

      if (id) {
        await db.snippet.update({
          where: { id: id },
          data: { title, code },
        });
      }
  
     
      redirect("/");
    
  
}
