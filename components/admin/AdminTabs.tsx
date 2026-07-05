type AdminTabsProps = {
  tab: "add" | "manage";
  setTab: (tab: "add" | "manage") => void;
};

export default function AdminTabs({ tab, setTab }: AdminTabsProps) {
  return (
    <div className="mb-6 grid grid-cols-2 rounded-2xl bg-white/5 p-1">
      <button
        onClick={() => setTab("add")}
        className={`rounded-xl py-3 font-bold ${
          tab === "add" ? "bg-[#d6a642] text-[#061d26]" : "text-white/70"
        }`}
      >
        إضافة إعلان
      </button>

      <button
        onClick={() => setTab("manage")}
        className={`rounded-xl py-3 font-bold ${
          tab === "manage" ? "bg-[#d6a642] text-[#061d26]" : "text-white/70"
        }`}
      >
        إدارة الإعلانات
      </button>
    </div>
  );
}