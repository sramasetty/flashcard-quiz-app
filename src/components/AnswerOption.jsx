function AnswerOption({ text, onSelect, isCorrect, isSelected, isAnswered }) {
  // Default styling
  let colorClasses = "bg-[#cdcddd] text-[#20202a]";

  // If thr question has been anwered, figure out the right colors
  if (isAnswered) {
    // 1. Check if this specific button is the correct answer
    if (isCorrect) {
      colorClasses = "bg-[#2ecc71] text-white"; // Green for correct
    }
    // 2. If it's not the correct answer, check if the user clicked it
    else if (isSelected) {
      colorClasses = "bg-[#ff5252] text-white"; // Red for incorrect selection
    }
  }

  return (
    <button
      onClick={() => onSelect(text)}
      disabled={isAnswered}
      className={`relative overflow-visible p-4 font-medium rounded-xl cursor-pointer transition duration-10 ${colorClasses}`}
    >
      {/* The Badge */}
      {isAnswered && (isCorrect || isSelected) && (
        <span
          className={`absolute top-0 right-4 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md
            ${isCorrect ? "bg-[#219653]" : "bg-[#d63031]"}`}
        >
          {isCorrect ? "Correct!" : "Incorrect!"}
        </span>
      )}
      {text}
    </button>
  );
}

export default AnswerOption;
