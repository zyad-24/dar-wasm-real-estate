const operationOptions = ["بيع", "إيجار", "استثمار"];

type Props = {
  operations: string[];
  toggleOperation: (operation: string) => void;
};

export default function PropertyOperations({
  operations,
  toggleOperation,
}: Props) {
  return (
    <div>
      <p className="mb-3 font-bold text-[#d6a642]">نوع العملية</p>

      <div className="grid grid-cols-3 gap-3">
        {operationOptions.map((operation) => {
          const isSelected = operations.includes(operation);

          return (
            <button
              key={operation}
              type="button"
              onClick={() => toggleOperation(operation)}
              className={`rounded-2xl border py-4 font-bold transition ${
                isSelected
                  ? "border-[#d6a642] bg-[#d6a642] text-[#061d26]"
                  : "border-[#d6a642]/30 bg-[#0d2b36] text-white/70"
              }`}
            >
              {operation}
            </button>
          );
        })}
      </div>
    </div>
  );
}