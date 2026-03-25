interface DataTableProps {
  data: Record<string, unknown>[];
}

export function DataTable({ data }: DataTableProps) {
  if (!data.length) {
    return <p className="text-sm text-muted-foreground">No data</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-auto max-h-60 rounded-md border">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-muted">
          <tr>
            {columns.map(col => (
              <th
                key={col}
                className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t hover:bg-muted/50">
              {columns.map(col => (
                <td key={col} className="px-3 py-2 whitespace-nowrap">
                  {String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
