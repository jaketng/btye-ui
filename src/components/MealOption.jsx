function MealOption({ stationName, foodName, rating }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-2">
      <div>
        <h3 className="font-semibold">{stationName}</h3>
        <p className="text-sm text-gray-500">{foodName}</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`mask mask-star-2 w-5 h-5 ${
                star <= rating ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        <button className="btn btn-xs btn-primary">Rate</button>
      </div>
    </div>
  );
}

export default MealOption;
