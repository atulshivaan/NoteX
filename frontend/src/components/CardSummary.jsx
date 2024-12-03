const CardSummary = ({ icon, text, number }) => {
    return (
      <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
        <div className="text-red-600 text-3xl mr-4">{icon}</div>
        <div>
          <p className="text-gray-600 font-medium">{text}</p>
          <p className="text-2xl font-bold">{number}</p>
        </div>
      </div>
    );
  };
  
  export default CardSummary;