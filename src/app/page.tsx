import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";

export default function Home() {
   return (
      <>
         <Auth>
            <div className="flex flex-row">
               <div className="w-2/5">
                  <Sidebar />
               </div>
            </div>
         </Auth>
      </>
   );
}
