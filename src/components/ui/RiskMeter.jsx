
export default function RiskMeter({ value = 28, max = 100 }) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));
  
  const bars = [
    { id: 1, color: 'bg-green-500', range: [0, 25] },
    { id: 2, color: 'bg-yellow-400', range: [25, 50] },
    { id: 3, color: 'bg-orange-500', range: [50, 75] },
    { id: 4, color: 'bg-red-500', range: [75, 100] }
  ];
  
  const getBarOpacity = (barRange) => {
    if (percentage >= barRange[1]) return 1;
    if (percentage > barRange[0]) return 1;
    return .4;
  };
  
  const getBarWidth = (barRange) => {
    if (percentage >= barRange[1]) return '100%';
    if (percentage > barRange[0]) {
      const barPercentage = ((percentage - barRange[0]) / (barRange[1] - barRange[0])) * 100;
      return `${barPercentage}%`;
    }
    return '0%';
  };

  return (
    <div className="flex items-center gap-2 py-1">
      {/* Score */}
      <span className="text-xs font-medium text-gray-700 w-8 text-right">{value}</span>
      
      {/* Progress Bar */}
      <div className="flex gap-0.5 items-center relative flex-1 min-w-[80px]">
        {bars.map((bar) => (
          <div 
            key={bar.id}
            className={`relative h-1.5 flex-1 rounded-sm overflow-hidden ${bar.color}`}
            style={{ opacity: getBarOpacity(bar.range) }}
          >
            <div 
              className={`h-full ${bar.color} transition-all duration-300`}
              style={{ width: getBarWidth(bar.range) }}
            />
          </div>
        ))}
        
        {/* Indicator dot */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full border border-white shadow-sm transition-all duration-300 pointer-events-none"
          style={{ left: `calc(${percentage}% - 4px)` }}
        />
      </div>
    </div>
  );
}
