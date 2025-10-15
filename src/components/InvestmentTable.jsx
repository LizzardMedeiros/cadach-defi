import { useMemo, useState } from "react";

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
    <div className="flex items-end gap-1 h-6" aria-label={`Risco ${safe} de 4`} title={`Risco ${safe}/4`}>
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
  { estrategia: "Blindando meu $", total: 12500, apy: 7.8, criadoPor: "Equipe Cadach", risco: 1 },
  { estrategia: "Beta Moderado", total: 32200.5, apy: 14.2, criadoPor: "Breno LG", risco: 2 },
  { estrategia: "Alpha Momentum", total: 9800, apy: 22.6, criadoPor: "Desk Quant", risco: 3 },
  { estrategia: "Alpha Momentum", total: 9800, apy: 22.6, criadoPor: "Desk Quant", risco: 3 },
  { estrategia: "Gamma DeFi+", total: 48750, apy: 31.1, criadoPor: "DAO X", risco: 4 },
  { estrategia: "Alpha Momentum", total: 9800, apy: 22.6, criadoPor: "Desk Quant", risco: 3 },
  { estrategia: "Alpha Momentum", total: 9800, apy: 22.6, criadoPor: "Desk Quant", risco: 3 },
  { estrategia: "Gamma DeFi+", total: 48750, apy: 31.1, criadoPor: "DAO X", risco: 4 },
];

export default function InvestmentTable({
  rows = DATA,
  pageSize = 5,
  onInvest = (row) => console.log("Investir em", row.estrategia),
}) {
  const [page, setPage] = useState(1); // 1-based
  const [sortBy, setSortBy] = useState("estrategia"); // coluna
  const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'

  // Acessores por coluna
  const accessors = {
    estrategia: (r) => r.estrategia?.toString().toLowerCase(),
    total: (r) => Number(r.total) || 0,
    apy: (r) => Number(r.apy) || 0,
    criadoPor: (r) => r.criadoPor?.toString().toLowerCase(),
    risco: (r) => Number(r.risco) || 0,
  };

  const sortedRows = useMemo(() => {
    const arr = [...rows];
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

      const cmp = String(va).localeCompare(String(vb), "pt-BR", { sensitivity: "base" });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [rows, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);



  const toggleSort = (col) => {
    if (col === sortBy) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
    setPage(1);
  };

  // Definição de colunas + trilhas fixas (evita layout shift)
  const columns = [
    { id: "estrategia", label: "Estratégia", width: "36%" },
    { id: "total", label: "Total investido", width: "18%" },
    { id: "apy", label: "APY", width: "12%" },
    { id: "criadoPor", label: "Criado por", width: "20%" },
    { id: "risco", label: "Risco", width: "10%" },
    { id: "invest", label: "Investir", width: "4%" },
  ];

  const gridColsClass =
    "grid grid-cols-[26%_18%_12%_20%_10%_14%]"; // Tailwind JIT aceita underscores para espaços

  const HeaderCell = ({ id, children, className = "" }) => {
    const active = sortBy === id;
    const ariaSort = id === "invest" ? undefined : active ? (sortDir === "asc" ? "ascending" : "descending") : "none";
    const sortable = id !== "invest";

    return (
      <div
        role="columnheader"
        aria-sort={ariaSort}
        className={`px-4 py-3 text-sm font-medium text-gray-700 whitespace-nowrap ${className}`}
      >
        {sortable ? (
          <button
            onClick={() => toggleSort(id)}
            className="group inline-flex items-center gap-1 select-none cursor-pointer"
            aria-label={`Ordenar por ${children}`}
            title={`Ordenar por ${children}`}
          >
            <span className="tracking-wider">{children}</span>
            <svg
              className={`h-4 w-4 shrink-0 transition-transform ${
                active ? (sortDir === "asc" ? "rotate-180" : "") : "opacity-50 group-hover:opacity-80"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 011.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
            </svg>
          </button>
        ) : (
          <span className="tracking-wider">{children}</span>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center w-full">Estratégias</h2>
        <div />
      </div>

      {/* GRID: container + header + body */}
      <div
        role="table"
        aria-label="Tabela de estratégias"
        className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-gray-100"
      >
        {/* Header */}
        <div role="rowgroup" className="bg-gray-200">
          <div role="row" className={`${gridColsClass} text-left`}>
            {columns.map((c) => (
              <HeaderCell key={c.id} id={c.id}>
                {c.label}
              </HeaderCell>
            ))}
          </div>
        </div>

        {/* Body */}
        <div role="rowgroup" className="divide-y divide-gray-200">
          {pageRows.length > 0 ? (
            pageRows.map((r, idx) => (
              <div
                key={idx}
                role="row"
                className={`${gridColsClass} items-center hover:bg-gray-200`}
              >
                <div role="cell" className="px-4 py-3">
                  <div className="font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                    {r.estrategia}
                  </div>
                </div>

                <div role="cell" className="px-4 py-3">
                  <span className="tabular-nums whitespace-nowrap">{toBRL(r.total)}</span>
                </div>

                <div role="cell" className="px-4 py-3">
                  <span className="tabular-nums whitespace-nowrap">{Number(r.apy).toFixed(2)}%</span>
                </div>

                <div role="cell" className="px-4 py-3">
                  <span className="text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis block">
                    {r.criadoPor}
                  </span>
                </div>

                <div role="cell" className="px-4 py-3">
                  <RiskBars value={r.risco} />
                </div>

                <div role="cell" className="px-4 py-3">
                  <button
                    onClick={() => onInvest(r)}
                    className="text-sm font-medium text-purple-600 hover:text-purple-500 cursor-pointer transition-colors"
                  >
                    Investir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div role="row" className={`${gridColsClass}`}>
              <div role="cell" className="px-4 py-10 text-center text-gray-500 col-span-6">
                Nenhum registro.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Paginação */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-gray-600">
          Página <span className="font-medium">{page}</span> de{" "}
          <span className="font-medium">{totalPages}</span> /{" "}
          <span className="font-medium">{rows.length}</span> registros
        </p>

        <div className="inline-flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50"
            aria-label="Primeira página"
          >
            ‹
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50"
            aria-label="Página anterior"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50"
            aria-label="Próxima página"
          >
            Próxima
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50"
            aria-label="Última página"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
