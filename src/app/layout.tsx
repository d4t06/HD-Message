// not component there, can't write logic here

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Messenger Clone",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body>
            {/* <div className="flex flex-row">
               <div className="w-1/3">
                  <Sidebar />
               </div>
               <div className="flex-1">{children}</div>
            </div> */}
            {children}
         </body>
      </html>
   );
}
