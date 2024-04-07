// import { UserData } from "./UserData";
const PrincipalDashboard = () => {
    const components = [
        {
         // test:<UserData count={"10"} description={"Test"} percentage={"20"}/>
   //      test:<div className="flex items-center justify-between mb-4 bg-white p-9 rounded drop-shadow shadow-md">
   //      <div className="flex-shrink-0">
   //         <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">$45,385</span>
   //         <h3 className="text-base font-normal text-gray-500">Sales this week</h3>
   //      </div>
   //      <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
   //         12.5%
   //         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   //            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
   //         </svg>
   //      </div>
   //   </div>
        },
        {
            test: <div className="flex items-center bg-white p-9 rounded drop-shadow shadow-md">
            <div className="flex-shrink-0">
               <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">2,340</span>
               <h3 className="text-base font-normal text-gray-500">New products this week</h3>
            </div>
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
               14.6%
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
               </svg>
            </div>
         </div>
        }
    ]
    return (
        <div className="flex flex-wrap items-center justify-center">
          {(() => {
            const elements: JSX.Element[] = [];
            for (let i = 0; i <= 2; i++) {
              elements.push(
                <div key={i} className={'m-2 flex items-center justify-center'}>
                  {components[1].test}
                </div>
              );
            }
            return elements;
          })()}
        </div>
      )
}

export default PrincipalDashboard