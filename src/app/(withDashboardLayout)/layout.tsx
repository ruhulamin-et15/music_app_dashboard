import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex max-h-screen ">
      
          <Navbar />
    

        <div  className="w-full overflow-y-auto bg-gray-900 ">{children}</div>
      </div>
    </main>
  );
}
