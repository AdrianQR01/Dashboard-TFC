const PrincipalDashboard = () => {
    return (
        <div className="flex flex-wrap space-x-4">
        {(() => {
          const elements: JSX.Element[] = [];
          for (let i = 1; i <= 8; i++) {
            const colorIndex = i % 4 + 5;
            elements.push(
              <div key={i} className={`flex justify-center items-center  bg-cyan-${colorIndex * 100}`}>
                {i}{i}{i}{i}{i}{i}{i}{i}{i}{i}{i}{i}{i}
              </div>
            );
          }
          return elements;
        })()}
      </div>
    )
}

export default PrincipalDashboard