function DiningHallsPage() {
  const diningHalls = [
    { name: "John Jay", stations: ["Main Line", "Grill", "Action Station"] },
    // Add other dining halls here
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dining Halls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diningHalls.map((hall) => (
          <div key={hall.name} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{hall.name}</h2>
              <ul>
                {hall.stations.map((station) => (
                  <li key={station} className="flex justify-between">
                    <span>{station}</span>
                    <button className="btn btn-sm btn-primary">Rate</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiningHallsPage;
