import { useMemo, useState, useEffect } from "react";

/** Util: moeda BRL */
const toBRL = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number(n || 0)
  );

/** Barras de risco roxas (1..4) estilo “sinal” */
function RiskBars({ value = 1 }) {
  const bars = [1, 2, 3, 4];
  const safe = Math.max(0, Math.min(4, Number(value))); // clamp 0..4
  const heights = ["h-2", "h-3", "h-4", "h-6"]; // crescente

  return (
    <div
      className="flex items-end gap-1 h-6"
      aria-label={`Risco ${safe} de 4`}
      title={`Risco ${safe}/4`}
    >
      {bars.map((b, i) => (
        <span
          key={b}
          className={[
            "w-1.5 rounded-sm",
            heights[i],
            b <= safe
              ? "bg-gradient-to-t from-purple-600 to-purple-400"
              : "bg-purple-200/40 border border-purple-200",
          ].join(" ")}
        />
      ))}
      <span className="sr-only">{safe} de 4</span>
    </div>
  );
}

/** Dados de exemplo */
const DATA = [
  {
    estrategia: "Blindando meu $",
    total: 12500,
    apy: 7.8,
    criadoPor: "Equipe Cadach",
    risco: 1,
  },
  {
    estrategia: "Beta Moderado",
    total: 32200.5,
    apy: 14.2,
    criadoPor: "Breno LG",
    risco: 2,
  },
  {
    estrategia: "Alpha Momentum",
    total: 9800,
    apy: 22.6,
    criadoPor: "Desk Quant",
    risco: 3,
  },
  {
    estrategia: "Gamma DeFi+",
    total: 48750,
    apy: 31.1,
    criadoPor: "DAO X",
    risco: 4,
  },
];

export default function InvestmentTable({
  rows = DATA,
  strategyFilter = null, // ← nome corrigido
  pageSize = 10,
  onInvest = (row) => console.log("Investir em", row),
}) {
  const [filteredRows, setFilteredRows] = useState(rows);
  const [page, setPage] = useState(1); // 1-based
  const [sortBy, setSortBy] = useState("estrategia"); // coluna
  const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'

  /** 🧠 useEffect — filtra conforme o risco (1–4) */
  useEffect(() => {
    if (strategyFilter && [1, 2, 3, 4].includes(Number(strategyFilter))) {
      setFilteredRows(rows.filter((r) => Number(r.risco) === Number(strategyFilter)));
      setPage(1); // volta pra primeira página ao filtrar
    } else {
      setFilteredRows(rows);
    }
  }, [strategyFilter, rows]);

  // Acessores por coluna
  const accessors = {
    estrategia: (r) => r.estrategia?.toString().toLowerCase(),
    total: (r) => Number(r.total) || 0,
    apy: (r) => Number(r.apy) || 0,
    criadoPor: (r) => r.criadoPor?.toString().toLowerCase(),
    risco: (r) => Number(r.risco) || 0,
  };

  const sortedRows = useMemo(() => {
    const arr = [...filteredRows];
    const acc = accessors[sortBy];
    arr.sort((a, b) => {
      const va = acc ? acc(a) : a[sortBy];
      const vb = acc ? acc(b) : b[sortBy];

      if (typeof va === "string" && typeof vb === "string") {
        const cmp = va.localeCompare(vb, "pt-BR", { sensitivity: "base" });
        return sortDir === "asc" ? cmp : -cmp;
      }

      const na = Number(va);
      const nb = Number(vb);
      if (!Number.isNaN(na) && !Number.isNaN(nb)) {
        return sortDir === "asc" ? na - nb : nb - na;
      }

      const cmp = String(va).localeCompare(String(vb), "pt-BR", {
        sensitivity: "base",
      });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filteredRows, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setPage(totalPages);

  const toggleSort = (col) => {
    if (col === sortBy) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
    setPage(1);
  };

  const columns = [
    { id: "estrategia", label: "Estratégia" },
    { id: "total", label: "Total investido" },
    { id: "apy", label: "APY" },
    { id: "criadoPor", label: "Criado por" },
    { id: "risco", label: "Risco" },
  ];

  const gridColsClass = "grid grid-cols-[40%_18%_12%_20%_10%]";

  const HeaderCell = ({ id, children }) => {
    const active = sortBy === id;
    const ariaSort =
      id === "invest"
        ? undefined
        : active
        ? sortDir === "asc"
          ? "ascending"
          : "descending"
        : "none";
    const sortable = id !== "invest";

    return (
      <div
        role="columnheader"
        aria-sort={ariaSort}
        className="px-4 py-3 text-sm font-medium text-gray-700 whitespace-nowrap max-w-screen"
      >
        {sortable ? (
          <button
            onClick={() => toggleSort(id)}
            className="group inline-flex items-center gap-1 select-none cursor-pointer"
          >
            <span>{children}</span>
            <svg
              className={`h-4 w-4 shrink-0 transition-transform ${
                active
                  ? sortDir === "asc"
                    ? "rotate-180"
                    : ""
                  : "opacity-50 group-hover:opacity-80"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 011.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
            </svg>
          </button>
        ) : (
          <span>{children}</span>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20" id="table">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center w-full">
          Estratégias
        </h2>
      </div>
      <div className="overflow-x-auto mb-3  rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-gray-100 ">
        <div
          role="table"
          aria-label="Tabela de estratégias"
          className="min-w-[720px]"
        >
          {/* Cabeçalho */}
          <div role="rowgroup" className="bg-gray-200">
            <div role="row" className={`${gridColsClass} text-left`}>
              {columns.map((c) => (
                <HeaderCell key={c.id} id={c.id}>
                  {c.label}
                </HeaderCell>
              ))}
            </div>
          </div>

          {/* Corpo */}
          <div role="rowgroup" className="divide-y divide-gray-200">
            {pageRows.length > 0 ? (
              pageRows.map((r, idx) => (
                <div
                  key={idx}
                  role="row"
                  onClick={() => onInvest(r)}
                  className={`${gridColsClass} items-center hover:bg-gray-200 cursor-pointer`}
                >
                  <div role="cell" className="px-4 py-3 font-medium text-gray-800">
                    {r.estrategia}
                  </div>
                  <div role="cell" className="px-4 py-3 tabular-nums">
                    {toBRL(r.total)}
                  </div>
                  <div role="cell" className="px-4 py-3 tabular-nums">
                    {Number(r.apy).toFixed(2)}%
                  </div>
                  <div role="cell" className="px-4 py-3 text-gray-800">
                    {r.criadoPor}
                  </div>
                  <div role="cell" className="px-4 py-3">
                    <RiskBars value={r.risco} />
                  </div>
                </div>
              ))
            ) : (
              <div role="row" className={`${gridColsClass}`}>
                <div
                  role="cell"
                  className="px-4 py-10 text-center text-gray-500 col-span-6"
                >
                  Nenhum registro.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Paginação */}
      <div className="mt-2 flex items-center justify-between gap-3 flex-row">
        <p className="text-sm text-gray-600">
          Página <span className="font-medium">{page}</span> de{" "}
          <span className="font-medium">{totalPages}</span> /{" "}
          <span className="font-medium">{filteredRows.length}</span> registros
        </p>

        <div className="inline-flex items-center gap-2">
          <button
            onClick={goFirst}
            disabled={page === 1}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50"
          >
            ‹
          </button>
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="hidden rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50 sm:inline-flex"
          >
            Anterior
          </button>
          <button
            onClick={goNext}
            disabled={page === totalPages}
            className="hidden rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50 sm:inline-flex"
          >
            Próxima
          </button>
          <button
            onClick={goLast}
            disabled={page === totalPages}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
